/*
var liste =  [];
function start(gameManager){
    for(var i =0; i< 8; i++){
        var liste2 = [];
        for(var j = 0; j< 8; j++){
            var id = 't'+(7-i).toString() + j.toString();
            //liste2.push(id);
            //var newAttribute = document.createAttribute("nbClick");
            //newAttribute.value =0;
            //document.getElementById(id).setAttributeNode(newAttribute);

            var tile = gameManager.gameboard.findTile(7-i, j);
           
            if(tile.isOccupied){
                var piece = gameManager.gameboard.findOccupant(7-i, j);
                var listeDesPos = piece.possibleMoves;
                //console.log(piece.type + ' : '+piece.colour+' : ' + listeDesPos);
            }/*tile.addEventListener('mouseover', ()=>{
                var piece = gameManager.gameboard.findTile(7-i, j);
                var listeDesPos = piece.possibleMoves;
                conso
            });
        }
        liste.push(liste2);
    }
}
setTilesEventHandler(){
    buttons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            //Le code commence ici
            
            if(this.isWhitesTurn){
                if(this.clickCount == 0){
                   //button.getAttribute("nbClick")
                    //button.getAttribute("nbClick") += 1;
                    var id = button.id;
                    var x = parseInt(id[1]);
                    var y = parseInt(id[2]);
                    //console.log("ici qu'on call part 2 : " + x.toString + ' : ' + y.toString());

                    this.pieceToMove.push(this.gameboard.findTile(x,y));
                    if(this.gameboard.findTile(x,y).colour == "white"){
                        button.value = "";
                        this.clickCount = 1;
                    }
                }else{
                    this.clickCount = 0;
                    var type = this.pieceToMove[0].occupant.split('-')[1];
                    button.value = this.gameboard.whitePieces[type];
                    this.pieceToMove.pop();
                    this.toggleTurn();
                }
                
            }else{
                if(this.clickCount == 0){
                    //button.getAttribute("nbClick")

                    //button.getAttribute("nbClick") += 1;
                    var id = button.id;
                    var x = parseInt(id[1]);
                    var y = parseInt(id[2]);
                    //console.log("ici qu'on call : part 3 " + x.toString + ' : ' + y.toString());

                    this.pieceToMove.push(this.gameboard.findTile(x,y));
                    if(this.gameboard.findTile(x,y).colour == "black"){
                        button.value = "";
                        this.clickCount = 1;
                    }
                 
                 }else{
                     this.clickCount = 0;
                     var type = this.pieceToMove[0].occupant.split('-')[1];
                   
                     button.value = this.gameboard.blackPieces[type];
                     this.pieceToMove.pop();
                     this.toggleTurn();
                 }
                 
            }

            //Fini ici
        })

    })


    
}
makeMove(colour, type,index,  x, y){

    var destination =  't'+x.toString() + y.toString();

    var piece =  colour == 'white'?this.gameboard.whitePieces[type] : this.gameboard.blackPieces[type] ;

    var doc = document.getElementById(destination);
    if(doc != null){

        doc.setAttribute('value',  piece);
        doc.addEventListener('mouseover',()=>{
            doc.style.background = '#14c704';
        });

    }
    else
        console.log("Le doc n'existe pas : " + destination + " piece : " + piece);
}
setEventsForMouseOver(){
    buttons.forEach((button)=>{
        button.addEventListener('mouseover', ()=>{
            if(button == null)
                alert('fgsdgf');
            button.getAttribute('style').background = '#000';
        })
    })
}
*/

const buttons =  document.querySelectorAll("input");
const whiteColour = "white";
const blackColour ="black";
class GameManager{

    constructor(){
        this.gameboard = new Board(this);
        this.isGameOver = false;
        this.playerA = new PlayerWhite(this.gameboard, this);
        this.playerB = new PlayerBlack(this.gameboard, this);
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

        this.start();
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
       return this.findTileValidMoves(fromX, fromY).includes(toX.toString() + toY.toString())
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
            endingTile.setPiece(piece);

            var pieceType = piece.split('-')[1];

            if(pieceType == "pawn"){
                this.pieces[piece].numberOfMoves = 1;
                this.pieces[piece].hasJumped =true;
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

        }else{
            console.log("invalid");
        }

        //console.log(this.pieces);
   }

   //this is everything with the graphical part
    setEventHandlerOnClick(){
        buttons.forEach((button)=>{
            button.addEventListener('click', ()=>{
                if(this.clickCount == 0){
                    var fromTile =  button.getAttribute('id');
                    var x = parseInt(fromTile[1]);
                    var y = parseInt(fromTile[2]);
                    
                    if(this.gameboard.findTile(x , y).isOccupied){
                    this.pieceToMove.push(fromTile);
                    this.clickCount++;
                    

                    //test
                    

                    this.findTileValidMoves(x,y).forEach((pos) => {
                        var doc =  document.getElementById('t'+pos);
                        if(doc == null)
                            console.log("C'est null : " + this.findTileValidMoves(x,y));
                        doc.style.background = '#13ad1d';
                    });
                    //fini here
                    }
                }else{

                    var toTile = button.getAttribute('id');

                    //console.log("to tile : "+ toTile);
                    this.pieceToMove.push(toTile);
                    var fromX = parseInt(this.pieceToMove[0][1]);
                    var fromY = parseInt(this.pieceToMove[0][2]);

                    this.findTileValidMoves(fromX,fromY).forEach((pos) => {
                        var doc =  document.getElementById('t'+pos);
                        if(doc == null)
                            console.log("C'est null : " + pos);
                        doc.style.background = null;
                    });


                    var toX = parseInt(this.pieceToMove[1][1]);
                    var toY = parseInt(this.pieceToMove[1][2]);
                    //console.log(fromX, fromY, toX, toY);
                    this.makeMove(fromX, fromY, toX, toY);
                    this.clickCount=0;
                    this.pieceToMove.pop();
                    this.pieceToMove.pop();
                }
            });
        });
    }

}