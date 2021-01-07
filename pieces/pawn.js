class Pawn{

    constructor(x, y, alive, colour, index){
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

	//Dernière méthode puis c'est finie!
    update_possible_moves(gameboard, pieces, lastMoves =null, k=1){ 

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
						this.possibleMoves.push(xtemp.toString() + ytemp.toString());

					if (gameboard.findTile(this.x, ytemp).isOccupied && gameboard.findTile(this.x, ytemp).colour == this.ennemyColour)
					{
						var tempPawnTile = gameboard.findTile(this.x, ytemp);
						var occ = gameboard.findOccupant(this.x, ytemp);
							

						var condition = true;
						if(lastMoves != null){
							var currentX = this.x;
							var currentY =this.y;
							var toX = this.x + this.direction;
							var toY = ytemp;

							if(toX - currentX == this.direction &&
								toY - currentY != 0){
									//console.log("called 1");
									var ennemyTile = gameboard.findTile(currentX,toY);
									//console.log(ennemyTile);
									if(ennemyTile.isOccupied && 
									ennemyTile.occupantType =="pawn" &&
									ennemyTile.colour != this.colour){
									
										var lastMoveTile = lastMoves[lastMoves.length-k];
										console.log(lastMoveTile);
										var x = parseInt(lastMoveTile[1]);
										var y = parseInt(lastMoveTile[2]);
									
										if(x != currentX || y != toY)
											{
												console.log(lastMoveTile);
												console.log("Rien á signaler");
											}else if(tempPawnTile.occupantType == "pawn" && 
											pieces[occ].numberOfMoves == 1
											&& pieces[occ].hasJumped && condition){
											this.possibleMoves.push((this.x + this.direction).toString()+ytemp.toString());
									}
									}
								}

						}else if(tempPawnTile.occupantType == "pawn" && 
								pieces[occ].numberOfMoves == 1
								&& pieces[occ].hasJumped && condition){
								this.possibleMoves.push((this.x + this.direction).toString()+ytemp.toString());
						}
					}
				}
				else if (!gameboard.findTile(xtemp, ytemp).isOccupied)
				{
					this.possibleMoves.push(xtemp.toString() + ytemp.toString());
					if (this.numberOfMoves == 0 && Board.isInbound(xtemp + this.direction)
						 &&!gameboard.findTile(xtemp + this.direction, ytemp).isOccupied)
						this.possibleMoves.push((xtemp +this.direction).toString() + ytemp.toString());	
				}
			}
		}


	}
	clone(){
        var clone = new Pawn(this.x, this.y, this.alive, this.colour, this.index);
        this.possibleMoves.forEach((move)=>{
            clone.possibleMoves.push(move);
		});
		clone.hasJumped = this.hasJumped;
		clone.numberOfMoves = this.numberOfMoves;
		clone.canEatSide = this.canEatSide;
        return clone;
    }
}
