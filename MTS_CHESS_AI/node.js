class Node{

    constructor(gs, parentNode = null, atq = null){
        
        this.T = 0; // the total score of the node and its children
        this.N = 0; // the number of time the node has been visited
        this.parentNode = parentNode;  // a reference to its parent node
        this.nodeGameState = gs; // a game state
        this.childNodes = []; // a list of child nodes
        this.atq = atq; // the attack that lead to that game state
    }
    add_child = (n) => this.childNodes.push(n);
    get_ucb1_value(){
        //we return a high value for the UCB1 to ensure that the node that 
        //haven't been visted are!
        // if it has been visited, we return the ucb1 formula
        // ucb1 = average reward + 2*sqrt(log(N)/n)
         if(this.N == 0)
            return 1000000;
        else
            return this.T/this.N + 2* Math.sqrt(Math.log(this.parentNode.N)/this.N);//this.ucb1_value;
    }
}





