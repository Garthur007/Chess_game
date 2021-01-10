class Retarded_Ai{
    constructor(gs){
        this.currentGameState = gs;
        this.pieces = [];
    }
    randomMove(){
        for(var key in this.currentGameState.pieces){
            if(key.split('-')[0] == "black" && this.currentGameState.pieces[key].alive)
                this.pieces.push(this.currentGameState.pieces[key]);
        }
       var move = ""; 
       var k = Board.randomNumber(this.pieces.length - 1);
       var previousK = [];
       previousK.push(k);
       var chosenPiece = this.pieces[k];
       if(chosenPiece == null)
             console.log(k);console.log(this.pieces.length);
        while(chosenPiece.possibleMoves.length == 0){
            chosenPiece = this.pieces[Board.randomNumber(this.pieces.length)];

        }
        move = chosenPiece.x.toString() + chosenPiece.y.toString() 
        +chosenPiece.possibleMoves[0];
        return move;
    }
}

// this for a random number between()
// Math.floor((Math.random() * 100) + 1);