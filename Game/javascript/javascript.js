//background music
let bgMusic = document.getElementById("bgMusic");
let isPlaying = false;
//the ? question mark is used to shorten an if else statement into one line
//first part is the condition, then an action if that condition is true and another action if the condition is false
function togglePlay() {
  isPlaying ? bgMusic.pause() : bgMusic.play();
};

bgMusic.onplaying = function() {
  isPlaying = true;
};
bgMusic.onpause = function() {
  isPlaying = false;
};

//set up global vars
let playerOne = "Gryffindor";
let playerTwo = "Slytherin";
//default first player is playerOne (Gryffindor)
let currentPlayer = playerOne;

let currentRound = 1;
let gameOver = false;

//the board is created fully in JS - it will contains an array of rows and columns
let board = [];
//initialize the number of rows and columns
const rows = 6;
const columns = 7;
//all columns fill-up starting from the bottom rows (row 6 / index 5)
let activeColumn = [5,5,5,5,5,5,5];

//the win message
let message = "";

//score
playerOneScore = 0;
playerTwoScore = 0;



//function that starts a new game
function newGame(){
    //resetting the vars
    currentRound = 1;
    currentPlayer = playerOne;
    gameOver = false;
    activeColumn = [5,5,5,5,5,5,5];
    message = "";
    playerOneScore = 0;
    playerTwoScore = 0;
    board = [];

    //display the current player, round, and score
    document.querySelector(".currentPlayer").innerText = currentPlayer;
    document.querySelector(".currentRound").innerText = currentRound;
    document.querySelector(".player1Score").innerText = playerOneScore;
    document.querySelector(".player2Score").innerText = playerTwoScore;

    //reset announcement box
    document.querySelector('.roundAnnounce_box').style.display = "none";
    document.querySelector('.announce_box').style.display = "none";

    //empty the win message
    document.querySelector('.announceRound').innerText = "";
    document.querySelector('.announce').innerText = "";

    //empty the board
    document.querySelector("#board").innerHTML = "";
    

    //loops through the number of rows
    for(let i=0; i<rows; i++){
        //created an array for each row
        let row = [];

        //loops through the number of columns
        for(let j=0; j<columns; j++){
            //puts the row array in each column as empty string
            row.push(' ');

            //the spots creation:
            //creates and append the following to the board <div id="0-0" class="spot"></div> inside each row and column
            //creates a div and stores it in a variable
            let spot = document.createElement("div");
            //the div id is the row and column position separated by a hyphen -to be retrieved later-
            spot.id = i.toString() + "-" + j.toString();
            //adds a class to the div for styling
            spot.classList.add("spot");
            //when the div is clicked the player piece will be placed (by calling the function)
            spot.addEventListener("click", selectedSpot);
            //puts the div inside the board
            document.getElementById("board").append(spot);
        }
        //pushes the row array into the board so the pieces will appear
        board.push(row);
    }

}

//continue playing after rounds end
function continueGame(){
    //resetting the vars
    currentPlayer = playerOne;
    gameOver = false;
    activeColumn = [5,5,5,5,5,5,5];
    message = "";
    board = [];

    //display the current player, round, and score
    document.querySelector(".currentPlayer").innerText = currentPlayer;
    document.querySelector(".currentRound").innerText = currentRound;
    document.querySelector(".player1Score").innerText = playerOneScore;
    document.querySelector(".player2Score").innerText = playerTwoScore;

    //reset announcement box
    document.querySelector('.roundAnnounce_box').style.display = "none";
    document.querySelector('.announce_box').style.display = "none";

    //empty the win message
    document.querySelector('.announceRound').innerText = "";
    document.querySelector('.announce').innerText = "";

    //empty the board
    document.querySelector("#board").innerHTML = "";
    

    //loops through the number of rows
    for(let i=0; i<rows; i++){
        //created an array for each row
        let row = [];

        //loops through the number of columns
        for(let j=0; j<columns; j++){
            //puts the row array in each column as empty string
            row.push(' ');

            //the spots creation:
            //creates and append the following to the board <div id="0-0" class="spot"></div> inside each row and column
            //creates a div and stores it in a variable
            let spot = document.createElement("div");
            //the div id is the row and column position separated by a hyphen -to be retrieved later-
            spot.id = i.toString() + "-" + j.toString();
            //adds a class to the div for styling
            spot.classList.add("spot");
            //when the div is clicked the player piece will be placed (by calling the function)
            spot.addEventListener("click", selectedSpot);
            //puts the div inside the board
            document.getElementById("board").append(spot);
        }
        //pushes the row array into the board so the pieces will appear
        board.push(row);
    }

}

//Handle selected spot
function selectedSpot(){
    //if the game is over, don't allow pieces to be placed
    if(gameOver == true){
        return;
    }
    //splits the two values in the spots div id by removing the - and storing them as array
    let coords = this.id.split("-");
    //the array created by splitting the id will be used to know the div/spot location (row and column index)
    //example id="2-3", after splitting ["2","3"], after extracting the numbers (paresInt) coordsRowInt = 2 coordsColumnInt = 3
    let coordsRowInt = parseInt(coords[0]);
    let coordsColumnInt = parseInt(coords[1]);
    //set the active column coords
    coordsRowInt = activeColumn[coordsColumnInt];
    //if the chosen spot is filled vertically, don't allow pieces to be placed
    if(coordsRowInt <0){
        return;
    }

    //based on the ids the current player piece will be placed in that position
    board[coordsRowInt][coordsColumnInt] = currentPlayer;
    //restore the div id back as a string to apply classes based on the current player
    let spot = document.getElementById(coordsRowInt.toString() + "-" + coordsColumnInt.toString());
    if(currentPlayer == playerOne){
        spot.classList.add("red-piece");
        currentPlayer = playerTwo;
    }else{
        spot.classList.add("yellow-piece");
        currentPlayer = playerOne;
    }

    //display the player name and the round count
    document.querySelector(".currentPlayer").innerText = currentPlayer;
    //update the height so that its reduced once a piece is added
    coordsRowInt -= 1;
    
    //updates the array activeColumn after height adjustment
    activeColumn[coordsColumnInt] = coordsRowInt;

    //run function every time a piece is placed
    checkWinner();
}

