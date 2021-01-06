const blackPieces = {rook:"♜", knight:"♞",bishop: "♝", queen: "♛",king:"♚",pawn:"♟"};
const whitePieces = {pawn:"♙",rook: "♖", knight:"♘",bishop: "♗",queen: "♕", king:"♔"};  

class Tile{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.nbClick = 0;
        this.isOccupied = false;
        this.occupant = "";
        this.occupantType = "";
        this.colour = "";
        this.idTile = x.toString() + y.toString();
        this.id = this.x.toString() + this.y.toString();
    }
    setPiece(occ){
        this.reset();
        this.occupant = occ;
        this.colour = occ.split("-")[0];
        this.occupantType = occ.split('-')[1];
        this.isOccupied = true;
        this.setSymbolOnTile();
    }
    setSymbolOnTile(){
        var symbol = this.colour == "white"?whitePieces[this.occupantType]: blackPieces[this.occupantType];
        var doc = document.getElementById('t' + this.id);
        doc.setAttribute('value', symbol);
    }
    reset(){
        var doc = document.getElementById('t' + this.id);
        doc.setAttribute('value', "");
        this.occupantType = "";
        this.occupant = "";
        this.colour = ";"
        this.isOccupied = false;
    }

    copy(){
        var newCopy = new Tile(this.x, this.y);
        newCopy.nbClick = this.nbClick;
        newCopy.isOccupied = this.isOccupied;
        newCopy.occupant = this.occupant;
        newCopy.occupantType = this.occupantType;
        newCopy.colour = this.colour;
        return newCopy;
    }
}