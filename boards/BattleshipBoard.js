

import Gameboard from './Gameboard.js';
import Ship from './Ship.js';

/****
 * let's try setting up a simulated Battleship gameboard!
 ****/
// the board for tracking hits, the key for placing ships.
const BattleshipBoard = (container) => {
  // we'll use this to track attack points...
  const board = Gameboard({ width: 10, height: 10 });
  // and this one to place our pieces.
  const key = Gameboard({ width: 10, height: 10 });

  const ships = [
    Ship("Carrier", 5),
    Ship("Battleship", 4),
    Ship("Destroyer", 3),
    Ship("Submarine", 3),
    Ship("Patrol Boat", 2)
  ]

  /****
   * The logic for placing a ship at random. First, generate a
   *  random location within the board. Check on the key if the
   *  location is occupied. At that point, take the length of
   *  the current ship, get a random X or Y direction, then get
   *  a random plus or minus. With this, check each position
   *  in the given X or Y, plus or minus from the random starting
   *  point, to see if it is occupied. If at any point it is,
   *  fail and restart. I think.
   ****/
  const randomCell = () => {
    let xAxis = 'ABCDEFGHIJ';
    let x = xAxis[Math.floor(Math.random() * xAxis.length)];
    let y = Math.ceil(Math.random() * 10);

    return x + y;
  }
  const flipACoin = () => Math.round(Math.random())

  const fits = ([x, y], [sign, axis], size) => {
    // I think this will make the length negative if the 
    //  direction is negative...
    const end = Number(sign + size);
    switch (axis) {
      case "x":
        const endLetter = String.fromCharCode(x.charCodeAt(0) + end);
        return 'ABCDEFGHIJ'.includes(endLetter);
      case "y":
        return (Number(y) + end > 0 && Number(y) + end <= 10);

    }
  }


  const at = (xy)=>({
    get value(){return key.at(xy).value},
    set value(val){key.at(xy).value = val;}
  });
  const attack = (xy) => {
    // we check if there is any object at that
    // cell, or if the object doesn't have a name.
    // miss elements will still have a *hit* on
    // them, but no name.
    // to check the name property, I'm simply using the
    //   optional chaining operator: value?.name returns undefined
    //   if the prop doesn't exist.
    if(key.at(xy).isEmpty || key.at(xy).value?.name===undefined){
      key.at(xy).value = ({hit: true});
      return "Miss!";
    } else {
      key.at(xy).value = ({...key.at(xy).value, hit: true });
      return "Hit!";
    }

  }
  const randomlyPlace = (ship) => {
    //get a random cell
    let isValidPlacement = false;
    let cell, sign, axis;
    while (!isValidPlacement) {
      cell = randomCell();
      sign = '-+'[flipACoin()];
      axis = 'xy'[flipACoin()];
      isValidPlacement = fits(cell, sign + axis, ship.length);
      if (isValidPlacement) {
        // it'll fit, let's check if all the cells in this
        //  configuration are unoccupied!
        const end = Number(sign + ship.length);
        let cells = new Array(ship.length).fill(null).map((_, index) => {
          const offset = Number(sign + index);
          const xPos = axis === 'x' ? String.fromCharCode(cell[0].charCodeAt(0) + offset) : cell[0];
          const yPos = axis === 'y' ? Number(cell[1]) + offset : cell[1];
          return xPos + yPos;
        })
        isValidPlacement = cells.every(current => key.at(current).isEmpty);


        if (isValidPlacement) cells.forEach(current => {
          key.at(current).value = {name:ship.name, hit:false};
        })
        ship.place(cells);
      }
    }
  }

  const randomlyPlaceAll = () => ships.forEach(ship => randomlyPlace(ship))

  return {
    /* should be passed a Ship and array of cells */
    at,
    attack,
    /* eventually, I'll want a UI interface to place ships */
    randomlyPlaceAll,
    randomCell,
    get board(){ return JSON.parse(JSON.stringify(board.board))},
    get key(){ return JSON.parse(JSON.stringify(key.board))}
  }
}

export default BattleshipBoard;