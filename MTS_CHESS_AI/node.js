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

class Attack{
    constructor(fromX, fromY, toX, toY){
        this.fromX = parseInt(fromX);
        this.fromY = parseInt(fromY);
        this.toX = parseInt(toX);
        this.toY = parseInt(toY);
    }
}

class GameState{
    constructor(pieces, board, moves){
        this.pieces = {};
        this.gameboard = board.clone();
        this.movesHistory = [];
        this.copyMovesHistory(moves);
        this.copyPieces(pieces);
        this.isWhiteTurn = false;
        this.winner = "";
        this.lastIndex = {
            'white-queen':0,
            'black-queen':0
        };
    }
    copyMovesHistory(moves){
        moves.forEach((move)=>
        {
            this.movesHistory.push(move);
        });
    }
    copyPieces(pieces){
        for(var key in pieces)
            this.pieces[key] = pieces[key].clone();

        for(var key in this.pieces)
            this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
    }

    checkIfGameOver(){
        var gameOver = true;
        if(this.isWhiteInDanger()){
            for(var key in this.pieces){
                if(key.split("-")[0] == "white"&& this.pieces[key].alive){
                    this.pieces[key].possibleMoves.forEach((move)=>{
                        var fromX = this.pieces[key].x;
                        var fromY = this.pieces[key].y;
                        var toX = parseInt(move[0]);
                        var toY =parseInt(move[1]);

                        var nextGameState = GameState.Next_GameState(this, new Attack(fromX, fromY, toX, toY));
                        //var nextGameState = new GameStateM(fromX, fromY, toX, toY, this.pieces, this.gameboard);
                        if(this.isValidMove(fromX, fromY, toX, toY))
                            if(!nextGameState.isWhiteInDanger())
                                gameOver = false;
                    });
                }
            }
        }else if(this.isBlackInDanger()){
           
            for(var key in this.pieces){
                if(key.split("-")[0] == "black" && this.pieces[key].alive){
                    this.pieces[key].possibleMoves.forEach((move)=>{
                        var fromX = this.pieces[key].x;
                        var fromY = this.pieces[key].y;
                        var toX = parseInt(move[0]);
                        var toY =parseInt(move[1]);
                
                        var nextGameState = GameState.Next_GameState(this, new Attack(fromX, fromY, toX, toY));
                        if(this.isValidMove(fromX, fromY, toX, toY))
                            if(!nextGameState.isBlackInDanger()){
                                gameOver = false;
                            }
                    });
                }
        
            }
        }else
            gameOver = false;
        this.winner = this.isWhiteInDanger()?"black":"white";
        return gameOver;
    }

    isWhiteInDanger(){
        return this.checkIfColorInDanger('white');
    }
    
    checkIfColorInDanger(colour){
        this.update_all_possible_moves();
        var c = colour == 'white'?'black':'white';
        var xKing = this.pieces[colour+"-king-0"].x;
        var yKing = this.pieces[colour+"-king-0"].y;

        var posKing = xKing.toString()+yKing.toString();

        for(var key in this.pieces)
            if(key.split('-')[0]==c && this.pieces[key].alive)
                if(this.pieces[key].possibleMoves.includes(posKing))
                    return true;
        return false;
    }

    isBlackInDanger(){
        return this.checkIfColorInDanger('black');
    }

   isValidMove(fromX, fromY, toX, toY){

    if(!this.gameboard.findTile(fromX, fromY).isOccupied)
        return null;

    var move = toX.toString()+ toY.toString();

    var atq = new Attack(fromX, fromY, toX, toY);

    var currentGameState = new GameState(this.pieces, this.gameboard, this.movesHistory);
    var gs = GameState.Next_GameState(this,atq);

    
    var condition = this.isWhiteTurn?gs.isWhiteInDanger():gs.isBlackInDanger();
    //console.log("c'est le tour des blanc? : "+ this.isWhiteTurn + " et le move met en danger la reine? : " + condition);
    return this.findTileValidMoves(fromX, fromY).includes(move) && !condition;
   } 

