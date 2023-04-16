export class View {
  $ = {};

  constructor() {
    this.$.menu = document.querySelector("[data-id='menu']");
    this.$.menuItems = document.querySelector("[data-id='menu-items']");
    this.$.resetButton = document.querySelector("[data-id='reset-btn']");
    this.$.newRoundButton = document.querySelector("[data-id='new-round-btn']");
    this.$.squares = document.querySelectorAll("[data-id=square]");
    this.$.endGameTag = document.querySelector("[data-id=modal]");
    this.$.endGameLabel = document.querySelector("[data-id='modal-text']");
    this.$.endGameButton = document.querySelector("[data-id='modal-btn']");
    this.$.p1Score = document.querySelector("[data-id=p1-wins]");
    this.$.p2Score = document.querySelector("[data-id='p2-wins']");
    this.$.tieScore = document.querySelector("[data-id='ties']");
    this.$.turnIdicator = document.querySelector("[data-id='turn']");
    this.$.turnIcon = document.querySelector("[data-id='turn-icon']");
    this.$.turnText = document.querySelector("[data-id='turn-txt']");

    this.$.menu.addEventListener("click", (event) => {
      this.toggleMenu();
    });
  }

  bindGameResetEvent(handlerF) {
    this.$.resetButton.addEventListener("click", handlerF);
  }

  bindNewRoundEvent(handlerF) {
    this.$.newRoundButton.addEventListener("click", handlerF);
  }

  bindPlayerMoveEvent(handlerF) {
    this.$.squares.forEach((square) => {
      square.addEventListener("click", handlerF);
    });
  }

  toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menu.classList.toggle("border");
    // const styles = window.getComputedStyle(this.$.menu);
    // console.log(styles.border);
    // if (styles.border === "2px solid rgb(255, 255, 255)") {
    //   this.$.menu.style.border = "0px none";
    // } else {
    //   this.$.menu.style.border = "2px solid white";
    // }
  }
}
