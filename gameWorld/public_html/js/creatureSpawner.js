function Spawner(game){
    
    var difficulty = 20;
    var newEnemy = Math.random()*100;
    var lastNumberOfEnemies = game.getEnemyCount();
    
    this.update = function(time){
        
        currentNumberOfEnemies = game.getEnemyCount();
        if(currentNumberOfEnemies !== lastNumberOfEnemies){
            difficulty++; 
            
        }
    
        if(newEnemy < difficulty){
            
            if(newEnemy <= (difficulty/2)){    
                if(newEnemy < (difficulty/4)){
                    game.addGameObject(new Enemy1(10, 7));
                }
                if(newEnemy >= (difficulty/4)){
                    game.addGameObject(new Enemy1(900, 7));
                }
            }
            if(newEnemy >= (difficulty/2)){
                if(newEnemy < (difficulty/2+difficulty/4)){
                    game.addGameObject(new Enemy2(10, 7));
                }
                if(newEnemy >= (difficulty -  difficulty/4)){
                    game.addGameObject(new Enemy2(900, 7));
                }
            }
        }
        
    };
}
