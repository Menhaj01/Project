let redPawn1 = document.getElementById("red-pawn-1");
let bluePawn1 = document.getElementById("blue-pawn-1");
let greenPawn1 = document.getElementById("green-pawn-1");
let yellowPawn1 = document.getElementById("yellow-pawn-1");
let teams = [
  { id: "red-pawn-1", pawns: [redPawn1], inside: true, color: "red", position: 0 },
  { id: "blue-pawn-1", pawns: [bluePawn1], inside: true, color: "blue", position: 0 },
  { id: "green-pawn-1", pawns: [greenPawn1], inside: true, color: "green", position: 0},
  { id: "yellow-pawn-1", pawns: [yellowPawn1], inside: true, color: "yellow", position: 0},
];


var currentNumber = 1;
let indexPlayer = 0;


function rollDice() {
   
  currentNumber = Math.floor(Math.random() * 6) + 1;
 // currentNumber = 1;
  const playdice = `./Images/dice${currentNumber}.jpg`

  document.getElementById(`check1`).setAttribute(`src`, playdice);
  checkResult()
};

document.getElementById("current-player-color").textContent = teams[indexPlayer].color;
document.getElementById("check1").onclick = rollDice;

function changPlayer(){
    if (currentNumber != 6){
        switch (currentColor.innerHTML) {
            case "red": currentColor.innerHTML = currentColor.style.color = "blue"; break;
            case "blue": currentColor.innerHTML = currentColor.style.color = "green"; break;
            case "green": currentColor.innerHTML = currentColor.style.color = "yellow"; break;
            case "yellow": currentColor.innerHTML = currentColor.style.color = "red"; break;
            
        }
    }
}

function getPawnNextPosition(color, wayNumber) {
    const target = document.getElementById(`${color}-team-way-${wayNumber}`);
    const computedStyle = window.getComputedStyle(target);
    const colStart = computedStyle["grid-column-start"];
    const colٍEnd = computedStyle["grid-column-end"];
    const rowStart = computedStyle["grid-row-start"];
    const rowEnd = computedStyle["grid-row-end"];
    return {
        colStart, colٍEnd, rowStart, rowEnd
    }
}

function setPawnNextPosition(anyPawn, nextPosition) {
    const pawnStyle = anyPawn.style;
    pawnStyle.gridColumnStart = nextPosition.colStart;
    pawnStyle.gridColumnEnd = nextPosition.colٍEnd;
    pawnStyle.gridRowStart = nextPosition.rowStart;
    pawnStyle.gridRowEnd = nextPosition.rowEnd;
}

function checkResult() {
  let currentPlayerInfo = teams[indexPlayer];
  // first step
  if (currentPlayerInfo.inside === true && currentNumber === 6) {

     const nextPosition = getPawnNextPosition(currentPlayerInfo.color, 1);
     setPawnNextPosition(currentPlayerInfo.pawns[0], nextPosition);
     currentPlayerInfo.inside = false;
     currentPlayerInfo.position = 1;
    

  } else if (currentPlayerInfo.inside === false) {
    if (7 - (teams[indexPlayer].position + currentNumber) > 0) {
        const nextNumber = currentPlayerInfo.position + currentNumber;
        const nextPosition = getPawnNextPosition(currentPlayerInfo.color, nextNumber);
        setPawnNextPosition(currentPlayerInfo.pawns[0], nextPosition);
        currentPlayerInfo.position = nextNumber;
        indexPlayer = getNextPlayerIndex()
    } else if (7 === (teams[indexPlayer].position + currentNumber)) {
        return alert("you win");
    }
    indexPlayer = getNextPlayerIndex()
   
  } else {
    indexPlayer = getNextPlayerIndex();
  }
  document.getElementById("current-player-color").textContent = teams[indexPlayer].color;

}

function getNextPlayerIndex() {
    return  indexPlayer + 1 < teams.length ? indexPlayer+ 1 : 0;
}