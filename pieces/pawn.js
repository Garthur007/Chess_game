class Pawn{

    constructor(x, y, alive, colour, index, gm){
		this.hasJumped = false;
        this.x = x;
        this.y = y;
		this.colour =  colour;
		this.direction = this.colour == "white" ? 1 : -1;
		this.ennemyColour = this.colour =="white"?"black":"white";
		this.alive = alive;
		this.index = index;
        this.possibleMoves =  [];
		this.numberOfMoves = 0;
		this.type = "pawn";
		this.canEatSide =  false;
    }

    update_possible_moves(gameboard){ 

       this.possibleMoves.splice(0,this.possibleMoves.length);
		var xtemp = this.x + this.direction;

		for (var i = -1; i < 2; i++)
		{
			var ytemp = this.y + i;
			if (Board.isInbound(xtemp, ytemp))
			{
				if (i != 0)
				{
					if (gameboard.findTile(xtemp, ytemp).isOccupied && gameboard.findTile(xtemp, ytemp).colour == this.ennemyColour)
					{
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());
						fdatasync;
					}
					
					if (gameboard.findTile(this.x, ytemp).isOccupied && gameboard.findTile(this.x, ytemp).colour == this.ennemyColour)
					{
						var tempPawnTile = gameboard.findTile(this.x, ytemp);
						var occ = gameboard.findOccupant(this.x, ytemp);
						

						if (tempPawnTile.occupantType == "pawn" &&
								tempPawnTile.colour == this.ennemyColour && 
								this.canEatSide &&
								gameboard.gameManager.pieces[occ].hasJumped){
								this.possibleMoves.push((this.x + this.direction).toString()+ytemp.toString());
						}
					}
				}
				else if (!gameboard.findTile(xtemp, ytemp).isOccupied)
				{
					this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					if (this.numberOfMoves == 0 && !gameboard.findTile(xtemp + this.direction, ytemp).isOccupied)
					{
						this.possibleMoves.push((xtemp +this.direction).toString() + ytemp.toString());
					}

				}
			}
		}


	}
	
}
