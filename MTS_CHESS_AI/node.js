class Node{

    constructor(gs, parentNode = null){
        this.ucb1_value = 0;
        this.T = 0;
        this.N = 0;
        this.parentNode = parentNode;
        this.nodeGameState = gs;
        this.childNodes = []
        this.isRoot = this.parentNode ==null;
        this.isLeaf = this.childNodes.length == 0;

    }
    add_child = (n) => this.childNodes.push(n);
    UCB1(){
        this.ucb1_value = this.T/this.N + 2* Math.sqrt(Math.log(this.parentNode.N)/this.N);
        //if(this.ucb1_value > 1000000)
            //createBoard(this.nodeGameState.gameboard);
        return this.N == 0? 100000: this.ucb1_value;
    }
}





