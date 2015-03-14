House.prototype = Object.create(GameObject.prototype);

function House() {
    GameObject.call(this);
    this.pos.x = 450;
    this.pos.y = 60;
    var houseRadius = 60;
    var _this = this;

    var _moving = false;
    var _groundDecel = 20;

    this.padding.left = houseRadius + 3;
    this.padding.right = houseRadius + 3;
    this.padding.bottom = houseRadius + 60;
    this.padding.top = houseRadius + 3;

    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.beginPath();
        context.rect(pos.x, pos.y, 90, 120);
        context.fillStyle = 'blue';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
    };
}