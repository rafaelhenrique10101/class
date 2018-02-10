$(document).ready(function () {

    // #region constantes
    // ============================================================================================
    // ==================================== DEFINIÇÃO DE CONSTANTES ===============================
    // ============================================================================================

    const FADE_IN_UP = "fadeInUp animated";
    const FADE_IN_DOWN = "fadeInDown animated";
    const FADE_OUT_UP = "fadeOutUp animated";
    const FADE_OUT_DOWN = "fadeOutDown animated";
    const FADE_OUT_RIGHT = "fadeOutRight animated";
    const SLIDE_IN_LEFT = "slideInLeft animated";
    const SLIDE_OUT_LEFT = "slideOutLeft animated";
    const ANIMATION_END = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    const PATH_VIEW = "./App/View/";
    const PATH_SCRIPS_JSON = "./Config/json/";
    const FILE_JSON_PAGINAS = "paginas.json";
    const TITULO_SISTEMA = "Enoove Class";
    const TITULO_PAGINA_INICIAL = "Início";
    const SC_INICIO = "scInicio.php";
    const URL_AMIGAVEL_INICIO = "inicio";
    const PATH_MODAL = "./App/View/Modals/";
    const URL_SISTEMA_LOCAL = "http://localhost:8080/class_enoove/";
    const URL_SISTEMA_PRODUCAO = "http://class.enoove.com.br/";
    const FILE_MODAL_PROGRESSO_CURSO = "md_ProgressoCurso.php";
    const FILE_MODAL_MATERIAL_COMPLEMENTAR = "md_MaterialComplementar.php";
    const FILE_MODAL_AULAS_AUDIO = "md_AulasAudio.php";
    const FILE_MODAL_ITENS_APRESENTACAO = "md_ItensApresentacao.php";
    const FILE_MODAL_DADOS_PROFISSIONAIS = "md_ApresentacaoDadosProfissionais.php";
    const FILE_MODAL_FORMACAO_EDUCACIONAL = "md_ApresentacaoFormacaoEducacional.php";
    const FILE_MODAL_DADOS_CONTATO = "md_ApresentacaoDadosContato.php";
    const FILE_MODAL_EDITAR_PERFIL = "md_Perfil.php";
    const FILE_MODAL_CORTAR_IMAGEM = "md_CortarImagem.php";

    // #endregion

    // #region declaração de variáveis globais

    // ============================================================================================
    // ============================ DECLARAÇÃO DE VARIAVEIS GLOBAIS ===============================
    // ============================================================================================

    var bg_branco = $("#id_bg_branco");
    var containerModal = $("#id_container_modal");
    var contentModal = $("#id_content_modal");
    var body = $("#id_body");
    var barraTopo = $("#id_barra_topo");
    var loader = $("#id_loader_circular");
    var loaderTopo = $("#loader_topo");
    var textAreaComentarioCompartilhar = $("#id_textarea_modal_1");
    var linksMenuEsquerdoFixo = $("div#id_menu_links_esquerdo_fixo a");
    var linksMenuEsquerdoFlutuante = $("div#id_menu_links_esquerdo_flutuante a");
    var sectionContainerMain = $("#id_section_container_center");
    var sectionContentMain = $("#id_section_content_center");
    var divUsuario = $("#id_div_usuario");
    var menuUsuario = $("#id_menu_usuario");
    var itensMenuUsuario = $("div#id_menu_usuario a");
    var btnNotificacao = $("#id_btn_notificacao");
    var boxNotificacoes = $("#id_menu_notificacoes");
    var itemNotificacao = $("div#id_div_item_notificacao");
    var inputTxtItemNotificacao = $("input#id_input_txt_item_notificacao");
    var btnConfiguracaoNotificacao = $("#id_btn_configuracao_notificacao");
    var btnLimparNotificacao = $("#id_btn_limpar_notificacao");
    var contentNotificacao = $("#id_content_notificacoes");
    var itensNotificacao = $("#id_container_categorias_notificacoes");
    var contentConfiguracaoNotificacao = $("#id_content_configuracoes_notificacao");
    var toolTipBtnConfigurarNotificacao = $("#id_tooltip_btn_configuracao_notificacao");
    var divBtnTodasNotificacoes = $("#id_div_btn_todas_notificacoes");
    var divMsgSemNotificacoes = $("#id_msg_sem_notificacoes");
    var inputPesquisarTopo = $("#id_txt_pesquisar");
    var boxResultPesquisaTopo = $("#id_box_pesquisar");
    var menuPersonalizado = $("#id_menu_personalizado");
    var btnMenuPersonalizado = $("#id_btn_menu_personalizado");
    var btnAdicionarItensMenuPersonalizado = $("#id_btn_adicionar_item_menu_personalizado");
    var contentMenuPersonalizado = $("#id_content_menu_personalizado");
    var contentConfiguracaoMenuPersonalizado = $("#id_content_configuracoes_menu_personalizado");
    var toolTipBtnMenuPersonalizado = $("#id_tooltip_btn_adicionar_itens_menu_personalizado");
    var chkItemMenuPersonalizado = $("#id_chk_item_menu_personalizado");
    var loaderMenuPersonalizado = $("#id_loader_item_menu_personalizado");
    var loaderPesquisaSistema = $("#id_loader_pesquisa_sistema");
    var btnAbreFechaMenuLeft = $("div#id_btn_abre_fecha_menu_left");
    var menuMainLeft = $("#id_menu_links_esquerdo_flutuante");
    var divLogoMenuFlutuante = $("#id_logo_menu_flutuante");
    var btnPesquisar = $("#id_btn_pesquisar_mobile");
    var sectionPesquisa = $("#id_section_pesquisa_mobile");
    var divLogo = $("#id_div_logo");
    var divNomePagina = $("#id_div_nome_pagina");
    var divInputPesquisar = $("#id_div_input_pesquisar");
    var divOpcoesusuario = $("#id_div_opcoes_usuario");
    var divInput2Pesquisar = $("#id_div1_input_pesquisar");
    var divLupaInputPesquisar = $("#id_div_lupa_input_pesquisar");
    var spanTituloPaginaBarraTopo = $("#id_titulo_pagina_barra_topo");
    var barraNotificacaoBottom = $("#id_dimensao_div_alerta_modificacoes_center");
    var lblTxtBarraNotificacaoBottom = $("#id_lbl_notificacao_bottom");

    // #endregion

    // #region inicialização de parametros globais

    // ============================================================================================
    // ====================== INICIALIZANDO VARIÁVEIS E PARAMETROS GLOBAIS=========================
    // ============================================================================================

    $("#id_body").attr("screen", $(window).outerWidth());

    var backSearchPage = false;

    // #endregion

    // #region resize

    // ===================================================================================================================
    // ====== AJUSTES NA ALTURA DE AULAS RECENTES/MATERIAL COMPLEMENTAR/ AULAS EM AUDIO QUANDO REDIMENSIONAR A TELA ======
    // ===================================================================================================================

    $(window).resize(function () {

        var scrollHeightDivMaterialComplementar = $("#id_container_cards_material_complementar").prop("scrollHeight");
        var scrollHeightDivAulasAudio = $("#id_container_cards_aulas_video").prop("scrollHeight");

        if ($(window).outerWidth() < $("#id_body").attr("screen")) {

            $("#id_container_cards_material_complementar").height(scrollHeightDivMaterialComplementar + "px");
            $("#id_container_cards_aulas_video").height(scrollHeightDivAulasAudio + "px");
            $("#id_body").attr("screen", $(window).outerWidth());
            applyCollumnsCardsIsotope();

        } else if ($(window).outerWidth() > $("#id_body").attr("screen")) {

            if ($(window).outerWidth() >= 1141) {

                $("#id_container_cards_material_complementar").height("344px");
                $("#id_container_cards_aulas_video").height("344px");
                $("#id_body").attr("screen", $(window).outerWidth());
                applyCollumnsCardsIsotope();
            }

            if ($(window).outerWidth() >= 867 && $(window).outerWidth() <= 1140) {

                $("#id_container_cards_material_complementar").height("688px");
                $("#id_container_cards_aulas_video").height("688px");
                $("#id_body").attr("screen", $(window).outerWidth());
                applyCollumnsCardsIsotope();

            }

            if ($(window).outerWidth() >= 300 && $(window).outerWidth() <= 866) {

                $("#id_container_cards_material_complementar").height("688px");
                $("#id_container_cards_aulas_video").height("688px");
                $("#id_body").attr("screen", $(window).outerWidth());
                applyCollumnsCardsIsotope();
            }
        }
    });

    // #endregion

    function applyCollumnsCardsIsotope() {
        var countColumns = Number($("#id_container_cards_comentarios").find("div#id_container_column").length);
        var cardsComentariosInicio = $("div#id_container_cards_comentarios").find("div#id_content_card_comentarios");
        var widthScreen = $(window).outerWidth();
        var idxContainerColumn = 1;

        if (widthScreen > 1140) {
            $("#id_container_cards_comentarios").append("<div id='id_container_column' id-column='1' class='col-list-cards'></div>");
            $("#id_container_cards_comentarios").append("<div id='id_container_column' id-column='2' class='col-list-cards'></div>");
            $("#id_container_cards_comentarios").append("<div id='id_container_column' id-column='3' class='col-list-cards'></div>");

            $.each(cardsComentariosInicio, function (key, div) {
                $("#id_container_column[id-column='" + idxContainerColumn + "']").append(div.outerHTML);
                $(div).remove();
                idxContainerColumn++;

                idxContainerColumn > 3 ? idxContainerColumn = 1 : true;
            });
        } else if (widthScreen > 500) {
            $("#id_container_cards_comentarios").append("<div id='id_container_column' id-column='1' class='col-list-cards'></div>");
            $("#id_container_cards_comentarios").append("<div id='id_container_column' id-column='2' class='col-list-cards'></div>");

            $.each(cardsComentariosInicio, function (key, div) {
                $("#id_container_column[id-column='" + idxContainerColumn + "']").append(div.outerHTML);
                $(div).remove();
                idxContainerColumn++;

                idxContainerColumn > 2 ? idxContainerColumn = 1 : true;
            });
        }
    }

    // #region called settimeout

    // ============================================================================================
    // ==================================== CALLEDS SETTIMEOUT ====================================
    // ============================================================================================

    window.setTimeout(function () {

        initIsotope("#id_container_cards_aulas", "#id_content_cards_aulas");

    }, 3000);

    // #endregion

    // #region ações dos botões de voltar e avançar do navegador

    // ============================================================================================
    // ======================== AÇÕES DOS BOTÕES VOLTAR E AVANÇAR DO NAVEGADOR ====================
    // ============================================================================================

    $(window).on('popstate', function () {

        urlAtual = $(location).attr("href");

        if (urlAtual.match(/search/)) {
            if (urlAtual.match(URL_SISTEMA_LOCAL)) {
                urlAmigavel = urlAtual.replace(URL_SISTEMA_LOCAL, "");
            } else {
                urlAmigavel = urlAtual.replace(URL_SISTEMA_PRODUCAO, "");
            }

            if ($(window).outerWidth() > 799) {

                $(body).css("width", "calc(100% - 16.8px)");
                $(barraTopo).css("width", "calc(100% - 16.8px)");
            }

            $(body).css("overflow", "hidden");
            $(sectionContentMain).css("overflow", "hidden");
            $(sectionContainerMain).css("overflow", "hidden");

            loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        } else {
            if (urlAtual.match(URL_SISTEMA_LOCAL)) {
                urlAmigavel = urlAtual.replace(URL_SISTEMA_LOCAL, "");
            } else {
                urlAmigavel = urlAtual.replace(URL_SISTEMA_PRODUCAO, "");
            }
            if ($(window).outerWidth() > 799) {
                $(body).css("width", "calc(100% - 16.8px)");
                $(barraTopo).css("width", "calc(100% - 16.8px)");
            }

            $(body).css("overflow", "hidden");
            $(sectionContentMain).css("overflow", "hidden");
            $(sectionContainerMain).css("overflow", "hidden");
            $(loaderTopo).fadeIn(200);

            if ($(sectionPesquisa).css("display") === "block") {
                $(sectionPesquisa).fadeOut(200, function () {
                    $(divInputPesquisar).hide();
                    if ($(window).outerWidth() >= 545) {
                        $(divLogo).show();
                    }
                    $(divNomePagina).show();
                    $(divOpcoesusuario).show();
                    $(divInputPesquisar).css("width", "calc(100% - 100px)");
                    $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'></path><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path></svg>");
                    $(boxResultPesquisaTopo).attr("style", "position: relative;width: calc(100% - 20px);margin: 0 9px;top: -8px;");
                    $(divInput2Pesquisar).css("background-color", "rgba(0,0,0,.1)");
                    $(divLupaInputPesquisar).show();
                });

                if (backSearchPage !== true) {
                    loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
                    backSearchPage = false;
                } else {
                    $(loaderTopo).hide();
                    backSearchPage = false;
                }
            } else {
                $(sectionContentMain).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
                    $(sectionContentMain).removeClass(FADE_OUT_DOWN);
                    $(sectionContentMain).hide();
                    //loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
                });
                window.setTimeout(function () {

                    loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
                }, 1000);
            }
        }
    });
    // #endregion

    // #region chamada de funções que são executadas ao carregar a página
    // ============================================================================================
    // =========================== EXECUTANDO FUNÇÕES AO CARREGAR A PÁGINA ========================
    // ============================================================================================

    loadSectionAfterLoadPage();

    $(bg_branco).click(function () {

        if ($(containerModal).css("display") === "block") {

            $(containerModal).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
                $(containerModal).removeClass(FADE_OUT_DOWN);
                $(containerModal).hide();
                $(bg_branco).fadeOut(200);
                $(body).css("overflow", "");
                $(body).css("width", "");
                $(barraTopo).css("width", "");
            });
        }
    });

    $(contentModal).click(function (e) {
        $("div[tipo='list-modal']").fadeOut(200);
        e.stopPropagation();
    });
    // #endregion

    // #region isotope init
    // ============================================================================================
    // ======================================== ISOTOPE INIT ======================================
    // ============================================================================================

    function initIsotope(container, itens) {
        $(container).isotope({
            itemSelector: itens,
            percentPosition: true
        });
    }

    // #endregion
    // #region links menu esquerdo

    // ============================================================================================
    // ======================== AÇÕES DOS LINKS PRINCIPAIS DO MENU ESQUERDO =======================
    // ============================================================================================
    $(btnAbreFechaMenuLeft).click(function (e) {
        if ($(menuMainLeft).css("display") === "none" && $(sectionPesquisa).css("display") === "none") {
            $(menuPersonalizado).fadeOut(200);
            $(boxNotificacoes).fadeOut(200);
            $(menuUsuario).fadeOut(200);
            $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='36' viewBox='0 0 24 24' width='36'><path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'/><path d='M0-.5h24v24H0z' fill='none'/></svg>");
            $(menuMainLeft).show();
            $(menuMainLeft).addClass(SLIDE_IN_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_IN_LEFT);
            });

        } else if ($(sectionPesquisa).css("display") === "block") {
            $(divInputPesquisar).hide();
            $(loaderTopo).show();
            //$(sectionPesquisa).hide();

            if ($(window).outerWidth() >= 545) {
                $(divLogo).show();
            }
            $(divNomePagina).show();
            $(divOpcoesusuario).show();
            $(divInputPesquisar).css("width", "calc(100% - 100px)");

            $(inputPesquisarTopo).css("width", "calc(100% - 100px)");
            $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'></path><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'></path></svg>");
            $(boxResultPesquisaTopo).attr("style", "position: relative;width: calc(100% - 20px);margin: 0 9px;top: -8px;");
            $(divInput2Pesquisar).css("background-color", "rgba(0,0,0,.1)");
            $(divLupaInputPesquisar).show();
            backSearchPage = true;
            window.history.back();
        } else {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");
                $(menuMainLeft).hide();
            });
        }

        e.stopPropagation();
    });

    $(linksMenuEsquerdoFixo).click(function (ev) {
        var tituloPagina = $(this).attr("title");
        var urlAmigavel = $(this).attr("href");
        var linkAtivo = $(this).find("div.dimensao_item_menu_main_left").eq(0);
        var linkAnterior = $("#id_menu_links_esquerdo_fixo").find("a").find("div.dimensao_item_menu_main_left.active_dimensao_item_menu_main_left");
        var linkAnterior = $("#id_menu_links_esquerdo_fixo").find("a").find("div.dimensao_item_menu_main_left.active_dimensao_item_menu_main_left");


        $(linkAnterior).removeClass("active_dimensao_item_menu_main_left");
        $(linkAtivo).addClass("active_dimensao_item_menu_main_left");
        $(spanTituloPaginaBarraTopo).html(tituloPagina);
        history.pushState(null, null, urlAmigavel);
        $(document).prop('title', tituloPagina + " - " + TITULO_SISTEMA);
        ev.preventDefault();
        $(loaderTopo).show();

        $(sectionContentMain).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
            $(sectionContentMain).removeClass(FADE_OUT_DOWN);
            $(sectionContentMain).hide();
            //loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        });
        window.setTimeout(function () {
            loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        }, 1000);
    });

    $(linksMenuEsquerdoFlutuante).click(function (ev) {
        var tituloPagina = $(this).attr("title");
        var urlAmigavel = $(this).attr("href");
        $(spanTituloPaginaBarraTopo).html(tituloPagina);
        //$("#el").animate({backgroundColor: "#ff0000" });

        history.pushState(null, null, urlAmigavel);
        $(document).prop('title', tituloPagina + " - " + TITULO_SISTEMA);
        ev.preventDefault();
        $(loaderTopo).show();

        $(sectionContentMain).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
            $(sectionContentMain).removeClass(FADE_OUT_DOWN);
            $(sectionContentMain).hide();
            //loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        });
        if ($(menuMainLeft).css("display") === "block") {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(menuMainLeft).hide();
                $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");
            });
        }

        loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        ev.stopPropagation();
    });

    $(divLogoMenuFlutuante).click(function (e) {
        e.stopPropagation();
    });

    function loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel) {
        var urlAtual = "";
        $.getJSON(PATH_SCRIPS_JSON + FILE_JSON_PAGINAS, function (data) {
            $.each(data, function (key, value) {
                if ((urlAmigavel === value.relativeUrl) || ("./" + urlAmigavel === value.relativeUrl)) {
                    urlAtual = value.relativeUrl;
                    $(document).prop("title", value.title + " - " + TITULO_SISTEMA);
                    $(sectionContentMain).html("");
                    $(sectionContentMain).load(PATH_VIEW + value.page, function () {
                        $(loaderTopo).hide();

                        $(sectionContentMain).show();
                        $(sectionPesquisa).fadeOut(200);
                        $(sectionContentMain).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                            $(sectionContentMain).removeClass(FADE_IN_UP);

                            if ($(window).outerWidth() > 799) {
                                $(body).css("width", "100%");
                                $(barraTopo).css("width", "100%");
                            }
                            $(body).css("overflow", "");
                            $(sectionContentMain).css("overflow", "");
                            $(sectionContainerMain).css("overflow", "");

                            initIsotope("#id_container_cards_aulas", "#id_content_cards_aulas");
                            initIsotope("#id_content_aulas_em_video_aulas", "#id_coluna_content_aulas");

                            applyCollumnsCardsIsotope();
                            initIsotope(".col-list-cards", ".div_content_inicio_3_1");
                        });
                    });
                }
            });

            if (urlAtual === "" && urlAmigavel !== "search") {
                $(sectionContentMain).html("");
                $(sectionContentMain).load("./" + SC_INICIO, function () {
                    $(loader).fadeOut(200);

                    $(sectionContentMain).show();
                    $(sectionContentMain).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(sectionContentMain).removeClass(FADE_IN_UP);
                        if ($(window).outerWidth() > 799) {
                            $(body).css("width", "100%");
                            $(barraTopo).css("width", "100%");
                        }

                        $(body).css("overflow", "");
                        $(sectionContentMain).css("overflow", "");
                        $(sectionContainerMain).css("overflow", "");
                        history.pushState(null, null, URL_AMIGAVEL_INICIO);
                    });
                });
            }
            if (urlAmigavel === "./search" || "./" + urlAmigavel === "./search") {
                $(sectionPesquisa).fadeIn(200);
                $(divLogo).hide();
                $(divNomePagina).hide();
                $(divOpcoesusuario).hide();
                $(divInputPesquisar).css("width", "calc(100% - 64px)");
                $(inputPesquisarTopo).css("width", "calc(100% - 50px)");
                $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                $(divInput2Pesquisar).css("background-color", "#fff");
                $(divLupaInputPesquisar).hide();
                $(divInputPesquisar).fadeIn(200);
                $(boxResultPesquisaTopo).attr("style", "position: fixed;width: 100%;margin: 0;top: 64px;left: 0;");
                $(inputPesquisarTopo).focus();
            }
        });
    }

    // #endregion
    // #region tratamento de url amigavel ao acessar diretamente pelas urls

    // ============================================================================================
    // ============= MAPEAMENTO E REDIRECIONAMENTO DE URLs NO CARREGAMENTO DAS PÁGINAS ============
    // ============================================================================================
    function loadSectionAfterLoadPage() {

        var currentURL = $(location).attr("href");
        var urlAmigavelBarraEndereco = "";

        if ($(window).outerWidth() > 799) {
            $(body).css("width", "calc(100% - 16.8px)");
            $(barraTopo).css("width", "calc(100% - 16.8px)");
        }

        $(body).css("overflow", "hidden");
        $(sectionContentMain).css("overflow", "hidden");
        $(sectionContainerMain).css("overflow", "hidden");
        $(loaderTopo).fadeIn(200);

        if (currentURL.match(URL_SISTEMA_PRODUCAO)) {
            urlAmigavelBarraEndereco = currentURL.replace(URL_SISTEMA_PRODUCAO, "");
        } else {
            urlAmigavelBarraEndereco = currentURL.replace(URL_SISTEMA_LOCAL, "");
        }

        if (urlAmigavelBarraEndereco === "" || urlAmigavelBarraEndereco === "inicio") {
            loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, URL_AMIGAVEL_INICIO);
        } else {
            loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavelBarraEndereco);
        }
    }

    // #endregion

    // #region ações da barra de pesquisa

    // ============================================================================================
    // ============================ AÇÕES DA BARRA DE PESQUISA DO SISTEMA =========================
    // ============================================================================================
    $(inputPesquisarTopo).click(function (e) {

        $(boxResultPesquisaTopo).fadeIn(200);
        $(menuPersonalizado).fadeOut(200);
        $(boxNotificacoes).fadeOut(200);
        $(menuUsuario).fadeOut(200);
        e.stopPropagation();
    });

    $(boxResultPesquisaTopo).click(function (e) {
        e.stopPropagation();
    });
    $(inputPesquisarTopo).keyup(function (ev) {

        if ($(this).length > 0 && $(this).val() !== "") {
            if ($(boxResultPesquisaTopo).css("display") === "none") {
                $(boxResultPesquisaTopo).fadeIn(200);
            }
            $(loaderPesquisaSistema).show();
            window.setTimeout(function () {
                $(loaderPesquisaSistema).hide();
            }, 1000);
        } else {
            $(boxResultPesquisaTopo).fadeOut(200);
            // CHAMADA JS
        }
    });
    $(btnPesquisar).click(function (e) {

        var tituloPagina = $(this).attr("title");
        var urlAmigavel = $(this).attr("href");
        history.pushState(null, null, urlAmigavel);
        $(document).prop('title', tituloPagina + " - " + TITULO_SISTEMA);

        loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        e.preventDefault();
    });

    $(sectionPesquisa).click(function (e) {
        $(boxResultPesquisaTopo).fadeOut(200);
        e.stopPropagation();
    });
    // #endregion

    // #region ações ao clicar no body
    // ============================================================================================
    // ================================== AÇÕES AO CLICAR NO BODY =================================
    // ============================================================================================

    $(body).click(function () {
        var svgBtn = $("#id_btn_adicionar_item_menu_personalizado").find("button");
        $(menuUsuario).fadeOut(200);
        $(inputTxtItemNotificacao).val("");
        $(boxResultPesquisaTopo).fadeOut(200);
        $(inputPesquisarTopo).val("");
        $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");
        $(boxNotificacoes).fadeOut(100, function () {
            $("#id_btn_configuracoes_svg").html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M0 0h24v24H0z' fill='none'/><path d='M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
            $(contentConfiguracaoNotificacao).hide();
            $(toolTipBtnConfigurarNotificacao).html("Configurações");
            $(toolTipBtnConfigurarNotificacao).show();
            $(divBtnTodasNotificacoes).show();
            $(btnLimparNotificacao).show();
            $(divMsgSemNotificacoes).hide();

            // Chamar JS para e
            $(contentNotificacao).hide();
        });
        $(menuPersonalizado).fadeOut(100, function () {
            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            $(contentConfiguracaoMenuPersonalizado).hide();
            $(contentMenuPersonalizado).fadeIn(200);
            $(toolTipBtnMenuPersonalizado).html("Adicionar itens");
            $(toolTipBtnMenuPersonalizado).show();
        });

        if ($(menuMainLeft).css("display") === "block") {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(menuMainLeft).hide();
            });
        }
    });
    // #endregion

    // #region ações da barra de login
    // ============================================================================================
    // =========================== AÇÕES DA BARRA DE OPÇÕES DO USUÁRIO ============================
    // ============================================================================================

    $(divUsuario).click(function (e) {
        $(menuUsuario).fadeIn(200);
        $(boxNotificacoes).fadeOut(200);
        $(menuPersonalizado).fadeOut(200);
        $(boxResultPesquisaTopo).fadeOut(200);
        $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");
        if ($(menuMainLeft).css("display") === "block") {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(menuMainLeft).hide();
            });
        }

        e.stopPropagation();
    });
    $(menuUsuario).click(function (e) {
        e.stopPropagation();
    });

    $(boxNotificacoes).click(function (e) {
        e.stopPropagation();
    });
    $(itensMenuUsuario).click(function (e) {

        var tituloPagina = $(this).attr("title");
        var urlAmigavel = $(this).attr("href");
        if ($(window).outerWidth() > 799) {
            $(body).css("width", "calc(100% - 16.8px)");
            $(barraTopo).css("width", "calc(100% - 16.8px)");
        }

        $(body).css("overflow", "hidden");
        $(sectionContentMain).css("overflow", "hidden");
        $(sectionContainerMain).css("overflow", "hidden");
        history.pushState(null, null, urlAmigavel);
        $(document).prop('title', tituloPagina + " - " + TITULO_SISTEMA);
        e.preventDefault();

        $(loader).fadeIn(200);
        $(sectionContentMain).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
            $(sectionContentMain).removeClass(FADE_OUT_DOWN);
            $(sectionContentMain).hide();
            //loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
        });

        window.setTimeout(function () {
            loadPage(PATH_SCRIPS_JSON, FILE_JSON_PAGINAS, urlAmigavel);
            $(menuUsuario).fadeOut(100);
        }, 1000);
        e.stopPropagation();
    });

    // #endregion
    // #region ações do box de notificações

    // ============================================================================================
    // ============================ AÇÕES DO SISTEMA DE NOTIFICAÇÕES ==============================
    // ============================================================================================
    $(btnNotificacao).click(function (e) {
        $(boxNotificacoes).fadeIn(200);
        $(menuUsuario).fadeOut(200);
        $(menuPersonalizado).fadeOut(200);
        $(boxResultPesquisaTopo).fadeOut(200);
        $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");

        if ($(menuMainLeft).css("display") === "block") {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(menuMainLeft).hide();
            });
        }
        e.stopPropagation();
    });

    $(boxNotificacoes).off("click", "div#id_div_item_notificacao").on("click", "div#id_div_item_notificacao", function () {
        var divContent1 = $(this).find("#id_div_content_big_item_notificacao");
        var divBtnsAcoes = $("#id_div_barra_acao_notificacao[id-item='" + $(this).attr("id-item") + "']");
        var categoriaItem = $(this).attr("id-categoria");
        var idItem = $(this).attr("id-item");
        var divAcaoTXT = $("#id_div_acao_txt[id-item='" + idItem + "']");
        var btnAcoes = $("#id_div_btns_acao[id-item='" + idItem + "']");

        if ($(divBtnsAcoes).css("display") === "none") {
            if ($(divContent1).length > 0) {
                $(divContent1).show();
                $(divBtnsAcoes).show();
                $(btnAcoes).show();
            } else {
                $(divBtnsAcoes).show();
                $(btnAcoes).show();
            }
        } else if ($(divBtnsAcoes).css("display") === "block" && $(divAcaoTXT).css("display") === "none") {
            $(divContent1).hide();
            $(divBtnsAcoes).css("background-color", "#eee");
            $(divAcaoTXT).hide();
            $(divBtnsAcoes).hide();
            $(btnAcoes).hide();
        } else {
            $(divBtnsAcoes).css("background-color", "#eee");
            $(divBtnsAcoes).show();
            $(divAcaoTXT).fadeOut(100, function () {
                $(btnAcoes).show();
                $(divBtnsAcoes).css("border-bottom", "solid 1px rgb(183, 183, 183)");
            });
        }

    });
    $(boxNotificacoes).off("click", "div#id_btn_acao_1").on("click", "div#id_btn_acao_1", function (e) {

        e.stopPropagation();
    });
    $(boxNotificacoes).off("click", "div#id_btn_acao_2").on("click", "div#id_btn_acao_2", function (e) {

        var idItem = $(this).attr("id-item");
        var idCategoriaItem = $(this).attr("id-categoria");
        var bgAcaoTXT = $("#id_div_acao_txt[id-item='" + idItem + "']");
        var divBtnsAcao = $("#id_div_btns_acao[id-item='" + idItem + "']");
        var divAcaoTXT = $("#id_div_acao_txt[id-item='" + idItem + "']");
        var corCategoriaItem = $("#id_box_categoria_notificacao[id-categoria='" + idCategoriaItem + "']").attr("cor-categoria");
        var divBtnsAcoes = $("#id_div_barra_acao_notificacao[id-item='" + $(this).attr("id-item") + "']");
        $(bgAcaoTXT).css("background-color", corCategoriaItem);
        $(divBtnsAcoes).css("border-bottom", "solid 0px rgb(183, 183, 183)");

        $(divBtnsAcao).hide();
        $(divAcaoTXT).fadeIn(200);
        e.stopPropagation();
    });

    $(boxNotificacoes).off("click", "div#id_div_barra_acao_notificacao").on("click", "div#id_div_barra_acao_notificacao", function (e) {
        e.stopPropagation();
    });
    $(btnConfiguracaoNotificacao).click(function () {
        var displayContentNotificacao = $(contentNotificacao).css("display");
        var displayMsgSemNotificacao = $("#id_msg_sem_notificacoes").css("display");
        var svgBtn = $(this).find("button");

        if (displayContentNotificacao === "block") {
            // Exibe configurações das notificações
            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M0 0h24v24H0z' fill='none'/><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/></svg>");
            $(contentNotificacao).hide();
            $(contentConfiguracaoNotificacao).fadeIn(200);
            $(toolTipBtnConfigurarNotificacao).hide();
            $(toolTipBtnConfigurarNotificacao).html("");
            $(divBtnTodasNotificacoes).hide();
            $(btnLimparNotificacao).hide();
        } else if (displayContentNotificacao === "none" && displayMsgSemNotificacao === "block") {
            // Exibe configurações das notificações

            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M0 0h24v24H0z' fill='none'/><path d='M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
            $(contentConfiguracaoNotificacao).hide();
            $(contentNotificacao).fadeIn(200);
            $(toolTipBtnConfigurarNotificacao).html("Configurações");
            $(toolTipBtnConfigurarNotificacao).show();
            $(divBtnTodasNotificacoes).show();
            $(btnLimparNotificacao).show();
        } else if (displayContentNotificacao === "none") {
            // Exibe notificações
            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M0 0h24v24H0z' fill='none'/><path d='M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
            $(contentConfiguracaoNotificacao).hide();
            $(contentNotificacao).fadeIn(200);
            $(toolTipBtnConfigurarNotificacao).html("Configurações");
            $(toolTipBtnConfigurarNotificacao).show();
            $(divBtnTodasNotificacoes).show();
            $(btnLimparNotificacao).show();

        }
    });
    $(btnLimparNotificacao).click(function () {

        if ($(itensNotificacao).css("display") === "block") {
            $(itensNotificacao).addClass(FADE_OUT_RIGHT).one(ANIMATION_END, function () {
                $(itensNotificacao).removeClass(FADE_OUT_RIGHT);
                $(itensNotificacao).hide();
                $(divMsgSemNotificacoes).show();
            });
        }
    });
    // #endregion

    // #region ações do menu de menu personalizado
    // ============================================================================================
    // ================================ AÇÕES DO MENU PERSONALIZADO ===============================
    // ============================================================================================

    $(btnMenuPersonalizado).click(function (e) {
        $(menuPersonalizado).fadeIn(200);
        $(boxNotificacoes).fadeOut(200);
        $(menuUsuario).fadeOut(200);
        $(boxResultPesquisaTopo).fadeOut(200);
        $(btnAbreFechaMenuLeft).html("<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'><path d='M0 0h24v24H0z' fill='none'/><path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/></svg>");

        if ($(menuMainLeft).css("display") === "block") {
            $(menuMainLeft).addClass(SLIDE_OUT_LEFT).one(ANIMATION_END, function () {
                $(menuMainLeft).removeClass(SLIDE_OUT_LEFT);
                $(menuMainLeft).hide();
            });
        }
        e.stopPropagation();
    });

    $(menuPersonalizado).click(function (e) {
        e.stopPropagation();
    });
    $(menuPersonalizado).off("click", "#id_div_item_menu_personalizado").on("click", "#id_div_item_menu_personalizado", function (e) {

    });
    $(btnAdicionarItensMenuPersonalizado).click(function () {
        var displayContentMenuPersonalizado = $(contentMenuPersonalizado).css("display");
        var displayMsgSemMenuPersonalizado = $("#id_msg_sem_personalizacao").css("display");
        var svgBtn = $(this).find("button");

        if (displayContentMenuPersonalizado === "block") {
            // Exibe configurações das notificações
            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M0 0h24v24H0z' fill='none'/><path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/></svg>");
            $(contentMenuPersonalizado).hide();
            $(contentConfiguracaoMenuPersonalizado).fadeIn(200);
            $(toolTipBtnMenuPersonalizado).hide();
            $(toolTipBtnMenuPersonalizado).html("");
        } else if (displayContentMenuPersonalizado === "none") {
            // Exibe notificações

            $(svgBtn).html("<svg xmlns='http://www.w3.org/2000/svg' class='img_15_1'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            $(contentConfiguracaoMenuPersonalizado).hide();
            $(contentMenuPersonalizado).fadeIn(200);
            $(toolTipBtnMenuPersonalizado).html("Adicionar itens");
            $(toolTipBtnMenuPersonalizado).show();
            $(loaderMenuPersonalizado).show();
            window.setTimeout(function () {
                $(loaderMenuPersonalizado).hide();
            }, 2000);
        }
    });
    $(menuPersonalizado).off("click", "input[id-item='chk_item_menu_personalizado']").on("click", "input[id-item='chk_item_menu_personalizado']", function (e) {

        var statusCheckItem = $(this).attr("status-chk");
        if (statusCheckItem === "true") {
            $(this).attr("status-chk", "false");
        } else {
            $(this).attr("status-chk", "true");
        }

        e.stopPropagation();
    });
    // #endregion

    // #region ações botões cards
    // ============================================================================================
    // ================ AÇÕES DA BARRA DE BOTÕES DOS CARDS DE COMENTÁRIOS RECENTES ================
    // ============================================================================================

    $(sectionContentMain).off("click", "textarea#id_txt_adicionar_comentario").on("click", "textarea#id_txt_adicionar_comentario", function (e) {

        var idTxtAtivo = $(this).attr("id-textarea");
        var cardsComentarios = $("div#id_content_card_comentarios");
        var cardAtivo = $("#id_content_card_comentarios[id-coluna = '" + idTxtAtivo + "']");
        var divBtnsPostar = $(cardAtivo).find("#id_div_btns_postar_comentario");
        var idDivBtnPostar = $(cardAtivo).find("#id_div_btns_postar_comentario").attr("id-div");
        var divBtnsCurtir = $("#id_btn_curtir_mensagens[id-div='" + idTxtAtivo + "']");
        var heightCardAtivo = $(cardAtivo).height();

        if ($(cardAtivo).attr("height") === "") {
            $(cardAtivo).attr("height", heightCardAtivo);
        }
        $(divBtnsCurtir).hide();

        $(cardsComentarios).each(function (index, card) {
            if ($(card).find("#id_div_btns_postar_comentario").css("display") === "block") {
                var idDivBtnPostar2 = $(card).find("#id_div_btns_postar_comentario").attr("id-div");
                if (idDivBtnPostar !== idDivBtnPostar2) {
                    $(card).find("textarea#id_txt_adicionar_comentario").val("").height("30px");
                    $(card).find("#id_div_btns_postar_comentario").hide();
                    $(card).find("#id_btn_curtir_mensagens").show();
                }
            }
            if ($(divBtnsPostar).css("display") === "none") {
                $(divBtnsPostar).show();
            }

            autosize($(".textarea_adicionar_comentario"));
            initIsotope(".col-list-cards", ".div_content_inicio_3_1");
        });
    });

    $(sectionContentMain).off("keyup", "textarea#id_txt_adicionar_comentario").on("keyup", "textarea#id_txt_adicionar_comentario", function (e) {
        var txtBtnPostarComentario = $("#id_txt_btn_postar_comentario[id-txt-btn='" + $(this).attr("id-textarea") + "'");

        if ($(this).length > 0 && $(this).val() !== "") {
            $(txtBtnPostarComentario).css("color", "#4d1c97");
        } else {
            $(txtBtnPostarComentario).css("color", "#676767");
        }

        initIsotope(".col-list-cards", ".div_content_inicio_3_1");
    });

    $(sectionContentMain).off("click", "div#id_btn_cancelar_comentario").on("click", "div#id_btn_cancelar_comentario", function (e) {
        var idBtnAtivo = $(this).attr("id-btn");
        var divBtnsPostar = $("#id_div_btns_postar_comentario[id-div='" + idBtnAtivo + "']");
        var textAreaAtivo = $("#id_txt_adicionar_comentario[id-textarea='" + idBtnAtivo + "']");
        var originalHeightTxt = $(textAreaAtivo).height() - 30;
        var divBtnsCurtir = $("#id_btn_curtir_mensagens[id-div='" + idBtnAtivo + "']");
        var topDivProgressoCurso = $("#id_content_inicio_progresso_curso");
        $(".textarea_adicionar_comentario").height("30px");
        $(textAreaAtivo).val("");

        $(divBtnsPostar).hide();
        $(divBtnsCurtir).show();

        initIsotope(".col-list-cards", ".div_content_inicio_3_1");
    });

    $(sectionContentMain).off("click", "#id_btn_postar_comentario").on("click", "#id_btn_postar_comentario", function () {
        var idBtnAtivo = $(this).attr("id-btn");
        var divBtnsPostar = $("#id_div_btns_postar_comentario[id-div='" + idBtnAtivo + "']");
        var textAreaAtivo = $("#id_txt_adicionar_comentario[id-textarea='" + idBtnAtivo + "']");
        var originalHeightTxt = $(textAreaAtivo).height() - 30;
        var divBtnsCurtir = $("#id_btn_curtir_mensagens[id-div='" + idBtnAtivo + "']");
        var topDivProgressoCurso = $("#id_content_inicio_progresso_curso");

        $(".textarea_adicionar_comentario").height("30px");
        $(textAreaAtivo).val("");

        $(divBtnsPostar).hide();
        $(divBtnsCurtir).show();
    });

    $(sectionContentMain).off("click", "div#id_btn_curtir_card_comentario").on("click", "div#id_btn_curtir_card_comentario", function (e) {
        var iconSvg = $(this).find("svg");

        if ($(this).css("background-color") === "rgb(77, 28, 151)") {
            $(this).css("background-color", "rgb(238, 238, 238)");
            $(iconSvg).css("fill", "#000");
            $(iconSvg).css("opacity", ".7");
        } else {
            $(this).css("background-color", "rgb(77, 28, 151)");
            $(iconSvg).css("fill", "#fff");
            $(iconSvg).css("opacity", "1");
        }
    });

// #endregion
// #region botões de filtro aulas

// ============================================================================================
// ========================== TL_INICIO - AULAS RECENTES > BTNS DE FILTRO =====================
// ============================================================================================
    $(sectionContentMain).off("click", "#id_tab_filtro_aulas_recentes").on("click", "#id_tab_filtro_aulas_recentes", function () {

        var tipoTab = $(this).attr("tab");
        var tabs = $("#id_tabs_inicio_aulas_recentes").find("div#id_tab_filtro_aulas_recentes");

        $.each(tabs, function (key, value) {
            if ($(value).attr("tab") !== tipoTab) {
                $("div[tab-related='" + $(value).attr("tab") + "']").hide();
            }
        });

        $("div[tab-related='" + tipoTab + "']").fadeIn(200);
        initIsotope("#id_container_cards_aulas", "#id_content_cards_aulas");
    });
// #endregion

// #region ações dos botões de compartilhar progresso do curso
// ============================================================================================
// ========= AÇÕES DOS BOTÕES DE COMPARTILHAR DOS BLOCOS DE PROGRESSO DO CURSO E MODAL ========
// ============================================================================================

    $(sectionContentMain).off("click", "div#id_btn_compartilhar_cards_progresso_curso").on("click", "div#id_btn_compartilhar_cards_progresso_curso", function () {
        var idxbtnCompartilharModal1 = Number($(this).attr("id-btn"));
        var currentCard = $("#id_card_progresso_curso[id-card='" + idxbtnCompartilharModal1 + "']");
        var currentBgColorCard = $(currentCard).css("background-color");

        showBackgroundBranco(function () {
            showModal(FILE_MODAL_PROGRESSO_CURSO, null, function () {
                $("#id_content_element_printed")
                    .html("")
                    .html(currentCard.html())
                    .css("background-color", currentBgColorCard);

                $("#id_btn_compartilhar_cards_progresso_curso").remove();
                autosize($(".textarea_adicionar_comentario_compartilhar"));
            });
        });
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_progresso_curso").on("click", "#id_btn_cancelar_modal_progresso_curso", function (e) {

        hideModal(false);

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_compartilhar_modal_progresso_curso").on("click", "#id_btn_compartilhar_modal_progresso_curso", function (e) {

        hideModal(false, function () {
        });

        e.preventDefault();
    });


// #endregion
// #region ações do cards de material complementar

// ============================================================================================
// ========================== AÇÕES DOS CARDS DE MATERIAL COMPLEMENTAR ========================
// ============================================================================================
    $(sectionContentMain).off("click", "#id_card_material_complementar").on("click", "#id_card_material_complementar", function () {

        var idxCardMaterialComplementar = Number($(this).attr("id-card"));
        var currentCard = $("#id_card_material_complementar[id-card='" + idxCardMaterialComplementar + "']");
        var idAulaMaterialComplementar = Number($(currentCard).attr("id-aula"));

        var arrayMaterialComplementar;

        arrayMaterialComplementar = {
            "p_idAula": idAulaMaterialComplementar
        };

        showBackgroundBranco(function () {
            showModal(FILE_MODAL_MATERIAL_COMPLEMENTAR, arrayMaterialComplementar, null);
        });
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_material_complementar").on("click", "#id_btn_cancelar_modal_material_complementar", function (e) {

        hideModal(false);

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_download_modal_material_complementar").on("click", "#id_btn_download_modal_material_complementar", function (e) {

        hideModal(false, function () {
            location.href = $("#id_container_iframe_material_complementar").attr("url-arquivo");
        });

        e.preventDefault();
    });
// #endregion
// #region ações dos cards de aulas em audio

// ============================================================================================
// =============================== AÇÕES DOS CARDS DE AULAS EM AUDIO ==========================
// ============================================================================================
    $(sectionContentMain).off("click", "div#id_card_aulas_em_audio").on("click", "div#id_card_aulas_em_audio", function () {

        var idxCardAulasAudio = Number($(this).attr("id-card"));
        var currentCard = $("#id_card_aulas_em_audio[id-card='" + idxCardAulasAudio + "']");
        var idAulaAudio = Number($(currentCard).attr("id-aula"));

        var arrayAulasAudio;

        arrayAulasAudio = {
            "p_idAula": idAulaAudio
        };

        showBackgroundBranco(function () {
            showModal(FILE_MODAL_AULAS_AUDIO, arrayAulasAudio, null);
        });
    });

    $(contentModal).off("click", "#id_cancelar_modal_aulas_audio").on("click", "#id_cancelar_modal_aulas_audio", function (e) {

        hideModal(false);

        e.preventDefault();

    });

    $(contentModal).off("click", "#id_download_modal_aulas_audio").on("click", "#id_download_modal_aulas_audio", function (e) {

        hideModal(false, function () {
            location.href = $("#id_audio_player").find("source").attr("src");
        });

        e.preventDefault();
    });

// #endregion
// #region funcionalidades do bloco de desejo aprender sobre

// ======================================================================================================
// ============================= FUNCIONALIDADES DA TELA DE MEU PERFIL ==================================
// ======================================================================================================
    $(document).off("keypress", "#id_input_adicionar_itens_chips").on("keypress", "#id_input_adicionar_itens_chips", function (e) {

        var txtItems = "";
        var txtItems_temp1 = "";
        var txtItems_temp2 = "";
        var txtItemsOrigin = "";
        var idx = 1;
        var divChips = $("#id_div_chips_desejo_aprender");
        var htmlChip1 = "";
        var htmlChip2 = "";
        var resultChips = "";
        var lenghtDivChips = 0;
        var chips = "";
        var arrayChips = [];
        if (e.key === "Enter") {
            txtItems_temp1 = $(this).val();
            txtItems_temp2 = txtItems_temp1.replace(/\s{2,}/g, ' ');
            txtItemsOrigin = txtItems_temp2.replace(/;{2,}/g, ' ');
            txtItems = txtItemsOrigin.toLowerCase();

            if ($(divChips).find("span#id_chip").length === 0) {
                $(divChips).html("");
            }
            if (txtItems.match(/;/) && txtItems !== ";") {
                txtItems = txtItems.split(";");
                $.each(txtItems, function (key, value) {
                    if (value !== "") {
                        htmlChip1 = "<span class='mdl-chip mdl-chip--deletable' id='id_chip' id-item='" + idx + "'><span class='mdl-chip__text'>";
                        htmlChip2 = "</span><button type='button' class='mdl-chip__action' id='id_cancel_chip_desejo_aprender' id-item='" + idx + "'><svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' fill='#fff'><path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'></path><path d='M0 0h24v24H0z' fill='none'></path></svg></button></span>";

                        resultChips += htmlChip1 + value + htmlChip2;
                        arrayChips.push(value);
                        idx++;
                    }
                });
                $(divChips).append(resultChips);
                $(this).val("");
            } else {
                if (txtItems !== "" && txtItems !== ";" && txtItems !== " " && txtItems !== " ;") {
                    lenghtDivChips = $(divChips).find("span#id_chip").length;

                    htmlChip1 = "<span class='mdl-chip mdl-chip--deletable' id='id_chip' id-item='" + (lenghtDivChips + 1) + "'><span class='mdl-chip__text'>";
                    htmlChip2 = "</span><button type='button' class='mdl-chip__action' id='id_cancel_chip_desejo_aprender' id-item='" + (lenghtDivChips + 1) + "'><svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' fill='#fff'><path d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'></path><path d='M0 0h24v24H0z' fill='none'></path></svg></button></span>";
                    $(divChips).append(htmlChip1 + txtItems + htmlChip2);

                    arrayChips.push(txtItems);
                    $(this).val("");
                }
            }
            inserirChipsDesejoAprender(arrayChips);

            chips = $("span#id_chip");
            $.each(chips, function (key, value) {
                $(value).attr("id-item", key + 1);
                $(value).find("button").attr("id-item", +key + 1);
            });
        }
    });

    $(document).off("click", "#id_cancel_chip_desejo_aprender").on("click", "#id_cancel_chip_desejo_aprender", function () {
        var currentIdElement = Number($(this).attr("id-item"));
        var currentChip = $("#id_chip[id-item='" + currentIdElement + "']");
        var divChips = $("#id_div_chips_desejo_aprender");
        var htmlReturn;
        htmlReturn = "<div class='div_content_2_2_4_1' id='id_div_txt_sem_dados_chips'>" +
            "      <span class='span_15_2_1' id='id_txt_sem_dados_chips'>Não existe nada por aqui, adicione algumas coisas que deseja aprender...</span>" +
            "</div>";

        currentChip.remove();

        if ($(divChips).find("span#id_chip").length === 0) {
            $(divChips).html(htmlReturn);
        }
        excluirChipsDesejoAprender(currentIdElement);

    });

    function inserirChipsDesejoAprender(arrayChips) {
        $.ajax({
            method: "POST",
            url: "./Controller/Router.php",
            dataType: "text",
            data:
                {
                    p_Params: arrayChips,
                    p_Action: "insertChips",
                    p_Controller: "DesejoAprenderController"
                },
            success: function (value) {
                if (value.match(/true/)) {
                    alert("Foi....");
                }
                if (value.match(/false/)) {
                    alert("Não foi possível cadastrar, consulte o log");
                }
            }
        });
    }

    function excluirChipsDesejoAprender(idChip) {
        $.ajax({
            method: "POST",
            url: "./App/Controller/Router.php",
            dataType: "text",
            data:
                {
                    p_Params: idChip,
                    p_Action: "deleteChip",
                    p_Controller: "DesejoAprenderController"
                },
            success: function (value) {
                if (value.match(/true/)) {
                    alert("Foi...");
                }
                if (value.match(/false/)) {
                    alert("Não foi possível excluir, consulte o log");
                }
            }
        });
    }

// endregion

// ===========================================================================================
// ====================================  EVENTOS DO TECLADO ==================================
// ===========================================================================================

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {

            var activeModal = $("#id_container_modal");

            if ($(activeModal).css("display") === "block") {
                $(activeModal).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
                    $(activeModal).removeClass(FADE_OUT_DOWN);
                    $(activeModal).hide();
                    $(bg_branco).fadeOut(200);
                    $(body).css("overflow", "");
                    $(body).css("width", "");
                    $(barraTopo).css("width", "");
                });
            }
        }
    });

