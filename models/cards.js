class playerCard {
  constructor(color, city, number) {
    this.color = color;
    this.city = city;
    this.number = number;
  }
}

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
const cardEpidemic1 = new playerCard("green", "Epidemic", 21);
const cardEpidemic2 = new playerCard("green", "Epidemic", 22);
const cardEpidemic3 = new playerCard("green", "Epidemic", 23);
const cardEpidemic4 = new playerCard("green", "Epidemic", 0);

class infectCard {
  constructor(city, number) {
    this.city = city;
    this.number = number;
  }
}

const InfectAlbany = new infectCard("Albany", 1);
const InfectDalton = new infectCard("Dalton", 2);
const InfectBlairsville = new infectCard("Blairsville", 3);
const InfectAthens = new infectCard("Athens", 4);
const InfectAtlanta = new infectCard("Atlanta ", 5);
const InfectColumbus = new infectCard("Columbus", 6);
const InfectSavannah = new infectCard("Savannah", 7);
const InfectAugusta = new infectCard("Augusta", 8);
const InfectValdosta = new infectCard("Valdosta", 9);
const InfectMacon = new infectCard("Macon", 0);
