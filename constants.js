const blackPieces = {rook:"♜", knight:"♞",bishop: "♝", queen: "♛",king:"♚",pawn:"♟"};
const whitePieces = {pawn:"♙",rook: "♖", knight:"♘",bishop: "♗",queen: "♕", king:"♔"};  

const w = 8;

const white = "white";
const black = "black";

const light = "light";
const dark = "dark";

// For Montecarlo

const win = 10000;
const loss = -10000;
const time_exceeded = 0;
const max_loop = 5;

const maxR = 2000;

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


function isInbound(a, b = 0 ){ return a >= 0 && a < 8 && b >= 0 && b < 8; }
function randomNumber(k){ return  Math.floor((Math.random() * k-1) + 1);}
