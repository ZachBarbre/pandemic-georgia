class deck{
    constructor (array){
    this.array = [];
    };
    
    static function startingShuffle(array) {
  for (array, i = 0; i < 24; ++i) array[i] = i;

  let tmp, 
    current, 
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1) + 1);
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}
}


let playerDeck = new deck
console.log (playerDeck)
