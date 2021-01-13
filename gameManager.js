const buttons =  document.querySelectorAll("input");
class GameManager{

    constructor(){
        this.gameboard = new Board();
        this.isGameOver = false;
        this.isWhitesTurn = true;

        this.pieceToMove = [];

        this.clickCount = 0;
        this.pieces = {
            "white-pawn-0": new Pawn(1,0, true, white, 0, this.gameboard),
            "white-pawn-1": new Pawn(1,1, true, white, 1, this.gameboard),
            "white-pawn-2": new Pawn(1,2, true, white, 2, this.gameboard), 
            "white-pawn-3": new Pawn(1,3, true, white, 3, this.gameboard),
            "white-pawn-4": new Pawn(1,4, true, white, 4, this.gameboard),
            "white-pawn-5": new Pawn(1,5, true, white, 5, this.gameboard),
            "white-pawn-6": new Pawn(1,6, true, white, 6, this.gameboard),
            "white-pawn-7": new Pawn(1,7, true, white, 7, this.gameboard),
            "white-king-0": new King(0,4, true, white, this.gameboard), 
            "white-queen-0":new Queen(0,3, true, white, this.gameboard),
            "white-bishop-0": new Bishop(0,2, true, white, 0, this.gameboard),
            "white-bishop-1": new Bishop(0,5, true, white, 1, this.gameboard),
            "white-rook-0": new Rook(0,0, true, white, 0, this.gameboard),
            "white-rook-1": new Rook(0,7, true, white, 1, this.gameboard),
            "white-knight-0": new Knight(0,1,true, white, 0, this.gameboard),
            "white-knight-1": new Knight(0,6,true, white, 1, this.gameboard),
            "black-pawn-0": new Pawn(6,0, true, black, 0, this.gameboard),
            "black-pawn-1": new Pawn(6,1, true, black, 1, this.gameboard),
            "black-pawn-2": new Pawn(6,2, true, black, 2, this.gameboard), 
            "black-pawn-3": new Pawn(6,3, true, black, 3, this.gameboard),
            "black-pawn-4": new Pawn(6,4, true, black, 4, this.gameboard),
            "black-pawn-5": new Pawn(6,5, true, black, 5, this.gameboard),
            "black-pawn-6": new Pawn(6,6, true, black, 6, this.gameboard),
            "black-pawn-7": new Pawn(6,7, true, black, 7, this.gameboard),
            "black-king-0": new King(7,4, true, black, this.gameboard), 
            "black-queen-0":new Queen(7,3, true, black, this.gameboard),
            "black-bishop-0": new Bishop(7,2, true, black, 0, this.gameboard),
            "black-bishop-1": new Bishop(7,5, true, black, 1, this.gameboard),
            "black-rook-0": new Rook(7,0, true,black, 0, this.gameboard),
            "black-rook-1": new Rook(7,7, true, black, 1, this.gameboard),
            "black-knight-0": new Knight(7,1,true, black, 0, this.gameboard),
            "black-knight-1": new Knight(7,6,true, black, 1, this.gameboard)

        };

        //lastIndex is used when a pawn reaches the other side 
        //of the board and wants to transform
        this.lastIndex = {
            'white-rook':1,
            'white-bishop':1,
            'white-knight':1,
            'white-queen':0,
            'black-rook':1,
            'black-bishop':1,
            'black-knight':1,
            'black-queen':0
        };

        //to make sure a player doesn't play twice
        this.toggleTurn = () => {this.isWhitesTurn = !this.isWhitesTurn;};
        
        this.start();
 }


   start(){
        this.init_pieces_on_board();
        this.setEventHandlerOnClick();
   } 

   init_pieces_on_board(){
        for(var key in this.pieces){
            var piece = this.pieces[key];
            var tile = this.gameboard.findTile(piece.x, piece.y);
            tile.setPiece(key);
        }
   }

   get_current_gameState(){
       var currentGs = new GameState(this.pieces, this.gameboard, this.pieceToMove);
       currentGs.isWhiteTurn = this.isWhitesTurn;
       return currentGs;
   }

