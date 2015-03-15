RESOURCES.addImage("player", "img/player.png");

Player.prototype = Object.create(GameObject.prototype);

function Player() {
    GameObject.call(this);
    this.pos.x = 350;
    this.pos.y = 30;

    var _this = this;
    var playerRunSpeed = 35;
    var playerJumpHeight = 60;

    var _moving = false;
    var _groundDecel = 20;

    this.padding.left = 0;
    this.padding.right = 30;
    this.padding.bottom = 70;
    this.padding.top = 0;


    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.drawImage(RESOURCES.getImage("player"), pos.x, pos.y, 30, 70);
    };


    this.update = function (timedelta) {

        // Smoothly slow down the object when it is on the ground
        if (!_moving && this.pos.y == this.padding.bottom) {
            var diff = _groundDecel * timedelta;
            if (diff < Math.abs(this.vel.x))
                this.vel.x += -Math.sign(this.vel.x) * diff;
            else
                this.vel.x = 0;
        }

        GameObject.prototype.update.call(this, timedelta);
    };

    var playerInput = new InputEvents();

    playerInput.on("moveright", function (released)
    {
        _this.setVelocity(playerRunSpeed, null);
        _moving = !released;
    });

    playerInput.on("moveleft", function (released)
    {
        _this.setVelocity(-playerRunSpeed, null);
        _moving = !released;
    });

    playerInput.on("jump", function ()
    {
        if (_this.pos.y == _this.padding.bottom)
        {
            _this.setVelocity(null, playerJumpHeight);
        }
    });

    playerInput.on("leftAttack", function (released)
    {

    });

    playerInput.on("rightAttack", function (released)
    {

    });
}