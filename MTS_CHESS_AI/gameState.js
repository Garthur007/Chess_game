class GameState{
    constructor(pieces, board, moves){
        this.pieces = {};
        this.gameboard = board.clone();
        this.movesHistory = [];
        this.copyMovesHistory(moves);
        this.copyPieces(pieces);
        this.isWhiteTurn = false;
        this.winner = "";
        this.lastIndex = {
            'white-queen':0,
            'black-queen':0
        };
    }
    copyMovesHistory(moves){
        moves.forEach((move)=>
        {
            this.movesHistory.push(move);
        });
    }
    copyPieces(pieces){
        for(var key in pieces)
            this.pieces[key] = pieces[key].clone();

        for(var key in this.pieces)
            this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
    }

    checkIfGameOver(){
        this.update_all_possible_moves();
        var gameOver = true;
        if(this.isWhiteInDanger()){
            for(var key in this.pieces){
                if(key.split("-")[0] == white && this.pieces[key].alive){
                    this.pieces[key].possibleMoves.forEach((move)=>{
                        var fromX = this.pieces[key].x;
                        var fromY = this.pieces[key].y;
                        var toX = parseInt(move[0]);
                        var toY =parseInt(move[1]);

                        var nextGameState = GameState.Next_GameState(this, new Attack(fromX, fromY, toX, toY));
                        //var nextGameState = new GameStateM(fromX, fromY, toX, toY, this.pieces, this.gameboard);
                        //if(this.isValidMove(fromX, fromY, toX, toY))
                        if(!nextGameState.isWhiteInDanger())
                            gameOver = false;
                    });
                }
            }
        }else if(this.isBlackInDanger()){
           
            for(var key in this.pieces){
                if(key.split("-")[0] == "black" && this.pieces[key].alive){
                    this.pieces[key].possibleMoves.forEach((move)=>{
                        var fromX = this.pieces[key].x;
                        var fromY = this.pieces[key].y;
                        var toX = parseInt(move[0]);
                        var toY =parseInt(move[1]);
                
                        var nextGameState = GameState.Next_GameState(this, new Attack(fromX, fromY, toX, toY));
                        if(!nextGameState.isBlackInDanger()){
                            gameOver = false;
                        }
                    });
                }
        
            }
        }else
            gameOver = false;
        if(gameOver)
            this.winner = this.isBlackInDanger()?white:black;

        if(!this.pieces['black-king-0'].alive ||!this.pieces['white-king-0'].alive)
        {
            console.log('yo le roi est mort');
            this.winner = !this.pieces['black-king-0'].alive?white:black;
            return true;
        }
        return gameOver;
    }

    isWhiteInDanger(){
        return this.checkIfColorInDanger('white');
    }
    
    checkIfColorInDanger(colour){
        this.update_all_possible_moves();
        var c = colour == 'white'?'black':'white';
        var xKing = this.pieces[colour+"-king-0"].x;
        var yKing = this.pieces[colour+"-king-0"].y;

        var posKing = xKing.toString()+yKing.toString();

        for(var key in this.pieces)
            if(key.split('-')[0]==c && this.pieces[key].alive)
                if(this.pieces[key].possibleMoves.includes(posKing))
                    return true;
        return false;
    }

    isBlackInDanger(){
        return this.checkIfColorInDanger('black');
    }

   isValidMove(fromX, fromY, toX, toY){

    if(!this.gameboard.findTile(fromX, fromY).isOccupied)
        return null;

    var move = toX.toString()+ toY.toString();

    var atq = new Attack(fromX, fromY, toX, toY);

    var gs = GameState.Next_GameState(this,atq);

    
    var condition = this.isWhiteTurn?gs.isWhiteInDanger():gs.isBlackInDanger();
    //console.log("c'est le tour des blanc? : "+ this.isWhiteTurn + " et le move met en danger la reine? : " + condition);
    return this.findTileValidMoves(fromX, fromY).includes(move) && !condition;
   } 

   update_all_possible_moves(){
       for(var key in this.pieces){
           this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
       }
   }
   findTileValidMoves(fromX, fromY){
        var id = this.gameboard.findOccupant(fromX, fromY);
        var pieceToMove = this.pieces[id];

        var test = this.clickCount == 0?1:2;
        pieceToMove.update_possible_moves(this.gameboard, this.pieces, this.pieceToMove, this.clickCount +test );

        return pieceToMove.possibleMoves;
   }
   get_list_of_attacks(colour){
    var possibleAttack = [];
    for(var key in this.pieces){
        if(this.pieces[key].alive)
            if(key.split('-')[0]==colour){
                this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
                if(this.pieces[key].possibleMoves.length != 0){
                    var a = this.pieces[key].x;
                    var b = this.pieces[key].y;
                    for(var i = 0; i < this.pieces[key].possibleMoves.length; i++){
                        var c = parseInt(this.pieces[key].possibleMoves[i][0]);
                        var d = parseInt(this.pieces[key].possibleMoves[i][1]);
                        if(this.isValidMove(a,b,c,d))
                            possibleAttack.push(new Attack(a,b,c,d));
                    }
                }
            }
    }
    return possibleAttack;
   }
   get_random_attack(colour){

        var possibleAttack = this.get_list_of_attacks(colour);
        var index = randomNumber(possibleAttack.length);
        //console.log("nombre d'attaque : " + possibleAttack.length + " attaque choisie : " + index);
        return possibleAttack[index];
   }
  

    static Next_GameState(currentGameState, attack){
        //we assume the attack is legal
        //on va assumer que le move est légal 
        
        var fromX = attack.fromX;
        var fromY =  attack.fromY;
        var toX = attack.toX;
        var toY = attack.toY;
        //if(!currentGameState.isValidMove(fromX, fromY, toX, toY))
          //  console.log("illegal move");
        var nextGameState = new GameState(currentGameState.pieces,
             currentGameState.gameboard, currentGameState.movesHistory);

        nextGameState.movesHistory.push(fromX.toString() + fromY.toString());
        nextGameState.movesHistory.push(toX.toString() + toY.toString());

        var startingTile = nextGameState.gameboard.findTile(fromX, fromY);
        var endingTile = nextGameState.gameboard.findTile(toX, toY);
        var piece = nextGameState.gameboard.findOccupant(fromX, fromY);
        if(piece == null)
            {
                //createBoard(nextGameState.gameboard);
                console.log("La piece est nulle");
                //console.log(nextGameState.gameboard.findTile(fromX, fromY));
                //console.log(fromX,fromY);
                 
                return null;
            }
        var pieceType = piece.split('-')[1];
        var pieceColour = piece.split('-')[0];

       
        if(pieceType=="pawn"){
            var currentX = nextGameState.pieces[piece].x;
            var currentY = nextGameState.pieces[piece].y;
            if(toX - currentX == nextGameState.pieces[piece].direction &&
                toY - currentY != 0){
                    var ennemyTile = nextGameState.gameboard.findTile(currentX,toY);
                    if(ennemyTile.isOccupied && 
                    ennemyTile.occupantType =="pawn" &&
                    ennemyTile.colour != pieceColour && nextGameState.pieces[nextGameState.gameboard.findOccupant(currentX, toY)].hasJumped &&
                    nextGameState.pieces[nextGameState.gameboard.findOccupant(currentX, toY)].numberOfMoves == 1){

                    var ennemy = ennemyTile.occupant;
                    nextGameState.pieces[ennemy].alive = false;
                    ennemyTile.reset(false);
                    }
                }
        }            

        nextGameState.pieces[piece].x = toX;
        nextGameState.pieces[piece].y = toY;
        startingTile.reset(false);

        if(endingTile.isOccupied){
            var ennemy = endingTile.occupant;
            if(nextGameState.pieces[ennemy] == null)
                console.log(endingTile);
            nextGameState.pieces[ennemy].alive = false;
        }

        endingTile.setPiece(piece, false);

        if(pieceType == "pawn"){
            nextGameState.pieces[piece].numberOfMoves += 1;
            var target = pieceColour == "white"?3:4;
            if(nextGameState.pieces[piece].numberOfMoves == 1 && nextGameState.pieces[piece].x == target)
                nextGameState.pieces[piece].hasJumped =true;
            var cibleX = pieceColour == "white"?7:0;

            if(toX == cibleX){
                delete nextGameState.pieces[piece];
                var index = nextGameState.lastIndex[pieceColour + '-' + "queen"] +1;
                nextGameState.lastIndex[pieceColour + '-' + "queen"]++;  
                nextGameState.pieces[pieceColour + '-'+"queen"+'-'+index.toString()] = new Queen(toX, toY, true, pieceColour);
                endingTile.setPiece(pieceColour +"-"+"queen"+"-"+index.toString(), false);
            }
        }



        if(pieceType == "king"){
            nextGameState.pieces[piece].numberOfMoves = 1;
            if(nextGameState.pieces[piece].switchWithRook()){
                var kingColour = piece.split('-')[0];
                var kingPosX = kingColour == "white"?0:7;
                nextGameState.pieces[kingColour +"-rook-1"].y = 5;
                nextGameState.gameboard.findTile(kingPosX,7).reset(false);
                nextGameState.gameboard.findTile(kingPosX, nextGameState.pieces[kingColour +"-rook-1"].y).setPiece(kingColour +"-rook-1", false);
            }
            nextGameState.pieces[piece].hasJump =  true;
        }

        nextGameState.isWhiteTurn = pieceColour == "white"?false:true;

        return nextGameState;

    }
}
