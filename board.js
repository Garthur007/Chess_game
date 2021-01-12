class Board{
    constructor(){
        this.tiles = [];
        this.initializeBoard();
    }
    
    initializeBoard(){
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++)
                this.tiles.push(new Tile(i, j));
    }

    findOccupant(x, y){
        var tile = this.findTile(x,y);
        if(tile.isOccupied)
            return tile.occupant;
    }

    findTile = (x,y) => { return isInbound(x, y)? this.tiles[(x * w) + y]:null; }   
    
    clone(){
        //this method returns a clone of the board
        var gbCopy = new Board();
        for(var i = 0; i < w; i++)
            for(var j = 0; j < w; j++)
                gbCopy.tiles[i*w+j] = this.tiles[i*w+j].clone();
        return gbCopy;
    }
    
    static createBoard(gameboard = null){
    
        var table =  document.createElement('table');
    
        table.setAttribute('class', 'chess-board');
        var tbody =  document.createElement('tbody');
    
        tbody.setAttribute('class', 'body');
    
        for(var i = 0; i <w+1;i++){
            var tr = document.createElement('tr');
            for(var j =0; j < w+1; j++){
                var td = document.createElement('td');
                if(i == 0){
                    var th = document.createElement('th');
                    th.innerHTML = letters[j];
                    tr.appendChild(th);
                }else{
                    if(j==0){
                        var th = document.createElement('th');
                        th.innerHTML = (w+1 - i).toString();
                        tr.appendChild(th);
                    }else{
                        var colour;
                        if(i%2==0)
                            colour = (i*w + j)%2==0?light:dark;
                        else
                            colour = (i*w + j)%2!=0?light:dark;
                        td.setAttribute('class', colour);
    
                        var id = 't'+(8 -i).toString() + (j-1).toString();
    
                        var btn = document.createElement('input');
                        btn.setAttribute('type', "button");
                        btn.setAttribute('id', id);
                        if(gameboard !=null)
                            btn.setAttribute('value', gameboard.findTile(8-i,j-1).value);
                        //...
                        td.appendChild(btn);
                        tr.appendChild(td);
                    }
                }
                   
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        document.body.appendChild(table);
    }
}
