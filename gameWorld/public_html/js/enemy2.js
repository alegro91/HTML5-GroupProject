RESOURCES.addImage("enemy2", "img/enemy2.png");

Enemy2.prototype = Object.create(GameObject.prototype);

function Enemy2(x, vx) {
    GameObject.call(this);

    this.pos.x = x;
    this.pos.y = 80;
    this.vel.x = vx;

    this.padding.left = 0;
    this.padding.right = 80;
    this.padding.bottom = 80;
    this.padding.top = 0;

    this.type = "enemy";

    var _lastJump = 0;
    var _jumpFrequency = Math.floor((Math.random() * 10) + 10)
    var _nextJump = _calculateNextJump();

    var _currentHp = 4;
    var _wasHit = false;

    // Used to make the shake effect when the enemy
    // is hit by an attack.
    var _stunnedCount = 0;

    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.fillText(_currentHp, pos.x + 35, pos.y-10);
        ctx.drawImage(RESOURCES.getImage("enemy2"), pos.x, pos.y, 80, 80);
    };


    this.update = function (timedelta) {

        if(_wasHit){
            // Make the enemy shake when it was hit.
            if((_stunnedCount % 2 == 0)){
                this.pos.x += 10;
            }else
                this.pos.x -= 10;
            
            _stunnedCount++;
            return;
        }

        _lastJump += timedelta;

        if (_lastJump > _nextJump) {
            this.setVelocity(null, Math.floor(Math.random() * 40 + 30));
            _lastJump = 0;
            _nextJump = _calculateNextJump();
        }

        GameObject.prototype.update.call(this, timedelta);
    };


    this.onWallHit = function (direction, canvas) {

        // switch(direction){
        //     case DIRECTION.LEFT:
        //     case DIRECTION.RIGHT:
        //         this.destroy();
        //         return;
        // }
        GameObject.prototype.onWallHit.call(this, direction, canvas);
    };

    this.takeHit = function(){
        _currentHp--;
        _wasHit = true;
        if(_currentHp == 0)
            this.destroy();
        else{
            var _old_vel = this.vel.x;
            var _old_pos = this.pos.x;
            this.vel.x = 0;
            var _this = this;
            // this.acc.x = 3*-Math.sing(this.vel.x);
            setTimeout(function(){
                _wasHit = false;
                _this.vel.x = _old_vel;
                _this.pos.x = _old_pos
                // _this.acc.x = 0;
            }, 1000);
        }
    };


    this.hasBeenHit = function(){
        return _wasHit;
    };

    function _calculateNextJump() {
        return Math.floor((Math.random() * _jumpFrequency) + 1);
    }
}



