let playerDeck = [];
let infectDeck = [];

for (playerDeck, i = 0; i < 24; ++i) playerDeck[i] = i;
for (infectDeck, a = 0; a < 10; ++a) infectDeck[a] = a;

function startingShuffle(array) {
  var tmp,
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
startingShuffle(infectDeck);
startingShuffle(playerDeck);
console.log(playerDeck);
console.log(infectDeck);
UPDATE game SET playerdeck = `${playerDeck}`, infectdeck =`${infectDeck}` where id = 1;



export infectDeck
export playerDeck