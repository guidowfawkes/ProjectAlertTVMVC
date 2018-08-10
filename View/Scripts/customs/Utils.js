var Utils = new (function () {

    this.RoundNumber = function (number) {
        if (number != undefined) {
            if (number <= 5) {
                Math.round(number);
            } else {
                Math.ceil(number)
            }
        }
        return number;
    }

    this.converDateFromSQLServerDate = function (SQLServerDate) {
        if (SQLServerDate != undefined && SQLServerDate != null) {
            SQLServerDate = SQLServerDate.split('T');
            var date_result = '';
            var hour_result = '';

            // data
            var SQLServer_Date = SQLServerDate[0].trim();
            var date = SQLServer_Date.split('-');
            date_result = date[2] + '/' + date[1] + '/' + date[0];

            // hora
            if (SQLServerDate[1] != undefined) {
                hour_result = SQLServerDate[1];
                return date_result + ' ' + hour_result;
            } else {
                return date_result;
            }
        }
    };

    this.convertJustDateFromSQLServerDate = function (SQLServerDate) {
        if (SQLServerDate != undefined && SQLServerDate != null && SQLServerDate != "") {
            SQLServerDate = SQLServerDate.split('T');
            var date_result = '';
            var hour_result = '';

            // data
            var SQLServer_Date = SQLServerDate[0].trim();
            var date = SQLServer_Date.split('-');
            date_result = date[2] + '/' + date[1] + '/' + date[0];
            return date_result;
        }
    };


    this.GetDateObjFromSQLServerDateTime = function (dateTime) {
        if (dateTime != undefined && dateTime != null) {
            dateTime = dateTime.split('T');

            // data
            var date = dateTime[0].trim();
            var dateSplited = date.split('-');

            // Hora
            var time = dateTime[1].trim();
            var timeSplited = time.split(':');

            return new Date(dateSplited[0], dateSplited[1] - 1, dateSplited[2], timeSplited[0], timeSplited[1], timeSplited[2]);
        }
    };

    this.GetNowDateString = function () {
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        return (day + "/" + month + "/" + year);
    };

    this.GetDateObjFromDateString = function(dateString) {
        if (dateString != undefined && dateString != "") {
            dateString = dateString.split(' '); 
            var date = dateString[0].split('/');
            var time = undefined;
            if (dateString.length > 1 && dateString[1].indexOf(":") !== -1) {
                time = dateString[1].split(':');
            }
            
            return new Date(date[2], date[1] - 1, date[0], time != undefined ? time[0] : 0, time != undefined ? time[1] : 0, time != undefined ? time[2] : 0);
        }
    };

    this.GetDateFormDateObj = function (dateObj) {
        if (dateObj != undefined) {
            var dia = dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate();
            var mes = dateObj.getMonth() + 1 > 9 ? dateObj.getMonth() + 1 : "0" + (dateObj.getMonth() + 1);
            var ano = dateObj.getFullYear();
            var hora = dateObj.getHours() > 9 ? dateObj.getHours() : "0" + dateObj.getHours();
            var minuto = dateObj.getMinutes() > 9 ? dateObj.getMinutes() : "0" + dateObj.getMinutes();
            var segundo = dateObj.getSeconds() > 9 ? dateObj.getSeconds() : "0" + dateObj.getSeconds();

            return dia
                + "/" + mes
                + "/" + ano
                + " " + hora
                + ":" + minuto
                + ":" + segundo;
        }
    }

    this.GetDateFormDateObjNotSeconds = function (dateObj) {
        if (dateObj != undefined) {
            var dia = dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate();
            var mes = dateObj.getMonth() + 1 > 9 ? dateObj.getMonth() + 1 : "0" + (dateObj.getMonth() + 1);
            var ano = dateObj.getFullYear();
            var hora = dateObj.getHours() > 9 ? dateObj.getHours() : "0" + dateObj.getHours();
            var minuto = dateObj.getMinutes() > 9 ? dateObj.getMinutes() : "0" + dateObj.getMinutes();

            return dia
                + "/" + mes
                + "/" + ano
                + " " + hora
                + ":" + minuto
        }
    }

    this.GetMonthString = function (dateObj) {
        if (dateObj != undefined) {
            var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            return months[dateObj.getMonth()];
        }
    }

    this.GetTimeFromDateObj = function (dateObj) {
        if (dateObj != undefined) {
            var hora = dateObj.getHours();
            var minutos = dateObj.getMinutes();
            var segundos = dateObj.getSeconds();

            if (minutos < 10) {
                minutos = "0" + minutos.toString();
            }

            if (hora < 10) {
                hora = "0" + hora.toString();
            }

            if (segundos < 10) {
                segundos = "0" + segundos.toString();
            }

            return [hora, minutos, segundos];
        }
    }

    this.GetDateArrayFromDateObj = function (dateObj) {
        if (dateObj != undefined) {
            var dia = dateObj.getDate();
            var mes = dateObj.getMonth() + 1;
            var ano = dateObj.getFullYear();

            if (dia < 10) {
                dia = "0" + dia.toString();
            }

            if (mes < 10) {
                mes = "0" + mes.toString();
            }

            return [dia, mes, ano];
        }
    }

    this.convertBase64toBlob = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    this.convertDateFromNfe = function (nfeDate) {
        var nfe_date = nfeDate.trim();
        var nfe_just_date = nfe_date.split('T');
        var date = nfe_just_date[0].split('-');
        var date_result = date[2] + '/' + date[1] + '/' + date[0];

        return date_result;
    };

    String.prototype.replaceAll = String.prototype.replaceAll || function (needle, replacement) {
        return this.split(needle).join(replacement);
    };

    this.convertMoedaBrToDouble = function (valor) {
        if (valor != undefined && typeof valor == "string") {
            valor = valor.trim();

            valor = valor.split(".").join("");
            valor = valor.split(",").join(".")

            if (valor == '')
                valor = 0;

            valor = Number(valor);
        } else if(typeof valor == "number"){
            return 0;
        }

        return valor;
    };

    this.convertDoubleToMoedaBr = function (valor) {
        if(valor != undefined && typeof valor == "number") {
            valor = valor.toFixed(2);
            valor = valor.toString();
            valor = valor.trim();
            var valorSplited = valor.split(".");
            var inteiros = valorSplited[0];
            var decimais = "";
            if (valorSplited.length > 1) {
                decimais = valorSplited[1];
            }

            var inteirosFormated = "";
            var numPontos = 0;
            var count = 0;
            for (var i = inteiros.length - 1; i >= 0; i--) {
                inteirosFormated = inteiros[i] + inteirosFormated;
                count++;
                if (count == 3 && i > 0) {
                    inteirosFormated = "." + inteirosFormated;
                    count = 0;
                } 
            }

            valor = inteirosFormated + "," + decimais;
            
        } else if (typeof valor != "string" ) {
            valor = "0,00";
        }
        return valor;
    };

    this.jsonIsEmpty = function (obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    };

    this.formToJson = function (form) {
        var form = $(form);
        var data = form.serializeArray();
        var newData = {};

        for (var i = 0 in data) {
            newData[data[i].name] = data[i].value;
        }

        return newData;
    };

    this.mediana = function (firstValue, lastValue) {
        if (lastValue > firstValue) {
            var values = lastValue - firstValue;
            var half = Math.floor(values / 2);

            return firstValue + half;
        } else {
            return null;
        }
    };

    this.MoneyToInt = function (str) {
        return parseInt(str.trim().replace(/[\D]+/g, ''));
    }

    this.PointsToMoney = function (str) {
        var charArry = str.trim().replace(/[\D]+/g, '').split('');
        var retorno = "";
        var count = 0;
        for (var i = charArry.length-1; i >= 0; i--) {
            if (i == charArry.length-1) {
                retorno += charArry[i];
                retorno += charArry[i - 1] + ",";
                i = i - 2;                
            }
            retorno += charArry[i];
            count++

            if (count == 3 && i - 1 >= 0)
            {
                count = 0
                retorno += ".";
            }
        }
        return retorno.split('').reverse().join("");
    }

    this.IntToReal = function (int) {
        var tmp = int + '';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }

    this.daysInMonth = function (month, year) {
        var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month != 2) return m[month - 1];
        if (year % 4 != 0) return m[1];
        if (year % 100 == 0 && year % 400 != 0) return m[1];

        return m[1] + 1;
    }

    this.limitText = function(text,length) {
       if (text != "" && text != undefined && text != null) {
           var textLength = text.length;
           if (textLength > length) {
               return text.substring(0, length) + "...";
           } else {
               return text;
           } 
       } else {
            return " - ";
       }
    }

    this.isNullOrEmpty = function (json) {
        if (json != undefined
            && json != null
            && json != "")
            return false;
        else
            return true;
    }

    this.pad_right_with_zeroes = function (text, length) {

        var my_string = '' + text;
        while (my_string.length < length) {
            my_string = my_string + '0';
        }

        return my_string;

    }

    this.JsonToCSharpObj = function (json) {
        if (json != undefined) {
            for (var key in json) {
                var value = json[key];

            } 
        }
    }

    this.CNPJMask = function (value) {
        return value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5");
    }

    this.GetFormData = function ($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    /*
        Importa um script asincronicamente
    */
    this.LoadScripts = function (url,callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        if (callback != undefined) {
            script.onreadystatechange = callback;
            script.onload = callback;

        }
        head.appendChild(script);
    }

    this.EnableTextScroll = function () {
        $.fn.scrolltxt = function () {
            var options = $.extend({
                speed: 30
            }, arguments[0] || {});

            return this.each(function () {
                var span = $(this);

                if (span.width() > span.parent().width()) {
                    var scroll_text = setInterval(function () {
                        scrollText();
                    }, options.speed);
                }

                var scrollText = function () {
                    if (span.width() > span.parent().width()) {
                        var width = span.width(),
                            left = span.position().left - 1;
                        left = -left > width ? span.width() : left;
                        span.css({
                            left: left
                        });
                    } else {
                        resetToDefault();
                    }
                };

                var resetToDefault = function () {
                    span.css({
                        left: 0
                    });
                };

            });
        };
    }

    this.GetCurrentDomain = function () {
        var url = window.location.href;
        var arr = url.split("/");
        var result = arr[0] + "//" + arr[2];
        return result;
    }

    this.Interval = function(func, wait, times) {
        var interv = function (w, t) {
            return function () {
                if (typeof t === "undefined" || t-- > 0) {
                    setTimeout(interv, w);
                    try {
                        func.call(null);
                    }
                    catch (e) {
                        t = 0;
                        throw e.toString();
                    }
                }
            };
        }(wait, times);

        setTimeout(interv, wait);
    };

    //Pega o fim do scroll de uma div e realiza um callback
    this.InAndScrollExecute = function (divBase, callBack) {
        var divBase = divBase;
        divBase.bind('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
                callBack();
            }
        });
    }

    //-------------------- GOOGLE MAPS----------------------
    //<script async defer src="https://maps.googleapis.com/maps/api/js?key=<gerar_no_google_developers>"></script>

    // Adiciona um marcador em um endereço dentro de um mapa
    this.SetEnderecoOnMap = function (endereco, googleMap) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': endereco }, function (result, status) {
            if (status === 'OK') {
                googleMap.setCenter(result[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: googleMap,
                    position: result[0].geometry.location
                });
            } else {
                alert('Não foi possivel encontrar o endeço informado!');
            }
        });
    }

    this.Unserialize = function(query) {
        var pairs, i, keyValuePair, key, value, map = {};
        // remove leading question mark if its there
        if (query.slice(0, 1) === '?') {
            query = query.slice(1);
        }
        if (query !== '') {
            pairs = query.split('&');
            for (i = 0; i < pairs.length; i += 1) {
                keyValuePair = pairs[i].split('=');
                key = decodeURIComponent(keyValuePair[0]);
                value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
                map[key] = value;
            }
        }
        return map;
    }

    this.FullscreenToggle = function() {
        var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    this.SendPost = function(path, params, method, target) {
        method = method || "post"; // Set method to post by default if not specified.
        target = target || "_blank";

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("target", target);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

})();