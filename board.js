const w = 8;

class Board{
    constructor(){
        this.tiles = [];
        this.initializeBoard();
    }

    initializeBoard(){
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++)
                this.tiles.push(new Tile(i, j));
    }

    findOccupant(x, y){
        var tile = this.findTile(x,y);
        if(tile.isOccupied)
            return tile.occupant;
    }
    findTile = (x,y) => { return Board.isInbound(x, y)? this.tiles[(x * w) + y]:null; }   

    clone(){
        var gbCopy = new Board();
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++){
                gbCopy.tiles[i*w+j] = this.tiles[i*w+j].clone();
            }
        return gbCopy;
    }
    static isInbound = (a, b = 0 ) => { return a >= 0 && a < 8 && b >= 0 && b < 8; }
    static randomNumber = (k) => { return  Math.floor((Math.random() * k) + 1);}
}
