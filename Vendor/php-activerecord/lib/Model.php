<?php
/**
 * @package ActiveRecord
 */
namespace ActiveRecord;

use Closure;

/**
 * The base class for your models.
 *
 * Defining an ActiveRecord model for a table called people and orders:
 *
 * <code>
 * CREATE TABLE people(
 *   id int primary key auto_increment,
 *   parent_id int,
 *   first_name varchar(50),
 *   last_name varchar(50)
 * );
 *
 * CREATE TABLE orders(
 *   id int primary key auto_increment,
 *   person_id int not null,
 *   cost decimal(10,2),
 *   total decimal(10,2)
 * );
 * </code>
 *
 * <code>
 * class Person extends ActiveRecord\Model {
 *   static $belongs_to = array(
 *     array('parent', 'foreign_key' => 'parent_id', 'class_name' => 'Person')
 *   );
 *
 *   static $has_many = array(
 *     array('children', 'foreign_key' => 'parent_id', 'class_name' => 'Person'),
 *     array('orders')
 *   );
 *
 *   static $validates_length_of = array(
 *     array('first_name', 'within' => array(1,50)),
 *     array('last_name', 'within' => array(1,50))
 *   );
 * }
 *
 * class Order extends ActiveRecord\Model {
 *   static $belongs_to = array(
 *     array('person')
 *   );
 *
 *   static $validates_numericality_of = array(
 *     array('cost', 'greater_than' => 0),
 *     array('total', 'greater_than' => 0)
 *   );
 *
 *   static $before_save = array('calculate_total_with_tax');
 *
 *   public function calculate_total_with_tax() {
 *     $this->total = $this->cost * 0.045;
 *   }
 * }
 * </code>
 *
 * For a more in-depth look at defining models, relationships, callbacks and many other things
 * please consult our {@link http://www.phpactiverecord.org/guides Guides}.
 *
 * @package ActiveRecord
 * @see BelongsTo
 * @see CallBack
 * @see HasMany
 * @see HasAndBelongsToMany
 * @see Serialization
 * @see Validations
 */
class Model
{

	public $errors;

	private $attributes = array();

	private $__dirty = null;

	private $__readonly = false;

	private $__relationships = array();

	private $__new_record = true;

	static $connection;

	static $db;

	static $table_name;

	static $primary_key;

	static $sequence;

	static $alias_attribute = array();

	static $attr_accessible = array();

	static $attr_protected = array();

	static $delegate = array();


	public function __construct(array $attributes=array(), $guard_attributes=true, $instantiating_via_find=false, $new_record=true)
	{
		$this->__new_record = $new_record;

		// initialize attributes applying defaults
		if (!$instantiating_via_find)
		{
			foreach (static::table()->columns as $name => $meta)
				$this->attributes[$meta->inflected_name] = $meta->default;
		}

		$this->set_attributes_via_mass_assignment($attributes, $guard_attributes);

		// since all attribute assignment now goes thru assign_attributes() we want to reset
		// dirty if instantiating via find since nothing is really dirty when doing that
		if ($instantiating_via_find)
			$this->__dirty = array();

		$this->invoke_callback('after_construct',false);
	}


	public function &__get($name)
	{
		// check for getter
		if (method_exists($this, "get_$name"))
		{
			$name = "get_$name";
			$value = $this->$name();
			return $value;
		}

		return $this->read_attribute($name);
	}

	public function __isset($attribute_name)
	{
		return array_key_exists($attribute_name,$this->attributes) || array_key_exists($attribute_name,static::$alias_attribute);
	}

	public function __set($name, $value)
	{
		if (array_key_exists($name, static::$alias_attribute))
			$name = static::$alias_attribute[$name];

		elseif (method_exists($this,"set_$name"))
		{
			$name = "set_$name";
			return $this->$name($value);
		}

		if (array_key_exists($name,$this->attributes))
			return $this->assign_attribute($name,$value);

		if ($name == 'id')
			return $this->assign_attribute($this->get_primary_key(true),$value);

		foreach (static::$delegate as &$item)
		{
			if (($delegated_name = $this->is_delegated($name,$item)))
				return $this->$item['to']->$delegated_name = $value;
		}

		throw new UndefinedPropertyException(get_called_class(),$name);
	}

