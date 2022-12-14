const container = document.getElementsByClassName("container");
const restartButton = document.getElementById("restart");

var humanVsHuman = document.getElementById("hvh");
var humanVsComputer = document.getElementById("hvc");
var gameMode = document.getElementById("game-mode");
var turn = document.getElementById("turn");
var winnerGame = document.getElementById("winner");

var currentValue = "❌";
var numberRound = 0;
var winner = false;
var hvh = true;
var game = ["", "", "", "", "", "", "", "", ""];
var results = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

restartButton.addEventListener("click", defaultGame);

humanVsHuman.addEventListener("click", activateHumanMode);
humanVsHuman.addEventListener("click", offModal);
humanVsComputer.addEventListener("click", activateComputerMode);
humanVsComputer.addEventListener("click", offModal);

function activateHumanMode() {
  defaultGame();
  gameMode.textContent = "Human vs Human";
  hvh = true;
}

function activateComputerMode() {
  defaultGame();
  gameMode.textContent = "Human vs Bot";
  hvh = false;
}

window.addEventListener("click", function (e) {
  let clickedCell = e.target;
  let numberCell = Array.from(clickedCell.parentNode.children).indexOf(
    clickedCell
  );
  let cell = clickedCell.parentNode.children[numberCell];

  if (clickedCell.classList.value === "cell" && cell.textContent === "") {
    /*Human vs Computer */
    if (hvh == false) {
      /*Player Turn*/
      setGame(currentValue, numberCell);
      setValue(cell);
      getWinner(game);
      numberRound += 1;
      if (winner == false && numberRound == 9) {
        winnerGame.textContent = "Draw!";
        onModal();
        return;
      }
      /*Computer Turn*/
      setTimeout(() => {
        if (winner == false) {
          let numberComputer = computerPlay();
          let cellComputer = clickedCell.parentNode.children[numberComputer];
          setGame(currentValue, numberComputer);
          setValue(cellComputer);
          getWinner(game);
          numberRound += 1;
          if (winner == false && numberRound == 9) {
            winnerGame.textContent = "Draw!";
            onModal();
            return;
          }
        }
      }, 300);
      return;
    }

    /*Human vs Human */
    setGame(currentValue, numberCell);
    setValue(cell);
    getWinner(game);
    numberRound += 1;
    if (winner == false && numberRound == 9) {
      winnerGame.textContent = "Draw!";
      onModal();
      return;
    }
  }
});

function setGame(value, index) {
  game[index] = value;
  return game;
}

function defaultGame() {
  let cells = document.querySelectorAll(".cell");
  for (let i in cells) {
    cells[i].textContent = "";
  }
  currentValue = "❌";
  turn.textContent = `Player turn ${currentValue}`;
  game = ["", "", "", "", "", "", "", "", ""];
  winner = false;
  numberRound = 0;
}

function getWinner(array) {
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    let pos1 = array[result[0]];
    let pos2 = array[result[1]];
    let pos3 = array[result[2]];
    if (pos1 == "" || pos2 == "" || pos3 == "") {
      continue;
    }
    if (pos1 == pos2 && pos2 == pos3) {
      winnerGame.textContent = `The winner is ${currentValue}!`;
      winner = true;
      onModal();
      break;
    }
  }
  swapTurn();
}

function setValue(a) {
  a.textContent = currentValue;
}

function swapTurn() {
  currentValue = currentValue === "❌" ? "⭕" : "❌";
  turn.textContent = `Player turn ${currentValue}`;
  if (winner == true) {
    turn.textContent = "";
  }
}

function computerPlay() {
  let number = Math.floor(Math.random() * (8 - 0 + 1) + 0);
  if (game[number] == "") {
    return number;
  } else {
    return computerPlay();
  }
}

/*MODAL*/

var modalContainer = document.getElementsByClassName("modal-container")[0];
var modalOpen = document.getElementsByClassName("modal")[0];
var countText = document.getElementById("count");
var containerCount = document.getElementById("container-count");

function onModal() {
  modalContainer.style.opacity = "1";
  modalContainer.style.visibility = "visible";
  modalOpen.style.transform = "translate(0,0)";
  turn.textContent = "";
  if (winner == true || numberRound == 9) {
    modalOpen.style.height = "30%";
    modalOpen.style.width = "20%";
    modalOpen.style.backgroundColor = "rgba(255, 255, 255, 0.8) ";
    modalOpen.style.backgroundImage = "none";
    modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    winnerGame.style.color = "black";
    setTimeout(() => {
      modalOpen.style.transform = "translate(350%,0)";
    }, 4700);
    setTimeout(() => {
      modalOpen.style.transform = "translate(0,0)";
      modalOpen.style.backgroundImage =
        "linear-gradient(to top, #2b5876 0%, #4e4376 100%)";
      modalOpen.style.height = "100%";
      modalOpen.style.width = "100%";
      winnerGame.style.color = "white";
    }, 5700);
    setTimeout(() => {
      modalContainer.style.backgroundColor = "";
    }, 6100);
    let count = 4;
    humanVsHuman.style.display = "none";
    humanVsComputer.style.display = "none";
    containerCount.style.display = "flex";
    countText.textContent = 5;
    var myInterval = setInterval(() => {
      countText.textContent = count--;
      if (count < 0) {
        clearInterval(myInterval);
        winnerGame.textContent = "Select game mode";
        humanVsHuman.style.display = "block";
        humanVsComputer.style.display = "block";
        containerCount.style.display = "none";
      }
    }, 1000);
  }
}

function offModal() {
  modalOpen.style.transform = "translate(0,-500%)";
  setTimeout(function () {
    modalContainer.style.opacity = "0";
    modalContainer.style.visibility = "hidden";
  }, 700);
}

defaultGame();

onModal();
