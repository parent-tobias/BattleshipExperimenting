import BattleshipBoard from './boards/BattleshipBoard.js';

const battleship = BattleshipBoard();
// let's set some ships to sea...
battleship.randomlyPlaceAll();

// let's blow stuff up! I'm console.logging
//  these, as we get a hit or miss notification
// we'll take ten random potshots:
for (let i=0; i<10; i++){
  const randomCell = battleship.randomCell();
  console.log(`Attacking ${randomCell}, result: ${battleship.attack(randomCell)}`);
}
// how'd that go?
console.log(battleship.key)
