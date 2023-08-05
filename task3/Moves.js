class Moves {
  constructor(moves) {
    this.moves = moves;
    this.numOfMoves = moves.length;
  }

  show() {
    console.log("Available moves:");
    for (let i = 0; i < this.numOfMoves; i++) {
      console.log(`${i + 1} - ${this.moves[i]}`);
    }
    console.log("0 - exit");
    console.log("? - help");
  }
}

module.exports = Moves;
