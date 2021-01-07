class Piece{
    constructor(x,y, alive, colour, index, type){
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.colour =  colour;
        this.index = index;
        this.possibleMoves = [];
        this.type = type;
        this.toString = () => { return this.colour + '-' +
         this.type + '-' + this.index.toString();};
        this.resetMoves = () => {this.possibleMoves.splice(0, this.possibleMoves.length);};   
    }
}