	public function __wakeup()
	{
		// make sure the models Table instance gets initialized when waking up
		static::table();
	}

	public function assign_attribute($name, $value)
	{
		$table = static::table();
		if (!is_object($value)) {
			if (array_key_exists($name, $table->columns)) {
				$value = $table->columns[$name]->cast($value, static::connection());
			} else {
				$col = $table->get_column_by_inflected_name($name);
				if (!is_null($col)){
					$value = $col->cast($value, static::connection());
				}
			}
		}

		// convert php's \DateTime to ours
		if ($value instanceof \DateTime)
			$value = new DateTime($value->format('Y-m-d H:i:s T'));

		// make sure DateTime values know what model they belong to so
		// dirty stuff works when calling set methods on the DateTime object
		if ($value instanceof DateTime)
			$value->attribute_of($this,$name);

		$this->attributes[$name] = $value;
		$this->flag_dirty($name);
		return $value;
	}

	public function &read_attribute($name)
	{
		// check for aliased attribute
		if (array_key_exists($name, static::$alias_attribute))
			$name = static::$alias_attribute[$name];

		// check for attribute
		if (array_key_exists($name,$this->attributes))
			return $this->attributes[$name];

		// check relationships if no attribute
		if (array_key_exists($name,$this->__relationships))
			return $this->__relationships[$name];

		$table = static::table();

		// this may be first access to the relationship so check Table
		if (($relationship = $table->get_relationship($name)))
		{
			$this->__relationships[$name] = $relationship->load($this);
			return $this->__relationships[$name];
		}

		if ($name == 'id')
		{
			$pk = $this->get_primary_key(true);
			if (isset($this->attributes[$pk]))
				return $this->attributes[$pk];
		}

		//do not remove - have to return null by reference in strict mode
		$null = null;

		foreach (static::$delegate as &$item)
		{
			if (($delegated_name = $this->is_delegated($name,$item)))
			{
				$to = $item['to'];
				if ($this->$to)
				{
					$val =& $this->$to->__get($delegated_name);
					return $val;
				}
				else
					return $null;
			}
		}

		throw new UndefinedPropertyException(get_called_class(),$name);
	}

	public function flag_dirty($name)
	{
		if (!$this->__dirty)
			$this->__dirty = array();

		$this->__dirty[$name] = true;
	}

	public function dirty_attributes()
	{
		if (!$this->__dirty)
			return null;

		$dirty = array_intersect_key($this->attributes,$this->__dirty);
		return !empty($dirty) ? $dirty : null;
	}

	public function attribute_is_dirty($attribute)
	{
		return $this->__dirty && isset($this->__dirty[$attribute]) && array_key_exists($attribute, $this->attributes);
	}

	public function attributes()
	{
		return $this->attributes;
	}

	public function get_primary_key($first=false)
	{
		$pk = static::table()->pk;
		return $first ? $pk[0] : $pk;
	}

	public function get_real_attribute_name($name)
	{
		if (array_key_exists($name,$this->attributes))
			return $name;

		if (array_key_exists($name,static::$alias_attribute))
			return static::$alias_attribute[$name];

		return null;
	}

	public function get_validation_rules()
	{
		require_once 'Validations.php';

		$validator = new Validations($this);
		return $validator->rules();
	}

	public function get_values_for($attributes)
	{
		$ret = array();

		foreach ($attributes as $name)
		{
			if (array_key_exists($name,$this->attributes))
				$ret[$name] = $this->attributes[$name];
		}
		return $ret;
	}

	public static function table_name()
	{
		return static::table()->table;
	}

	private function is_delegated($name, &$delegate)
	{
		if ($delegate['prefix'] != '')
			$name = substr($name,strlen($delegate['prefix'])+1);

		if (is_array($delegate) && in_array($name,$delegate['delegate']))
			return $name;

		return null;
	}

	public function is_readonly()
	{
		return $this->__readonly;
	}

	public function is_new_record()
	{
		return $this->__new_record;
	}

