const w = 8;

class Board{

    constructor(gm){
        this.tiles = [];
        this.gameManager = gm;
        this.InitializeBoard();
    }
    InitializeBoard(){
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++)
                this.tiles.push(new Tile(i, j));
    }
    findOccupant(x, y){
        var tile = this.findTile(x,y);
        if(tile.isOccupied)
            return tile.occupant;
    }
    findTile(x, y){
        return  Board.isInbound(x, y)? this.tiles[(x * w) + y]:null;
    }
    static isInbound(a, b = 0){
        return a >= 0 && a < 8 && b >= 0 && b < 8;
    }
}

//find occupant function
/*
if(colour == "white"){
                if(type == "pawn"){
                    return this.gameManager.playerA.pawns[index];
                }else if(type == "bishop"){
                    return this.gameManager.playerA.bishops[index];
                }else if(type == "rook"){
                    return this.gameManager.playerA.rooks[index];
                }else if(type == "knight"){
                    return this.gameManager.playerA.knights[index];
                }else if(type == "queen"){
                    return this.gameManager.playerA.queen;
                }else if(type == "king"){
                    return this.gameManager.playerA.king;
                }
            }else{
                
                if(type == "pawn"){
                    return this.gameManager.playerB.pawns[index];
                }else if(type == "bishop"){
                    return this.gameManager.playerB.bishops[index];
                }else if(type == "rook"){
                    return this.gameManager.playerB.rooks[index];
                }else if(type == "knight"){
                    return this.gameManager.playerB.knights[index];
                }else if(type == "queen"){
                    return this.gameManager.playerB.queen;
                }else if(type == "king"){
                    return this.gameManager.playerB.king;
                }
            }
        

*/