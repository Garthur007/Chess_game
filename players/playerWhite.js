//ne devrait que s'occuper de faire les moves

class PlayerWhite{
    constructor(gameboard, gameManager){

        this.gameboard =  gameboard;
        this.gameManager = gameManager;
        this.colour = "white";
        this.isKingInDanger = false;

    }

    makeMove(fromX, fromY, toX, toY){
        
    }

}

/**this.pawns = [new Pawn(0,1, true, this.colour, 0, this.gameboard),   
            new Pawn(1,1, true, this.colour, 1, this.gameboard), 
            new Pawn(2,1, true, this.colour, 2, this.gameboard), 
            new Pawn(3,1, true, this.colour, 3, this.gameboard),
            new Pawn(4,1, true, this.colour, 4, this.gameboard),
            new Pawn(5,1, true, this.colour, 5, this.gameboard),
            new Pawn(6,1, true, this.colour, 6, this.gameboard),
            new Pawn(7,1, true, this.colour, 7, this.gameboard)
        ];

        this.king = new King(4,0, true, this.colour, this.gameboard);
        this.queen = new Queen(3,0, true, this.colour, this.gameboard);

        this.bishops = [ new Bishop(2,0, true, this.colour, 0, this.gameboard), 
            new Bishop(5,0, true, this.colour, 1, this.gameboard)
        ];
        
        this.rooks = [new Rook(0,0, true, this.colour, 0, this.gameboard),
            new Rook(7,0, true, this.colour, 1, this.gameboard)];
     
        this.knights = [new Knight(1,0,true, this.colour, 0, this.gameboard),
            new Knight(6,0,true, this.colour, 1, this.gameboard)];
 */