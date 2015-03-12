

function Position(x, y)
{
    this.x = x;
    this.y = y;

}


function GameObject(){

    this.pos = new Position(0, 0);


    this.draw = function(ctx){

    };

    this.update = function(timedelta){


    };

    this.getRealCoordinates = function(ctx){
        return {x: this.pos.x, y: ctx.canvas.height - this.pos.y};
    };
}



function InputEvents(){

    var KEYCODE_MAP = {
        39 : "moveright",
        37 : "moveleft",
        38 : "jump",
    };

    var _event_handlers = {};

    this.on = function(event, handler){

        _event_handlers[event] = handler;

    };


    document.addEventListener("keydown", function(event){
        
        var code = event.which;
        if (!KEYCODE_MAP.hasOwnProperty(code))
            return;

        var ev = KEYCODE_MAP[code];

        if (!_event_handlers.hasOwnProperty(ev))
            return;

        _event_handlers[ev]();

    });
    



}

