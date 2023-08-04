class Moves {
  constructor(moves) {
    this.moves = moves;
    this.numOfMoves = moves.length;
    this.table = this.generateTable();
  }

  show() {
    console.log("Available moves:");
    for (let i = 0; i < this.numOfMoves; i++) {
      console.log(`${i + 1} - ${this.moves[i]}`);
    }
    console.log("0 - exit");
    console.log("? - help");
  }

  generateTable() {
    const table = [["User/PC", ...this.moves]];
    for (let i = 0; i < this.moves.length; i++) {
      const row = [this.moves[i]];
      for (let j = 0; j < this.moves.length; j++) {
        if (i === j) {
          row.push("Draw");
        } else if (this.isWin(this.moves[i], this.moves[j])) {
          row.push("Win");
        } else {
          row.push("Lose");
        }
      }
      table.push(row);
    }
    return table;
  }

  isWin(move1, move2) {
    return (
      (this.moves.indexOf(move1) -
        this.moves.indexOf(move2) +
        this.numOfMoves) %
        this.numOfMoves >
      Math.floor(this.numOfMoves / 2)
    );
  }

  printTable() {
    const tableString = this.table.map((row) => row.join("\t")).join("\n");
    console.log(tableString);
  }
}
module.exports = Moves;
