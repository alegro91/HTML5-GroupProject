

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




function MainGame(canvasId){

    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");

    this.GRAVITY = -16;

    var objects = [];

    var prevTime = null;

    this.addGameObject = function(obj){
        objects.push(obj);
    }

    this.update = function(time){

        var timeDelta = 0;
        if(prevTime != null){
            timeDelta = time-prevTime;

        }
        prevTime = time;

        
        // Update objects
        for(var i=0; i < objects.length; i++){
            objects[i].update(timeDelta/150);
        }


        // Here we will do cllision detection

        _clearCanvas();

        // Draw objects
        for(var i=0; i < objects.length; i++){
            objects[i].draw(ctx);
        }
    };



    function _clearCanvas(){
        ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    }
}


