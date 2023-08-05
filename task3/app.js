const Game = require("./Game");
const Moves = require("./Moves");
const Table = require("./Table");

const args = process.argv.slice(2);
const numMoves = args.length;

if (numMoves < 3 || numMoves % 2 !== 1 || new Set(args).size !== numMoves) {
  console.log(
    "Invalid arguments. Please provide an odd number >= 3 of non-repeating moves."
  );
  console.log("Example: node app.js rock paper scissors");
  process.exit();
}

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = new Game(args);
const moves = new Moves(args);
const table = new Table(args);

const promptUser = () => {
  rl.question("Enter your move: ", (input) => {
    const move = input.trim();
    if (move === "?") {
      table.print();
      moves.show();
      promptUser();
    } else if (move === "0") {
      console.log("Exiting the game.");
      rl.close();
    } else if (!game.moves[move - 1]) {
      console.log("Invalid move. Please choose from the available moves");
      moves.show();
      promptUser();
    } else {
      game.play(move);
      rl.close();
    }
  });
};

game.showHMAC();
moves.show();
promptUser();
