class Table {
  constructor(moves) {
    this.moves = moves;
    this.numOfMoves = moves.length;
    this.table = this.generateTable();
  }

  generateTable() {
    const table = [["v PC/User >", ...this.moves]];
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

  print() {
    const maxLen = Math.max(...this.table[0].map((x) => x.length)) + 2;
    const border = [
      ("+" + "-".repeat(maxLen)).repeat(this.numOfMoves + 1) + "+",
    ];
    const tableString = [border];
    for (let i = 0; i < this.numOfMoves + 1; i++) {
      const row = [];
      for (let j = 0; j < this.numOfMoves + 1; j++) {
        row.push(
          `| ${this.table[i][j]}`.padEnd(maxLen, " ") +
            (j === this.numOfMoves ? " |" : "")
        );
      }
      tableString.push(row);
      tableString.push(border);
    }
    console.log(tableString.map((x) => x.join(" ")).join("\n"));
  }
}

module.exports = Table;
