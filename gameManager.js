const buttons =  document.querySelectorAll("input");
const whiteColour = "white";
const blackColour ="black";
class GameManager{

    constructor(){
        this.gameboard = new Board(this);
        this.isGameOver = false;
        


        this.isWhitesTurn = true;
        this.isBlacksTurn = !this.isWhitesTurn;
        
        this.pieceToMove = [];
        this.clickCount = 0;
        this.pieces = {
            "white-pawn-0": new Pawn(1,0, true, whiteColour, 0, this.gameboard),
            "white-pawn-1": new Pawn(1,1, true, whiteColour, 1, this.gameboard),
            "white-pawn-2": new Pawn(1,2, true, whiteColour, 2, this.gameboard), 
            "white-pawn-3": new Pawn(1,3, true, whiteColour, 3, this.gameboard),
            "white-pawn-4": new Pawn(1,4, true, whiteColour, 4, this.gameboard),
            "white-pawn-5": new Pawn(1,5, true, whiteColour, 5, this.gameboard),
            "white-pawn-6": new Pawn(1,6, true, whiteColour, 6, this.gameboard),
            "white-pawn-7": new Pawn(1,7, true, whiteColour, 7, this.gameboard),
            "white-king-0": new King(0,4, true, whiteColour, this.gameboard), 
            "white-queen-0":new Queen(0,3, true, whiteColour, this.gameboard),
            "white-bishop-0": new Bishop(0,2, true, whiteColour, 0, this.gameboard),
            "white-bishop-1": new Bishop(0,5, true, whiteColour, 1, this.gameboard),
            "white-rook-0": new Rook(0,0, true, whiteColour, 0, this.gameboard),
            "white-rook-1": new Rook(0,7, true, whiteColour, 1, this.gameboard),
            "white-knight-0": new Knight(0,1,true, whiteColour, 0, this.gameboard),
            "white-knight-1": new Knight(0,6,true, whiteColour, 1, this.gameboard),
            "black-pawn-0": new Pawn(6,0, true, blackColour, 0, this.gameboard),
            "black-pawn-1": new Pawn(6,1, true, blackColour, 1, this.gameboard),
            "black-pawn-2": new Pawn(6,2, true, blackColour, 2, this.gameboard), 
            "black-pawn-3": new Pawn(6,3, true, blackColour, 3, this.gameboard),
            "black-pawn-4": new Pawn(6,4, true, blackColour, 4, this.gameboard),
            "black-pawn-5": new Pawn(6,5, true, blackColour, 5, this.gameboard),
            "black-pawn-6": new Pawn(6,6, true, blackColour, 6, this.gameboard),
            "black-pawn-7": new Pawn(6,7, true, blackColour, 7, this.gameboard),
            "black-king-0": new King(7,4, true, blackColour, this.gameboard), 
            "black-queen-0":new Queen(7,3, true, blackColour, this.gameboard),
            "black-bishop-0": new Bishop(7,2, true, blackColour, 0, this.gameboard),
            "black-bishop-1": new Bishop(7,5, true, blackColour, 1, this.gameboard),
            "black-rook-0": new Rook(7,0, true,blackColour, 0, this.gameboard),
            "black-rook-1": new Rook(7,7, true, blackColour, 1, this.gameboard),
            "black-knight-0": new Knight(7,1,true, blackColour, 0, this.gameboard),
            "black-knight-1": new Knight(7,6,true, blackColour, 1, this.gameboard)

        };

        this.compteurTest = 0;

        this.whiteKingInDanger = false;
        this.blackKingInDanger = false;



        this.lastMoves = [];

        this.start();
    }

    toggleTurn(){
        this.isWhitesTurn = !this.isWhitesTurn;
    }

   start(){
        this.init_pieces_on_board();
        this.gameboard.tiles.forEach((tile)=>{
            //console.log(tile);
        });

        this.setEventHandlerOnClick();
   } 

   init_pieces_on_board(){
        for(var key in this.pieces){
            var piece = this.pieces[key];
            var tile = this.gameboard.findTile(piece.x, piece.y);
            tile.setPiece(key);
            //console.log(key);
        }
        
   }

  

