const blackPieces = {rook:"♜", knight:"♞",bishop: "♝", queen: "♛",king:"♚",pawn:"♟"};
const whitePieces = {pawn:"♙",rook: "♖", knight:"♘",bishop: "♗",queen: "♕", king:"♔"};  

const letters = ['','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const w = 8;

const white = "white";
const black = "black";

const light = "light";
const dark = "dark";

// For Montecarlo

const win = 100;
const loss = -100;
const time_exceeded = 0;
const max_loop = 15;
const maxR = 1000;

const val = {
    pawn:.5,
    bishop:1,
    rook:1,
    knight:1,
    queen:3
}

function isInbound(a, b = 0 ){ return a >= 0 && a < 8 && b >= 0 && b < 8; }
function randomNumber(k){ return  Math.floor((Math.random() * k-1) + 1);}