// $(document).bind('keypress', function(event) {
//     if( event.which === 65 && event.shiftKey ) {
//         alert('you pressed SHIFT+A');
//     }
// });


// ===========================================================================================
// ============================  FUNÇÕES DE MANIPULAÇÃO DOS MODAIS ===========================
// ===========================================================================================

    function showBackgroundBranco(callback) {
        $(bg_branco).fadeIn(200, function () {
            $(loader).fadeIn(200, function () {
                $(contentModal).html("");
                callback();
            });
        });
    }

    function showModal(FILE_MODAL, params, callback) {

        $(contentModal).load(PATH_MODAL + FILE_MODAL, {
            p_Params: params
        }, function () {

            $(body).css("overflow", "hidden");

            if ($(window).outerWidth() > 799) {
                $(body).css("width", "calc(100% - 16.8px)");
                $(barraTopo).css("width", "calc(100% - 16.8px)");
            }

            $(loader).fadeOut(200);
            $(containerModal).show();

            $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                $(containerModal).removeClass(FADE_IN_UP);
            });

            callback ? callback() : false;
        });
    }

    function hideModal(modal_display, callback) {

        if (!modal_display) {
            $(containerModal).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
                $(containerModal).removeClass(FADE_OUT_DOWN).hide();
                $(bg_branco).fadeOut(200);
                $(body).css("overflow", "").css("width", "");
                $(barraTopo).css("width", "");
            });
        } else {
            $(containerModal).addClass(FADE_OUT_DOWN).one(ANIMATION_END, function () {
                $(containerModal).removeClass(FADE_OUT_DOWN).hide();

                $(loader).fadeIn(200, function () {
                    $(contentModal).html("");
                });
            });
        }
        callback ? callback() : false;
    }