	private function verify_not_readonly($method_name)
	{
		if ($this->is_readonly())
			throw new ReadOnlyException(get_class($this), $method_name);
	}

	public function readonly($readonly=true)
	{
		$this->__readonly = $readonly;
	}

	public static function connection()
	{
		return static::table()->conn;
	}

	public static function reestablish_connection()
	{
		return static::table()->reestablish_connection();
	}

	public static function table()
	{
		return Table::load(get_called_class());
	}

	public static function create($attributes, $validate=true)
	{
		$class_name = get_called_class();
		$model = new $class_name($attributes);
		$model->save($validate);
		return $model;
	}

	public function save($validate=true)
	{
		$this->verify_not_readonly('save');
		return $this->is_new_record() ? $this->insert($validate) : $this->update($validate);
	}

	private function insert($validate=true)
	{
		$this->verify_not_readonly('insert');

		if (($validate && !$this->_validate() || !$this->invoke_callback('before_create',false)))
			return false;

		$table = static::table();

		if (!($attributes = $this->dirty_attributes()))
			$attributes = $this->attributes;

		$pk = $this->get_primary_key(true);
		$use_sequence = false;

		if ($table->sequence && !isset($attributes[$pk]))
		{
			if (($conn = static::connection()) instanceof OciAdapter)
			{
				// terrible oracle makes us select the nextval first
				$attributes[$pk] = $conn->get_next_sequence_value($table->sequence);
				$table->insert($attributes);
				$this->attributes[$pk] = $attributes[$pk];
			}
			else
			{
				// unset pk that was set to null
				if (array_key_exists($pk,$attributes))
					unset($attributes[$pk]);

				$table->insert($attributes,$pk,$table->sequence);
				$use_sequence = true;
			}
		}
		else
			$table->insert($attributes);

		// if we've got an autoincrementing/sequenced pk set it
		// don't need this check until the day comes that we decide to support composite pks
		// if (count($pk) == 1)
		{
			$column = $table->get_column_by_inflected_name($pk);

			if ($column->auto_increment || $use_sequence)
				$this->attributes[$pk] = static::connection()->insert_id($table->sequence);
		}

		$this->invoke_callback('after_create',false);
		$this->__new_record = false;
		return true;
	}

	private function update($validate=true)
	{
		$this->verify_not_readonly('update');

		if ($validate && !$this->_validate())
			return false;

		if ($this->is_dirty())
		{
			$pk = $this->values_for_pk();

			if (empty($pk))
				throw new ActiveRecordException("Cannot update, no primary key defined for: " . get_called_class());

			if (!$this->invoke_callback('before_update',false))
				return false;

			$dirty = $this->dirty_attributes();
			static::table()->update($dirty,$pk);
			$this->invoke_callback('after_update',false);
		}

		return true;
	}

	public static function delete_all($options=array())
	{
		$table = static::table();
		$conn = static::connection();
		$sql = new SQLBuilder($conn, $table->get_fully_qualified_table_name());

		$conditions = is_array($options) ? $options['conditions'] : $options;

		if (is_array($conditions) && !is_hash($conditions))
			call_user_func_array(array($sql, 'delete'), $conditions);
		else
			$sql->delete($conditions);

		if (isset($options['limit']))
			$sql->limit($options['limit']);

		if (isset($options['order']))
			$sql->order($options['order']);

		$values = $sql->bind_values();
		$ret = $conn->query(($table->last_sql = $sql->to_s()), $values);
		return $ret->rowCount();
	}

	public static function update_all($options=array())
	{
		$table = static::table();
		$conn = static::connection();
		$sql = new SQLBuilder($conn, $table->get_fully_qualified_table_name());

		$sql->update($options['set']);

		if (isset($options['conditions']) && ($conditions = $options['conditions']))
		{
			if (is_array($conditions) && !is_hash($conditions))
				call_user_func_array(array($sql, 'where'), $conditions);
			else
				$sql->where($conditions);
		}

		if (isset($options['limit']))
			$sql->limit($options['limit']);

		if (isset($options['order']))
			$sql->order($options['order']);

		$values = $sql->bind_values();
		$ret = $conn->query(($table->last_sql = $sql->to_s()), $values);
		return $ret->rowCount();

	}

