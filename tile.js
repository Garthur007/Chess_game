class Tile{
    constructor(x, y){
        this.x = x;
        this.y = y;
       
        this.isOccupied = false;
        this.occupant = "";
        this.occupantType = "";
        this.colour = "";
        this.value = '';
        this.toString = () => {return this.x.toString() + this.y.toString();}
    }
    setPiece(occ, actualGame = true){
        this.reset(actualGame);
        this.occupant = occ;
        this.colour = occ.split("-")[0];
        this.occupantType = occ.split('-')[1];
        this.isOccupied = true;
        this.value = this.colour == "white"?whitePieces[this.occupantType]: blackPieces[this.occupantType];
        if(actualGame)
            this.setSymbolOnTile();
    }
    setSymbolOnTile(){
        var symbol = this.colour == "white"?whitePieces[this.occupantType]: blackPieces[this.occupantType];
        var doc = document.getElementById('t' + this.toString());
        doc.setAttribute('value', symbol);
        this.value =symbol;
    }
    reset(actualGame = true){
        if(actualGame){
            var doc = document.getElementById('t' + this.toString());
            doc.setAttribute('value', "");
        }
        this.occupantType = "";
        this.occupant = "";
        this.colour = ""
        this.value = '';
        this.isOccupied = false;
    }

    clone(){
        var newCopy = new Tile(this.x, this.y);
        newCopy.isOccupied = this.isOccupied;
        newCopy.occupant = this.occupant;
        newCopy.occupantType = this.occupantType;
        newCopy.colour = this.colour;
        newCopy.value = this.value ;
        return newCopy;
    }
}