/*
    Tipos de Notificações:
        success : Mensagens informado que alguma operação foi bem sucedida,
        error : Mensagens informando um erro,
        info : Mensagens meramente para informar alguma coisa ao usuario
        warning : Mensagens meramente para informar alguma coisa ao usuario
 */


var Messages =  new function() {

    var _self = this;

    var stack_bar_top = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };

    this.showAll = function(messages) {
        if (messages != '' && messages != null) {
            var nextDelay = 0;
            for (var i in messages) {
                var status = 'info';
                switch (messages[i].TipoMsg) {
                    case 1:
                        status = 'success';
                        break;
                    case 2:
                        status = 'warning';
                        break;
                    case 3:
                        status = 'error';
                        break;
                    case 4:
                        status = 'info';
                        break;
                }
                
                nextDelay += 2000;
                var notice = new PNotify({
                    title: messages[i].Msg,
                    text: messages[i].MsgTec,
                    type: status,
                    addclass: 'ui-pnotify-no-icon',
                    icon: false,
                    delay: nextDelay
                });
            }
        }
    };
}();
