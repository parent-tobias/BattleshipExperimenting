/********
 * So a little bit of theory, and thought experiment. A
 *  conversation was had on TOP about handling a game-board
 *  in a concise and clean way, whether a 1d array or 2d, and
 *  it seemed to me that all board-style games have a similar
 *  pattern, so perhaps a Gameboard factory that would provide
 *  an *interface*. By doing this, we can internally do either
 *  a 1d, 2d or whatever we like. Store it in an object rather than
 *  an array internally? Sure!
 * It seems that, when initializing the board, we pass in a size.
 *  With that, we return an instance of our factory, at that size,
 *  with a consistent mechanism for accessing cells or the board
 *  as a whole. I think.
 ********/

const Gameboard = ({height=8, width=8}) => {
  // For purposes of demonstration, I'll use a 2d array internally.
  let board = new Array(width)
                  .fill(null)
                  .map((x)=>new Array(height).fill(null) );
  

  /***
   * Based on the board size, the at() takes a string in chess
   *  grid syntax: "A1", "C3", etc. Given that, it returns methods
   *  to access that grid cell, and either get or set its value.
   ***/
  const at = (cellString) => {
    if(!/^[A-Z][0-9]/.test(cellString)) 
      throw new Error("at() expects a cell position in chess notation.")
    const x = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(cellString[0].toUpperCase());
    const y = Number(cellString[1])-1;

    // at this point, we have the board in the outer scope,
    //  and we have a particular [x,y] in this scope. If we
    //  return an accessor object here, it has access to all
    //  those, but it is very restrictive in what can be done.
    return {
      get isEmpty(){return board[x][y]===null},
      set value(value){
        board[x][y] = value;
      },
      get value(){
        return board[x][y]
      }
    }
  }

  return {
    at,
    // we will also provide a convenient board getter.
    //  this doesn't get the actual board, but a static
    //  copy of the board - protecting our privacy!
    get board(){
      return JSON.parse(JSON.stringify(board))
    }
  }
};

export default Gameboard;