//check for win
function checkWinner(){
     //check for matches in rows (winner)
     for(let i=0; i < rows; i++){
        //-3 to check 3 ahead of us
        for(let j=0; j < columns -3; j++){
            if(board[i][j] != ' '){
                if(board[i][j] == board[i][j+1] && board[i][j+1] == board[i][j+2] && board[i][j+2] == board[i][j+3]){
                    return setWinner(i, j);
                }
            }
        }
    }

    //check for matches in columns (winner)
    for(let j=0; j < columns; j++){
        //-3 to check 3 ahead of us
        for(let i=0; i < rows -3; i++){
            if(board[i][j] != ' '){
                if(board[i][j] == board[i+1][j] && board[i+1][j] == board[i+2][j] && board[i+2][j] == board[i+3][j]){
                    return setWinner(i, j);
                }
            }
        }
    }

    //check for matches in angles from left to right (winner)
    //-3 to check 3 ahead of us
    for(let i=0; i < rows -3; i++){
        //-3 to check 3 ahead of us
        for(let j=0; j < columns -3; j++){
            if(board[i][j] != ' '){
                if(board[i][j] == board[i+1][j+1] && board[i+1][j+1] == board[i+2][j+2] && board[i+2][j+2] == board[i+3][j+3]){
                    return setWinner(i, j);
                }
            }
        }
    }
    //check for matches in angles from right to left (winner)
    for(let i=3; i < rows; i++){
        //-3 to check 3 ahead of us
        for(let j=0; j < columns -3; j++){
            if(board[i][j] != ' '){
                if(board[i][j] == board[i-1][j+1] && board[i-1][j+1] == board[i-2][j+2] && board[i-2][j+2] == board[i-3][j+3]){
                    return setWinner(i, j);
                }
            }
        }
    }


    //check for tie/draw
    //if there are no more spots available, don't allow pieces to be placed
    let yellowPieces = document.querySelectorAll('.yellow-piece');
    let redPieces = document.querySelectorAll('.red-piece');
    if(yellowPieces.length >= 21 && redPieces.length >= 21){
        document.querySelector('.roundAnnounce_box').style.display = "block";
        message = "It's a Draw!"
        // put message to screen
        document.querySelector('.announceRound').innerText = message;
        currentRound += 1;
        return;
    }


}

//check who wins
function setWinner(i, j){
    //if the winning columns and rows belong to player 1, announce them as winner
    if(board[i][j] == playerOne){
        document.querySelector('.roundAnnounce_box').style.display = "block";
        message ="Gryffindor Won the Round";
        //put message to screen
        document.querySelector('.announceRound').innerText = message;
        currentRound += 1;
        playerOneScore += 1;
        scoreCheck();
        
    }else if(board[i][j] == playerTwo){
    //otherwise they must belong to player 2, thus announce them as winner
        document.querySelector('.roundAnnounce_box').style.display = "block";
        message ="Slytherin Won the Round";
        //put message to screen
        document.querySelector('.announceRound').innerText = message;
        currentRound += 1;
        playerTwoScore += 1;
        scoreCheck();
        
    }
    document.querySelector(".currentRound").innerText = currentRound;
    document.querySelector(".player1Score").innerText = playerOneScore;
    document.querySelector(".player2Score").innerText = playerTwoScore;
    //end the game
    gameOver = true;
}

function scoreCheck(){
    if(playerOneScore >= 3){
        //hide the round win message
        document.querySelector('.roundAnnounce_box').style.display = "none";
        //the game win message
        document.querySelector('.announce_box').style.display = "block";
        message ="Gryffindor Wins";
        document.querySelector('.announce').innerText = message;
    }else if(playerOneScore == 2){
        //hide the round win message
        document.querySelector('.roundAnnounce_box').style.display = "none";
        //the game win message
        document.querySelector('.announce_box').style.display = "block";
        message ="Gryffindor Wins";
        document.querySelector('.announce').innerText = message;
    }else if(playerTwoScore >= 3){
        //hide the round win message
        document.querySelector('.roundAnnounce_box').style.display = "none";
        //the game win message
        document.querySelector('.announce_box').style.display = "block";
        message ="Slytherin Wins";
        document.querySelector('.announce').innerText = message;
    }else if(playerTwoScore == 2){
        //hide the round win message
        document.querySelector('.roundAnnounce_box').style.display = "none";
        //the game win message
        document.querySelector('.announce_box').style.display = "block";
        message ="Slytherin Wins";
        document.querySelector('.announce').innerText = message;
    }
}
//the btn e is anonymous so it should have its own function
document.querySelector('#btn').addEventListener('click', function(e){
    e.preventDefault();
    newGame();
});
document.querySelector('#btn2').addEventListener('click', function(e){
    e.preventDefault();
    newGame();
});
document.querySelector('#btn3').addEventListener('click', function(e){
    e.preventDefault();
    continueGame();
});

//after all code is loaded, start game
//could also use an event listener that checks if the window is done loading
newGame();
