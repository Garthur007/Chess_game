class Rook{
    constructor(x,y, alive, colour, index){
        const w = 8;
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.colour =  colour;
        this.index = index;
        this.possibleMoves = [];
        this.type = "rook";
    }

    update_possible_moves(gameboard){

        this.possibleMoves.splice(0, this.possibleMoves.length); //we empty the possible moves array

        for(var i = 1; i < w; i++){ //under
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
                }
                else{
                    break;
                }
            }
        }   

        for (var i = 1; i < w; i++){ //above
				var ytemp = this.y + i;
				if (Board.isInbound(ytemp))
				{
					if (!gameboard.findTile(this.x, ytemp).isOccupied)
					{
                        this.possibleMoves.push(this.x.toString() + ytemp.toString());
					}
                    else if (gameboard.findTile(this.x, ytemp).isOccupied &&
                            gameboard.findTile(this.x, ytemp).colour != this.colour)
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
        
        for (var i = 1; i < w; i++){ //left
            var xtemp = this.x - i;
            if (Board.isInbound(xtemp))
            {
                if (!gameboard.findTile(xtemp, this.y).isOccupied)
                {
                    this.possibleMoves.push(xtemp.toString() + this.y.toString());
                }
                else if (gameboard.findTile(xtemp, this.y).isOccupied &&
                        gameboard.findTile(xtemp, this.y).colour != this.colour)
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

        for (var i = 1; i < w; i++) //right
			{
				var xtemp = this.x + i;
				if (Board.isInbound(xtemp))
				{
					if (!gameboard.findTile(xtemp, this.y).isOccupied)
					{
                        this.possibleMoves.push(xtemp.toString() + this.y.toString());
					}
                    else if (gameboard.findTile(xtemp, this.y).isOccupied &&
                            gameboard.findTile(xtemp, this.y).colour != this.colour)
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
        
        //console.log("voici les possibles moves : " + this.possibleMoves);
    }
    clone(){
        var clone = new Rook(this.x, this.y, this.alive, this.colour, this.index);
        this.possibleMoves.forEach((move)=>{
            clone.possibleMoves.push(move);
        });
        return clone;
    }
}