	public function delete()
	{
		$this->verify_not_readonly('delete');

		$pk = $this->values_for_pk();

		if (empty($pk))
			throw new ActiveRecordException("Cannot delete, no primary key defined for: " . get_called_class());

		if (!$this->invoke_callback('before_destroy',false))
			return false;

		static::table()->delete($pk);
		$this->invoke_callback('after_destroy',false);

		return true;
	}

	public function values_for_pk()
	{
		return $this->values_for(static::table()->pk);
	}

	public function values_for($attribute_names)
	{
		$filter = array();

		foreach ($attribute_names as $name)
			$filter[$name] = $this->$name;

		return $filter;
	}

	private function _validate()
	{
		require_once 'Validations.php';

		$validator = new Validations($this);
		$validation_on = 'validation_on_' . ($this->is_new_record() ? 'create' : 'update');

		foreach (array('before_validation', "before_$validation_on") as $callback)
		{
			if (!$this->invoke_callback($callback,false))
				return false;
		}

		// need to store reference b4 validating so that custom validators have access to add errors
		$this->errors = $validator->get_record();
		$validator->validate();

		foreach (array('after_validation', "after_$validation_on") as $callback)
			$this->invoke_callback($callback,false);

		if (!$this->errors->is_empty())
			return false;

		return true;
	}

	public function is_dirty()
	{
		return empty($this->__dirty) ? false : true;
	}

	public function is_valid()
	{
		return $this->_validate();
	}

	public function is_invalid()
	{
		return !$this->_validate();
	}

	public function set_timestamps()
	{
		$now = date('Y-m-d H:i:s');

		if (isset($this->updated_at))
			$this->updated_at = $now;

		if (isset($this->created_at) && $this->is_new_record())
			$this->created_at = $now;
	}

	public function update_attributes($attributes)
	{
		$this->set_attributes($attributes);
		return $this->save();
	}

	public function update_attribute($name, $value)
	{
		$this->__set($name, $value);
		return $this->update(false);
	}

	public function set_attributes(array $attributes)
	{
		$this->set_attributes_via_mass_assignment($attributes, true);
	}

	private function set_attributes_via_mass_assignment(array &$attributes, $guard_attributes)
	{
		//access uninflected columns since that is what we would have in result set
		$table = static::table();
		$exceptions = array();
		$use_attr_accessible = !empty(static::$attr_accessible);
		$use_attr_protected = !empty(static::$attr_protected);
		$connection = static::connection();

		foreach ($attributes as $name => $value)
		{
			// is a normal field on the table
			if (array_key_exists($name,$table->columns))
			{
				$value = $table->columns[$name]->cast($value,$connection);
				$name = $table->columns[$name]->inflected_name;
			}

			if ($guard_attributes)
			{
				if ($use_attr_accessible && !in_array($name,static::$attr_accessible))
					continue;

				if ($use_attr_protected && in_array($name,static::$attr_protected))
					continue;

				// set valid table data
				try {
					$this->$name = $value;
				} catch (UndefinedPropertyException $e) {
					$exceptions[] = $e->getMessage();
				}
			}
			else
			{
				// ignore OciAdapter's limit() stuff
				if ($name == 'ar_rnum__')
					continue;

				// set arbitrary data
				$this->assign_attribute($name,$value);
			}
		}

		if (!empty($exceptions))
			throw new UndefinedPropertyException(get_called_class(),$exceptions);
	}


	public function set_relationship_from_eager_load(Model $model=null, $name)
	{
		$table = static::table();

		if (($rel = $table->get_relationship($name)))
		{
			if ($rel->is_poly())
			{
				// if the related model is null and it is a poly then we should have an empty array
				if (is_null($model))
					return $this->__relationships[$name] = array();
				else
					return $this->__relationships[$name][] = $model;
			}
			else
				return $this->__relationships[$name] = $model;
		}

		throw new RelationshipException("Relationship named $name has not been declared for class: {$table->class->getName()}");
	}

