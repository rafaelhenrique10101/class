
$(document).ready(function () {

    //$(document).hover(function () {
    //
    //    $("#id_body").attr("hover", "true");
    //},
    //    function () {
    //
    //        $("#id_body").attr("hover", "false");
    //
    //    });
    //window.onbeforeunload = function () {
    //    var hoverDocument = $("#id_body").attr("hover");
    //    var btnLogoutPressed = $("#id_body").attr("btn-logout-pressed");
    //    var codUsuario = $("#id_box_login").attr("session-user-id");
    //    var result = "";
    //
    //    if (hoverDocument == "false" || btnLogoutPressed == "true")
    //    {
    //        $.ajax({
    //            type: "POST",
    //            url: "updateStatusUser.php"
    //        });
    //    }       
    //}
    // =========================================================================================
    // =============================== BARRA DE BUSCA DO PORTAL ================================
    // =========================================================================================

    var txtBarraPesquisa = $("#id_input_box_search_bar");
    var divDivResultPesquisa = $("#id_dimensao_div_resultado_pesquisa_search_bar");

    $(txtBarraPesquisa).keyup(function (ev) {
        
        var valueTxtBarraPesquisa = $("#id_input_box_search_bar").val();

        if (valueTxtBarraPesquisa.length > 0)
        {                        
            $.ajax({
                url: "/scripts/php/barra_topo.php",
                method: "POST",
                dataType: "text",
                data: {
                    s_termo_pesquisa: valueTxtBarraPesquisa,
                    s_tipo_requisicao: "CARREGAR_LISTA_PESQUISA"
                }, success: function (data) {
                    $(divDivResultPesquisa).html(data);
                    $(divDivResultPesquisa).fadeIn(200);
                }
            });
        }
        else
        {            
            $.ajax({
                url: "/scripts/php/barra_topo.php",
                method: "POST",
                dataType: "text",
                data: {
                    s_termo_pesquisa: valueTxtBarraPesquisa,
                    s_tipo_requisicao: "CARREGAR_LISTA_PESQUISA"
                }, success: function (data) {
                    $(divDivResultPesquisa).html(data);                    
                }
            });
        }
        
        ev.stopPropagation();
    });

    $(txtBarraPesquisa).click(function (e) {
        $(divDivResultPesquisa).fadeIn(200);

        e.stopPropagation();
    });
    $(divDivResultPesquisa).click(function (e) {
    
        e.stopPropagation();
    });

    $(document).click(function (e) {
        $(divDivResultPesquisa).fadeOut(200);
        $(txtBarraPesquisa).val("");
    });

    // =========================================================================================
    // ============================ OBTER DADOS DE GEOLOCALIZAÇÃO ==============================
    // =========================================================================================

    function getLocation()
    {
        var btnDivCadastrarUsuario = $("#id_div_cadastrar_usuario");

        if (btnDivCadastrarUsuario.length > 0)
        {
            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
    }
    
    function showPosition(position)
    {
        var btnDivCadastrarUsuario = $("#id_div_cadastrar_usuario");
        var cooLatitude = position.coords.latitude;
        var cooLongitude = position.coords.longitude;

        $(btnDivCadastrarUsuario).attr("lt", cooLatitude);
        $(btnDivCadastrarUsuario).attr("lg", cooLongitude);

        obterEnderecoGoogle(cooLatitude,cooLongitude);

    }

    // =========================================================================================
    // ======================== BUSCAR ENDEREÇO COM BASE NAS COORDENADAS =======================
    // =========================================================================================

    function obterEnderecoGoogle(cooLatitude, cooLongitude)
    {
        $.getJSON("https://maps.google.com/maps/api/geocode/json?address=" + cooLatitude + "," + cooLongitude + "&sensor=false", function (data) {
            if (data.status == "OK")
            {
                var endereco = data.results[3].address_components[1].long_name;
                var cidade = data.results[3].address_components[3].long_name;
                var bairro = data.results[3].address_components[2].long_name;
                var uf = data.results[3].address_components[5].short_name;
                var cep = data.results[3].address_components[0].short_name;

                $.ajax({
                    url: "/scripts/php/cadastrar_usuario.php",
                    method: "POST",
                    dataType: "text",
                    data: {
                        s_endereco_usuario: endereco,
                        s_cidade_usuario: cidade,
                        s_bairro_usuario: bairro,
                        s_uf_usuario: uf,
                        s_cep_usuario:cep,
                        s_tipo_requisicao: "UPDATE_ENDERECO_USUARIO"
                    }
                });
            }    
        });
    }

    // =========================================================================================
    // ============================ DECLARAÇÃO DE VARIAVEIS GLOBAIS ============================
    // =========================================================================================

    var backgroungTransparent = $("#id_dimensao_backgroud_transparent_modal");        
    var modalAvisos = $("#id_modal_aviso_login_page");
    var modalEsqueciSenha = $("#id_modal_recuperar_senha");
    var barraTopoModalAviso = $("#id_barra_topo_modal_aviso");
    var tituloModalAviso = $("#id_adm_span_txt2_modal_aviso_login_page");
    var txtModalAviso = $("#id_adm_span_txt_modal_aviso_login_page");
    var btnOKModalAviso = $("#id_adm_dimensao_div_btn4_login_page");
    var loading = $("#id_adm_div_dimensao_loading1_login_page");
        
    // =========================================================================================
    // ============================= AÇÕES DO CARRINHO DE COMPRAS ==============================
    // =========================================================================================

    var btnLimparCarrinho = $("#id_btn_limpar_carrinho");
    var btnFinalizarCompra = $("#id_btn_finalizar_compra");
    var totalItensCarrinho = $("#id_total_carrinho_itens");
    var totalDescontosCarrinho = $("#id_total_desconto");
    var totalCarrinho = $("#id_total_carrinho");
    var listaItensAdicionados = $("#id_content_lista_itens_adicionados");
    var msgNotificacao = $("#id_dimensao_div_alerta_modificacoes_left_msg_btn");
    var txtNotificacao = $("#id_lbl_notificacao_bottom");
    var btnFecharNotificacao = $("#btn_fechar_notificacao");

    $(btnFinalizarCompra).click(function () {
        location.href = "/pagamentos";
    });

    $(btnLimparCarrinho).click(function () {
        $(btnFinalizarCompra).attr("numero-itens", "0");
        $(listaItensAdicionados).html("");
        $(listaItensAdicionados).html("<div class='dimensao_div_content25_center_cursos_aluno3'><div class='dimensao_div_content26_center_cursos_aluno3'><span class='span_txt_sem_itens_carrinho'>Sem compras adicionadas</span></div></div>");

        $(totalItensCarrinho).html("0,00");
        $(totalDescontosCarrinho).html("- 0,00");
        $(totalCarrinho).html("0,00");

        limparCarrinhoUsuario();
    });
    $(btnFecharNotificacao).click(function (e) {        
        $(msgNotificacao).fadeOut(200);
    });

    function limparCarrinhoUsuario()
    {
        $.ajax({
            url: "/scripts/php/carrinho.php",
            method: "POST",
            dataType: "text",
            data: {
                s_tipo_requisicao: "LIMPAR_CARRINHO"
            },
            success: function (data) {
                if (data.match(/1001/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Itens excluídos");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Itens excluídos com sucesso!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1004/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro de conexão");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Tivemos um problema na conexão com om banco de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1003/)) {

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao limpar o carrinho");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao limpar o carrinho, tente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    // =========================================================================================
    // ================ BOTÃO MATRICULE-SE COM REDIRECIONAMENTO PARA O CARRINHO ================
    // =========================================================================================

    var btnMatriculeCarrinho = $("#id_btn_adicionar_ao_carrinho");

    $(btnMatriculeCarrinho).click(function (e) {
        var codCurso = $(this).attr("id-curso");

        inserirItemCarrinho("CURSO", codCurso, "", "CURSO");
    });

    function inserirItemCarrinho(tipoItem, codCurso, codPlano, tipoItemCarrinho)
    {        
        $.ajax({
            url: "/scripts/php/carrinho.php",
            method: "POST",
            dataType: "text",
            data: {
                s_cod_curso_carrinho: codCurso,
                s_tipo_item_carrinho: tipoItemCarrinho,
                s_id_plano: codPlano,
                s_tipo_requisicao: "INSERT_ITEM_CARRINHO"
            },
            success: function (data) {
                if (data.match(/1001/)) {                    
                    location.href = "/meu-carrinho";                    
                }
                else if (data.match(/1003/)) {
                    location.href = "/meu-carrinho";
                }
                else if (data.match(/1002/)) {

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao adicionar item");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Ocorreu um problema ao tentar adicionar o item no carrinho, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);


                }
                else if (data.match(/1004/)) {

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao adicionar item");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Identificamos um problema na conexão com a nossa base de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    

    // =========================================================================================
    // ========= CHAMADA DO MODAL DE LOGIN QUANDO CLICAR NO BTN ADICIONAR AO CARRINHO ==========
    // =========================================================================================

    var backgroungTransparent = $("#id_dimensao_backgroud_transparent_modal");    
    var btnMatriculese = $("#id_btn_adicionar_ao_carrinho_deslogado");

    $(backgroungTransparent).click(function () {
        $(backgroungTransparent).fadeOut(200);
        $(modalLogin).fadeOut(200);
        $(modalAvisos).fadeOut(200);
        $(loading).fadeOut(200);
        $(modalEsqueciSenha).fadeOut(200);
    });
    $(btnMatriculese).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalLogin).fadeIn(200);

        e.stopPropagation();

    });

    // =========================================================================================
    // ================================== LOGIN NO SISTEMA =====================================
    // =========================================================================================


    var modalLogin = $("#id_dimensao_frame_login_modal");
    var btnEntrar = $("#id_btn_entrar");
    var btnEntrar2 = $("#id_btn_entrar_sistema");
    var btnCadastrar2 = $("#id_btn_cadastrar_usuario2");
    var btnEsqueciSenha = $("#id_btn_esqueci_senha");
    var btnCancelarEsqueciSenha = $("#id_btn_cancelar_modal_recuperar_senha");
    var btnEnviarEmailEsqueciSenha = $("#id_btn_ok_modal_recuperar_senha");

    $(btnEnviarEmailEsqueciSenha).click(function (ev) {
        var emailUsuario = $("#id_email_recuperar_senha").val();

        if (emailUsuario == "")
        {
            $(modalEsqueciSenha).fadeOut(200);
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Informe o email");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("Informe o seu email para que possamos enviar para ele as informações de recuperação da senha");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }
        else
        {
            recuperarSenha();
        }

        ev.stopPropagation();
    });

    function recuperarSenha()
    {
        var emailUsuario = $("#id_email_recuperar_senha").val();
        $(loading).show();
        $.ajax({
            url: "/scripts/php/autenticar.php",
            method: "POST",
            dataType: "text",
            data: {
                s_email_usuario: emailUsuario,
                s_tipo_requisicao: "RECUPERAR_SENHA"
            },
            success: function (data) {
                if (data.match(/1002/)) {
                    $(modalEsqueciSenha).fadeOut(200);
                    $(backgroungTransparent).fadeOut(200);
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(76, 175, 80)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Email enviado");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Acabamos de enviar para você um email com uma senha temporária, lembre de alterar essa senha, ela tem validade de apenas 2 horas!.");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                if (data.match(/1004/)) {
                    $(modalEsqueciSenha).fadeOut(200);
                    $(backgroungTransparent).fadeOut(200);
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro de conexão");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Tivemos um problema na conexão com om banco de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                if (data.match(/1003/)) {

                    $(modalEsqueciSenha).fadeOut(200);
                    $(backgroungTransparent).fadeOut(200);
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Conta não ativada");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Esta conta ainda não foi ativada, realize a ativação dela para que seu acesso seja liberado!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);

                }
                if (data.match(/1005/)) {
                    $(modalEsqueciSenha).fadeOut(200);
                    $(backgroungTransparent).fadeOut(200);
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao recuperar senha");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Não conseguimos recuperar sua senha, tente novamente mais tarde, este problema já estará resolvido!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                if (data.match(/1001/)) {
                    $(modalEsqueciSenha).fadeOut(200);
                    $(backgroungTransparent).fadeOut(200);
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Conta não localizada");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("A conta informada não foi localizada, informe o mesmo email utilizado para acessar o portal!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    $(btnEsqueciSenha).click(function (ev) {
        $(modalLogin).fadeOut(200);
        $(modalEsqueciSenha).fadeIn(200);

        ev.stopPropagation();
    });

    $(btnCancelarEsqueciSenha).click(function (ev) {
        $(modalEsqueciSenha).fadeOut(200);
        $(modalLogin).fadeIn(200);

        ev.stopPropagation();
    });

    $(modalLogin).click(function (e) {
        e.stopPropagation();
    });
    $(backgroungTransparent).click(function () {
        $(backgroungTransparent).fadeOut(200);
        $(modalLogin).fadeOut(200);
        
    });
    $(btnEntrar).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalLogin).fadeIn(200);

        e.stopPropagation();
    });
    $(btnCadastrar2).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalLogin).hide();
        $(modalCadastrar).fadeIn(200);

        e.stopPropagation();
    });

    $(btnOKModalAviso).click(function (e) {
        if ($("#id_adm_span_txt2_modal_aviso_login_page").html() == "Informe o email")
        {
            $(modalAvisos).fadeOut(200);
            $(modalEsqueciSenha).fadeIn(200);
        }
        else
        {
            $(modalAvisos).fadeOut(200);
        }
        

        e.stopPropagation();
    });

    

    // AUTENTICAR USUARIO

    $(btnEntrar2).click(function (e) {

        var emailUsuario = $("#id_email_login").val();
        var senhaUsuario = $("#id_password_login").val();                

        // VALIDANDO DADOS EM BRANCO
        if (emailUsuario == "" || senhaUsuario == "")
        {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)");
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Informe todos os dados");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("Informe os dados de usuário e senha para que possamos realizar a autenticação e permitir o acesso ao sistema.");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);

        }
            
        else if ((emailUsuario.match(/@/) && emailUsuario.match(/.com.br/)) || ((emailUsuario.match(/@/) && emailUsuario.match(/.com/))))
        {
            $(loading).fadeIn(200);
            autenticarUsuario(emailUsuario, senhaUsuario);
            e.stopPropagation();            
        }
        else
        {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Email inválido");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("O Email informado é inválido, verifique!");
            $(modalAvisos).fadeIn(200);
        }            
    });

    function autenticarUsuario(emailUsuario, senhaUsuario) {
        $.ajax({
            url: "/scripts/php/autenticar.php",
            method: "POST",
            dataType: "text",
            data: {
                s_email_usuario: emailUsuario,
                s_senha_usuario: senhaUsuario,                
                s_tipo_requisicao: "LOGIN"
            },
            success: function (data) {
                if (data.match(/1001/)) {
                    var currentURL = $(location).attr("href");
                    if (currentURL.match(/act/))
                    {
                        location.href = "./";
                        $(loading).hide();
                    }
                    else
                    {
                        location.href = currentURL;
                        $(loading).hide();
                    }                    
                }
                else if (data.match(/1002/)) {                    
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Conta não localizada");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Não foi localizado nenhuma conta com os dados informados, verifique!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1004/)) {                    
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Perfil inválido");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("O Perfil do usuário que você está tentando entrar não é válido!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1005/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(62,78,184)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Ative sua conta");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("É necessário que a sua conta seja ativada, verifique o seu email e localize a mensagem enviada pelo portal Enoove!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1003/)) {                    
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Sessão já ativa");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("OPS!!! Identificamos que já existe uma sessão ativa para este usuário, só é permitida uma sessão ativa para cada usuário do sistema, lembre-se de nunca compartilhar seus dados de acesso ao portal Enoove!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1006/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Usuário desativado");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("A conta que você está tentando acessar foi desativada!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1099/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Não conseguimos...");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Infelizmente não conseguimos realizar a autenticação da sua conta, tente novamente mais tarde, já estamos resolvendo este problema!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    // =========================================================================================
    // ================================== CADASTRO NO SISTEMA ==================================
    // =========================================================================================


    var modalCadastrar = $("#id_dimensao_frame_cadastrar_modal");
    var btnCadastrar = $("#id_btn_cadastrar");
    var btnEntrar3 = $("#id_btn_entrar3")
    var btnCadastrarUsuario = $("#id_btn_cadastrar_usuario");
    //var btnModalLogin = $("#id_btn_entrar_sistema");

    $(modalCadastrar).click(function (e) {
        e.stopPropagation();
    });
    $(backgroungTransparent).click(function () {
        $(backgroungTransparent).fadeOut(200);
        $(modalCadastrar).fadeOut(200);

    });
    $(btnCadastrar).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalCadastrar).fadeIn(200);

        e.stopPropagation();

    });

    $(btnEntrar3).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalCadastrar).hide();
        $(modalLogin).fadeIn(200);

        e.stopPropagation();

    });

    $(btnOKModalAviso).click(function (e) {
        $(modalAvisos).fadeOut(200);

        e.stopPropagation();

    });



    // CADASTRAR USUARIO

    $(btnCadastrarUsuario).click(function (e) {

        var nomeUsuario = $("#id_nome_completo_cadastro").val();
        var emailUsuario = $("#id_email_cadastro").val();
        var senhaUsuario = $("#id_password_cadastro").val();
        var tipoRequisicao = "CADASTRAR_USUARIO";

        // VALIDANDO DADOS EM BRANCO
        if (nomeUsuario == "" || emailUsuario == "" || senhaUsuario == "") {
                    
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)");
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Informe todos os dados");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("Informe todos os dados para que possamos realizar o seu cadastro no sistema!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }
        else if ((nomeUsuario.length < 13) || (nomeUsuario.match(/!/) || nomeUsuario.match(/@/) || nomeUsuario.match(/#/)))
        {
            if (nomeUsuario.match(/!/) || nomeUsuario.match(/@/) || nomeUsuario.match(/#/))
            {                
                $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                $(tituloModalAviso).html("");
                $(tituloModalAviso).html("Nome inválido");

                $(txtModalAviso).html("");
                $(txtModalAviso).html("O Nome informado é inválido, verifique!");
                $(modalAvisos).fadeIn(200);
            }
            else
            {
                $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                $(tituloModalAviso).html("");
                $(tituloModalAviso).html("Nome curto");

                $(txtModalAviso).html("");
                $(txtModalAviso).html("O seu nome deve ter ao menos 12 caracteres, verifique!");
                $(modalAvisos).fadeIn(200);
            }            
        }
        else
        {
            if((emailUsuario.match(/@/) && emailUsuario.match(/.com.br/)) || ((emailUsuario.match(/@/) && emailUsuario.match(/.com/))))
            {
                if(senhaUsuario.length > 7)
                {
                    $(loading).fadeIn(200);
                    cadastrarUsuario(nomeUsuario, emailUsuario, senhaUsuario);
                    getLocation();
                    e.stopPropagation();
                }
                else
                {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Senha curta");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("A sua senha deve ter ao menos 8 caracteres, verifique!");
                    $(modalAvisos).fadeIn(200);
                }
            }
            else
            {
                $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(195, 58, 47)");
                $(tituloModalAviso).html("");
                $(tituloModalAviso).html("Email inválido");

                $(txtModalAviso).html("");
                $(txtModalAviso).html("O Email informado é inválido, verifique!");
                $(modalAvisos).fadeIn(200);
            }
        }
    });

    function cadastrarUsuario(nomeUsuario, emailUsuario, senhaUsuario) {
        $.ajax({
            url: "/scripts/php/cadastrar_usuario.php",
            method: "POST",
            dataType: "text",
            data: {
                s_nome_usuario: nomeUsuario,
                s_email_usuario: emailUsuario,
                s_senha_usuario: senhaUsuario,
                s_tipo_requisicao: "CADASTRAR_USUARIO"
            },
            success: function (data) {
                if (data.match(/1001/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalCadastrar).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(76, 175, 80)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Cadastro realizado");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Cadastro realizado com sucesso, realize a ativação de sua conta clicando no link de ativação que enviamos para seu email.");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1005/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalCadastrar).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Ocorreu um erro");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Não foi possível realizar o cadastro de sua conta, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1002/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalCadastrar).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(255, 152, 0)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Ative sua conta");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Este usuário já está cadastrado em nosso sistema, mas é necessário ativar essa conta para ter acesso ao portal Enoove, acesse o seu email e localize a mensagem que enviamos para você, ative sua conta e acesse o portal");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1003/)) {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(255, 152, 0)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Usuário já cadastrado");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Este usuário já está cadastrado no portal!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1004/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalCadastrar).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro de conexão");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao tentar se conectar a base de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1087/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalCadastrar).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao cadastrar");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao tentar cadastrar seu usuário no sistema, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }


    // =========================================================================================
    // ================================= ALTERAR DADOS CADASTRAIS ==============================
    // =========================================================================================


    var modalAlterarDadosCadastrais = $("#id_dimensao_frame_alterar_dados_cadastrais_modal");
    var btnEditarDadosCadastrais = $("#id_btn_editar_dados_cadastrais");
    var btnSalvarDadosCadastrais = $("#id_btn_salvar_dados_cadastrais");

    $(modalAlterarDadosCadastrais).click(function (e) {
        e.stopPropagation();
    });
    $(backgroungTransparent).click(function () {
        $(backgroungTransparent).fadeOut(200);
        $(modalAlterarDadosCadastrais).fadeOut(200);

    });
    $(btnEditarDadosCadastrais).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalAlterarDadosCadastrais).fadeIn(200);

        e.stopPropagation();

    });

    $(btnOKModalAviso).click(function (e) {
        $(modalAvisos).fadeOut(200);        
        e.stopPropagation();

    });

    $(btnSalvarDadosCadastrais).click(function (e) {

        var telefoneUsuario = $("#id_telefone_cadastro").val();
        var cepUsuario1 = $("#id_cep_cadastro").val();
        var cepUsuario = cepUsuario1.replace("-", "");

        var cpfUsuario = $("#id_cpf").val();
        var aniversarioUsuario3 = $("#id_data_aniversario").val();
        var aniversarioUsuario2 = aniversarioUsuario3.replace("/", "");
        var aniversarioUsuario = aniversarioUsuario2.replace("/", "");

        var errosModal = "";
        var rua = "";
        var cidade = "";
        var uf = "";
        var bairro = "";

        $(loading).fadeIn(200);

        if (telefoneUsuario == "" && cepUsuario == "" && cpfUsuario == "" && aniversarioUsuario == "")
        {
            errosModal = "EMPTY_FIELDS";
            validarRetornoCampos(errosModal, telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);
        }
        else
        {
            if (cpfUsuario != "")
            {
                if (!TestaCPF(cpfUsuario))
                {
                    errosModal = "INVALID_CPF";
                }
                
            }
            if (cepUsuario != "")
            {

                $.getJSON("//viacep.com.br/ws/" + cepUsuario + "/json/?callback=?", function (data)
                {
                    if (!("erro" in data)) 
                    {
                        $("#id_hidden_rua_cep").val(data.logradouro);
                        $("#id_hidden_cidade_cep").val(data.localidade);
                        $("#id_hidden_uf_cep").val(data.uf);
                        $("#id_hidden_bairro_cep").val(data.bairro);

                        rua = $("#id_hidden_rua_cep").val();
                        cidade = $("#id_hidden_cidade_cep").val();
                        uf = $("#id_hidden_uf_cep").val();
                        bairro = $("#id_hidden_bairro_cep").val();
                        
                        validarRetornoCampos(errosModal, telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);
                        e.stopPropagation();
                    } 
                    else
                    {
                        if (errosModal != "")
                        {
                            errosModal = "CPFCEP_INVALID";
                        }
                        else
                        {
                            errosModal = "INVALID_CEP";
                        }
                        
                        validarRetornoCampos(errosModal, telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);
                    }
                });
            }
            else
            {
                validarRetornoCampos(errosModal, telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);

                if ((telefoneUsuario != "" || aniversarioUsuario != "") && errosModal == "")
                {
                    salvarDadosCadastrais(telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);
                }
            }
            
        }
        
    });

    function validarRetornoCampos(errosModal, telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro)
    {
        if (errosModal == "EMPTY_FIELDS") {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Informe ao menos um campo");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("Informe ao menos um campo para realizar a atualização dos dados, caso não deseje alterar nenhuma informação basta clicar fora janela, verifique!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }

        if (errosModal.match(/INVALID_CPF/)) {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("CPF Inválido");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("O CPF informado é inválido, verifique!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }

        if (errosModal.match(/INVALID_CEP/)) {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("CEP Inválido");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("O CEP informado é inválido, verifique!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }

        if (errosModal.match(/CPFCEP_INVALID/)) {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("CPF e CEP inválidos");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("O CPF e o CEP informados não são válidos, verifique!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }
        if (errosModal == "") {
            salvarDadosCadastrais(telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro);
        }
    }

    function limparCamposDadosCadastrais()
    {        
        $("#id_hidden_rua_cep").val("");
        $("#id_hidden_cidade_cep").val("");
        $("#id_hidden_uf_cep").val("");
    }

    function TestaCPF(strCPF)
    {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    function salvarDadosCadastrais(telefoneUsuario, cepUsuario, cpfUsuario, aniversarioUsuario, rua, cidade, uf, bairro) {
        $.ajax({
            url: "/scripts/php/meu_cadastro.php",
            method: "POST",
            dataType: "text",
            data: {
                s_telefone_usuario: telefoneUsuario,
                s_cep_usuario: cepUsuario,
                s_cpf_usuario: cpfUsuario,
                s_aniversario_usuario: aniversarioUsuario,
                s_rua_usuario: rua,
                s_cidade_usuario: cidade,
                s_uf_usuario: uf,
                s_bairro_usuario: bairro,
                s_tipo_requisicao: "UPDATE_DADOS_CADASTRAIS"
            },
            success: function (data) {
                if (data.match(/1001/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosCadastrais).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(76, 175, 80)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Sucesso");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Dados salvos com sucesso!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                    limparCamposDadosCadastrais();
                    carregarDadosCadastrais();
                    
                }
                else if (data.match(/1002/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosCadastrais).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Ocorreu um erro");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Não foi possível realizar o cadastro de sua conta, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1004/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosCadastrais).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro de conexão");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao tentar se conectar a base de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    function carregarDadosCadastrais() {

        var divDadosCadastrais = $("#id_container_dados_cadastrais");

        $.ajax({
            url: "/scripts/php/meu_cadastro.php",
            method: "POST",
            dataType: "text",
            data: {
                s_tipo_requisicao: "CARREGAR_DADOS_CADASRAIS"
            },
            success: function (data) {
                if (data != "") {
                    $(divDadosCadastrais).html(data);
                }
            }
        });
    }

    // =========================================================================================
    // ================================= ALTERAR DADOS DE ACESSO ===============================
    // =========================================================================================


    var modalAlterarDadosAcesso = $("#id_dimensao_frame_alterar_dados_acesso_modal");
    var btnEditarDadosAcesso = $("#id_btn_editar_dados_acesso");
    var btnSalvarDadosAcesso = $("#id_btn_salvar_dados_acesso");

    $(modalAlterarDadosAcesso).click(function (e) {
        e.stopPropagation();
    });
    $(backgroungTransparent).click(function () {
        $(backgroungTransparent).fadeOut(200);
        $(modalAlterarDadosAcesso).fadeOut(200);

    });
    $(btnEditarDadosAcesso).click(function (e) {
        $(backgroungTransparent).fadeIn(200);
        $(modalAlterarDadosAcesso).fadeIn(200);

        e.stopPropagation();

    });

    $(btnOKModalAviso).click(function (e) {
        $(modalAvisos).fadeOut(200);
        e.stopPropagation();

    });

    $(btnSalvarDadosAcesso).click(function (e) {

        var senhaAtualUsuario = $("#id_senha_usuario").val();
        var novaSenha = $("#id_nova_senha_usuario").val();
        var novaSenha2 = $("#id_nova_senha2_usuario").val();        

        if (senhaAtualUsuario == "" || novaSenha == "" || novaSenha2 == "")
        {
            $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
            $(tituloModalAviso).html("");
            $(tituloModalAviso).html("Preencha todos os campos");

            $(txtModalAviso).html("");
            $(txtModalAviso).html("Preencha todos os campos antes de alterar sua senha, verifique!");
            $(loading).hide();
            $(modalAvisos).fadeIn(200);
        }
        else
        {
            if (novaSenha != novaSenha2)
            {
                $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                $(tituloModalAviso).html("");
                $(tituloModalAviso).html("Senha não confere");

                $(txtModalAviso).html("");
                $(txtModalAviso).html("A senha que você informou no campo 'Nova senha' é diferente da informada no campo 'Repetir nova senha', verifique!");
                $(loading).hide();
                $(modalAvisos).fadeIn(200);                                
            }
            else
            {
                if (novaSenha.length < 8)
                {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Senha curta");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Informe uma senha com no mínimo 8 caracteres, verifique!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else
                {
                    $(loading).fadeIn(200);
                    salvarDadosAcesso(novaSenha);
                    e.stopPropagation();
                }
                
            }
        }                
    });

    function limparCamposDadosAcesso() {
        $("#id_senha_usuario").val("");
        $("#id_nova_senha_usuario").val("");
        $("#id_nova_senha2_usuario").val("");
    }

    function salvarDadosAcesso(senhaUsuario) {
        $.ajax({
            url: "/scripts/php/meu_cadastro.php",
            method: "POST",
            dataType: "text",
            data: {
                s_senha_usuario: senhaUsuario,
                s_tipo_requisicao: "UPDATE_DADOS_ACESSO"
            },
            success: function (data) {
                if (data.match(/1001/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosAcesso).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(76, 175, 80)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Sucesso");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Senha alterada com sucesso, enviamos um email para que você tenha controle das alterações das informações de acesso!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                    limparCamposDadosAcesso();
                }
                else if (data.match(/1002/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosAcesso).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Ocorreu um erro");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Não foi possível realizar a alteração da sua senha de acesso, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
                else if (data.match(/1004/)) {
                    $(backgroungTransparent).fadeOut(200);
                    $(modalAlterarDadosAcesso).fadeOut(200);

                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro de conexão");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao tentar se conectar a base de dados, tente novamente mais tarde!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    // =========================================================================================
    // ================================== LOGOUT NO SISTEMA ====================================
    // =========================================================================================

    var btnSairSistema = $("#id_btn_logout");
    var btnUsuario = $("#id_dimensao_div_img_nome_usuario_logado");
    var btnUsuario2 = $("#id_dimensao_div_img_nome_usuario_logado2");
    var boxOpcoesUsuario = $("#id_dimensao_menu_float_logout_usuario");    

    $(btnUsuario).click(function (e) {
        $(boxOpcoesUsuario).fadeIn(200);
        $(frameAreaAluno).fadeOut(200);
        $(frameCarrinho).fadeOut(200);
        $(frameNotificacoes).fadeOut(200);
        e.stopPropagation();
    });
    $(btnUsuario2).click(function (e) {
        $(boxOpcoesUsuario).fadeIn(200);
        $(frameAreaAluno).fadeOut(200);        
        e.stopPropagation();
    });

    $(boxOpcoesUsuario).click(function (e) {       
        e.stopPropagation();
    });

    $(document).click(function (e) {
        $(boxOpcoesUsuario).fadeOut(200);
        e.stopPropagation();
    });

    $(btnSairSistema).click(function (e) {
        var tipoRequisicao = "LOGOUT";
        var btnLogoutPressed = $("#id_body").attr("btn-logout-pressed", "true");
        logoutSistema(tipoRequisicao);
        e.stopPropagation();
    });

    function logoutSistema(tipoRequisicao) {
        $.ajax({
            url: "/scripts/php/autenticar.php",
            method: "POST",
            dataType: "text",
            data: {                
                s_tipo_requisicao: tipoRequisicao
            },
            success: function (data) {
                if (data.match(/1011/))
                {
                    //var currentURL = $(location).attr("href");
                    location.href = "/";
                }
                if (data.match(/1012/))
                {
                    $(barraTopoModalAviso).css("border-bottom", "solid 4px rgb(244, 67, 54)")
                    $(tituloModalAviso).html("");
                    $(tituloModalAviso).html("Erro ao sair");

                    $(txtModalAviso).html("");
                    $(txtModalAviso).html("Houve um problema ao tentar sair do sistema, como alternativa tene fechar o navegador e você sairá com sucesso do sistema!");
                    $(loading).hide();
                    $(modalAvisos).fadeIn(200);
                }
            }
        });
    }

    // RECUPERAR IMAGEM E NOME DO USUARIO AO DIGIRAR O EMAIL NO MODAL DE LOGIN

    var txtEmailUsuario = $("#id_email");
    var divImgUsuario = $("#id_adm_div_content3_frame_login_login_page");


    $(txtEmailUsuario).keyup(function (ev) {

        var txt = $(txtEmailUsuario).val();


        if (txt.match(/enoove.com.br/)) {
            var tipoRequisicao = "SELECT_IMAGEM_USUARIO";

            $.ajax({
                url: "/scripts/php/usuarios.php",
                method: "POST",
                dataType: "text",
                data: {
                    s_email_usuario: txt,
                    s_tipo_requisicao: tipoRequisicao
                },
                success: function (data) {
                    if (data != "") {
                        $(divImgUsuario).html("");
                        $(divImgUsuario).html(data);
                    }
                }
            });
        }
        else {
            $(divImgUsuario).html("");
            $(divImgUsuario).html("<div class='adm_div_content_frame_login_login_page'><div class='adm_div_bola_img_usuario_login_login_page2'><img src='images/icons/material/ic_person_black_36dp_2.png' class='adm_img_login_usuario1' id='id_img_login_usuario' /></div></div><div class='adm_div_content_frame_login_nome_usuario_login_page'><div class='adm_div_content2_frame_login_nome_usuario_login_page'><span class='adm_span_txt_nome_usuario_login' id='id_nome_usuario2'></span></div></div>");
        }

    });

    // =========================================================================================
    // =========================== AÇÕES DO USUÁRIO DA BARRA TOPO  =============================
    // =========================================================================================

    var btnAreaAluno = $("#id_dimensao_div_tool_1_usuario_logado");
    var frameAreaAluno = $("#id_dimensao_menu_float_area_aluno_usuario_logado");
    var btnCarrinho = $("#id_dimensao_div_tool_2_usuario_logado");
    var frameCarrinho = $("#id_dimensao_menu_float_pedidos_usuario_logado");
    var btnNotificacoes = $("#id_dimensao_div_tool_notificacoes_usuario_logado");
    var frameNotificacoes = $("#id_dimensao_menu_float_notificacoes_usuario_logado");

    $(btnAreaAluno).click(function (ev) {
        $(frameAreaAluno).fadeIn(200);
        $(frameCarrinho).fadeOut(200);
        $(frameNotificacoes).fadeOut(200);
        $(boxOpcoesUsuario).fadeOut(200);

        ev.stopPropagation();
    });

    $(btnCarrinho).click(function (ev) {
        $(frameCarrinho).fadeIn(200);
        $(frameAreaAluno).fadeOut(200);
        $(frameNotificacoes).fadeOut(200);
        $(boxOpcoesUsuario).fadeOut(200);

        ev.stopPropagation();
    });

    $(btnNotificacoes).click(function (ev) {
        $(frameNotificacoes).fadeIn(200);
        $(frameAreaAluno).fadeOut(200);
        $(frameCarrinho).fadeOut(200);
        $(boxOpcoesUsuario).fadeOut(200);

        ev.stopPropagation();
    });

    $(document).click(function () {
        $(frameAreaAluno).fadeOut(200);
        $(frameCarrinho).fadeOut(200);
        $(frameNotificacoes).fadeOut(200);
        $(boxOpcoesUsuario).fadeOut(200);
    })
    

    // =========================================================================================
    // ===================== MENU DE NAVEGAÇÃO LATERAL DA SALA DE AULA =========================
    // =========================================================================================

    var btnDetalheCurso = $("#id_btn_detalhes_curso");
    var btnAulasCurso = $("#id_btn_aulas_curso");
    var btnMaterialComplementarCurso = $("#id_btn_material_complementar_curso");


    var containerSectionSalaAula = ("#id_section_content_center");

    var sectionDetalheCurso = $("#id_section_detalhe_curso_aluno");
    var sectionAulasCurso = $("#id_section_aulas_curso_aluno");
    var sectionmaterialComplementarCurso = $("#id_section_material_complementar_curso_aluno");

    $(btnDetalheCurso).click(function () {
        
        $(btnAulasCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnMaterialComplementarCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnDetalheCurso).addClass("active_dimensao_item_menu_main_left");

        $(sectionmaterialComplementarCurso).hide();
        $(sectionAulasCurso).hide();
        $(sectionDetalheCurso).fadeIn(200);
    });

    $(btnAulasCurso).click(function () {

        $(btnDetalheCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnMaterialComplementarCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnAulasCurso).addClass("active_dimensao_item_menu_main_left");


        $(sectionmaterialComplementarCurso).hide();
        $(sectionDetalheCurso).hide();
        $(sectionAulasCurso).fadeIn(200);
    });

    $(btnMaterialComplementarCurso).click(function () {

        $(btnDetalheCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnAulasCurso).removeClass("active_dimensao_item_menu_main_left");
        $(btnMaterialComplementarCurso).addClass("active_dimensao_item_menu_main_left");

        $(sectionDetalheCurso).hide();
        $(sectionAulasCurso).hide();
        $(sectionmaterialComplementarCurso).fadeIn(200);
    });


    // =========================================================================================
    // =========== MENU DE NAVEGAÇÃO DE ABAS DA LISTA DE ATIVIDADES RECENTES ===================
    // =========================================================================================

    var btnAbaAcessoConteudo = $("#id_btn_acesso_conteudo");
    var btnAbaOutrasAtividades = $("#id_btn_outras_atividades");    

    var divAcessoConteudo = $("#id_content_lista_acesso_conteudo");
    var divOutrasAtividades = $("#id_content_lista_outras_atividades");

    //active_border_abas_lista_videos_curso

    $(btnAbaAcessoConteudo).click(function () {
        $(divOutrasAtividades).hide();

        $(btnAbaAcessoConteudo).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaOutrasAtividades).removeClass("active_border_abas_lista_videos_curso");

        $(divAcessoConteudo).fadeIn(200);
    });

    $(btnAbaOutrasAtividades).click(function () {
        $(divAcessoConteudo).hide();

        $(btnAbaOutrasAtividades).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaAcessoConteudo).removeClass("active_border_abas_lista_videos_curso");

        $(divOutrasAtividades).fadeIn(200);
    });

    // =========================================================================================
    // ============= MENU DE NAVEGAÇÃO DE ABAS DOS ITENS DO CARRINHO DE COMPRAS ================
    // =========================================================================================

    var btnAbaItensAdicionados = $("#id_btn_itens_adicionados");
    var btnAbaComprasFinalizadas = $("#id_btn_compras_finalizadas");

    var divListaItensAdicionados = $("#id_content_lista_itens_adicionados");
    var divListaComprasFinalizadas = $("#id_content_lista_compras_finalizadas");

    //active_border_abas_lista_videos_curso

    $(btnAbaItensAdicionados).click(function () {
        $(divListaComprasFinalizadas).hide();

        $(btnAbaItensAdicionados).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaComprasFinalizadas).removeClass("active_border_abas_lista_videos_curso");

        $(divListaItensAdicionados).fadeIn(200);
    });

    $(btnAbaComprasFinalizadas).click(function () {
        $(divListaItensAdicionados).hide();

        $(btnAbaComprasFinalizadas).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaItensAdicionados).removeClass("active_border_abas_lista_videos_curso");

        $(divListaComprasFinalizadas).fadeIn(200);
    });

    // =========================================================================================
    // ================== MENU DE NAVEGAÇÃO DE ABAS DA LISTA DE VIDEOS =========================
    // =========================================================================================

    var btnAbaTodosVideos = $("#id_btn_todos_videos");
    var btnAbaVideosEmAndamento = $("#id_btn_videos_andamento");
    var btnAbaVideosConcluidos = $("#id_btn_videos_concluidos");

    var divTodosVideos = $("#id_content_lista_videos_curso_todos");
    var divVideosEmAndamento = $("#id_content_lista_videos_curso_em_andamento");
    var divVideosConcluidos = $("#id_content_lista_videos_curso_concluidos");    

    $(btnAbaTodosVideos).click(function () {
        $(divVideosEmAndamento).hide();
        $(divVideosConcluidos).hide();

        $(btnAbaTodosVideos).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaVideosEmAndamento).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaVideosConcluidos).removeClass("active_border_abas_lista_videos_curso");

        $(divTodosVideos).fadeIn(200);
    });

    $(btnAbaVideosEmAndamento).click(function () {
        $(divTodosVideos).hide();
        $(divVideosConcluidos).hide();

        $(btnAbaVideosEmAndamento).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaTodosVideos).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaVideosConcluidos).removeClass("active_border_abas_lista_videos_curso");

        $(divVideosEmAndamento).fadeIn(200);
    });

    $(btnAbaVideosConcluidos).click(function () {
        $(divTodosVideos).hide();
        $(divVideosEmAndamento).hide();

        $(btnAbaVideosConcluidos).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaTodosVideos).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaVideosEmAndamento).removeClass("active_border_abas_lista_videos_curso");

        $(divVideosConcluidos).fadeIn(200);
    });


    // =========================================================================================
    // ============= MENU DE NAVEGAÇÃO DE ABAS DA LISTA DE MATERIAL COMPLEMENTAR ===============
    // =========================================================================================

    var btnAbaApostilas = $("#id_btn_apostilas_curso");
    var btnAbaLinksExternos = $("#id_btn_links_externos_curso");
    var btnAbaNotasComentarios = $("#id_btn_notas_comentarios_curso");

    var divApostilas = $("#id_content_lista_apostilas_curso");
    var divLinksExternos = $("#id_content_lista_links_externos");
    var divNotasComentarios = $("#id_content_lista_notas_comentarios");    

    $(btnAbaApostilas).click(function () {
        $(divLinksExternos).hide();
        $(divNotasComentarios).hide();

        $(btnAbaApostilas).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaLinksExternos).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaNotasComentarios).removeClass("active_border_abas_lista_videos_curso");

        $(divApostilas).fadeIn(200);
    });

    $(btnAbaLinksExternos).click(function () {
        $(divNotasComentarios).hide();
        $(divApostilas).hide();

        $(btnAbaLinksExternos).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaApostilas).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaNotasComentarios).removeClass("active_border_abas_lista_videos_curso");

        $(divLinksExternos).fadeIn(200);
    });

    $(btnAbaNotasComentarios).click(function () {
        $(divApostilas).hide();
        $(divLinksExternos).hide();

        $(btnAbaNotasComentarios).addClass("active_border_abas_lista_videos_curso");
        $(btnAbaApostilas).removeClass("active_border_abas_lista_videos_curso");
        $(btnAbaLinksExternos).removeClass("active_border_abas_lista_videos_curso");

        $(divNotasComentarios).fadeIn(200);
    });

    // =========================================================================================
    // ============ DETALHES DO CURSO - CONTEUDO, CARGA HORARIA, DOCENTE E CERTIFICADO =========
    // =========================================================================================

    var btnAbaConteudoProgramatico = $("#id_btn_aba_conteudo");
    var btnAbaCargaHoraria = $("#id_btn_aba_carga_horaria");
    var btnAbaDocente = $("#id_btn_aba_docente");
    var btnAbaCertificado = $("#id_btn_aba_certificado");
    var divConteudoProgramatico = $("#id_dimensao_conteudo_programatico_tabs_curso");
    var divCargaHoraria = $("#id_dimensao_conteudo_carga_horaria_tabs_curso");
    var divDocente = $("#id_dimensao_conteudo_docente_tabs_curso");
    var divCertificado = $("#id_dimensao_conteudo_certificado_tabs_curso");    

    $(btnAbaConteudoProgramatico).click(function (e) {
        $(divCertificado).hide();
        $(divDocente).hide();
        $(divCargaHoraria).hide();
        $(divConteudoProgramatico).fadeIn(200);
        $(btnAbaCargaHoraria).removeClass("tab_active_conteudo_cursos");
        $(btnAbaDocente).removeClass("tab_active_conteudo_cursos");
        $(btnAbaCertificado).removeClass("tab_active_conteudo_cursos");
        $(btnAbaConteudoProgramatico).addClass("tab_active_conteudo_cursos");
    });

    $(btnAbaCargaHoraria).click(function (e) {
        $(divCertificado).hide();
        $(divDocente).hide();
        $(divConteudoProgramatico).hide();
        $(divCargaHoraria).fadeIn(200);
        $(btnAbaConteudoProgramatico).removeClass("tab_active_conteudo_cursos");
        $(btnAbaDocente).removeClass("tab_active_conteudo_cursos");
        $(btnAbaCertificado).removeClass("tab_active_conteudo_cursos");

        $(btnAbaCargaHoraria).addClass("tab_active_conteudo_cursos");
        
    });

    $(btnAbaDocente).click(function (e) {
        $(divCertificado).hide();        
        $(divCargaHoraria).hide();
        $(divConteudoProgramatico).hide();
        $(divDocente).fadeIn(200);
        $(btnAbaConteudoProgramatico).removeClass("tab_active_conteudo_cursos");
        $(btnAbaCargaHoraria).removeClass("tab_active_conteudo_cursos");
        $(btnAbaCertificado).removeClass("tab_active_conteudo_cursos");

        $(btnAbaDocente).addClass("tab_active_conteudo_cursos");
    });

    $(btnAbaCertificado).click(function (e) {
        $(divConteudoProgramatico).hide();
        $(divDocente).hide();
        $(divCargaHoraria).hide();
        $(divCertificado).fadeIn(200);
        $(btnAbaConteudoProgramatico).removeClass("tab_active_conteudo_cursos");
        $(btnAbaCargaHoraria).removeClass("tab_active_conteudo_cursos");
        $(btnAbaDocente).removeClass("tab_active_conteudo_cursos");

        $(btnAbaCertificado).addClass("tab_active_conteudo_cursos");
        
    });

    // =========================================================================================
    // ========================= AÇÕES DO APLICADAS AO PLAYER DE VIDEO =========================
    // =========================================================================================

    //var iContentBody1 = $("iframe").contents().find("html").html();
    //var iContentBody2 = $(iContentBody1).contents();
    //var iContentBody3 = $(iContentBody2).contents().find("iframe");
    //var iContentBody4 = $(iContentBody3).find("body.div");    
    //
    //var toolTipPlayer = "";
    


    // =========================================================================================
    // ============================= AÇÕES DO VISUALIZADOR DE VIDEOS ===========================
    // =========================================================================================

    // NAVEGAÇÃO ENTRE OS MÓDULOS ATRAVÉS DOS BOTÕES AVANÇAR E VOLTAR

    var btnsVoltarAvancarModulos = $("#id_btn_avancar_voltar_modulos_playlist_videos");
    var btnVoltarModulo = $("#id_btn_voltar_modulo");
    var btnAvancarModulo = $("#id_btn_avancar_modulo");
    var containerListaModulos = $("#id_lista_modulos");
    var tituloModulo = $("#id_titulo_modulo_playlist_videos");
    var qtdModulos = Number($("#id_lista_modulos").attr("qtd-modulos"));  

    // VOLTAR MÓDULO

    $(btnVoltarModulo).click(function (e) {

        var moduloAtual = Number($("#id_lista_modulos").attr("modulo-atual"));
        var idxModuloAnterior = moduloAtual - 1;
        var tituloModulo = $("#id_titulo_modulo_playlist_videos");

        if((moduloAtual <= qtdModulos) &&  (moduloAtual != 1))
        {
            $("#id_play_list_video_modulo_" + moduloAtual).hide();
            $("#id_play_list_video_modulo_" + idxModuloAnterior).fadeIn(200);
            $(containerListaModulos).attr("modulo-atual", idxModuloAnterior);
            $(tituloModulo).html($("#id_play_list_video_modulo_" + idxModuloAnterior).attr("descricao-modulo"));
        }

    });

    // AVANÇAR MÓDULO

    $(btnAvancarModulo).click(function (e) {

        var moduloAtual = Number($("#id_lista_modulos").attr("modulo-atual"));
        var idxModuloPosterior = moduloAtual + 1;

        if ((moduloAtual >= 1) && (moduloAtual != qtdModulos)) {
            $("#id_play_list_video_modulo_" + moduloAtual).hide();
            $("#id_play_list_video_modulo_" + idxModuloPosterior).fadeIn(200);
            $(containerListaModulos).attr("modulo-atual", idxModuloPosterior);
            $(tituloModulo).html($("#id_play_list_video_modulo_" + idxModuloPosterior).attr("descricao-modulo"));
        }

    });

    // AÇÃO PARA O ITEM DA LISTA DE VIDEOS

    var playListVideosModulos = $("div#id_item_video_playlist_view_video");
    var iframeMainVideo = $("iframe");

    $(playListVideosModulos).click(function (e) {        
        var idVideoSelecionado = $(this).attr("id-video");
        var nomeCurso = $(this).attr("nome-curso");
        var nomeAula = $(this).attr("nome-aula");
        var codCurso = $(this).attr("cod-curso");
        var tituloAula = $("#id_span_titulo_video_aula");
        var nomeLinkAula = $(this).attr("link-nome-aula");
        var idVideo = $(this).attr("id-cod-video");
        var idCurso = $(this).attr("id-curso");
        var idAula = $(this).attr("id-aula");
        var nomeLinkCurso = $(this).attr("link-nome-curso");
        var urlParcial = nomeLinkCurso + "/" + idCurso + "/" + nomeLinkAula + "/" + idAula;

        $(iframeMainVideo).attr("src", "https://drive.google.com/file/d/" + idVideoSelecionado + "/preview");
        $(tituloAula).html(codCurso + " - " + nomeCurso + " - " + nomeAula);
        history.pushState(null, null, "https://dev.enoove.com.br/classview/" + nomeLinkCurso + "/" + idCurso + "/" + nomeLinkAula + "/" + idAula);
        //history.pushState(null, null, "http://localhost:26404/l_view_class.php?cID_CURSO=" + idCurso + "&cID_AULA=" + idVideo);
        
        carregarMaterialComplementar(urlParcial);
    });

    $(window).on('popstate', function () {
        var urlAbsoluta = window.location.href;
        var urlRelativa = urlAbsoluta.replace("https://dev.enoove.com.br/classview/", "");        

        carregarVideoPrincipal(urlRelativa);
        carregarMaterialComplementar(urlRelativa);
        
    });

    function carregarVideoPrincipal(urlParcial)
    {
        var sectionVideoPrincipal = $("#id_section_content_center");                        
        var url1 = urlParcial.split("/");

        var idCursoURL = url1[1];
        var idAulaURL = url1[3];

        $.ajax({
            url: "/scripts/php/view_class.php",
            method: "POST",
            dataType: "text",
            data: {
                s_cod_curso: idCursoURL,
                s_cod_aula: idAulaURL,
                s_tipo_requisicao: "CARREGAR_VIDEO_PRINCIPAL"
            },
            success: function (data) {
                $(sectionVideoPrincipal).html(data);
            }
        });
    }

    function carregarMaterialComplementar(urlParcial) {
        var sectionMaterialComplementar = $("#id_section_comentarios_material_view_videos");
        
        var url1 = urlParcial.split("/");

        var idCursoURL = url1[1];
        var idAulaURL = url1[3];

        $.ajax({
            url: "/scripts/php/view_class.php",
            method: "POST",
            dataType: "text",
            data: {
                s_cod_curso: idCursoURL,
                s_cod_aula: idAulaURL,
                s_tipo_requisicao: "CARREGAR_MATERIAL_COMPLEMENTAR"
            },
            success: function (data) {
                $(sectionMaterialComplementar).html(data);
            }
        });
    }

    /**
			* Função JavaScript para pegar valor de uma URL
			* Exemplo de uso:
			* Dada a url -> http://ricardospinoza.wordpress.com/index.php?id=1234&nome=ricardo
			* o código abaixo retorna:
			* getURLParameters('nome'); //valor ricardo
			* getURLParameters('id'); //valor 1234
			* getURLParameters('id', 'getURLParameters('nome', 'http://ricardospinoza.desenvolvimentoweb.eti.br/exemplos/exemplo_funcao_javascript_get_param_url.html?id=1234&nome=ricardo')"'); //retorna o valor ricardo
			**/
    function getURLParameters(param, url) {
        param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + param + "=([^&#]*)";
        var regex = new RegExp(regexS);
        //se url não for informada, assume a url corrente da página
        if (typeof url == "undefined")
            var results = regex.exec(window.location.href);
        else
            var results = regex.exec(url);

        if (results == null) {
            return "";
        }
        else {
            return results[1];
        }
    }
});