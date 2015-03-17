RESOURCES.addImage("castle", "img/castle.png");

Castle.prototype = Object.create(GameObject.prototype);

function Castle() {
    GameObject.call(this);
    this.pos.x = 450;
    this.pos.y = 90;

    var _this = this;

    this.type = "castle";


    // The padding is a little smaller than 
    // the image to make the enemies go slightly into 
    // the castle before they disappear.
    this.padding.left = 0;
    this.padding.right = 20;
    this.padding.bottom = 90;
    this.padding.top = 0;

    var _currentHp = 20;

    this.draw = function(ctx) {
        var pos = this.getRealCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.fillText(_currentHp, pos.x, pos.y-35);
        // Draw the image a little outside the padding
        ctx.drawImage(RESOURCES.getImage("castle"), pos.x-50, pos.y-30, 120, 120);
    };


    this.collisionDetected = function(obj){
        if(obj.type == "enemy" && !obj.deleted){
            _currentHp--;
            obj.destroy();

            // console.log("Castle Hp: ", _currentHp);
        }
    };

    this.onWallHit = function(){
        // Do nothing
    };

    this.update = function(){
        // Do nothing
    };
}