   isValidMove(fromX, fromY, toX, toY){
    var move = toX.toString()+ toY.toString();
    
    var gs = new GameState(fromX, fromY, toX, toY,this.pieces, this.gameboard);
    var condition = this.isWhitesTurn?gs.isWhiteInDanger():gs.isBlackInDanger();
    return this.findTileValidMoves(fromX, fromY).includes(move) && !condition;
   } 

   findTileValidMoves(fromX, fromY){
        var id = this.gameboard.findOccupant(fromX, fromY);
         var pieceToMove = this.pieces[id];
        pieceToMove.update_possible_moves(this.gameboard);


        return pieceToMove.possibleMoves;
   }

   makeMove(fromX, fromY, toX, toY){
        if(this.isValidMove(fromX, fromY, toX, toY)){
            var startingTile = this.gameboard.findTile(fromX, fromY);
            var endingTile = this.gameboard.findTile(toX, toY);
            var piece = this.gameboard.findOccupant(fromX, fromY);
            this.pieces[piece].x = toX;
            this.pieces[piece].y = toY;
            startingTile.reset();

            if(endingTile.isOccupied){
                var ennemy = endingTile.occupant;
                this.pieces[ennemy].alive = false;
            }
            endingTile.setPiece(piece);
            
            
            var pieceType = piece.split('-')[1];
            var pieceColour = piece.split('-')[0];

            if(pieceType == "pawn"){
                this.pieces[piece].numberOfMoves += 1;
                if(this.pieces[piece].numberOfMoves == 1 && this.pieces[piece].x == 4)
                    this.pieces[piece].hasJumped =true;

                var cibleX = pieceColour == "white"?7:0;
                if(toX == cibleX){
                    //le pion peut devenir ce qu'il veut
                    //queen, rook, knight, bishop
                    var piecePromotion = prompt("The pawn is being promoted to a :", "queen").toLowerCase();
                    delete this.pieces[piece];

                    if(piecePromotion == "queen"){

                    }else if(piecePromotion == "bishop"){

                    }else if(piecePromotion == "rook"){

                    }else if(piecePromotion == "knight"){
                        
                    }
                    console.log(piecePromotion);

                   
                    endingTile.setPiece(pieceColour +"-queen-1");
                }
            }

            if(pieceType == "king"){
                this.pieces[piece].numberOfMoves = 1;
                if(this.pieces[piece].switchWithRook()){
                    var kingColour = piece.split('-')[0];
                    var kingPosX = kingColour == "white"?0:7;
                    this.pieces[kingColour +"-rook-1"].y = 5;
                    this.gameboard.findTile(kingPosX,7).reset();
                    this.gameboard.findTile(kingPosX, this.pieces[kingColour +"-rook-1"].y).setPiece(kingColour +"-rook-1");
                }
                this.pieces[piece].hasJump =  true;

            
            }

            for(var key in this.pieces){
                if(key.split('-')[1] == "pawn" && key.split('-')[0] == pieceColour)
                    if(this.pieces[key].numberOfMoves != 0)
                        this.pieces[key].canEatSide = true;
            }
            this.toggleTurn();
            var currentGameState = new GameState(0,0,0,0,this.pieces, this.gameboard);
            var gameO = currentGameState.checkIfGameOver();
            
            if(gameO){
                alert("game over fucker");
                this.isGameOver = true;
            }
        }else{
            console.log("invalid move");
        }

   }
   //this is everything with the graphical part
    setEventHandlerOnClick(){
        buttons.forEach((button)=>{
            button.addEventListener('click', ()=>{
                if(!this.isGameOver){
                if(this.clickCount == 0 ){
                    var fromTile =  button.getAttribute('id');
                    var x = parseInt(fromTile[1]);
                    var y = parseInt(fromTile[2]);
                    
                    var colourTurn = this.isWhitesTurn?"white":"black";

                    if(this.gameboard.findTile(x , y).isOccupied && this.gameboard.findTile(x , y).colour == colourTurn){
                        
                        
                        var nbMovePossible = 0;
                        this.findTileValidMoves(x,y).forEach((pos) => {
                            nbMovePossible++;
                            var doc =  document.getElementById('t'+pos);
                            doc.style.background = '#8a1582';
                        });
                        if(nbMovePossible!= 0){
                            this.clickCount++;
                            this.pieceToMove.push(fromTile);
                        }
                        //fini here
                    }
                }else{

                    var toTile = button.getAttribute('id');

                    //console.log("to tile : "+ toTile);
                    this.pieceToMove.push(toTile);
                    var fromX = parseInt(this.pieceToMove[0][1]);
                    var fromY = parseInt(this.pieceToMove[0][2]);
                    var toX = parseInt(this.pieceToMove[1][1]);
                    var toY = parseInt(this.pieceToMove[1][2]);

                    if(fromX != toX || fromY !=toY){
                    this.findTileValidMoves(fromX,fromY).forEach((pos) => {
                        var doc =  document.getElementById('t'+pos);
                        if(doc == null)
                            console.log("C'est null : " + pos);
                        doc.style.background = null;
                    });


                    
                    //console.log(fromX, fromY, toX, toY);
                    this.makeMove(fromX, fromY, toX, toY);
                    this.clickCount=0;
                    this.pieceToMove.pop();
                    this.pieceToMove.pop();
                    }else{
                        this.pieceToMove.pop();
                    }
                }
            }
            });
        });
    }
}

