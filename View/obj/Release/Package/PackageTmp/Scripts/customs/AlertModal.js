var AlertModal = new function() {
    
    var _self = this;

    this.MessageHtml = undefined;

    this.Width = undefined;

    this.Modal = undefined;

    this.Open = function (msgHtml, callbackSim, callbackNao, width) {
        _self.MessageHtml = msgHtml;
        _self.Width = width;
        _self.RenderModal(callbackSim, callbackNao);
        _self.RenderMessage();
        _self.Modal.modal("show");
    }

    this.Close = function () {
        _self.Modal.modal("hide");
    }

    this.RenderModal = function (callbackSim, callbackNao) {
        var body = $('body');

        _self.Modal = $('<div>')
            .attr('id', 'alertModal')
            .attr('role', 'dialog')
            .attr('aria-hidden', 'false')
            .addClass('modal fade slide-up')
            .appendTo(body);

        var moda_dialog = $('<div>')
            .addClass('modal-dialog')
            .appendTo(_self.Modal);

        if (_self.Width != undefined) {
            moda_dialog.css("width", _self.Width);
        }

        var modal_content_wrapper = $('<div>')
            .addClass('modal-content-wrapper')
            .appendTo(moda_dialog);

        var modal_content = $('<div>')
            .addClass('modal-content')
            .appendTo(modal_content_wrapper);

        var modal_header = $('<div>')
            .addClass('modal-header clearfix text-left')
            .css({
                "padding": "4px 10px 4px 10px",
                "background-color": "#1f1f1f",
                "color":"white"
            })
            .appendTo(modal_content);

        var close_button = $('<div>')
            .attr('type', 'button')
            .attr('data-dismiss', 'modal')
            .attr('aria-hidden', 'true')
            .text("x")
            .addClass('close')
            .appendTo(modal_header);

        $('<i>')
            .addClass('pg-close fs-14')
            .appendTo(close_button);

        $('<h4>')
            .addClass('text-center')
            .text('Atenção')
            .appendTo(modal_header);

        $('<div>')
            .addClass('modal-body')
            .appendTo(modal_content);

        var modalFooter = $('<div>')
            .addClass('modal-footer')
            .css("border-top","0px")
            .appendTo(modal_content);

        var modalFooterLine = $("<div>")
            .addClass("row")
            .appendTo(modalFooter);

        var modalFooterCol = $("<div>")
            .addClass("col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right")
            .appendTo(modalFooterLine);

        if (callbackSim == undefined || callbackNao == undefined) {
            $("<button>")
                .addClass("btn btn-success")
                .attr("data-dismiss","modal")
                .text("OK")
                .appendTo(modalFooterCol);
        } else {
            $("<button>")
                .addClass("btn btn-success")
                .text("Sim")
                .on("click", function (e) {
                    callbackSim();
                })
                .appendTo(modalFooterCol);

            $("<button>")
                .addClass("btn btn-default")
                .text("Não")
                .on("click", function (e) {
                    callbackNao();
                })
                .appendTo(modalFooterCol);
        }

    }

    _self.RenderMessage = function () {
        var body = _self.Modal.find(".modal-body");

        var line = $("<div>")
            .addClass("row")
            .appendTo(body);

        var col = $("<div>")
            .addClass("col-lg-12 col-md-12 col-sm-12 col-xs-12")
            .appendTo(line)
            .append(_self.MessageHtml);
    }

    this.RegisterEvents = function () {
        _self.Modal.on("hidden.bs.modal", function (e) {
            _self.Modal = undefined;
            _self.MessageHtml = undefined;
        });
    }

}();