class Knight extends Piece{
    constructor(x,y, alive, colour, index){
        super(x,y, alive, colour, index, "knight");
    }

    update_possible_moves(gameboard){
        this.resetMoves();

        var x1 = this.x - 1;
        var y1 = this.y + 2;
		if (Board.isInbound(x1, y1))
            if (!gameboard.findTile(x1, y1).isOccupied)
                this.possibleMoves.push(x1.toString() + y1.toString());
            else if (gameboard.findTile(x1, y1).colour != this.colour)
                this.possibleMoves.push(x1.toString() + y1.toString());        

        var x2 = this.x - 2;
        var y2 = this.y + 1;
        if (Board.isInbound(x2, y2))
            if (!gameboard.findTile(x2, y2).isOccupied)
                this.possibleMoves.push(x2.toString() + y2.toString());
            else if (gameboard.findTile(x2, y2).colour != this.colour)
                this.possibleMoves.push(x2.toString() + y2.toString());
    
        var x3 = this.x - 1;
        var y3 = this.y - 2;
        if (Board.isInbound(x3, y3))
            if (!gameboard.findTile(x3, y3).isOccupied)
                this.possibleMoves.push(x3.toString() + y3.toString());
            else if (gameboard.findTile(x3, y3).colour != this.colour)
                this.possibleMoves.push(x3.toString() + y3.toString());

        var x4 = this.x - 2;
        var y4 = this.y - 1;
        if (Board.isInbound(x4, y4))
            if (!gameboard.findTile(x4, y4).isOccupied)
                this.possibleMoves.push(x4.toString() + y4.toString());
            else if (gameboard.findTile(x4, y4).colour != this.colour)
                this.possibleMoves.push(x4.toString() + y4.toString());

        var x5 = this.x + 1;
        var y5 = this.y - 2;
        if (Board.isInbound(x5, y5))
            if (!gameboard.findTile(x5, y5).isOccupied)
                this.possibleMoves.push(x5.toString() + y5.toString());
            else if (gameboard.findTile(x5, y5).colour != this.colour)
                this.possibleMoves.push(x5.toString() + y5.toString());

        var x6 = this.x + 2;
        var y6 = this.y - 1;
        if (Board.isInbound(x6, y6))
            if (!gameboard.findTile(x6, y6).isOccupied)
                this.possibleMoves.push(x6.toString() + y6.toString());
            else if (gameboard.findTile(x6, y6).colour != this.colour)
                this.possibleMoves.push(x6.toString() + y6.toString());

        var x7 = this.x + 1;
        var y7 = this.y + 2;
        if (Board.isInbound(x7, y7))
            if (!gameboard.findTile(x7, y7).isOccupied)
                this.possibleMoves.push(x7.toString() + y7.toString());
            else if (gameboard.findTile(x7, y7).colour != this.colour)
                this.possibleMoves.push(x7.toString() + y7.toString());

        var x8 = this.x + 2;
        var y8 = this.y + 1;
        if (Board.isInbound(x8, y8))
            if (!gameboard.findTile(x8, y8).isOccupied)
                this.possibleMoves.push(x8.toString() + y8.toString());
            else if (gameboard.findTile(x8, y8).colour != this.colour)
                this.possibleMoves.push(x8.toString() + y8.toString());
    }

    clone(){
        var clone = new Knight(this.x, this.y, this.alive, this.colour, this.index);
        this.possibleMoves.forEach((move)=>{
            clone.possibleMoves.push(move);
        });
        return clone;
    }
}