# Connect Four - Project 1

* explanations of the technologies used
* the project is created with HTML, CSS, and JavaScript.
* HTML is used to create the basic layout excluding the game board. CSS is used to style all the elements in the project. JavaScript creates the game board and all functionalities/ actions of the game (the interactivity part).
* used normalize CDN stylesheet and Google Fonts.

* the approach taken
* the game board is fully generated using JavaScript.
* the pieces are placed by adding a specific class to the chosen spot on the board.
* the JavaScript code checks for 4 pieces of the same color in all angles using for loops and if statements.
* the board contains 42 spots in total, so if the number of red pieces placed are 21 and yellow pieces are 21, it means the board is full (Draw).
* after each round, the round winner is announced and there is a button to proceed to the next round.
* if the player scored two round wins, they win the game (best 2 out of 3), then the game resets.
* the announcing div is displayed as none by default, once there is a round/game winner, it displays as block.
* the winner announcing message changes using JavaScript.
* the background music can be played and paused throughout the game.
* the music button has background gradient animation.

* installation instructions
* the project contains a font file (.ttf), it is recommended to install it when downloading the project


# How To Play

* Connect Four:
* the game is a two player game. the first player clicks anywhere on the game board to place their piece.
* the turn will swap to the next player, where they also click anywhere on the board to place their piece.
* one once of the player connected four of their pieces horizontally, vertically, or diagonally (all angles counts), the player will be announced as the round winner and their score will increase.
* the game will continue until one of the players score two points (best 2 out of 3).
* if no player won the round (Draw), there will be no effect on the score and the next round will begin.
* the players can reset the game board (clear the score and number of rounds) at any time using the reset button. 


# User Story

* Read UserStories.md