const App = {
  // All of our selected HTML
  data: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-items']"),
    resetButton: document.querySelector("[data-id='reset-btn']"),
    newRoundButton: document.querySelector("[data-id='new-round-btn']"),
    squares: document.querySelectorAll("[data-id=square]"),
    endGameTag: document.querySelector("[data-id=modal]"),
    endGameLabel: document.querySelector("[data-id='modal-text']"),
    endGameButton: document.querySelector("[data-id='modal-btn']"),
    p1Score: document.querySelector("[data-id=p1-wins]"),
    p2Score: document.querySelector("[data-id='p2-wins']"),
    tieScore: document.querySelector("[data-id='ties']"),
    turnIdicator: document.querySelector("[data-id='turn']"),
    turnIcon: document.querySelector("[data-id='turn-icon']"),
    turnText: document.querySelector("[data-id='turn-txt']"),
  },

  state: {
    currentPlayer: 1,
    moves: [],
  },

  score: {
    scoreP1: 0,
    scorep2: 0,
    scoreTies: 0,
  },

  resetGame() {
    App.data.squares.forEach((square) => {
      if (square.hasChildNodes()) {
        square.removeChild(square.firstElementChild);
      }
    });

    App.state = {
      currentPlayer: 1,
      moves: [],
    };
  },
  getGameScore(statusGame) {
    if (statusGame.winner === 1) {
      const actScoreP1 = App.score.scoreP1;
      App.score.scoreP1 = actScoreP1 + 1;
    }
    if (statusGame.winner === 2) {
      const actScoreP2 = App.score.scorep2;
      App.score.scorep2 = actScoreP2 + 1;
    }
    if (statusGame.winner === null) {
      const actScoreTies = App.score.scoreTies;
      App.score.scoreTies = actScoreTies + 1;
    }
    return App.score;
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress",
      winner,
    };
  },

  registerEventListeners() {
    //menu items behavior
    App.data.menu.addEventListener("click", (event) => {
      App.data.menuItems.classList.toggle("hidden");
    });
    //reset
    App.data.resetButton.addEventListener("click", (event) => {
      window.location.reload();
    });
    //new-round
    App.data.newRoundButton.addEventListener("click", (event) => {
      this.resetGame();
    });
    //end of the game pop up window button
    App.data.endGameButton.addEventListener("click", (event) => {
      App.data.endGameTag.classList.add("hidden");
      this.resetGame();
    });
    //game logic
    App.data.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        //Square check and play check (valid movement)
        if (square.hasChildNodes()) {
          return;
        }
        //Natural play
        const icon = document.createElement("i");
        const currentPlayer = App.state.currentPlayer;
        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "yellow");
        }
        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;
        //turn indicator
        App.data.turnIdicator.classList.toggle("turquoise");
        App.data.turnIdicator.classList.toggle("yellow");
        App.data.turnIcon.classList.toggle("fa-x");
        App.data.turnIcon.classList.toggle("fa-o");
        App.data.turnText.innerHTML = `Player ${App.state.currentPlayer}, you're up!`;

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(icon);

        //Check if there is a winner or a tie game
        const statusGame = App.getGameStatus(App.state.moves);

        console.log(statusGame);
        //Change de DOM in end game case (update scores)
        if (statusGame.status === "complete") {
          //turn indicator reset (Could be better with add)
          App.data.turnIdicator.classList.remove("turquoise");
          App.data.turnIdicator.classList.remove("yellow");
          App.data.turnIdicator.classList.add("turquoise");
          App.data.turnIcon.classList.remove("fa-x");
          App.data.turnIcon.classList.remove("fa-o");
          App.data.turnIcon.classList.add("fa-x");
          App.data.turnText.innerHTML = `Player 1, you're up!`;

          const scoreBoard = App.getGameScore(statusGame);

          if (statusGame.winner === 1) {
            App.data.endGameLabel.innerHTML = "Player 1 wins";
            App.data.p1Score.innerHTML = scoreBoard.scoreP1 + " Wins";
          }
          if (statusGame.winner === 2) {
            App.data.endGameLabel.innerHTML = "Player 2 wins";
            App.data.p2Score.innerHTML = scoreBoard.scorep2 + " Wins";
          }
          if (statusGame.winner === null) {
            App.data.endGameLabel.innerHTML = "It's a tie!";
            App.data.tieScore.innerHTML = scoreBoard.scoreTies;
          }
          App.data.endGameTag.classList.toggle("hidden");
        }
      });
    });
  },
  init() {
    App.registerEventListeners();
  },
};

window.addEventListener("load", App.init);
