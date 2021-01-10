class Rook extends Piece{
    constructor(x,y, alive, colour, index){
        super(x,y, alive, colour, index, "rook");
    }

    update_possible_moves(gameboard){
        this.resetMoves();

        //left
        for(var i = 1; i < w; i++){ 
            var ytemp = this.y - i;
            if (isInbound(ytemp)){
                var move = this.x.toString() + ytemp.toString();
                if (!gameboard.findTile(this.x, ytemp).isOccupied)
                   this.possibleMoves.push(move);
                else if (gameboard.findTile(this.x, ytemp).colour != this.colour){
                    this.possibleMoves.push(move);
                    break;
                }
                else
                    break;
            }
        }   
        //right
        for (var i = 1; i < w; i++){ 
				var ytemp = this.y + i;
				if (isInbound(ytemp)){
                    var move = this.x.toString() + ytemp.toString();
					if (!gameboard.findTile(this.x, ytemp).isOccupied)
                        this.possibleMoves.push(move);
                    else if (gameboard.findTile(this.x, ytemp).colour != this.colour){
                        this.possibleMoves.push(move);
						break;
					}
					else
                        break;
                }
		}
        //down
        for (var i = 1; i < w; i++){
            var xtemp = this.x - i;
            if (isInbound(xtemp)){
                var move = xtemp.toString() + this.y.toString();
                if (!gameboard.findTile(xtemp, this.y).isOccupied)
                    this.possibleMoves.push(move);
                else if (gameboard.findTile(xtemp, this.y).colour != this.colour){
                    this.possibleMoves.push(move);
                    break;
                }
                else
                    break;
            }
        }
        //up
        for (var i = 1; i < w; i++)
			{
				var xtemp = this.x + i;
				if (isInbound(xtemp)){
                    var move = xtemp.toString() + this.y.toString();
					if (!gameboard.findTile(xtemp, this.y).isOccupied)
                        this.possibleMoves.push(move);
                    else if (gameboard.findTile(xtemp, this.y).colour != this.colour){
                        this.possibleMoves.push(move);
						break;
					}
					else
                        break;
                }
        }
    }
    clone(){
        var clone = new Rook(this.x, this.y, this.alive, this.colour, this.index);
        this.possibleMoves.forEach((move)=>{
            clone.possibleMoves.push(move);
        });
        return clone;
    }
}
