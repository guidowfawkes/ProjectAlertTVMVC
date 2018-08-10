var Blocker = new function() {

    var _self = this;

    this.BlockPage = function(msg) {
        $("body").block({
            message: msg != undefined ? msg: "",
            centerX: true,
            centerY: true,
            baseZ: 10000,
            css: {
                width: '600px',
                height: '300px',
                border: '3px solid #FF9900',
                backgroundColor: '#000',
                color: '#fff',
                padding: '25px'
            }
        });
    }

    this.UnblockPage = function() {
        $("body").unblock();
    }

}