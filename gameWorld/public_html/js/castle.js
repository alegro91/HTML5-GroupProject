RESOURCES.addImage("castle", "img/castle.png");

Castle.prototype = Object.create(GameObject.prototype);

function Castle() {
    GameObject.call(this);
    this.pos.x = 400;
    this.pos.y = 50;
    var castleRadius = 50;
    var _this = this;

    var _moving = false;
    var _groundDecel = 20;

    this.padding.left = castleRadius;
    this.padding.right = castleRadius;
    this.padding.bottom = castleRadius + 70;
    this.padding.top = castleRadius;

    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.drawImage(RESOURCES.getImage("castle"), pos.x, pos.y, 120, 120);
    };
}