   update_all_possible_moves(){
       for(var key in this.pieces){
           this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
       }
   }
   findTileValidMoves(fromX, fromY){
        var id = this.gameboard.findOccupant(fromX, fromY);
        var pieceToMove = this.pieces[id];

        var test = this.clickCount == 0?1:2;
        pieceToMove.update_possible_moves(this.gameboard, this.pieces, this.pieceToMove, this.clickCount +test );

        return pieceToMove.possibleMoves;
   }
   get_list_of_attacks(colour){
    var possibleAttack = [];
    for(var key in this.pieces){
        if(this.pieces[key].alive)
            if(key.split('-')[0]==colour){
                this.pieces[key].update_possible_moves(this.gameboard, this.pieces);
                if(this.pieces[key].possibleMoves.length != 0){
                    var a = this.pieces[key].x;
                    var b = this.pieces[key].y;
                    for(var i = 0; i < this.pieces[key].possibleMoves.length; i++){
                        var c = parseInt(this.pieces[key].possibleMoves[i][0]);
                        var d = parseInt(this.pieces[key].possibleMoves[i][1]);
                        if(this.isValidMove(a,b,c,d))
                            possibleAttack.push(new Attack(a,b,c,d));
                    }
                }
            }
    }
    return possibleAttack;
   }
   get_random_attack(colour){

        var possibleAttack = this.get_list_of_attacks(colour);
        var index = Board.randomNumber(possibleAttack.length);
        return possibleAttack[index];
   }
  

    static Next_GameState(currentGameState, attack){
        //we assume the attack is legal
        //on va assumer que le move est légal 
        
        var fromX = attack.fromX;
        var fromY =  attack.fromY;
        var toX = attack.toX;
        var toY = attack.toY;


        var nextGameState = new GameState(currentGameState.pieces,
             currentGameState.gameboard, currentGameState.movesHistory);

        nextGameState.movesHistory.push(fromX.toString() + fromY.toString());
        nextGameState.movesHistory.push(toX.toString() + toY.toString());

        var startingTile = nextGameState.gameboard.findTile(fromX, fromY);
        var endingTile = nextGameState.gameboard.findTile(toX, toY);
        var piece = nextGameState.gameboard.findOccupant(fromX, fromY);
        if(piece == null)
            {
                createBoard(nextGameState.gameboard);
                console.log("La piece est nulle");
                console.log(nextGameState.gameboard.findTile(fromX, fromY));
                console.log(fromX,fromY);
                 
                return null;
            }
        var pieceType = piece.split('-')[1];
        var pieceColour = piece.split('-')[0];

       
        if(pieceType=="pawn"){
            var currentX = nextGameState.pieces[piece].x;
            var currentY = nextGameState.pieces[piece].y;
            if(toX - currentX == nextGameState.pieces[piece].direction &&
                toY - currentY != 0){
                    var ennemyTile = nextGameState.gameboard.findTile(currentX,toY);
                    if(ennemyTile.isOccupied && 
                    ennemyTile.occupantType =="pawn" &&
                    ennemyTile.colour != pieceColour && nextGameState.pieces[nextGameState.gameboard.findOccupant(currentX, toY)].hasJumped &&
                    nextGameState.pieces[nextGameState.gameboard.findOccupant(currentX, toY)].numberOfMoves == 1){

                    var ennemy = ennemyTile.occupant;
                    nextGameState.pieces[ennemy].alive = false;
                    ennemyTile.reset(false);
                    }
                }
        }            

        nextGameState.pieces[piece].x = toX;
        nextGameState.pieces[piece].y = toY;
        startingTile.reset(false);

        if(endingTile.isOccupied){
            var ennemy = endingTile.occupant;
            if(nextGameState.pieces[ennemy] == null)
                console.log(endingTile);
            nextGameState.pieces[ennemy].alive = false;
        }

        endingTile.setPiece(piece, false);

        if(pieceType == "pawn"){
            nextGameState.pieces[piece].numberOfMoves += 1;
            var target = pieceColour == "white"?3:4;
            if(nextGameState.pieces[piece].numberOfMoves == 1 && nextGameState.pieces[piece].x == target)
                nextGameState.pieces[piece].hasJumped =true;
            var cibleX = pieceColour == "white"?7:0;

            if(toX == cibleX){
                delete nextGameState.pieces[piece];
                var index = nextGameState.lastIndex[pieceColour + '-' + "queen"] +1;
                nextGameState.lastIndex[pieceColour + '-' + "queen"]++;  
                nextGameState.pieces[pieceColour + '-'+"queen"+'-'+index.toString()] = new Queen(toX, toY, true, pieceColour);
                endingTile.setPiece(pieceColour +"-"+"queen"+"-"+index.toString(), false);
            }
        }



        if(pieceType == "king"){
            nextGameState.pieces[piece].numberOfMoves = 1;
            if(nextGameState.pieces[piece].switchWithRook()){
                var kingColour = piece.split('-')[0];
                var kingPosX = kingColour == "white"?0:7;
                nextGameState.pieces[kingColour +"-rook-1"].y = 5;
                nextGameState.gameboard.findTile(kingPosX,7).reset(false);
                nextGameState.gameboard.findTile(kingPosX, nextGameState.pieces[kingColour +"-rook-1"].y).setPiece(kingColour +"-rook-1", false);
            }
            nextGameState.pieces[piece].hasJump =  true;
        }

        nextGameState.isWhiteTurn = pieceColour == "white"?false:true;

        return nextGameState;

    }
}

