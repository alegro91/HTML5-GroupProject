RESOURCES.addImage("enemy1", "img/enemy1.png");

Enemy.prototype = Object.create(GameObject.prototype);

function Enemy(x, vx) {
    GameObject.call(this);

    this.pos.x = x;
    this.pos.y = 100;
    this.vel.x = vx;

    this.padding.left = 0;
    this.padding.right = 50;
    this.padding.bottom = 50;
    this.padding.top = 0;

    var _lastJump = 0;
    var _jumpFrequency = Math.floor((Math.random() * 10) + 10)
    var _nextJump = _calculateNextJump();

    this.draw = function (ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.drawImage(RESOURCES.getImage("enemy1"), pos.x, pos.y, 50, 50);
    };


    this.update = function (timedelta) {

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

    function _calculateNextJump() {
        return Math.floor((Math.random() * _jumpFrequency) + 1);
    }

}