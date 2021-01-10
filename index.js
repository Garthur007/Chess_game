var game = new GameManager();
//let gs = new GameStateT(game.pieces, game.gameboard, game.pieceToMove);    

//con

function findBestMove(){
    //var gs = game.get_current_gameState();
    //var mcts = new Montecarlo_TS(gs);
}
findBestMove();

const light = "light";
const dark = "dark";
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



//createBoard(b.gameboard);
