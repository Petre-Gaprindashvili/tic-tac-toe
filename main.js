const square1 = document.getElementById("grid_square1");
const square2 = document.getElementById("grid_square2");
const square3 = document.getElementById("grid_square3");
const square4 = document.getElementById("grid_square4");
const square5 = document.getElementById("grid_square5");
const square6 = document.getElementById("grid_square6");
const square7 = document.getElementById("grid_square7");
const square8 = document.getElementById("grid_square8");
const square9 = document.getElementById("grid_square9");
const allSquare = document.querySelectorAll(".grid_square");
const playerOneScore = document.getElementById("info_player_score1");
const playerTwoScore = document.getElementById("info_player_score2");
const text = document.getElementById("text");
const startBtn = document.getElementById("btn");
const modal = document.getElementById("modal");

const players = {
  playerOne: { name: "", wins: 0 },
  playerTwo: { name: "", wins: 0 },
};

let move = 1;
let nextPlayer = players.playerOne.name;
let pastPlayer;
let currenImage = "cross";
let playerHasWon = false;
function addSquereClick() {
  allSquare.forEach((square) => {
    square.addEventListener("click", squareClick);
  });
}
function removeSquereClick() {
  allSquare.forEach((square) => {
    square.removeEventListener("click", squareClick);
  });
}

function squareClick() {
  if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
    this.classList.add(`${currenImage}`);
    incrementMove();
  }
}
addSquereClick();

function incrementMove() {
  move += 1;
  if (move % 2 !== 0) {
    nextPlayer = players.playerOne.name;
    pastPlayer = players.playerTwo.name;
    currenImage = "cross";
    text.innerHTML = players.playerOne.name;
  } else {
    nextPlayer = players.playerTwo.name;
    pastPlayer = players.playerOne.name;
    currenImage = "circle";
    text.innerHTML = players.playerTwo.name;
  }
  chekForWin();
  chekForTie();
}
function chekForWin() {
  const lines = [
    [square1, square2, square3],
    [square4, square5, square6],
    [square7, square8, square9],
    [square1, square4, square7],
    [square2, square5, square8],
    [square3, square6, square9],
    [square1, square5, square9],
    [square3, square5, square7],
  ];
  for (const line of lines) {
    const hasCross = line.every((square) => square.classList.contains("cross"));
    const hasCircle = line.every((square) =>
      square.classList.contains("circle")
    );
    if (hasCross || hasCircle) {
      const winner = hasCross ? players.playerOne : players.playerTwo;
      winner.wins += 1;
      updateScores();
      playerWon();
      return;
    }
  }
}

function updateScores() {
  playerOneScore.innerHTML = players.playerOne.wins;
  playerTwoScore.innerHTML = players.playerTwo.wins;
}
function playerWon() {
  text.innerHTML = `${pastPlayer}Won the game! `;
  text.style.border = "1px solid #fff ";
  text.style.fontSize = "24px";
  text.style.color = "#fff";

  playerHasWon = true;
  continueGame();
}

function chekForTie() {
  const squares = [
    square1,
    square2,
    square3,
    square4,
    square5,
    square6,
    square7,
    square8,
    square9,
  ];
  const allSquareFilled = squares.every((square) => {
    return (
      square.classList.contains("cross") || square.classList.contains("circle")
    );
  });
  if (allSquareFilled && !playerHasWon) {
    text.innerHTML = "its a tie";
    continueGame();
  }
}
function continueGame() {
  removeSquereClick();
  setTimeout(() => {
    reset();
  }, 2000);
}
function restartGame() {
  removeSquereClick();
  reset();
}

function reset() {
  allSquare.forEach((square) => {
    square.classList = "grid_square";
  });
  addSquereClick();
  playerHasWon = false;
  text.innerHTML = `${nextPlayer} is starting this game`;
}
function startGame() {
  startBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const player1Input = document.getElementById("player1").value.trim();
    const player2Input = document.getElementById("player2").value.trim();
    if (player1Input.trim().length == 0 || player2Input.trim().length == 0) {
      Swal.fire("Please fill out this field");
    }
    const player1InputCap =
      player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
    const player2InputCap =
      player2Input.charAt(0).toUpperCase() + player2Input.slice(1);
    players.playerOne.name = player1InputCap;
    players.playerTwo.name = player2InputCap;
    nextPlayer = player1InputCap;
    document.getElementById("info_player_name1").innerHTML =
      players.playerOne.name;
    document.getElementById("info_player_name2").innerHTML =
      players.playerTwo.name;
    players.playerOne.wins = 0;
    players.playerTwo.wins = 0;
    updateScores();

    modal.style.display = "none";
    startBtn.innerHTML = "restart game";
    addSquereClick();
    restartGame();
  });
}
startGame();
