

Square.prototype = new GameObject();

function Square(){

    this.update = function(timedelta){
        this.pos.x = 100;
    };

    this.draw = function(ctx){
        ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
    };
}



var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d");


var s = new Square();


//s.update(10);
//s.draw(ctx);





