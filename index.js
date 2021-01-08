let game = new GameManager();
let gs = new GameState(0,0,0,0, game.pieces, game.gameboard);    
let rAi = new Retarded_Ai(gs);

console.log(rAi.randomMove());

      
      