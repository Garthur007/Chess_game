class Queen{
    constructor(x,y, alive, colour){
        const w = 8;
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.index =0;
        this.colour = colour;
        this.possibleMoves = [];
        this.type = "queen";
        
	}
	
    update_possible_moves(gameboard){


        this.possibleMoves.splice(0, this.possibleMoves.length);
        //down
        for (var i = 1; i < 8; ++i)
		{
			var ytemp = this.y - i;
			if (Board.isInbound(ytemp))
			{
				if (!gameboard.findTile(this.x, ytemp).isOccupied)
				{
					this.possibleMoves.push(this.x.toString() + ytemp.toString());
				}
				else if (gameboard.findTile(this.x, ytemp).colour != this.colour)
				{
					this.possibleMoves.push(this.x.toString() + ytemp.toString());
					break;
				}
				else
				{
					break;
				}
			}
        }
        
        //up
		for (var i = 1; i < 8; ++i)
		{
			var ytemp = this.y + i;
			if (Board.isInbound(ytemp))
			{
				if (!gameboard.findTile(this.x, ytemp).isOccupied)
				{
					this.possibleMoves.push(this.x.toString() + ytemp.toString());
				}
				else if (gameboard.findTile(this.x, ytemp).colour != this.colour)
				{
					this.possibleMoves.push(this.x.toString() + ytemp.toString());
					break;
				}
				else
				{
					break;
				}
			}
        }
        
        //left
		for (var i = 1; i < 8; ++i)
		{
			
			var xtemp = this.x - i;
			if (Board.isInbound(xtemp))
			{
				if (!gameboard.findTile(xtemp, this.y).isOccupied)
				{
					this.possibleMoves.push(xtemp.toString() + this.y.toString());
				}
				else if (gameboard.findTile(xtemp, this.y).colour != this.colour)
				{
					this.possibleMoves.push(xtemp.toString() + this.y.toString());
					break;
				}
				else
				{
					break;
				}
			}
        }
        
        //right
		for (var i = 1; i < 8; ++i)
		{
			
			var xtemp = this.x + i;
			if (Board.isInbound(xtemp))
			{
				if (!gameboard.findTile(xtemp, this.y).isOccupied)
				{
					this.possibleMoves.push(xtemp.toString() + this.y.toString());
				}
				else if (gameboard.findTile(xtemp, this.y).colour != this.colour)
				{
					this.possibleMoves.push(xtemp.toString() + this.y.toString());
					break;
				}
				else
				{
					break;
				}
			}
        }
        
        //up left
		for (var i = 1; i < 8; ++i)
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
		for (var i = 1; i < 8; ++i)
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
		for (var i = 1; i < 8; ++i)
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
		for (var i = 1; i < 8; ++i)
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

