class King{
    constructor(x,y, alive, colour, index = 0){
        this.hasJump = false;
        
        this.w = 8;
        this.x = x;
        this.y = y;
        this.index = 0;
        this.nextIndex = this.index + 1;
        this.alive =  alive;
        this.colour = colour;
        this.possibleMoves = [];
        this.type = "king";

        this.toString =()=>{
            return this.colour + '-' + this.type + '-'+this.index;
        };
        this.switchWithRook =  () =>{
            var posTemp = this.colour == "white"?0:7;
            if(this.x == posTemp && this.y == 6){
                if(!this.hasJump){
                    return true;
                }
            }else{
                return false;
            }
        };
    }
    
    update_possible_moves(gameboard){
        this.possibleMoves.splice(0, this.possibleMoves.length);
        for (var i = -1; i < 2; ++i)
		{
			for (var j = -1; j < 2; ++j)
			{
				var xtemp = this.x + j;
                var ytemp = this.y + i;
                
				if (Board.isInbound(xtemp, ytemp) && (i != 0 || j != 0))
				{
					var tempTile = gameboard.findTile(xtemp, ytemp);
					if (!tempTile.isOccupied)
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					else if (tempTile.colour != this.colour)
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                }

			}
        }
        
        if(!this.hasJump)
            if(Board.isInbound(this.y + 2) && !gameboard.findTile(this.x, this.y + 2).isOccupied && 
            !gameboard.findTile(this.x, this.y + 1).isOccupied)
                this.possibleMoves.push(this.x.toString()+ (this.y + 2).toString());
    }

    clone(){
        var clone = new King(this.x, this.y, this.alive, this.colour);
        this.possibleMoves.forEach((move)=>{
            clone.possibleMoves.push(move);
        });
        clone.hasJump = this.hasJump;
        return clone;
    }
}