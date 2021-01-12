class Node{

    constructor(gs, parentNode = null, atq = null){
        //this.ucb1_value = 0;
        this.T = 0;
        this.N = 0;
        this.parentNode = parentNode;
        this.nodeGameState = gs;
        this.childNodes = [];
        this.atq = atq;
        //this.ucb1_value = this.UCB1();
    }
    add_child = (n) => this.childNodes.push(n);
    get_ucb1_value(){
        //we return a high value for the UCB1 to ensure that the node that 
        //hasn't been visted are!
        //this.ucb1_value = this.T/this.N + 2* Math.sqrt(Math.log(this.parentNode.N)/this.N);
        if(this.N == 0)
            return 1000000;
        else
            return this.T/this.N + 2* Math.sqrt(Math.log(this.parentNode.N)/this.N);//this.ucb1_value;
    }
}