// ===========================================================================================
// ===================  AÇÕES DO MENU DE ADICIONAR ITENS DE APRESENTAÇÃO =====================
// ===========================================================================================

    $(sectionContentMain).off("click", "div#id_btn_adicionar_itens_apresentacao").on("click", "div#id_btn_adicionar_itens_apresentacao", function () {

        $("#id_content_modal").attr("origin-click", "add");
        $(window).outerWidth() > 799 ? $(contentModal).css("width", "500px") : null;

        showBackgroundBranco(function () {
            showModal(FILE_MODAL_ITENS_APRESENTACAO);
        });
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_itens_apresentacao").on("click", "#id_btn_cancelar_modal_itens_apresentacao", function (e) {

        hideModal(false);

        e.preventDefault();

    });

    $(contentModal).off("click", "#id_btn_item_dados_profissionais").on("click", "#id_btn_item_dados_profissionais", function (e) {

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_DADOS_PROFISSIONAIS);
            }, 500);
        });

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_dados_profissionais").on("click", "#id_btn_cancelar_modal_dados_profissionais", function (e) {
        var loadModalApresentacao;
        $("#id_content_modal").attr("origin-click") === "edit" ? loadModalApresentacao = false : loadModalApresentacao = true;

        hideModal(loadModalApresentacao, function () {
            window.setTimeout(function () {
                if (loadModalApresentacao) {
                    showModal(FILE_MODAL_ITENS_APRESENTACAO);
                }
            }, 500);
        });

        e.stopPropagation();

    });

    $(contentModal).off("click", "#id_btn_salvar_modal_dados_profissionais").on("click", "#id_btn_salvar_modal_dados_profissionais", function (e) {

        var arrayDadosProfissionais;

        arrayDadosProfissionais = {
            "arr_nome_empresa": $("#id_txt_nome_empresa").val(),
            "arr_nome_cargo": $("#id_txt_cargo_empresa").val(),
            "arr_data_inicio": $("#id_txt_ano_inicio_cargo").val(),
            "arr_data_termino": $("#id_txt_ano_termino_cargo").val()
        };

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_ITENS_APRESENTACAO);
                salvarDadosProfissionais(arrayDadosProfissionais);
            }, 500);
        });

        e.stopPropagation();
    });

    function salvarDadosProfissionais(arrayDadosProfissionais) {

        $.ajax({
            method: "POST",
            url: "./Controller/Router.php",
            dataType: "text",
            data:
                {
                    p_Params: arrayDadosProfissionais,
                    p_Action: "insertProfessionalData",
                    p_Controller: "ApresentacaoController"
                },
            success: function (value) {
                if (value.match(/true/)) {

                    $(lblTxtBarraNotificacaoBottom).html("Dados cadastrados com sucesso.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
                if (value.match(/false/)) {
                    $(lblTxtBarraNotificacaoBottom).html("Não foi possível cadastrar os dados.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
            }
        });
    }

    $(contentModal).off("click", "#id_btn_item_formacao_educacional").on("click", "#id_btn_item_formacao_educacional", function (e) {

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_FORMACAO_EDUCACIONAL);
            }, 500);
        });

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_salvar_modal_formacao_educacional").on("click", "#id_btn_salvar_modal_formacao_educacional", function (e) {

        var arrayFormacaoEducacional;

        arrayFormacaoEducacional = {
            "arr_Instituicao": $("#id_txt_nome_instituicao").val(),
            "arr_AreaEspecializacao": $("#id_txt_area_estudo").val(),
            "arr_DataInicioCurso": $("#id_txt_ano_inicio_curso").val(),
            "arr_DataTerminoCurso": $("#id_txt_ano_termino_curso").val(),
            "arr_DescricaoCurso": $("#id_txt_descricao_curso").val()
        };

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_ITENS_APRESENTACAO);
                salvarDadosFormacaoEducacional(arrayFormacaoEducacional);
            }, 500);
        });

        e.stopPropagation();
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_formacao_educacional").on("click", "#id_btn_cancelar_modal_formacao_educacional", function (e) {

        var loadModalApresentacao;
        $("#id_content_modal").attr("origin-click") === "edit" ? loadModalApresentacao = false : loadModalApresentacao = true;

        hideModal(loadModalApresentacao, function () {
            window.setTimeout(function () {
                if (loadModalApresentacao) {
                    showModal(FILE_MODAL_ITENS_APRESENTACAO);
                }
            }, 500);
        });

    });

    function salvarDadosFormacaoEducacional(arrayFormacaoEducacional) {

        $.ajax({
            method: "POST",
            url: "./Controller/Router.php",
            dataType: "text",
            data:
                {
                    p_Params: arrayFormacaoEducacional,
                    p_Action: "insertSchoolData",
                    p_Controller: "ApresentacaoController"
                },
            success: function (value) {
                if (value.match(/true/)) {

                    $(lblTxtBarraNotificacaoBottom).html("Dados cadastrados com sucesso.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
                if (value.match(/false/)) {
                    $(lblTxtBarraNotificacaoBottom).html("Não foi possível cadastrar os dados.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
            }
        });
    }

    $(contentModal).off("click", "#id_btn_item_dados_contato").on("click", "#id_btn_item_dados_contato", function (e) {

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_DADOS_CONTATO);
            }, 500);
        });

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_salvar_modal_dados_contato").on("click", "#id_btn_salvar_modal_dados_contato", function (e) {

        var arrayDadosContato;

        arrayDadosContato = {
            "arr_Celular": $("#id_txt_celular").val(),
            "arr_Email": $("#id_txt_email").val(),
            "arr_CEP": $("#id_txt_cep").val()
        };

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_ITENS_APRESENTACAO);
                salvarDadosContato(arrayDadosContato);
            }, 500);
        });

        e.stopPropagation();
    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_dados_contato").on("click", "#id_btn_cancelar_modal_dados_contato", function (e) {

        var loadModalApresentacao;
        $("#id_content_modal").attr("origin-click") === "edit" ? loadModalApresentacao = false : loadModalApresentacao = true;

        hideModal(loadModalApresentacao, function () {
            window.setTimeout(function () {
                if (loadModalApresentacao) {
                    showModal(FILE_MODAL_ITENS_APRESENTACAO);
                }
            }, 500);
        });

    });

    function salvarDadosContato(arrayDadosContato) {

        $.ajax({
            method: "POST",
            url: "./Controller/Router.php",
            dataType: "text",
            data:
                {
                    p_Params: arrayDadosContato,
                    p_Action: "insertSchoolData",
                    p_Controller: "ApresentacaoController"
                },
            success: function (value) {
                if (value.match(/true/)) {

                    $(lblTxtBarraNotificacaoBottom).html("Dados cadastrados com sucesso.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
                if (value.match(/false/)) {
                    $(lblTxtBarraNotificacaoBottom).html("Não foi possível cadastrar os dados.");
                    $(barraNotificacaoBottom).fadeIn(200);
                    window.setTimeout(function () {
                        $(barraNotificacaoBottom).fadeOut(200);
                    }, 5000);

                    $(loader).fadeOut(200);
                    $(containerModal).show();
                    $(containerModal).addClass(FADE_IN_UP).one(ANIMATION_END, function () {
                        $(containerModal).removeClass(FADE_IN_UP);
                    });
                }
            }
        });
    }

    $(sectionContentMain).off("click", "#id_btn_editar_item_apresentacao").on("click", "#id_btn_editar_item_apresentacao", function (e) {
        var fileModal = $(this).attr("modal-name");

        $(window).outerWidth() > 799 ? $(contentModal).css("width", "500px") : null;

        $("#id_content_modal").attr("origin-click", "edit");

        showBackgroundBranco(function () {
            showModal(fileModal + ".php");
        });

        e.preventDefault();
    });

// ===========================================================================================
// =============================  AÇÕES DO MODAL DE EDITAR PERFIL ============================
// ===========================================================================================

    $(sectionContentMain).off("click", "#id_btn_editar_perfil").on("click", "#id_btn_editar_perfil", function (e) {

        $(window).outerWidth() > 799 ? $(contentModal).css("width", "630px") : null;

        showBackgroundBranco(function () {
            showModal(FILE_MODAL_EDITAR_PERFIL);
        });

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_txt_editar_perfil_sexo").on("click", "#id_txt_editar_perfil_sexo", function (e) {

        var lblValSexo = $("#id_txt_val_sexo").html();
        var itemListSexo = $("div#id_item_select_sexo");
        var currentPositionTop = "";

        if (lblValSexo !== "") {
            $.each(itemListSexo, function (key, item) {
                if (lblValSexo === $(item).find("span").html()) {
                    currentPositionTop = $(item).attr("position-top");
                }
            });
        } else {
            currentPositionTop = "425px";
        }

        $("#id_lista_sexo").css("top", currentPositionTop)
            .fadeIn(200);

        e.stopPropagation();
    });

    $(contentModal).off("click", "#id_item_select_sexo").on("click", "#id_item_select_sexo", function (e) {

        var currentTextItem = $(this).find("span").html();
        var currentValItem = $(this).find("span").attr("value");
        var lblValSexo = $("#id_txt_val_sexo");
        var lblSexo = $("#id_txt_label_sexo");
        var listaSexo = $("#id_lista_sexo");

        $(lblValSexo).html(currentTextItem);
        $(lblValSexo).attr("value", currentValItem);
        $(lblSexo).hide();
        $(lblValSexo).show();
        $(listaSexo).fadeOut(200);

        e.stopPropagation();

    });

    $(contentModal).off("click", "#id_btn_cancelar_modal_editar_perfil").on("click", "#id_btn_cancelar_modal_editar_perfil", function (e) {

        hideModal(false);

        $(contentModal).css("width", "500px");

        e.stopPropagation();

    });

    $(contentModal).off("click", "div#id_div_btn_editar_img").on("click", "div#id_div_btn_editar_img", function (e) {

        var tipo = $(this).attr("tipo");
        $(contentModal).attr("modal-img-edit", tipo);

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_CORTAR_IMAGEM, null, function () {
                    tipo === "capa" ? $("#id_span_txt_carregar_foto").html("Carregue uma foto de capa...") : $("#id_span_txt_carregar_foto").html("Carregue uma foto sua...");
                });
            }, 500);
        });

        e.preventDefault();
    });

    $(contentModal).off("click", "#id_btn_upload_file_modal_crop_image").on("click", "#id_btn_upload_file_modal_crop_image", function (e) {
        $("#id_input_file_modal_cortar_imagem").trigger("click");
        e.stopPropagation();
    });

    $(contentModal).off("click", "#id_btn_adicionar_nova_imagem").on("click", "#id_btn_adicionar_nova_imagem", function (e) {
        $("#id_input_file_modal_cortar_imagem").trigger("click");
        e.stopPropagation();
    });

    $(contentModal).off("click", "#id_btn_fechar_modal_corte_imagem_perfil").on("click", "#id_btn_fechar_modal_corte_imagem_perfil", function (e) {

        hideModal(true, function () {
            window.setTimeout(function () {
                showModal(FILE_MODAL_EDITAR_PERFIL);
            }, 500);
        });
        e.stopPropagation();
    });


    // ===========================================================================================
    // =======  AÇÕES DOS BOTÕES DE AVANÇAR E RETROCEDER A ABA DE MÓDULOS NA TELA DE AULAS =======
    // ===========================================================================================
    $(sectionContentMain).off("click", "#id_btn_tabs_modulos_left").on("click", "#id_btn_tabs_modulos_left", function (e) {
        var itensTabs = $("#id_tabs_modulos_aulas").find("div#id_tab_modulo");
        var widthItens = 0;
        var widthVisible = $("#id_container_opcoes").width();
        var currentLeft = Number($("#id_tabs_modulos_aulas").css("left").replace("px", ""));

        $.each(itensTabs, function (key, value) {
            widthItens += $(value).outerWidth();
        });

        if (Math.abs(currentLeft) <= widthVisible) {
            $("#id_tabs_modulos_aulas").animate({"left": "+=" + Math.abs(currentLeft) + "px"}, "fast", function () {
                $("#id_btn_tabs_modulos_right").fadeIn(200);
                $("#id_btn_tabs_modulos_left").fadeOut(200);
            });
        } else {
            $("#id_tabs_modulos_aulas").animate({"left": "+=" + widthVisible + "px"}, "fast", function () {
                $("#id_btn_tabs_modulos_right").fadeIn(200);
            });
        }

        e.stopPropagation();
    });

    $(sectionContentMain).off("click", "#id_btn_tabs_modulos_right").on("click", "#id_btn_tabs_modulos_right", function (e) {
        var itensTabs = $("#id_tabs_modulos_aulas").find("div#id_tab_modulo");
        var widthItens = 0;
        var widthVisible = $("#id_container_opcoes").width();
        var currentLeft = Number($("#id_tabs_modulos_aulas").css("left").replace("px", ""));

        $.each(itensTabs, function (key, value) {
            widthItens += $(value).outerWidth();
        });

        if (Math.abs(currentLeft) + widthVisible < widthItens) {
            if (widthItens - (Math.abs(currentLeft) + widthVisible) < widthVisible) {
                $("#id_tabs_modulos_aulas").animate({"left": "-=" + (widthItens - (Math.abs(currentLeft) + widthVisible)) + "px"}, "fast", function () {
                    $("#id_btn_tabs_modulos_right").fadeOut(200);
                    $("#id_btn_tabs_modulos_left").fadeIn(200);
                });
            } else {
                $("#id_tabs_modulos_aulas").animate({"left": "-=" + (widthVisible) + "px"}, "fast", function () {
                    if (Number($("#id_tabs_modulos_aulas").css("left").replace("px", "")) < 0) {
                        $("#id_btn_tabs_modulos_left").fadeIn(200);
                    }
                });
            }
        }
        e.stopPropagation();
    });
});