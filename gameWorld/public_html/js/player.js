Player.prototype = Object.create(GameObject.prototype);

function Player() {
    GameObject.call(this);
    this.pos.x = 100;
    this.pos.y = 30;
    var playerRadius = 10;
    var _this = this;
    var playerRunSpeed = 40;
    var playerJumpHeight = 50;

    var _moving = false;
    var _groundDecel = 20;

    this.padding.left = playerRadius + 3;
    this.padding.right = playerRadius + 3;
    this.padding.bottom = playerRadius + 3;
    this.padding.top = playerRadius + 3;

    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.beginPath();
        context.arc(pos.x, pos.y, playerRadius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = '#003300';
        context.stroke();
    };


    this.update = function (timedelta) {

        // Smoothly slow down the object when it is on the ground
        if (!_moving && this.pos.y == this.padding.bottom) {
            var diff = _groundDecel * timedelta
            if (diff < Math.abs(this.vel.x))
                this.vel.x += -Math.sign(this.vel.x) * diff;
            else
                this.vel.x = 0;
        }

        GameObject.prototype.update.call(this, timedelta);
    }

    var playerInput = new InputEvents();

    playerInput.on("moveright", function (released)
    {
        _this.setVelocity(playerRunSpeed, null);
        _moving = !released;
    })
    playerInput.on("moveleft", function (released)
    {
        _this.setVelocity(-playerRunSpeed, null);
        _moving = !released;
    })
    playerInput.on("jump", function ()
    {
        if (_this.pos.y == _this.padding.bottom)
        {
            _this.setVelocity(null, playerJumpHeight);
        }

    })
}