const Ship = (name, size) => {
  const emptyCell = {name: null, hit: false}
  let cells = new Array(size).fill(Object.create( emptyCell));

  return {
    get name(){ return name},
    get hits(){ return cells.map(cell=>({...cell}))},
    get length(){ return size },
    place: (arrayOfCells) => {
      if(arrayOfCells.length !== cells.length)
        throw new Error(`Ship is ${cells.length} cells long, you're placing it in ${arrayOfCells.length}.`)
      cells = [...arrayOfCells];
    },
    hit: (target) => {
      cells = cells.map( cell => cell.name===target ? {...cell, hit: true} : cell);
    },
    isSunk: () => cells.every(cell => cell.hit),
    toString: ()=> `-- ${name} --
    Size: ${size}
    Occupies: ${cells.join()}
    `
  }
}
export default Ship;