const blackPieces = {rook:"♜", knight:"♞",bishop: "♝", queen: "♛",king:"♚",pawn:"♟"};
const whitePieces = {pawn:"♙",rook: "♖", knight:"♘",bishop: "♗",queen: "♕", king:"♔"};  

const letters = ['','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const w = 8;

const white = "white";
const black = "black";

const light = "light";
const dark = "dark";

// For Montecarlo

var win = 10000;
var loss = -10000;
const time_exceeded = 0;
var max_loop = 3;
var maxR = 2000;
var afficherRootNote = false;

var val = {
    'pawn': 10,
    'rook':50,
    'bishop':50,
    'knight':50,
    'queen':300
};

function createBoard(gameboard = null){
    var body = document.body;
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
                    btn.setAttribute('class', id);
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
    body.appendChild(table);
}

function isInbound(a, b = 0 ){ return a >= 0 && a < 8 && b >= 0 && b < 8; }
function randomNumber(k){ return  Math.floor((Math.random() * k-1) + 1);}
