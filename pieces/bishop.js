class Bishop extends Piece{
    constructor(x,y, alive, colour, index){
        super(x,y, alive, colour, index, "bishop");
    }
    update_possible_moves(gameboard){
        this.resetMoves();

        //up left
        for (var i = 1; i < w; ++i){
				var xtemp = this.x + i;
				var ytemp = this.y - i;
				if (isInbound(xtemp, ytemp))
					if (!gameboard.findTile(xtemp, ytemp).isOccupied)
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					else if (gameboard.findTile(xtemp, ytemp).colour != this.colour){
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
						break;
					}
					else
						break;
        }
        //up right
        for (var i = 1; i < w; ++i){
            var xtemp = this.x + i;
            var ytemp = this.y + i;
            if (isInbound(xtemp, ytemp))
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
                {
                   this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                    break;
        }
        //down left
        for (var i = 1; i < w; ++i){
            var xtemp = this.x - i;
            var ytemp = this.y - i;
            if (isInbound(xtemp, ytemp))
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour){
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                    break;
        }
        //down right
        for (var i = 1; i < w; ++i)
        {
            var xtemp = this.x - i;
            var ytemp = this.y + i;
            if (isInbound(xtemp, ytemp))
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                    break;
        }
    }
    clone(){
        var clone = new Bishop(this.x, this.y, this.alive, this.colour, this.index);
        
        clone.possibleMoves = [].concat(this.possibleMoves);
        return clone;
    }
}