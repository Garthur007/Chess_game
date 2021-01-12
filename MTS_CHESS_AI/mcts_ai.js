var comtpeur = 0;
class Montecarlo_TS{

    constructor(gs){
        this.nbr = 0;
        this.currentGameState = gs;
        this.lastGameState = null;

        this.rootNode = new Node(this.currentGameState);
        this.start();
    }
    start(){
        this.execution(this.rootNode);
    }
    find_best_move(){
        var bestNode = this.find_greatest_UCB1(this.rootNode);
        var fromX = bestNode.atq.fromX;
        var fromY = bestNode.atq.fromY;
        var toX = bestNode.atq.toX;
        var toY = bestNode.atq.toY;
        console.log(this.rootNode);
        return new Attack(fromX, fromY, toX, toY);
    }

    stop(){
        return this.nbr > maxR;
    }

    find_greatest_UCB1(node){  
        //this method will return the child node with the greatest UCB1
        if(node.childNodes.length == 0)
            return null;
        

        var n = node.childNodes[0];
        n.ucbone = n.get_ucb1_value();
        var greatestUCB1 = n.get_ucb1_value();
        //console.log(node.childNodes.length);
        for(var i = 1; i < node.childNodes.length; i++){
            node.childNodes[i].ucbone = node.childNodes[i].get_ucb1_value();
            //console.log( node.childNodes[i].UCB1());
            if(node.childNodes[i].get_ucb1_value() > greatestUCB1){
                greatestUCB1 = node.childNodes[i].get_ucb1_value();
                n = node.childNodes[i];
            }
        }

        return n;
    }

    execution(node){
        
        if(this.stop())
            return;

        if(node.childNodes.length == 0)
            this.explorer_node(node);
        
        var highestUCB1Node = this.find_greatest_UCB1(node);
        this.iterate(highestUCB1Node);
    }

    iterate(node){
        this.nbr++;
        if (this.stop() || node == null) 
            return;
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
        var possibleAttacks = node.nodeGameState.get_list_of_attacks('black');
        if(this.stop() || node.nodeGameState.checkIfGameOver()
        || possibleAttacks.length == 0)
             return;
       
        for(var i =0; i < possibleAttacks.length; i++){
            var gs = GameState.Next_GameState(node.nodeGameState, possibleAttacks[i]);
            var whiteAttack = gs.get_random_attack("white");
            if(whiteAttack != null){
                //Board.createBoard(gs.gameboard);
            gs  =  GameState.Next_GameState(gs, whiteAttack);}
            if(gs != null)
                node.add_child(new Node(gs, node, possibleAttacks[i]));
        }
     }

    
     score_from_gameState(gs){
        var score = 0;
        for(var key in gs.pieces){
            if(gs.pieces[key].type != 'king'){
                if(gs.pieces[key].colour == black){
                    if(gs.pieces[key].alive){
                        score += val[gs.pieces[key].type];
                    }else{
                        score -= val[gs.pieces[key].type];
                    }
                }else{
                    if(gs.pieces[key].alive){
                        score -= val[gs.pieces[key].type];
                    }else{
                        score += val[gs.pieces[key].type];
                    }
                }
            }
        }
        return score;
    }
    
    random_game_simulation(gameState, stop){
        if(stop > max_loop)
            return gameState.pieces["black-queen-0"].alive?1:0;// sthis.score_from_gameState(gameState);
        else if(gameState.checkIfGameOver()){
            console.log(gameState.movesHistory);
            //Board.createBoard(gameState.gameboard);
            this.lastGameState = gameState;
            console.log(gameState.winner + ' : wins at ' + stop + " moves");
            var score = gameState.winner == black?win:loss;
            console.log(score);
            if(gameState.winner == black)
                return win;
            else
                return loss;
        }else{
        
        var attackingColour = stop % 2 == 0?"black":"white";
        //console.log(attackingColour);
        var atq = gameState.get_random_attack(attackingColour);
        if(atq == null){
            //createBoard(gameState.gameboard);
            console.log("The colour did not have any more moves");
            return attackingColour == "black"?loss:win;
        }
        //if(gameState.isWhiteInDanger()){
            //console.log(atq);
       // }
        var nextGameState = GameState.Next_GameState(gameState, atq);

        return this.random_game_simulation(nextGameState, stop + 1);
    }
    }
}

/*var compteur = 0;

class Montecarlo_TS{

    constructor(gs){
        this.rootNode = new Node(gs, null, null);
        this.start();
    }
    start(){
        this.execution(this.rootNode);
    }
    find_best_move(){
        var bestNode = this.find_greatest_UCB1(this.rootNode);
        var fromX = bestNode.atq.fromX;
        var fromY = bestNode.atq.fromY;
        var toX = bestNode.atq.toX;
        var toY = bestNode.atq.toY;
        return new Attack(fromX, fromY, toX, toY);
    }

    stop(){
        //we stop when we have reached the maximal number of iterations
        if(compteur >= maxR)
            return true;
    }

    find_greatest_UCB1(node){  
        //this method will return the child node with the greatest UCB1
        if(node.childNodes.length == 0){
            console.log(node);
            console.log(this.rootNode);
            return null;
        }
        
        var n = node.childNodes[0];
        var greatestUCB1 = n.get_ucb1_value();
        for(var i = 1; i < node.childNodes.length; i++){
            if(node.childNodes[i].get_ucb1_value() > greatestUCB1){
                greatestUCB1 = node.childNodes[i].get_ucb1_value();
                n = node.childNodes[i];
            }
        }

        return n;
    }

    execution(node){
        if(compteur > maxR) return;
        if(node.childNodes.length == 0)
            this.explorer_node(node);
        
        var highestUCB1Node = this.find_greatest_UCB1(node);
        this.iterate(highestUCB1Node);
    }

    iterate(node){
        compteur++;
        if (this.stop() || node == null) return;
        if (node.N == 0){
            node.T += this.random_game_simulation(node.nodeGameState,0);
            node.N += 1;
            this.backprogation(node);
            this.execution(this.rootNode);
        }
        else
            this.execution(node);
    }

    backprogation(node){
        if (this.stop() || node.parentNode == null) return;	
        else
        {
            node.parentNode.T += node.T;
            node.parentNode.N += 1;
            this.backprogation(node.parentNode);
        }
    }

    explorer_node(node){
        //we are creating child nodes from the node received!
        //it is in this method that the tree is growing bigger!
        var possibleAttacks = node.nodeGameState.get_list_of_attacks('black');
        if(compteur > maxR || node.nodeGameState.checkIfGameOver()
        || possibleAttacks.length == 0)
             return;
       
        for(var i =0; i < possibleAttacks.length; i++){
            var possibleGameState = GameState.Next_GameState(node.nodeGameState, possibleAttacks[i]);
            if(possibleGameState != null)
                node.add_child(new Node(possibleGameState, node, possibleAttacks[i]));
        }
    
     }

    
    random_game_simulation(gameState, stop){
        return 0;
        if(stop > max_loop)
            return 0;
        else if(gameState.checkIfGameOver()){
            return win;
        }

        var atk = gameState.get_random_attack("black");
        var nextGameState = GameState.Next_GameState(gameState, atk);
        return this.random_game_simulation(nextGameState, atk);
    }
}
*/
