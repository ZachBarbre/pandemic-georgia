function randomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}

const cards = [cure, cure, cure, nothin, nothin, pandemic];
console.log(randomCard(cards));
let card = randomCard(cards);
module.exports = card;
