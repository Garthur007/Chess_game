class Bishop{
    constructor(x,y, alive, colour, index){
        this.w = 8;
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.colour = colour;
        this.index = index;
        this.possibleMoves = [];
        this.type = "bishop";
    }
    update_possible_moves(gameboard){
        
        //we empty the possible moves array
        this.possibleMoves.splice(0, this.possibleMoves.length);

        //up left
        for (var i = 1; i < this.w; ++i)
			{
				var xtemp = this.x + i;
				var ytemp = this.y - i;
				if (Board.isInbound(xtemp, ytemp))
				{
					if (!gameboard.findTile(xtemp, ytemp).isOccupied)
					{
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					}
					else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
					{
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
						break;
					}
					else
					{
						break;
					}
				}
            }

        //up right
        for (var i = 1; i < this.w; ++i)
        {
            var xtemp = this.x + i;
            var ytemp = this.y + i;
            if (Board.isInbound(xtemp, ytemp))
            {
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                }
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
                {
                   this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                {
                    break;
                }
            }
        }

        //down left
        for (var i = 1; i < this.w; ++i)
        {
            var xtemp = this.x - i;
            var ytemp = this.y - i;
            if (Board.isInbound(xtemp, ytemp))
            {
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                }
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                {
                    break;
                }
            }
        }

        //down right
        for (var i = 1; i < this.w; ++i)
        {
            var xtemp = this.x - i;
            var ytemp = this.y + i;
            if (Board.isInbound(xtemp, ytemp))
            {
                if (!gameboard.findTile(xtemp, ytemp).isOccupied)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                }
                else if (gameboard.findTile(xtemp, ytemp).colour != this.colour)
                {
                    this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                    break;
                }
                else
                {
                    break;
                }
            }
        }
    }
    
}