	public function reload()
	{
		$this->__relationships = array();
		$pk = array_values($this->get_values_for($this->get_primary_key()));

		$this->set_attributes_via_mass_assignment($this->find($pk)->attributes, false);
		$this->reset_dirty();

		return $this;
	}

	public function __clone()
	{
		$this->__relationships = array();
		$this->reset_dirty();
		return $this;
	}

	public function reset_dirty()
	{
		$this->__dirty = null;
	}

	static $VALID_OPTIONS = array('conditions', 'limit', 'offset', 'order', 'select', 'joins', 'include', 'readonly', 'group', 'from', 'having');

	public static function __callStatic($method, $args)
	{
		$options = static::extract_and_validate_options($args);
		$create = false;

		if (substr($method,0,17) == 'find_or_create_by')
		{
			$attributes = substr($method,17);

			// can't take any finders with OR in it when doing a find_or_create_by
			if (strpos($attributes,'_or_') !== false)
				throw new ActiveRecordException("Cannot use OR'd attributes in find_or_create_by");

			$create = true;
			$method = 'find_by' . substr($method,17);
		}

		if (substr($method,0,7) === 'find_by')
		{
			$attributes = substr($method,8);
			$options['conditions'] = SQLBuilder::create_conditions_from_underscored_string(static::connection(),$attributes,$args,static::$alias_attribute);

			if (!($ret = static::find('first',$options)) && $create)
				return static::create(SQLBuilder::create_hash_from_underscored_string($attributes,$args,static::$alias_attribute));

			return $ret;
		}
		elseif (substr($method,0,11) === 'find_all_by')
		{
			$options['conditions'] = SQLBuilder::create_conditions_from_underscored_string(static::connection(),substr($method,12),$args,static::$alias_attribute);
			return static::find('all',$options);
		}
		elseif (substr($method,0,8) === 'count_by')
		{
			$options['conditions'] = SQLBuilder::create_conditions_from_underscored_string(static::connection(),substr($method,9),$args,static::$alias_attribute);
			return static::count($options);
		}

		throw new ActiveRecordException("Call to undefined method: $method");
	}

	public function __call($method, $args)
	{
		//check for build|create_association methods
		if (preg_match('/(build|create)_/', $method))
		{
			if (!empty($args))
				$args = $args[0];

			$association_name = str_replace(array('build_', 'create_'), '', $method);
			$method = str_replace($association_name, 'association', $method);
			$table = static::table();

			if (($association = $table->get_relationship($association_name)) ||
				  ($association = $table->get_relationship(($association_name = Utils::pluralize($association_name)))))
			{
				// access association to ensure that the relationship has been loaded
				// so that we do not double-up on records if we append a newly created
				$this->$association_name;
				return $association->$method($this, $args);
			}
		}

		throw new ActiveRecordException("Call to undefined method: $method");
	}

	/**
	 * Alias for self::find('all').
	 *
	 * @see find
	 * @return array array of records found
	 */
	public static function all(/* ... */)
	{
		return call_user_func_array('static::find',array_merge(array('all'),func_get_args()));
	}

	public static function count(/* ... */)
	{
		$args = func_get_args();
		$options = static::extract_and_validate_options($args);
		$options['select'] = 'COUNT(*)';

		if (!empty($args) && !is_null($args[0]) && !empty($args[0]))
		{
			if (is_hash($args[0]))
				$options['conditions'] = $args[0];
			else
				$options['conditions'] = call_user_func_array('static::pk_conditions',$args);
		}

		$table = static::table();
		$sql = $table->options_to_sql($options);
		$values = $sql->get_where_values();
		return static::connection()->query_and_fetch_one($sql->to_s(),$values);
	}

	public static function exists(/* ... */)
	{
		return call_user_func_array('static::count',func_get_args()) > 0 ? true : false;
	}

	public static function first(/* ... */)
	{
		return call_user_func_array('static::find',array_merge(array('first'),func_get_args()));
	}

	public static function last(/* ... */)
	{
		return call_user_func_array('static::find',array_merge(array('last'),func_get_args()));
	}

