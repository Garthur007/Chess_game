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
            //console.log(this.rootNode.childNodes[i].ucb1());
            if(this.rootNode.childNodes[i].ucb1()> -5000){
                var a = parseInt(this.rootNode.childNodes[i].nodeGameState.movesHistory[nb - 2][0]);
                var b = parseInt(this.rootNode.childNodes[i].nodeGameState.movesHistory[nb - 2][1]);
                var c = parseInt(this.rootNode.childNodes[i].nodeGameState.movesHistory[nb - 1][0]);
                var d = parseInt(this.rootNode.childNodes[i].nodeGameState.movesHistory[nb - 1][1]);
                //console.log(a,b,c,d);
             }
        }
        //console.log("-----------------------");
        //console.log(this.rootNode);

        return new Attack(fromX, fromY, toX, toY);
    }

    stop(){
        return this.nbr > maxR;
    }

    find_greatest_UCB1(node){  
        //this method will return the child node with the greatest UCB1
        if( node.childNodes.length == 0)
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
        //console.log(n);
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

            var possibleGameState = GameState.Next_GameState(node.nodeGameState, possibleAttacks[i]);
            if(possibleGameState!= null)
                node.add_child(new Node(possibleGameState, node));
        }
     }
     score_from_gameState(gs){
        var score = 0;
        var val = {
            'pawn': 5,
            'rook':50,
            'bishop':50,
            'knight':50,
            'queen':200
        };

        for(var key in gs.pieces){
            if(gs.pieces[key].type != 'king'){
                if(gs.pieces[key].colour == 'black'){
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

        if(stop > max_loop){
            this.lastGameState = gameState;
            var score = this.score_from_gameState(gameState);
            //return 0;
            return score;
        }
        else if(gameState.checkIfGameOver()){
            this.lastGameState = gameState;
            return gameState.winner == "black"?win:loss;
        }

        var attackingColour = stop % 2 == 0?"black":"white";
        var atq = gameState.get_random_attack(attackingColour);
        if(atq == null)
            createBoard(gameState.gameboard);
        var nextGameState = GameState.Next_GameState(gameState, atq);

        return this.random_game_simulation(nextGameState, stop + 1);
    }
}