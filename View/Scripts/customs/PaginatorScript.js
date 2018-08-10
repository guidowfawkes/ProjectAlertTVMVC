var Paginator = function () {

    var _self = this;

    var divBase;

    var callBackFunction;

    this.init = function (divBase, callBackFunction) {
        _self.divBase = divBase;
        _self.callBackFunction = callBackFunction;
    }

    this.renderPaginator = function (paginator) {

        if (_self.divBase.children('.datatables-footer').length > 0) {
            _self.divBase.children('.datatables-footer').remove();
        }

        var div_row_base = $('<div>')
            .addClass('row datatables-footer')
            .appendTo(_self.divBase);

        var div_base_page_itens = $('<div>')
            .addClass('col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-xs')
            .appendTo(div_row_base);

        var div_page_itens = $('<div>')
            .addClass('dataTables_info')
            .appendTo(div_base_page_itens);

        var div_page_itens_p = $('<p>')
            .text("Exibindo do  ")
            .appendTo(div_page_itens);

        var page_Itens = $('<b>')
            .text(paginator.FirstItemOfPage + ' ao ' + paginator.LastItemOfPage)
            .appendTo(div_page_itens_p);

        div_page_itens_p.append(" de " + paginator.CountItens + " Itens Encontrados");

        var div_base_pages_numbers = $('<div>')
            .addClass("col-lg-6 col-md-6 col-sm-12 col-xs-12 text-right")
            .appendTo(div_row_base);

        var div_pages_numbers = $('<div>')
            .addClass('dataTables_paginate paging_bs_norma')
            .appendTo(div_base_pages_numbers);

        var ul_page_numbers = $('<ul>')
            .addClass('pagination m-none')
            .appendTo(div_pages_numbers);

        if (paginator.PaginaAnterior > 0) {
            var li_volta = $('<li>')
                .addClass('prev')
                .appendTo(ul_page_numbers);

            var a_volta = $('<a>')
                .addClass('paginatorGo')
                .attr({ 'data-page': paginator.PaginaAnterior })
                .css("cursor", "pointer")
                .appendTo(li_volta);

            var span_voltar = $('<span>').addClass('fa fa-chevron-left').appendTo(a_volta);
        }
        else {
            var li_volta = $('<li>')
                .addClass('prev disabled')
                .appendTo(ul_page_numbers);

            var span_voltar = $('<span>')
                .addClass('fa fa-chevron-left')
                .appendTo(li_volta);
        }

        var i = 1;
        if (paginator.CountPages > 7 && (paginator.PaginaAtual - 3) > 1) {
            i = paginator.PaginaAtual - 3;
            if (paginator.CountPages - 6 < i) {
                i = paginator.CountPages - 6;
            }
        }

        var cont = 1;
        for (i; paginator.CountPages >= i && cont <= 7; i++) {
            cont++;
            if (paginator.PaginaAtual == i) {
                var li_numero = $('<li>')
                    .addClass('pagitation-item active')
                    .appendTo(ul_page_numbers);

                var a_numero = $('<a>')
                    .attr({ 'href': '#' })
                    .on("click", function (e) {
                        e.preventDefault();
                    })
                    .appendTo(li_numero);
                a_numero.append(i);
            } else {
                var li_numero = $('<li>')
                    .addClass('pagitation-item')
                    .appendTo(ul_page_numbers);

                var a_numero = $('<a>')
                    .addClass('paginatorGo')
                    .attr({ 'data-page': i })
                    .css("cursor", "pointer")
                    .appendTo(li_numero);
                a_numero.append(i);
            }
        }


        if (paginator.ProximaPagina > 0) {
            var li_avanca = $('<li>')
                .addClass('next')
                .appendTo(ul_page_numbers);

            var a_avanca = $('<a>')
                .addClass('paginatorGo')
                .attr({ 'data-page': paginator.ProximaPagina })
                .css("cursor", "pointer")
                .appendTo(li_avanca);

            var span_avanca = $('<span>')
                .addClass('fa fa-chevron-right')
                .appendTo(a_avanca);
        } else {
            var li_avanca = $('<li>')
                .addClass('next disabled')
                .appendTo(ul_page_numbers);

            var span_avanca = $('<span>')
                .addClass('fa fa-chevron-right')
                .appendTo(li_avanca);
        }

        $(_self.divBase).find(".paginatorGo").unbind("click");
        $(_self.divBase).find(".paginatorGo").on("click", function (e) {
            var page = $(this).attr('data-page');
            _self.callBackFunction(page, $(this));
            $(this).empty();
            $("<i>")
                .addClass("fa fa-spinner fa-spin")
                .appendTo($(this));
        });
    };

};