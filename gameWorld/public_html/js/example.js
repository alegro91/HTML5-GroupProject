

Square.prototype = new GameObject();

function Square(x, y){

    GameObject.call(this);

    this.vel = 5;
    this.pos.x = x;
    this.pos.y = y;


    this.update = function(timedelta){
        this.pos.y += this.vel;
    };

    this.draw = function(ctx){
        ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
    };
}





function Game(){

    var canvas = document.getElementById("exampleCanvas");
    var ctx = canvas.getContext("2d");



    var objects = [];

    objects.push(new Square(100, 300));
    objects.push(new Square(300, 200));

    this.update = function(time){

        
        // Update objects
        for(var i=0; i < objects.length; i++){
            objects[i].update();
        }


        // Detect collisions;
        for(var i=0; i < objects.length; i++){
            var obj = objects[i];

            if(obj.pos.y <= 0){
                obj.pos.y = 0;
                obj.vel = -obj.vel;
            }
            else if(obj.pos.y >= 450){
                obj.pos.y = 450;
                obj.vel = -obj.vel;
            }
        }

        _clearCanvas();

        // Draw objects
        for(var i=0; i < objects.length; i++){
            objects[i].draw(ctx);
        }
    };


    function _clearCanvas(){
        ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    }
}




var game = new Game();

function loop(time){
    game.update(time);
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);



