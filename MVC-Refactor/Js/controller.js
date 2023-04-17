import { View } from "./view.js";
import { Model } from "./model.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const model = new Model(players);

  view.bindGameResetEvent((event) => {
    console.log("Reset event");
    console.log(event);
    window.location.reload();
  });

  view.bindNewRoundEvent((event) => {
    console.log("New round event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((event) => {
    const square = event.currentTarget;
    if (square.hasChildNodes()) {
      return;
    }
    view.handlerPlayerMove(square, model.game.currentPlayer);

    model.playerMove(+square.id);

    if (model.game.status.isComplete) {
      view.modalFunction(model.game.currentPlayer.name);
      return;
    }

    view.setTurnIndicator(model.game.currentPlayer);
  });
}

window.addEventListener("load", init);
