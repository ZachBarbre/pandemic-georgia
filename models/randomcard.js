function randomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}

const cards = [red, green, black, yellow];
console.log(randomCard(cards));
let card = randomCard(cards);
module.exports = card;
