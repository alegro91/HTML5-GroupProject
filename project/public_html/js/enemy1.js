RESOURCES.addImage("enemy1", "img/enemy1.png");

Enemy1.prototype = Object.create(GameObject.prototype);

function Enemy1(x, vx) {
    GameObject.call(this);

    this.pos.x = x;
    this.pos.y = 40;
    this.vel.x = vx;

    this.padding.left = 0;
    this.padding.right = 40;
    this.padding.bottom = 40;
    this.padding.top = 0;

    this.type = "enemy";


    var _lastJump = 0;
    var _jumpFrequency = Math.floor((Math.random() * 10) + 10)
    var _nextJump = _calculateNextJump();


    var _currentHp = 1;
    var _wasHit = false;
    


    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.fillText(_currentHp, pos.x + 15, pos.y-10);
        ctx.drawImage(RESOURCES.getImage("enemy1"), pos.x, pos.y, 40, 40);
    };


    this.update = function (timedelta) {

        _wasHit = false;
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
    };

    this.hasBeenHit = function(){
        return _wasHit;
    };

    function _calculateNextJump() {
        return Math.floor((Math.random() * _jumpFrequency) + 1);
    }
}