   makeMove(fromX, fromY, toX, toY){
        if(this.get_current_gameState().isValidMove(fromX, fromY, toX, toY)){
            var startingTile = this.gameboard.findTile(fromX, fromY);
            var endingTile = this.gameboard.findTile(toX, toY);
            var piece = startingTile.occupant;

            var pieceType = piece.split('-')[1];
            var pieceColour = startingTile.colour;

            if(pieceType=="pawn"){
                var currentX = this.pieces[piece].x;
                var currentY =this.pieces[piece].y;
                if(toX - currentX == this.pieces[piece].direction &&
                    toY - currentY != 0){
                        //console.log("called 1");
                        var ennemyTile = this.gameboard.findTile(currentX,toY);
                        //console.log(ennemyTile);
                        if(ennemyTile.isOccupied && 
                        ennemyTile.occupantType =="pawn" &&
                        ennemyTile.colour != pieceColour && this.pieces[this.gameboard.findOccupant(currentX, toY)].hasJumped &&
                        this.pieces[this.gameboard.findOccupant(currentX, toY)].numberOfMoves == 1){
        
                            var ennemy = ennemyTile.occupant;
                            this.pieces[ennemy].alive = false;
                            ennemyTile.reset();
                        }
                    }
            }            

            this.pieces[piece].x = toX;
            this.pieces[piece].y = toY;
            startingTile.reset();

            if(endingTile.isOccupied){
                var ennemy = endingTile.occupant;
                this.pieces[ennemy].alive = false;
            }
            endingTile.setPiece(piece);

            if(pieceType == "pawn"){
                this.pieces[piece].numberOfMoves += 1;
                var target = pieceColour == "white"?3:4;
                if(this.pieces[piece].numberOfMoves == 1 && this.pieces[piece].x == target)
                    this.pieces[piece].hasJumped =true;
                var cibleX = pieceColour == "white"?7:0;

                if(toX == cibleX){
                    //le pion peut devenir ce qu'il veut
                    //queen, rook, knight, bishop
                    var piecePromotion = prompt("The pawn is being promoted to a :", "queen").toLowerCase();
                    delete this.pieces[piece];
                    var index;
                    index = this.lastIndex[pieceColour+'-'+piecePromotion] + 1;
                    this.lastIndex[pieceColour +'-'+piecePromotion]++;

                    if(piecePromotion == "queen"){
                        this.pieces[pieceColour + '-'+piecePromotion+'-'+index.toString()] = new Queen(toX, toY, true, pieceColour);
                    }else if(piecePromotion == "bishop"){
                        this.pieces[pieceColour + '-'+piecePromotion+'-'+index.toString()] = new Bishop(toX, toY, true, pieceColour);
                    }else if(piecePromotion == "rook"){
                        this.pieces[pieceColour + '-'+piecePromotion+'-'+index.toString()] = new Rook(toX, toY, true, pieceColour);
                    }else if(piecePromotion == "knight"){
                        this.pieces[pieceColour + '-'+piecePromotion+'-'+index.toString()] = new Knight(toX, toY, true, pieceColour);
                    }
                    
                    endingTile.setPiece(pieceColour +"-"+piecePromotion+"-"+index.toString());
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

            this.toggleTurn();
           
            if(this.get_current_gameState().checkIfGameOver()){
                this.isGameOver = true;
                alert("The game is over!");
            }
           
            if(!this.isWhitesTurn)
            // I decided to force the algorithm to wait 500ms 
            // to give the computer to at least make the white
            // move before starting to create the search tree for the ai
                setTimeout(()=>{
                    //this is where montecarlo is called
                    //and where it makes his move
                   var mcts = new Montecarlo_TS(this.get_current_gameState());
                    var atk = mcts.find_best_move();
                    this.makeMove(atk.fromX, atk.fromY, atk.toX, atk.toY);
                    mcts=null;
                },500)
    
        }else{
            console.log("invalid move");
        }

   }
   
   //to add the wanted behaviour on the board
   // so that we are able to play
    setEventHandlerOnClick(){
        buttons.forEach((button)=>{
            button.addEventListener('click', ()=>{
                if(!this.isGameOver){
                    if(this.clickCount == 0 ){
                        //when we are selecting the tile
                        var fromTile =  button.getAttribute('id');
                        var x = parseInt(fromTile[1]);
                        var y = parseInt(fromTile[2]);
                        var colourTurn = this.isWhitesTurn?white:black;

                        if(this.gameboard.findTile(x , y).isOccupied && this.gameboard.findTile(x , y).colour == colourTurn){
                            var nbMovePossible = 0;
                            this.get_current_gameState().findTileValidMoves(x, y).forEach((pos) => {
                                //this is to highlight all the possible moves of a piece
                                nbMovePossible++;
                                var doc =  document.getElementById('t'+pos);
                                doc.style.background = 'green';
                            });
                            if(nbMovePossible!= 0){
                                this.clickCount++;
                                this.pieceToMove.push(fromTile);
                            }
                        }
                    }else{
                        var toTile = button.getAttribute('id');
                        
                        this.pieceToMove.push(toTile);


                        var fromX = parseInt(this.pieceToMove[this.pieceToMove.length-2][1]);
                        var fromY = parseInt(this.pieceToMove[this.pieceToMove.length-2][2]);
                        var toX = parseInt(this.pieceToMove[this.pieceToMove.length-1][1]);
                        var toY = parseInt(this.pieceToMove[this.pieceToMove.length-1][2]);

                        if(fromX != toX || fromY !=toY){
                            this.get_current_gameState().findTileValidMoves(fromX,fromY).forEach((pos) => {
                                var doc =  document.getElementById('t'+pos);
                                doc.style.background = null;
                            });
                            this.makeMove(fromX, fromY, toX, toY);
                            this.clickCount=0;
                        }else{
                            this.pieceToMove.pop();
                        }
                    }
                }
            });
        });
    }
}

