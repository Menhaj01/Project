let redPawn1 = document.getElementById("red-pawn-1");
let bluePawn1 = document.getElementById("blue-pawn-1");
let greenPawn1 = document.getElementById("green-pawn-1");
let yellowPawn1 = document.getElementById("yellow-pawn-1");
let teams = [
  {
    id: "red-pawn-1",
    pawns: [redPawn1],
    inside: true,
    color: "red",
    position: 0,
  },
  {
    id: "blue-pawn-1",
    pawns: [bluePawn1],
    inside: true,
    color: "blue",
    position: 0,
  },
  {
    id: "green-pawn-1",
    pawns: [greenPawn1],
    inside: true,
    color: "green",
    position: 0,
  },
  {
    id: "yellow-pawn-1",
    pawns: [yellowPawn1],
    inside: true,
    color: "yellow",
    position: 0,
  },
];

var playerColor = document.getElementById("current-player-color");
var dice = document.getElementById("check1");
var teamTurn = document.getElementById("teams-turn");
var startBtn = document.getElementById("start");
var resultDiv = document.getElementById("result");
var winnerDiv = document.getElementById("winner-team");
var playAgainBtn = document.getElementById("yes");
var gameoverBtn = document.getElementById("no");


var currentPlayerInfo = null;
var currentNumber = 1;
var indexPlayer = 0;

startBtn.onclick = start;

function start() {
  startBtn.classList.add("is-hidden");
  dice.classList.remove("is-hidden");
  teamTurn.classList.remove("is-hidden");
  setPlayersTurn();
  dice.onclick = rollDice;
}

function rollDice() {
  currentNumber = Math.floor(Math.random() * 6) + 1;
  const diceValue = `./Images/dice${currentNumber}.jpg`;
  dice.setAttribute(`src`, diceValue);
  checkResult();
  setPlayersTurn();
}

function setPlayersTurn() {
  playerColor.textContent = teams[indexPlayer].color;
}

function getPawnNextPosition(color, wayNumber) {
  const target = document.getElementById(`${color}-team-way-${wayNumber}`);
  const computedStyle = window.getComputedStyle(target);
  const colStart = computedStyle["grid-column-start"];
  const colٍEnd = computedStyle["grid-column-end"];
  const rowStart = computedStyle["grid-row-start"];
  const rowEnd = computedStyle["grid-row-end"];
  return {
    colStart,
    colٍEnd,
    rowStart,
    rowEnd,
  };
}

function setPawnNextPosition(anyPawn, nextPosition) {
  const pawnStyle = anyPawn.style;
  pawnStyle.gridColumnStart = nextPosition.colStart;
  pawnStyle.gridColumnEnd = nextPosition.colٍEnd;
  pawnStyle.gridRowStart = nextPosition.rowStart;
  pawnStyle.gridRowEnd = nextPosition.rowEnd;
}

function setWinPosition(anyPawn) {
  dice.removeEventListener("click", rollDice);

  resultDiv.classList.remove("is-hidden");
  winnerDiv.textContent =  `${currentPlayerInfo.color} wins ! play again ? (y/n)`;
  playAgainBtn.onclick =  () => window.location.reload()
  gameoverBtn.onclick =  () => window.location.replace("gameover.html")

  const pawnStyle = anyPawn.style;
  pawnStyle.gridColumnStart = 8;
  pawnStyle.gridColumnEnd = 9;
  pawnStyle.gridRowStart = 8;
  pawnStyle.gridRowEnd = 9;
}


function checkResult() {
  currentPlayerInfo = teams[indexPlayer];
  // first step
  if (currentPlayerInfo.inside === true && currentNumber === 6) {
    const nextPosition = getPawnNextPosition(currentPlayerInfo.color, 1);
    setPawnNextPosition(currentPlayerInfo.pawns[0], nextPosition);
    currentPlayerInfo.inside = false;
    currentPlayerInfo.position = 1;
    //alert("You got a six, play again");
  } else if (currentPlayerInfo.inside === false) {
    const nextNumber = currentPlayerInfo.position + currentNumber;
    if (7 - nextNumber > 0) {
      const nextPosition = getPawnNextPosition(
        currentPlayerInfo.color,
        nextNumber
      );
      setPawnNextPosition(currentPlayerInfo.pawns[0], nextPosition);
      currentPlayerInfo.position = nextNumber;
      indexPlayer = getNextPlayerIndex();
    } else if (7 - nextNumber === 0) {
      setWinPosition(currentPlayerInfo.pawns[0]);
    } else {
      indexPlayer = getNextPlayerIndex();
    }
  } else {
    indexPlayer = getNextPlayerIndex();
  }
}

function getNextPlayerIndex() {
  return indexPlayer + 1 < teams.length ? indexPlayer + 1 : 0;
}
