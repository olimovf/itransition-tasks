const CryptoUtil = require("./CryptoUtil");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.numOfMoves = moves.length;
    this.key = CryptoUtil.generateRandomKey();
    this.computerMove = this.generateComputerMove();
  }

  generateComputerMove() {
    const randomIndex = Math.floor(Math.random() * this.numOfMoves);
    return this.moves[randomIndex];
  }

  showHMAC() {
    const hmac = CryptoUtil.calculateHMAC(this.computerMove, this.key);
    console.log("HMAC:", hmac);
  }

  play(move) {
    const userMove = this.moves[move - 1];
    console.log("Your move:", userMove);
    console.log("Computer move:", this.computerMove);

    this.findWinner(userMove, this.computerMove);

    console.log("HMAC key:", this.key);
  }

  findWinner(userMove, computerMove) {
    if (this.isWin(userMove, computerMove)) {
      console.log("You Lose!");
    } else if (userMove === computerMove) {
      console.log("It's a Draw!");
    } else {
      console.log("You Win!");
    }
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
}

module.exports = Game;
