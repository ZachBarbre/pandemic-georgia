const db = require("./con");

class playerCard {
  constructor(color, city, number) {
    this.color = color;
    this.city = city;
    this.number = number;
  }
}

class PlayerDeck {
  constructor() {}

  buildDeck() {
    const cardDalton1 = new playerCard("red", "Dalton", 1);
    const cardDalton2 = new playerCard("red", "Dalton", 2);
    const cardBlairsville1 = new playerCard("red", "Blairsville", 3);
    const cardBlairsville2 = new playerCard("red", "Blairsville", 4);
    const cardAthens1 = new playerCard("red", "Athens", 5);
    const cardAthens2 = new playerCard("red", "Athens", 6);
    const cardAtlanta1 = new playerCard("yellow", "Atlanta", 7);
    const cardAtlanta2 = new playerCard("yellow", "Atlanta", 8);
    const cardColumbus1 = new playerCard("yellow", "Columbus", 9);
    const cardColumbus2 = new playerCard("yellow", "Columbus", 10);
    const cardMacon1 = new playerCard("yellow", "Macon", 11);
    const cardMacon2 = new playerCard("yellow", "Macon", 12);
    const cardAugusta1 = new playerCard("yellow", "Augusta", 13);
    const cardAugusta2 = new playerCard("yellow", "Augusta", 14);
    const cardAlbany1 = new playerCard("black", "Albany", 15);
    const cardAlbany2 = new playerCard("black", "Albany", 16);
    const cardValdosta1 = new playerCard("black", "Valdosta", 17);
    const cardValdosta2 = new playerCard("black", "Valdosta", 18);
    const cardSavannah1 = new playerCard("black", "Savannah", 19);
    const cardSavannah2 = new playerCard("black", "Savannah", 20);

    const playerDeck = [
      cardAtlanta1,
      cardAlbany1,
      cardAlbany2,
      cardAthens1,
      cardAthens2,
      cardAtlanta2,
      cardAugusta1,
      cardAugusta2,
      cardBlairsville1,
      cardBlairsville2,
      cardColumbus1,
      cardColumbus2,
      cardDalton1,
      cardDalton2,
      cardMacon1,
      cardMacon2,
      cardSavannah1,
      cardSavannah2,
      cardValdosta1,
      cardValdosta2
    ];
    console.log(playerDeck);
    return playerDeck;
  }

  shuffleDeck(array) {
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
  //borrowed this shuffler from the internet. the one above wasn't returning a new shuffle?
  //perhaps someone could double check that. the shuffleTwo does work.

  shuffleTwo(arr) {
    let cards = [];
    arr.forEach(card => {
      cards.push(card);
    });

    let random = () => {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    };
    random();
    return cards;
  }

  addEpidemics(playerDeck) {
    const cardEpidemic1 = new playerCard("green", "Epidemic", 21);
    const cardEpidemic2 = new playerCard("green", "Epidemic", 22);
    const cardEpidemic3 = new playerCard("green", "Epidemic", 23);
    const cardEpidemic4 = new playerCard("green", "Epidemic", 0);
    let epidemicArray = [
      cardEpidemic1,
      cardEpidemic2,
      cardEpidemic3,
      cardEpidemic4
    ];
    for (let i = 0; i < playerDeck.length; i++) {
      if (epidemicArray.length != 0) {
        const randomNum = Math.floor(Math.random() * 5) + i;
        i += randomNum;
        playerDeck.splice(i + randomNum, 0, epidemicArray.pop());
      } else {
        i = 60;
      }
    }
    return playerDeck;
  }

  //post prototype.
  static async postPlayerDeck(deck, teamID) {
    let posting = "1";
    const card = Object.keys(deck);

    try {
      const response = await db.one(
        `UPDATE game SET playerdeck = ${card} WHERE game.id = 6;`
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getPlayerDeck(teamID) {
    try {
      const response = await db.one(
        `SELECT playerdeck FROM game WHERE game.id = ${teamID};`
      );
      return response.playerdeck;
    } catch (e) {
      return e;
    }
  }

  async drawCard(teamID) {
    try {
      const deck = await PlayerDeck.getPlayerDeck(teamID);
      console.log(deck);
      const drawnCard = await deck.pop();
      //post popped deck.
      console.log(drawnCard);
      return drawnCard;
    } catch (e) {
      return e;
    }
  }
}

module.exports = PlayerDeck;
