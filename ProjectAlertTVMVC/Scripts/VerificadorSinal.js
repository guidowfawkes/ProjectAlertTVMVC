var verificarSinal = function () {
    var macs = [];
    $(".clientes").each(function (index) {
        var cliente = $(this);

        var mac = {
            Id: parseInt(cliente.attr("id")),
            Mac: cliente.attr("data-mac")
        };
        macs.push(mac);
    });
    verificarSinalRemoto(macs);
};

var verificarSinalRemoto = function (macs) {
    var url = "/Home/GetSinal";
    var data = { Macs: macs };
    $.post(url, data, function (res) {
        var res = JSON.parse(res);
        if (res.status == "success") {
            for(var i in res.data) {
                var cliente = res.data[i];
                var divCliente = $(".clientes[id=" + cliente.Id + "]").first();
                if (!cliente.Erro) {
                    var retorno = JSON.parse(cliente.Retorno);
                    var sinal1 = ((retorno.sinal1) * 100).toFixed(2);
                    var sinal2 = ((retorno.sinal2) * 100).toFixed(2);
                    var sinalBom = retorno.sinal1 + retorno.sinal2 > 0;

                    divCliente.find(".sinal1")
                        .css({ "display": "block" })
                        .text(sinal1 + "%");

                    divCliente.find(".sinal2")
                        .css({ "display": "block" })
                        .text(sinal2 + "%");

                    if (sinalBom) {
                        divCliente.find(".mac-panel")
                           .css({ 'background-color': 'green', 'color': 'white' });
                    }
                    else {
                        divCliente.find(".mac-panel")
                            .css({ 'background-color': 'red', 'color': 'white' });
                    }
                } else {
                    divCliente.find(".sinal1")
                        .css({ "display": "block" })
                        .text("NAO ENCONTRADO");

                    divCliente.find(".sinal2")
                        .css({ "display": "block" })
                        .text("NAO ENCONTRADO");
                        
                    divCliente.find(".mac-panel")
                           .css({ 'background-color': '#ff8d00', 'color': 'white' });
                }
            }
            
            console.log(sinal1);
        }
    })
    .fail(function(err){
        console.log(err.statusText);
    });
};

$(document).ready(function () {
    verificarSinal();
    //setTimeout(verificarSinal, 30000);
});