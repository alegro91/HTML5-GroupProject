RESOURCES.addImage("player", "img/player.png");
RESOURCES.addSound("attack", "sound/hoSound.mp3");

Player.prototype = Object.create(GameObject.prototype);

function Player(leftAttack, rightAttack) {
    GameObject.call(this);
    this.pos.x = 350;
    this.pos.y = 30;

    var _this = this;
    var playerRunSpeed = 35;
    var playerJumpHeight = 60;

    var _moving = false;
    var _groundDecel = 20;

    this.type = "player";

    this.padding.left = 0;
    this.padding.right = 30;
    this.padding.bottom = 70;
    this.padding.top = 0;


    // The time of the last attack
    var _lastAttack = 0;
    var _attackDelay = 100; // milliseconds

    var _stunned = false;
    var _lastStunned = 0;
    var _stunnedDelay = 1000; // milliseconds


    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        if(_stunned){
            ctx.font="15px sans-serif";
            ctx.fillText("X", pos.x + 15, pos.y-10);
        }
        ctx.drawImage(RESOURCES.getImage("player"), pos.x, pos.y, 30, 70);
    };


    this.update = function (timedelta) {

        if(_stunned){
            this.vel.x = 0;
        }
        else if (!_moving && this.pos.y == this.padding.bottom) {
            // Smoothly slow down the object when it is on the ground
            var diff = _groundDecel * timedelta;
            if (diff < Math.abs(this.vel.x))
                this.vel.x += -Math.sign(this.vel.x) * diff;
            else
                this.vel.x = 0;
        }

        GameObject.prototype.update.call(this, timedelta);

        // Position the attacks next to the player
        rightAttack.pos.x = this.pos.x + this.padding.right + 5;
        rightAttack.pos.y = this.pos.y - 10;
        leftAttack.pos.x = this.pos.x - this.padding.left - leftAttack.padding.right - 10;
        leftAttack.pos.y = this.pos.y - 10;
    };


    this.collisionDetected = function(obj){
        if(!_stunned && obj.type == "enemy" && 
           ((new Date()).getTime() - _lastStunned) > _stunnedDelay &&
           !obj.hasBeenHit()
           ){
            _setStunnedState(true);
            setTimeout(function(){
                _lastStunned = (new Date()).getTime();
                _setStunnedState(false);
            }, 2000);
        }
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
        if (!_stunned && _this.pos.y == _this.padding.bottom)
        {
            _this.setVelocity(null, playerJumpHeight);
        }
    });

    playerInput.on("leftAttack", function (released)
    {
        if(!released && _canDoAttack()){
            _executeAttack(leftAttack);
        }
    });

    playerInput.on("rightAttack", function (released)
    {
        if(!released && _canDoAttack()){
            _executeAttack(rightAttack);
        }
    });


    function _canDoAttack(){
        return !_stunned && ((new Date()).getTime() - _lastAttack) > _attackDelay;
    }

    function _executeAttack(attack){
        _lastAttack = (new Date()).getTime();
        RESOURCES.getSound("attack").play();
        attack.execute();

    }

    function _setStunnedState(state){
        _stunned = state;
        leftAttack.setDisabled(state);
        rightAttack.setDisabled(state);
    }
}




RESOURCES.addImage("attack-left", "img/leftAttack.png");
RESOURCES.addImage("attack-right", "img/rightAttack.png");

RightAttack.prototype = Object.create(GameObject.prototype);

function RightAttack(imageName){
    GameObject.call(this);

    this.padding.left = 0;
    this.padding.right = 22;
    this.padding.bottom = 40;
    this.padding.top = 0;

    this.type = "attack";

    this.hidden = true;

    var _temporaryDisabled = false;

    // The number of frames the attack currently has been visible
    this._visibleFrameCount = 0;

    this.setDisabled = function(disabled){
        _temporaryDisabled = disabled;
    };

    this.update = function(){
        if(this.hidden)
            return;

        this._visibleFrameCount++;

        if(this._visibleFrameCount > 20)
            this.hidden = true;

        // The attack should not be affected by gravity so
        // we don't call the parent's update method.
    };

    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.save();
        // Rotate the image around the middle left edge
        ctx.translate(pos.x, pos.y + 20);
        ctx.rotate((this._visibleFrameCount*6)*Math.PI/180 - Math.PI/2);
        ctx.drawImage(RESOURCES.getImage("attack-right"), 0, -20, 22, 40);
        ctx.restore();
    };

    this.execute = function(){
        this.hidden = false;
        this.setDisabled(false);
        this._visibleFrameCount = 0;
    };

    this.onWallHit = function(direction){
        // do nothing
    };


    this.collisionDetected = function(obj){
        if(!_temporaryDisabled && obj.type == "enemy"){
            obj.takeHit();
            this.setDisabled(true);
        }
    };
}

LeftAttack.prototype = Object.create(RightAttack.prototype);

function LeftAttack(imageName){
    RightAttack.call(this);

    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.save();
        // Rotate the image around the middle right edge
        ctx.translate(pos.x + 22,  pos.y + 20);
        ctx.rotate(-(this._visibleFrameCount*6)*Math.PI/180 + Math.PI/2);
        ctx.drawImage(RESOURCES.getImage("attack-left"), -22, -20, 22, 40);
        ctx.restore();
    };

}

