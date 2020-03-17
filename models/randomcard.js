function randomCard(cards) {
  return cards[Math.floor(Math.random() * cards.length)];
}

const cards = [
  cure,
  nothin,
  nothin,
  nothin,
  nothin,
  nothin,
  nothin,
  nothin,
  nothin,
  nothin
];
let card = randomCard(cards);
module.exports = card;