class GameState{

    //this is what the game would look like if we took a snapchot of it
    constructor(fromX, fromY, toX, toY, pieces, gb){

        this.pieces = {};
        this.gameboard = gb.clone();
        this.copyPieces(pieces);
        this.makeMove(fromX, fromY, toX, toY);

    }

    makeMove(fromX, fromY, toX, toY){
        //on va assumer que le move est légal

        if(fromX != toX || fromY!=toY){
            var tileA = this.gameboard.findTile(fromX, fromY);
            var tileB = this.gameboard.findTile(toX, toY);

            var occ = tileA.occupant;
            tileA.reset(false);

            if(tileB.isOccupied){
                var ennemy = tileB.occupant;
                this.pieces[ennemy].alive = false;
            }

            tileB.setPiece(occ, false);
            this.pieces[occ].x = toX;
            this.pieces[occ].y = toY;

            for(var key in this.pieces)
                this.pieces[key].update_possible_moves(this.gameboard);
        }
        //console.log('Est-ce que les blancs seront en danger : ' +this.isWhiteInDanger());
        //console.log('Est-ce que les noirs seront en danger : ' +this.isBlackInDanger());

    }
    checkIfGameOver(){
        var gameOver = true;
        if(this.isWhiteInDanger()){
            for(var key in this.pieces){
                if(key.split("-")[0] == "white"&& this.pieces[key].alive){
                    this.pieces[key].possibleMoves.forEach((move)=>{
                        var fromX = this.pieces[key].x;
                        var fromY = this.pieces[key].y;
                        var toX = parseInt(move[0]);
                        var toY =parseInt(move[1]);

                        var nextGameState = new GameState(fromX, fromY, toX, toY, this.pieces, this.gameboard);
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
                        var nextGameState = new GameState(fromX, fromY, toX, toY, this.pieces, this.gameboard);
                        if(!nextGameState.isBlackInDanger()){
                            gameOver = false;
                        }
                    });
                }
        
            }
        }else
            gameOver = false;
        return gameOver;
    }
    copyPieces(pieces){
        for(var key in pieces){
            this.pieces[key] = pieces[key].clone();
            this.pieces[key].update_possible_moves(this.gameboard);
        }
        
    }

    isWhiteInDanger(){
        return this.checkIfColorInDanger('white');
    }
    checkIfColorInDanger(colour){
        var c = colour == 'white'?'black':'white';
        var xKing = this.pieces[colour+"-king-0"].x;
        var yKing = this.pieces[colour+"-king-0"].y;

        var posKing = xKing.toString()+yKing.toString();
        for(var key in this.pieces){
            if(key.split('-')[0]==c && this.pieces[key].alive){
                if(this.pieces[key].possibleMoves.includes(posKing))
                    return true;
            }
        }
        return false;
    }

    isBlackInDanger(){
        return this.checkIfColorInDanger('black');
    }
}
