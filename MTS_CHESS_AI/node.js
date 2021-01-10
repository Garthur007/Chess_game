function createBoard(gameboard){
    var body = document.body;
    var table =  document.createElement('table');

    table.setAttribute('class', 'chess-board');
    var tbody =  document.createElement('tbody');

    tbody.setAttribute('class', 'body');

    for(var i = 0; i <w;i++){
        var tr = document.createElement('tr');
        for(var j =0; j < w; j++){
            var td = document.createElement('td');

            var colour;
            if(i%2==0)
                colour = (i*w + j)%2==0?light:dark;
            else
                colour = (i*w + j)%2!=0?light:dark;
            td.setAttribute('class', colour);

            var id = 't'+(7 -i).toString() + j.toString();

            var btn = document.createElement('input');
            btn.setAttribute('type', "button");
            btn.setAttribute('class', id);
            btn.setAttribute('id', id);
            btn.setAttribute('value', gameboard.findTile(7-i,j).value);
            //...
            td.appendChild(btn);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    body.appendChild(table);
}


class Node{
    constructor(gs, parentNode = null){
        this.T = 0;
        this.N = 0;
        this.parentNode = parentNode;
        this.nodeGameState = gs;
        this.childNodes = []
        this.isRoot = this.parentNode ==null;
        this.isLeaf = this.childNodes.length == 0;
    }
    add_child = (n) => this.childNodes.push(n);
    ucb1(){
        if(this.N == 0)
            return 100000;
        else
            return this.T/this.N + 2* Math.sqrt(Math.log(this.parentNode.N)/this.N);
    }
}





