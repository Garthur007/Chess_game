# Chess_game_AI_MTS

Hi, my name is Georges and I am a computer science student at UdeM.
I created this chess game from scratch using Javascript, a little bit of CSS and HTML.
I then implemented the Montecarlo Tree Search algorithm to create an ennemy AI  to play against.

The rules of chess are pretty straight forward and I knew how to play so I created the game how I thought it should be.
For Montecarlo, I used these 2 sources:

1 - LEVINE, John. Monte Carlo Tree Search. https://www.youtube.com/watch?v=UXW2yZndl7U&t=222s


2- SHARMA, Sagar. Monte Carlo Tree Search : MCTS For Every Data Science Enthusiast. Toward Data Science. 
    https://towardsdatascience.com/monte-carlo-tree-search-158a917a8baa


What is Monte Carlo Tree Search? 

In computer science, Monte Carlo tree search (MCTS) is a heuristic search algorithm for some kinds of decision processes, most notably those employed in software that plays board games. In that context MCTS is used to solve the game tree. 
MCTS was introduced in 2006 for computer Go.[1] It has been used in other board games like chess and shogi,[2] games with incomplete information such as bridge[3] and poker,[4] as well as in turn-based-strategy video games (such as Total War: Rome II's implementation in the high level campaign AI[5]).

(wikipedia: https://en.wikipedia.org/wiki/Monte_Carlo_tree_search )


How to play the game :

Just downlaod this project and open  the index.html file from your web browser.

Disclaimer :

YOU WILL BE ABLE TO BEAT THE AI and that is because in the constants.js file, I set a rather low number of iteration in the mts tree at 1500.
I also set the the maximum number of moves in the game simultation at 3 moves meaning that the game simulation can only see 3 moves ahead meaning that 
if in 3 moves it doesn't reach a final state, the simulation will return a score of 0 and that won't really help in the decision process (when calculating the ucb1).


If you want to make the AI "smarter", you can set the maximal number of iteration (maxR) at 5000 or higher depending on your machine.



