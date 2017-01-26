const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  promptMove(inputCallback) {
    console.log(this.stacks);
    reader.question("Which stack do you want to move the disc from? (e.g., 0, 1, 2): ", function (res1) {
      reader.question("Which stack do you want to move the disc to? (e.g., 0, 1, 2): ", function (res2) {
        const startTowerIdx = parseInt(res1);
        const endTowerIdx = parseInt(res2);

        inputCallback(startTowerIdx, endTowerIdx);
      });
    });
  }

   handleInput(startTowerIdx, endTowerIdx) {
    this.move(startTowerIdx, endTowerIdx);
    if (this.isWon()) {
      reader.close();
      console.log("You won!");
    }
    else {
      this.promptMove(this.handleInput.bind(this));
    }
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];
    if ((startTower.length !== 0) && ((endTower.length === 0) ||
     (startTower[startTower.length - 1] < endTower[endTower.length - 1]))) {
      return true;
    }
    else {
      return false;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let disc = this.stacks[startTowerIdx].pop();
      this.stacks[endTowerIdx].push(disc);
      // this.print();
      return true;
    }
    else {
      return false;
    }
  }

  isWon() {
    if ((this.stacks[1].length === 3) || (this.stacks[2].length === 3)) {
      return true;
    }

    else {
      return false;
    }
  }

  run() {
    this.promptMove(this.handleInput.bind(this));
  }


  print() {
    console.log(JSON.stringify(this.stacks));
  }
}


const game = new Game();
game.run();
// game.print();
// console.log(game.stacks);
// game.promptMove();

// console.log(game.move(0, 1));
// game.print();
// console.log(game.move(0, 2));
// game.print();
// console.log(game.move(1, 2));
// game.print();
// console.log(game.move(0, 1));
// game.print();
// console.log(game.isWon());
// console.log(game.move(2, 0));
// game.print();
// console.log(game.move(2, 1));
// game.print();
// console.log(game.move(0, 1));
// game.print();
// console.log(game.isWon());

// reader.close();
