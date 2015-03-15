var GRAVITY = 16;
var TIME_SCALING = 150;


var DIRECTION = {
    TOP: 1,
    BOTTOM: 2,
    LEFT: 3,
    RIGHT: 4
};


function Vector(x, y) {
    this.x = x;
    this.y = y;
}


function Padding(top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
}


function GameObject() {

    var _this = this;

    this.pos = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, -GRAVITY);

    // Set to true when the object shoud be removed from the game
    this.deleted = false;

    // Set to true if the object should be hidden
    this.hidden = false;

    // The padding for the object. This is the
    // distance that the object is covering 
    // in each direction from its // (x,y)-position
    this.padding = new Padding(0, 0, 0, 0);


    this.getRealCoordinates = function (ctx) {
        return {x: this.pos.x, y: ctx.canvas.height - this.pos.y};
    };


    this.setVelocity = function (x, y) {
        if (x != null)
            this.vel.x = x;
        if (y != null)
            this.vel.y = y;
    };

    this.flipVelocity = function (x, y) {
        this.vel.x *= x;
        this.vel.y *= y;
    };

    this.destroy = function () {
        this.deleted = true;
    };
}


// This is called once every frame.
// All drawing should happen in this function.
GameObject.prototype.draw = function (ctx) {
};

// This is called every time the object should
// update its position.
GameObject.prototype.update = function (timedelta) {
    this.vel.y += this.acc.y * timedelta;
    this.pos.y += this.vel.y * timedelta + 0.5 * this.acc.y * timedelta * timedelta;
    this.pos.x += this.vel.x * timedelta + 0.5 * this.acc.x * timedelta * timedelta;
};

GameObject.prototype.onWallHit = function (direction, canvas) {
    switch (direction) {
        case DIRECTION.BOTTOM:
            this.pos.y = this.padding.bottom;
            this.setVelocity(null, 0);
            break;
        case DIRECTION.TOP:
            this.pos.y = canvas.height - this.padding.top;
            this.flipVelocity(1, -1);
            break;
        case DIRECTION.LEFT:
            this.pos.x = this.padding.left;
            this.flipVelocity(-1, 1);
            break;
        case DIRECTION.RIGHT:
            this.pos.x = canvas.width - this.padding.right;
            this.flipVelocity(-1, 1);
            break;

    }
};

// This is called when a collision is detected 
// with another object.
GameObject.prototype.collisionDetected = function (obj) {
};


function InputEvents() {

    var KEYCODE_MAP = {
        39: "moveright",
        37: "moveleft",
        38: "jump",
        97: "leftAttack",
        100: "rightAttack",
    };

    var _event_handlers = {};

    this.on = function (event, handler) {
        _event_handlers[event] = handler;
    };


    document.addEventListener("keydown", function (event) {
        var handler = _getHandler(event);
        if (handler != null)
            handler(false);
    });

    document.addEventListener("keyup", function (event) {
        var handler = _getHandler(event);
        if (handler != null)
            handler(true);
    });

    function _getHandler(event) {

        var code = event.which;
        if (!KEYCODE_MAP.hasOwnProperty(code))
            return null;

        var ev = KEYCODE_MAP[code];

        if (!_event_handlers.hasOwnProperty(ev))
            return null;

        return _event_handlers[ev];
    }
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

        var removed = [];
        // Update objects
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].deleted)
                removed.push(i);
            else
                objects[i].update(timeDelta / TIME_SCALING);
        }


        _detectCollisions();


        // Remove deleted objects
        for (var i = 0; i < removed.length; i++) {
            objects.splice(removed[i], 1);
        }



        _clearCanvas();

        // Draw objects
        for (var i = 0; i < objects.length; i++) {
            if(objects[i].hidden)
                continue;
            objects[i].draw(ctx);
        }
    };


    this.start = function () {

        function loop(time) {
            _this.update(time);
            window.requestAnimationFrame(loop);
        }

        function loadResources() {
            if (RESOURCES.allResourcesReady())
                window.requestAnimationFrame(loop);
            else
                window.requestAnimationFrame(loadResources);

            _drawLoading();
        }

        window.requestAnimationFrame(loadResources);
    };


    function _clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function _drawLoading() {
        _clearCanvas();

        ctx.fillText("Loading resources", canvas.width / 2 - 20, canvas.height / 2);
    }



    function _detectCollisions() {

        var num_objects = objects.length;

        for (var i = 0; i < num_objects; i++) {

            var obj_a = objects[i];

            if(obj_a.hidden || obj_a.deleted)
                continue;

            _detectWallHit(obj_a);

            for(var j=0; j < num_objects; j++){


                if(i == j || objects[j].hidden)
                    continue;

                var obj_b = objects[j];


                if(_checkForCollision(obj_a, obj_b)){
                    obj_a.collisionDetected(obj_b);
                    obj_b.collisionDetected(obj_a);

                }
            }
        }
    }


    function _detectWallHit(obj) {

        var pad = obj.padding;

        // Check y-direction
        if (obj.pos.y <= pad.bottom) {
            obj.onWallHit(DIRECTION.BOTTOM, canvas);
        }
        else if (obj.pos.y >= (canvas.height + pad.top)) {
            obj.onWallHit(DIRECTION.TOP, canvas);
        }


        // Check x-direction 
        if (obj.pos.x <= pad.left) {
            obj.onWallHit(DIRECTION.LEFT, canvas);
        }
        else if (obj.pos.x >= (canvas.width - pad.right)) {
            obj.onWallHit(DIRECTION.RIGHT, canvas);
        }

    }

    // Simple check for non-rotating rectangles.
    function _checkForCollision(a, b){

        // TODO: Currently no objects use the left or top
        // padding so we don't take this into account.
        // If this change this code needs to be updatd.

        var leftMost = a;
        var rightMost = b;
        if(a.pos.x > b.pos.x){
            leftMost = b;
            rightMost = a;
        }

        // If the rightmost object is further to the right than the 
        // leftmost plus its witdh there is no collision.
        if((leftMost.pos.x + leftMost.padding.right) < rightMost.pos.x)
            return false;

        var upper = a;
        var lower = b;

        if(a.pos.y < b.pos.y){
            upper = b;
            lower = a;
        }

        // If the lower object is lower than the 
        // upper plus its height there is no collision.
        if((upper.pos.y - upper.padding.bottom) > lower.pos.y)
            return false;

        return true;

    }
}


var RESOURCES = new (function () {

    var _images = {};

    this.addImage = function (name, path) {
        _images[name] = new Image();
        _images[name].src = path;
    };

    this.getImage = function (name) {
        return _images[name];
    };

    this.allResourcesReady = function () {

        for (i in _images) {
            if (!_images[i].complete)
                return false;
        }

        return true;
    };
})();






