const blackPieces = {rook:"♜", knight:"♞",bishop: "♝", queen: "♛",king:"♚",pawn:"♟"};
const whitePieces = {pawn:"♙",rook: "♖", knight:"♘",bishop: "♗",queen: "♕", king:"♔"};  

const letters = ['','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const w = 8;

const white = "white";
const black = "black";

const light = "light";
const dark = "dark";

// For Montecarlo

// in the game simulation, if the black/ai win, it returns 1000 pts
// and if it loses, it returns -1000 pts
const win = 1000;
const loss = -1000;

// max_loop represents how many moves are allowed in the game simulation
// if we didn't have this constant, we would need on average 500 random moves
// to reach a final state
// Since my computer is not powerfull enough, I set the max_loop at 3 so the 
// the game simulation can only do 4 moves
const max_loop = 3;  //1,3,5,7,..

// maxR represents how many time we are going to visit the root node of the montecarlo
// class

//t he higher max_loop and maxR are, the "smarter" the algorithm is,
// and the more energy/time it requires
const maxR = 1500;

// a function I used to make sure some numbers were in bound
function isInbound(a, b = 0 ){ return a >= 0 && a < 8 && b >= 0 && b < 8; }

// this return a randmNumber
function randomNumber(k){ return  Math.floor((Math.random() * k-1) + 1);}
