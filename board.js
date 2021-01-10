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

    findTile = (x,y) => { return isInbound(x, y)? this.tiles[(x * w) + y]:null; }   
    
    clone(){
        //this method returns a clone of the board
        var gbCopy = new Board();
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++)
                gbCopy.tiles[i*w+j] = this.tiles[i*w+j].clone();
        return gbCopy;
    }
}
