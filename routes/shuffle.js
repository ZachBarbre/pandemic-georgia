function Shuffle(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}
Shuffle(infectDeck);
Shuffle(playerDeck);
console.log(playerDeck);
console.log(infectDeck);

const shuffle = Shuffle();

modules.export = shuffle;
