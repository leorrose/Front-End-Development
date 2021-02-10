document.getElementById("start-bt").addEventListener("click", startGame);
let innerDivs = document.getElementsByClassName("inner-div");
let playerTurn = true;
let playerOne = "";
let playerTwo = "";
let gameStatus = [];

function startGame(){
    /**
     * function to start the tic tac toe game. check users name, cleans grid, 
     * changes players title, initializes needed variables and adds the events of clicking to play.
     */
    playerOne = document.getElementById("player-one-name-input").value.trim();
    playerTwo = document.getElementById("player-two-name-input").value.trim();
    if( playerOne == "" || playerTwo==""){
        window.alert("Please input player's name's!");
        return;
    }
    playerTurn = true;
    gameStatus = [[0,0,0],[0,0,0],[0,0,0]];
    cleanContent();
    addPlayersTitle();
    addEvents();
}

function cleanContent(){
    /**
     * function to remove content from inner divs (cleans the grid).
     */
    for(let element of innerDivs){
        element.innerHTML = "";
    }
}

function addPlayersTitle(){
    /**
     * function to add the player vs player title.
     */
    content = document.getElementById("vs-title").innerHTML = playerOne + " VS " + playerTwo;
}

function addEvents(){
    /**
     * function to add click event to inner divs.
     */
    for(let element of innerDivs){
        element.addEventListener("click",playTurn);
        element.addEventListener("touchstart",playTurn);
    }
}

function playTurn(e){
    /**
     * function to play a turn in the game, plays tuen and cheks if game is over.
     * @param {Event} e 
     */
    let row = parseInt(e.target.getAttribute("data-row"));
    let col = parseInt(e.target.getAttribute("data-col"));
    if(gameStatus[row][col] != 0){
        return;
    }
    content = document.createElement("p");
    if(playerTurn){
        content.innerHTML = "X";
        gameStatus[row][col] = 1;
        playerTurn = false;
        checkForwinner(1);
    }
    else{
        content.innerHTML = "O";
        gameStatus[row][col] = 2;
        playerTurn = true;
        checkForwinner(2);
    }
    e.target.appendChild(content);
}

function checkForwinner(playingPlayer){
    /**
     * function to check if game is over after playingPlayer plays. check rows, cols, slats for a 3 in a row.
     * @param {Number} playingPlayer 
     */
    gameStatus[0].every(x => x == playingPlayer )? finishGame(playingPlayer) : 
    gameStatus[1].every(x => x == playingPlayer )? finishGame(playingPlayer) :
    gameStatus[2].every(x => x == playingPlayer )? finishGame(playingPlayer) : 
    gameStatus.map(x=> x[0]).every(x => x == playingPlayer )? finishGame(playingPlayer) : 
    gameStatus.map(x=> x[1]).every(x => x == playingPlayer )? finishGame(playingPlayer) : 
    gameStatus.map(x=> x[2]).every(x => x == playingPlayer )? finishGame(playingPlayer) : 
    (gameStatus[0][0] == gameStatus[1][1] && gameStatus[1][1] == gameStatus[2][2] && gameStatus[2][2] != 0) ? finishGame(playingPlayer) : 
    (gameStatus[0][2] == gameStatus[1][1] && gameStatus[1][1] == gameStatus[2][0] && gameStatus[2][0] != 0)? finishGame(playingPlayer) : 
    gameStatus.map(x=> x.every(y => y!=0)).every(x=> x==true)? finishGame(0): {};
}

function finishGame(playingPlayer){
    /**
     * function to end game - remove click events and anounce the winner.
     * @param {Number} playingPlayer
     */
    anounceWinner(playingPlayer);
    removeEvents();
}

function removeEvents(){
    /**
     * function to remove the click events from inner divs.
     */
    for(let element of innerDivs){
        element.removeEventListener("click",playTurn);
        element.removeEventListener("touchstart",playTurn);
    }
}
function anounceWinner(playingPlayer){
    /**
     * function t anounce winner of the game.
     * @param {Number} playingPlayer 
     */
    switch(playingPlayer){
        case 0:
            window.alert("It's a Tie!");
            break;
        case 1:
            window.alert(playerOne + " Wins!");
            break;
        case 2:
            window.alert(playerTwo + " Wins!");
            break;
    }
}
