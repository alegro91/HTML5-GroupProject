

var GRAVITY = 16;

function Position(x, y)
{
    this.x = x;
    this.y = y;

}

function Velocity(x, y)
{
    this.x = x;
    this.y = y;
}

function Acceleration(x, y)
{
    this.x = x;
    this.y = y;
}


function GameObject() {

    this.pos = new Position(0, 0);

    var _vel = new Velocity(0, 0);
    var _acc = new Acceleration(0, -GRAVITY);

    this.getPadding = function(){

        return {x: 0, y:0, w:0, h:0};

    }

    this.draw = function (ctx) {


    };

    this.update = function (timedelta) {

        _acc.x = 0;
        var pad = this.getPadding();

        if(this.pos.y == pad.y){
            if(Math.abs(_vel.x) > 1)
                _acc.x = -Math.sign(_vel.x)*15;
            else
                _vel.x = 0;
        }

        _vel.x += _acc.x*timedelta;
        _vel.y += _acc.y*timedelta;
        this.pos.y += _vel.y*timedelta + 0.5*_acc.y*timedelta*timedelta;
        this.pos.x += _vel.x*timedelta + 0.5*_acc.x*timedelta*timedelta;


    };

    this.getRealCoordinates = function (ctx) {
        return {x: this.pos.x, y: ctx.canvas.height - this.pos.y};
    };


    this.setVelocity = function(x, y){
        if(x != null)
            _vel.x = x;
        if(y != null)
            _vel.y = y;
    }

    this.flipVelocity = function(x, y){
        _vel.x *= x;
        _vel.y *= y;
    }

}



function InputEvents() {

    var KEYCODE_MAP = {
        39: "moveright",
        37: "moveleft",
        38: "jump",
    };

    var _event_handlers = {};

    this.on = function (event, handler) {

        _event_handlers[event] = handler;

    };


    document.addEventListener("keydown", function (event) {

        var code = event.which;
        if (!KEYCODE_MAP.hasOwnProperty(code))
            return;

        var ev = KEYCODE_MAP[code];

        if (!_event_handlers.hasOwnProperty(ev))
            return;

        _event_handlers[ev]();

    });




}




function MainGame(canvasId) {


    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    var objects = [];
    var _this = this;
    var prevTime = null;

    this.addGameObject = function (obj) {
        objects.push(obj);
    }

    this.update = function (time) {

        var timeDelta = 0;
        if (prevTime != null) {
            timeDelta = time - prevTime;

        }
        prevTime = time;


        // Update objects
        for (var i = 0; i < objects.length; i++) {
            objects[i].update(timeDelta / 150);
        }

        _detectWallHits();

        _clearCanvas();

        // Draw objects
        for (var i = 0; i < objects.length; i++) {
            objects[i].draw(ctx);
        }
    };


    this.start = function () {

        function loop(time) {
            _this.update(time);
            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);

    };

    function _clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function _detectWallHits(){

        for(var i=0; i < objects.length; i++){

            var obj = objects[i];
            var pad = obj.getPadding();

            if(obj.pos.y <= pad.y){
                obj.pos.y = pad.y;
                obj.setVelocity(null, 0);
            }
            else if(obj.pos.y >= (canvas.height+pad.y)){
                obj.pos.y = canvas.height - pad.y
                obj.flipVelocity(1, -1);
            }

            if(obj.pos.x <= pad.x){
                obj.pos.x = pad.x;
                // obj.recalculateVelocity();
                obj.flipVelocity(-1, 1);
            }
            else if(obj.pos.x >= (canvas.width - pad.w)){
                obj.pos.x = canvas.width - pad.w;
                // obj.recalculateVelocity();
                obj.flipVelocity(-1, 1);
            }
        }

    }
}

