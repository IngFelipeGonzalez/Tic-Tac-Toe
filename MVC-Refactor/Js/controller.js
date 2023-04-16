import { View } from "./view.js";

function init() {
  const view = new View();

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
    console.log("Player move event");
    console.log(event);
  });
}

window.addEventListener("load", init);
