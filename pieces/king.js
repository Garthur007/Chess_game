class King extends Piece{ 
    constructor(x,y, alive, colour, index = 0){
        super(x,y, alive, colour, index, "king");

        this.hasJump = false;
        
        this.inDanger = false;
        this.switchWithRook =  () =>{
            var posTemp = this.colour == "white"?0:7;
            return (this.x == posTemp && this.y == 6 && !this.hasJump);
        };
    }
    
    update_possible_moves(gameboard){
        this.resetMoves();
        for (var i = -1; i < 2; ++i)
			for (var j = -1; j < 2; ++j){
				var xtemp = this.x + j;
                var ytemp = this.y + i;
				if (isInbound(xtemp, ytemp) && (i != 0 || j != 0)){
					var tempTile = gameboard.findTile(xtemp, ytemp);
					if (!tempTile.isOccupied)
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					else if (tempTile.colour != this.colour)
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
                }
            }
        
        
        if(!this.hasJump && !this.inDanger)
            if(isInbound(this.y + 2) && !gameboard.findTile(this.x, this.y + 2).isOccupied && 
            !gameboard.findTile(this.x, this.y + 1).isOccupied)
                this.possibleMoves.push(this.x.toString()+ (this.y + 2).toString());
    }

    clone(){
        var clone = new King(this.x, this.y, this.alive, this.colour);
        
        clone.possibleMoves = [].concat(this.possibleMoves);
        clone.hasJump = this.hasJump;
        return clone;
    }
}