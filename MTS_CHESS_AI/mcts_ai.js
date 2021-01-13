class Montecarlo_TS{

    constructor(gs){
        this.rootNode = new Node(gs);
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
        //return true or false depending on if we have reached the maxR
        return this.rootNode.N >= maxR;
    }

    find_greatest_UCB1(node){  
        //this method will return the child node with the highest UCB1
        //we loop trough the node's child node to find the one with the highest UCB1
        if(node.childNodes.length == 0)
            return null;
        
        var bestNode = node.childNodes[0];
        var greatestUCB1 = bestNode.get_ucb1_value();
        for(var i = 1; i < node.childNodes.length; i++)
            if(node.childNodes[i].get_ucb1_value() > greatestUCB1){
                greatestUCB1 = node.childNodes[i].get_ucb1_value();
                bestNode = node.childNodes[i];
            }

        return bestNode;
    }

    execution(node){
        if(node.childNodes.length == 0)
            this.explorer_node(node);
        
        var highestUCB1Node = this.find_greatest_UCB1(node);
        this.iterate(highestUCB1Node);
    }

    iterate(node){
        // we iterate
        // we prioritize the node that have not been visited and we execute from
        // the ones who have been
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
            this.execution(node);
    }

    backprogation(node){
        //this is to update the information in all the tree
        // from the leaf node to the root node
        if (node.parentNode == null)
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
        var possibleAttacks = node.nodeGameState.get_list_of_attacks(black);
        if( node.nodeGameState.checkIfGameOver()
        || possibleAttacks.length == 0)
             return;
       
        for(var i =0; i < possibleAttacks.length; i++){
            var gs = GameState.Next_GameState(node.nodeGameState, possibleAttacks[i]);
            var whiteAttack = gs.get_random_attack(white);

            if(whiteAttack != null)
                gs  =  GameState.Next_GameState(gs, whiteAttack);
            if(gs != null)
                node.add_child(new Node(gs, node, possibleAttacks[i]));
            }
     }    

    random_game_simulation(gameState, stop){
        if(stop > max_loop) //if we reach the maximal number of loop and it is not a final state, 
            return 0;       //we simply return 0
        
        if(gameState.checkIfGameOver()) //if the game is over, we return 1000pts if the ai wins else -1000
           return gameState.winner == black?win:loss;

        var attackingColour = stop % 2 == 0?"black":"white";
        var atq = gameState.get_random_attack(attackingColour);

        //if the attack is null, it means that the defending colour lost
        if(atq == null)
            return attackingColour == "black"?loss:win;
        
        var nextGameState = GameState.Next_GameState(gameState, atq);
        return this.random_game_simulation(nextGameState, stop + 1);
    }
}
