House.prototype = Object.create(GameObject.prototype);

function House() {
    GameObject.call(this);
    this.pos.x = 450;
    this.pos.y = 30;
    var houseRadius = 60;
    var _this = this;

    var _moving = false;
    var _groundDecel = 20;

    this.padding.left = houseRadius + 3;
    this.padding.right = houseRadius + 3;
    this.padding.bottom = houseRadius + 3;
    this.padding.top = houseRadius + 3;

    this.draw = function (context) {
        var pos = this.getRealCoordinates(context);
        context.beginPath();
        context.arc(pos.x, pos.y, houseRadius, 0, 2 * Math.PI, false);
        context.fillStyle = 'blue';
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = '#003300';
        context.stroke();
    };
}