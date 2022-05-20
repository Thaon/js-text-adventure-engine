// custom classes
import Game from "./classes/game.js";

const main = async () => {
  let game = new Game();

  // run the actual game
  await game.gameLoop();
};

// run the game
main();