	public static function find(/* $type, $options */)
	{
		$class = get_called_class();

		if (func_num_args() <= 0)
			throw new RecordNotFound("Couldn't find $class without an ID");

		$args = func_get_args();
		$options = static::extract_and_validate_options($args);
		$num_args = count($args);
		$single = true;

		if ($num_args > 0 && ($args[0] === 'all' || $args[0] === 'first' || $args[0] === 'last'))
		{
			switch ($args[0])
			{
				case 'all':
					$single = false;
					break;

			 	case 'last':
					if (!array_key_exists('order',$options))
						$options['order'] = join(' DESC, ',static::table()->pk) . ' DESC';
					else
						$options['order'] = SQLBuilder::reverse_order($options['order']);

					// fall thru

			 	case 'first':
			 		$options['limit'] = 1;
			 		$options['offset'] = 0;
			 		break;
			}

			$args = array_slice($args,1);
			$num_args--;
		}
		//find by pk
		elseif (1 === count($args) && 1 == $num_args)
			$args = $args[0];

		// anything left in $args is a find by pk
		if ($num_args > 0 && !isset($options['conditions']))
			return static::find_by_pk($args, $options);

		$options['mapped_names'] = static::$alias_attribute;
		$list = static::table()->find($options);

		return $single ? (!empty($list) ? $list[0] : null) : $list;
	}


	public static function find_by_pk($values, $options)
	{
		$options['conditions'] = static::pk_conditions($values);
		$list = static::table()->find($options);
		$results = count($list);

		if ($results != ($expected = count($values)))
		{
			$class = get_called_class();

			if ($expected == 1)
			{
				if (!is_array($values))
					$values = array($values);

				throw new RecordNotFound("Couldn't find $class with ID=" . join(',',$values));
			}

			$values = join(',',$values);
			throw new RecordNotFound("Couldn't find all $class with IDs ($values) (found $results, but was looking for $expected)");
		}
		return $expected == 1 ? $list[0] : $list;
	}


	public static function find_by_sql($sql, $values=null)
	{
		return static::table()->find_by_sql($sql, $values, true);
	}


	public static function query($sql, $values=null)
	{
		return static::connection()->query($sql, $values);
	}


	public static function is_options_hash($array, $throw=true)
	{
		if (is_hash($array))
		{
			$keys = array_keys($array);
			$diff = array_diff($keys,self::$VALID_OPTIONS);

			if (!empty($diff) && $throw)
				throw new ActiveRecordException("Unknown key(s): " . join(', ',$diff));

			$intersect = array_intersect($keys,self::$VALID_OPTIONS);

			if (!empty($intersect))
				return true;
		}
		return false;
	}


	public static function pk_conditions($args)
	{
		$table = static::table();
		$ret = array($table->pk[0] => $args);
		return $ret;
	}

	public static function extract_and_validate_options(array &$array)
	{
		$options = array();

		if ($array)
		{
			$last = &$array[count($array)-1];

			try
			{
				if (self::is_options_hash($last))
				{
					array_pop($array);
					$options = $last;
				}
			}
			catch (ActiveRecordException $e)
			{
				if (!is_hash($last))
					throw $e;

				$options = array('conditions' => $last);
			}
		}
		return $options;
	}


	public function to_json(array $options=array())
	{
		return $this->serialize('Json', $options);
	}


	public function to_xml(array $options=array())
	{
		return $this->serialize('Xml', $options);
	}


  public function to_csv(array $options=array())
  {
    return $this->serialize('Csv', $options);
  }


	public function to_array(array $options=array())
	{
		return $this->serialize('Array', $options);
	}

	private function serialize($type, $options)
	{
		require_once 'Serialization.php';
		$class = "ActiveRecord\\{$type}Serializer";
		$serializer = new $class($this, $options);
		return $serializer->to_s();
	}

	private function invoke_callback($method_name, $must_exist=true)
	{
		return static::table()->callback->invoke($this,$method_name,$must_exist);
	}

	public static function transaction($closure)
	{
		$connection = static::connection();

		try
		{
			$connection->transaction();

			if ($closure() === false)
			{
				$connection->rollback();
				return false;
			}
			else
				$connection->commit();
		}
		catch (\Exception $e)
		{
			$connection->rollback();
			throw $e;
		}
		return true;
	}
};
?>
