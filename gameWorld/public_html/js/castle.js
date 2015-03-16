RESOURCES.addImage("castle", "img/castle.png");

Castle.prototype = Object.create(GameObject.prototype);

function Castle() {
    GameObject.call(this);
    this.pos.x = 400;
    this.pos.y = 50;

    var _this = this;

    this.type = "castle";

    this.padding.left = 0;
    this.padding.right = 120;
    this.padding.bottom = 120;
    this.padding.top = 0;

    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.drawImage(RESOURCES.getImage("castle"), pos.x, pos.y, 120, 120);
    };
}
