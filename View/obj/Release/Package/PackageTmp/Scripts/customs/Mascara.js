var Mascara = new function(){

    var _self = this;

    this.addMascaras = function(form) {

        if(form != '' && form != undefined) {
            if(form.length > 0) {

                //Mac-Address
                if ($("input[data-type='macAdress']").length > 0)
                    $("input[data-type='macAdress']").mask('**-**-**-**-**-**');

                //Cpf
                if($("input[data-type='cpf']").length > 0)
                    $("input[data-type='cpf']").mask('999.999.999-99');

                //Cnpj
                if($("input[data-type='cnpj']").length > 0)
                    $("input[data-type='cnpj']").mask('99.999.999/9999-99');

                //Tipo de Cliente
                if($("input[data-type='cpf_cnpj']").length > 0) {
                    var value = $("select[data-type='tipo_pessoa']").val();

                    switch(value) {
                        case '1':
                            $("input[data-type='cpf_cnpj']").mask('99.999.999/9999-99');
                            break;

                        case '2':
                            $("input[data-type='cpf_cnpj']").mask('999.999.999-99');
                            break;
                    }

                    // Evento ao atualizar o tipo Cliente
                    $("select[data-type='tipo_pessoa']").on('change', function(e) {
                        var value = $(this).val();

                        $("input[data-type='cpf_cnpj']").unmask();
                        switch(value) {
                            case '1':
                                $("input[data-type='cpf_cnpj']").mask('99.999.999/9999-99');
                                break;

                            case '2':
                                $("input[data-type='cpf_cnpj']").mask('999.999.999-99');
                                break;
                        }
                    });
                }

                //Telefone Genérico
                if($("input[data-type='telefone']").length > 0)
                    $("input[data-type='telefone']").mask('(99) 9999-9999?9');

                //Telefone Comercial
                if($("input[data-type='telefone-comercial']").length > 0)
                    $("input[data-type='telefone-comercial']").mask('(99) 9999-9999');

                //Telefone Residencial
                if($("input[data-type='telefone-residencial']").length > 0)
                    $("input[data-type='telefone-residencial']").mask('(99) 9999-9999');

                //Telefone Celular
                if($("input[data-type='celular']").length > 0)
                    $("input[data-type='celular']").mask('(99) 99999-9999');

                //CEP
                if ($("input[data-type='cep']").length > 0)
                    $("input[data-type='cep']").mask('99.999-999');

                // Porcentagem de Tributos
                if ($("input[data-type='tributo-porcentagem']").length > 0)
                    $("input[data-type='tributo-porcentagem']").mask('99,99');

                //Valor Monetário
                if($("input[data-type='monetary']").length > 0) {
                    if ($("input[data-type='monetary']").hasClass("enable-empty")) {
                        $("input[data-type='monetary']").maskMoney({
                            symbol: 'R$ ',
                            showSymbol: true,
                            thousands: '.',
                            decimal: ',',
                            symbolStay: true,
                            allowZero: false,
                            defaultZero: false
                        });
                    } else {
                        $("input[data-type='monetary']").maskMoney({
                            symbol: 'R$ ',
                            showSymbol: true,
                            thousands: '.',
                            decimal: ',',
                            symbolStay: true,
                            allowZero: true,
                            defaultZero: true
                        });
                    }

                    $("input[data-type='monetary']").each(function (index) {
                        var initial_value = $(this).val();
                        if(initial_value != '') {
                            var init_val = initial_value.split('.');
                            var int_number = init_val[0];
                            var decimal_number = '';
                            if(init_val.length > 0) {
                                decimal_number = init_val[1];
                                if(decimal_number < 10) {
                                    decimal_number += '0';
                                }
                            }
                            $(this).val(int_number + '.' + decimal_number);

                            $(this).trigger("mask.maskMoney");
                        }
                    });

                }

            }
        }
    }

    this.MonetaryMask = function (input) {
        if (input != undefined && input.length > 0) {

            input.maskMoney({
                symbol: 'R$ ',
                showSymbol: true,
                thousands: '.',
                decimal: ',',
                symbolStay: true,
                allowZero: true,
                defaultZero: true
            });

            //var initial_value = input.val();
            //if (initial_value != '') {
            //    var init_val = initial_value.split('.');
            //    var int_number = init_val[0];
            //    var decimal_number = '';
            //    if (init_val.length > 0) {
            //        decimal_number = init_val[1];
            //        if (decimal_number < 10) {
            //            decimal_number += '0';
            //        }
            //    }
            //    input.val(int_number + '.' + decimal_number);
            //}

            input.trigger("mask.maskMoney");

        }
    }

}();
