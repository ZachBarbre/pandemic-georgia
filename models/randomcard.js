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
console.log(randomCard(cards));
let card = randomCard(cards);
module.exports = card;