const win = 1000;
const loss = -1000;
const time_exceeded = 0;
const max_loop = 100;

const maxR = 100;

class Montecarlo_TS{

    constructor(gs){
        this.nbr = 0;
        this.currentGameState = gs;
        this.lastGameState;

        this.rootNode = new Node(this.currentGameState);
        this.start();
    }
    start(){
        this.execution(this.rootNode);
    }
    find_best_move(){
        var t = this.find_greatest_UCB1(this.rootNode);
        var nb = t.nodeGameState.movesHistory.length;

        var fromX = parseInt(t.nodeGameState.movesHistory[nb - 2][0]);
        var fromY = parseInt(t.nodeGameState.movesHistory[nb - 2][1]);
        var toX = parseInt(t.nodeGameState.movesHistory[nb - 1][0]);
        var toY = parseInt(t.nodeGameState.movesHistory[nb - 1][1]);

        for(var i = 0; i < this.rootNode.childNodes.length; i++){
            console.log(this.rootNode.childNodes[i].ucb1());
        }
        //console.log(this.rootNode);

        return new Attack(fromX, fromY, toX, toY);
    }

    stop(){
        return this.nbr > maxR;
    }

    find_greatest_UCB1(node){  
        //this method will return the child node with the greatest UCB1
        if(this.stop()) {
            console.log("the stop function was called");
            //return null;
        }
        else if( node.childNodes.length == 0)
        {
            console.log("there are no child nodes");
            return null;
        }

        var n = node.childNodes[0];
        var greatestUCB1 = n.ucb1();
        //console.log(node.childNodes.length);
        for(var i = 1; i < node.childNodes.length; i++){
            if(node.childNodes[i].ucb1() > greatestUCB1){
                greatestUCB1 = node.childNodes[i].ucb1();
                n = node.childNodes[i];
            }
        }
        return n;
    }

    execution(node){
        this.nbr++;
        if(this.stop())
            return;

        if(node.childNodes.length == 0)
            this.explorer_node(node);
        
        var highestUCB1Node = this.find_greatest_UCB1(node);
        //console.log("le plus haut ucb1 : " +  highestUCB1Node.ucb1());
        this.iterate(highestUCB1Node);
    }

    iterate(node){
        if (this.stop() || node == null) return;
        if (node.N == 0){
            var add = this.random_game_simulation(node.nodeGameState,0);
            node.T += add;
            node.N += 1;
            
            this.backprogation(node);
            this.execution(this.rootNode);
        }
        else
        {
            this.execution(node);
        }

    }

    backprogation(node){
        if (this.stop() || node.parentNode == null)
			return;
        else
        {
            node.parentNode.T += node.T;
            node.parentNode.N += 1;
            this.backprogation(node.parentNode);
        }
    }
    explorer_node(node){
        //Cette méthode sert à créer des nodes enfants pour le nodes reçu en paramètre.
		//C'est dans cette méthode que l'arbre s'agrandit.
        if(this.stop()) return;
        if(node.nodeGameState.checkIfGameOver()) return;

        var possibleAttacks = node.nodeGameState.get_list_of_attacks('black');
        //console.log(node.nodeGameState.get_list_of_attacks("black"));
        if(possibleAttacks.length == 0)
            return;
           
        for(var i =0; i < possibleAttacks.length; i++){

            var possibleGameState = GameState.Next_GameState(node.nodeGameState, possibleAttacks[0]);
            node.add_child(new Node(possibleGameState, node));
        }
        //console.log("il y'a ce nombre de game state possible : " + node.childNodes.length);
    }
    random_game_simulation(gameState, stop){
        if(this.stop())
            return;
        if(stop > max_loop){
            //console.log("time exceeded");
            this.lastGameState = gameState;
            //console.log(this.lastGameState);
            return time_exceeded;
        }
        else if(gameState.checkIfGameOver()){
            this.lastGameState = gameState;
            console.log("the winner is  : " +gameState.winner);
            return gameState.winner == "black"?win:loss;
        }
    
        var atq;
        
        if(stop % 2 == 0){
            atq = gameState.get_random_attack("black");
            if(atq == null)
                return win;
        }else{
            atq = gameState.get_random_attack("white");
            if(atq == null)
                return loss;
        }
        
        var nextGameState = GameState.Next_GameState(gameState, atq);

        return this.random_game_simulation(nextGameState, stop + 1);
    }
}

