class PlayerBlack{
    constructor(gameboard, gameManager){

        this.gameboard =  gameboard;
        this.gameManager = gameManager;
        this.colour = "black";
        this.isKingInDanger = false;

        this.pawns = [new Pawn(6,0, true, this.colour, 0,  this.gameManager),
            new Pawn(6,1, true, this.colour, 1,  this.gameManager), 
            new Pawn(6,2, true, this.colour, 2,  this.gameManager), 
            new Pawn(6,3, true, this.colour, 3,  this.gameManager),
            new Pawn(6,4, true, this.colour, 4,  this.gameManager),
            new Pawn(6,5, true, this.colour, 5,  this.gameManager),
            new Pawn(6,6, true, this.colour, 6,  this.gameManager),
            new Pawn(6,7, true, this.colour, 7,  this.gameManager)
        ];

        this.king = new King(7,4, true, this.colour, this.gameManager);
        this.queen = new Queen(7,3, true, this.colour,  this.gameManager);

        this.bishops = [ new Bishop(7,2, true, this.colour, 0,  this.gameManager), 
            new Bishop(7,5, true, this.colour, 1,  this.gameManager)
        ];
        
        this.rooks = [new Rook(7,0, true, this.colour, 0,  this.gameManager),
            new Rook(7,7, true, this.colour, 1,  this.gameManager)];
     
        this.knights = [new Knight(7,1,true, this.colour, 0,  this.gameManager),
            new Knight(7,6,true, this.colour, 1,  this.gameManager)];

       // this.setPieceOnBoard();
    }

    setPieceOnBoard(){
        this.pawns.forEach((pawn)=> {
            this.movePieceOnBoard(pawn, pawn.x, pawn.y);
        });

        this.bishops.forEach((bishop)=>{
            this.movePieceOnBoard(bishop, bishop.x, bishop.y);
        });

        this.rooks.forEach((rook)=>{
            this.movePieceOnBoard(rook, rook.x, rook.y)
        });

        this.knights.forEach((knight)=> {
            this.movePieceOnBoard(knight, knight.x, knight.y)
        });

        this.movePieceOnBoard(this.queen, this.queen.x, this.queen.y);
        this.movePieceOnBoard(this.king, this.king.x, this.king.y);
    }

    movePieceOnBoard(piece, x, y){
        piece.update_possible_moves(this.gameboard);
        this.gameboard.findTile(x,y).setPiece(piece.colour + "-" + piece.type + "-" + piece.index);
        this.gameManager.makeMove(piece.colour, piece.type,piece.index, x, y);
    }

}