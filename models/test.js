const cityModel = require("./Cities");
const gameFunctions = require("./gameFunctions");

const Dalton = new cityModel("Dalton", 1, 0, ["Blairsville", "Atlanta"]);
const Blairsville = new cityModel("Blairsville", 2, 0, ["Dalton", "Athens"]);
const Atlanta = new cityModel("Atlanta", 3, 0, [
  "Dalton",
  "Athens",
  "Macon",
  "Columbus",
  "Augusta"
]);
const Athens = new cityModel("Athens", 4, 0, [
  "Blairsville",
  "Atlanta",
  "Augusta"
]);
const Augusta = new cityModel("Augusta", 5, 0, [
  "Athens",
  "Atlanta",
  "Savannah",
  "Macon"
]);
const Columbus = new cityModel("Columbus", 6, 0, [
  "Atlanta",
  "Macon",
  "Albany"
]);
const Macon = new cityModel("Macon", 7, 0, [
  "Atlanta",
  "Columbus",
  "Albany",
  "Savannah",
  "Augusta"
]);
const Savannah = new cityModel("Savannah", 8, 0, ["Macon", "Valdosta"]);
const Albany = new cityModel("Albany", 9, 0, ["Columbus", "Macon", "Valdosta"]);
const Valdosta = new cityModel("Valdosta", 10, 0, ["Albany", "Savannah"]);
const cities = [
  Dalton,
  Blairsville,
  Atlanta,
  Athens,
  Augusta,
  Columbus,
  Macon,
  Savannah,
  Albany,
  Valdosta
];

const infectRandomCity = () => {
  const randomNumber = Math.floor(Math.random() * 10);
  return cities[randomNumber];
};

const infectCites = async teamId => {
  const infectRate = await gameFunctions.getInfection(teamId);
  for (let i = 0; i < infectRate.infectrate; i++) {
    const cityToInfect = Dalton;
    const infect = await cityToInfect.postInfect(cityToInfect, teamId);
    if (!infect) {
      Dalton.connectedCities.forEach(connectedCity => {
        eval(connectedCity).postInfect(eval(connectedCity), teamId);
      });
    }
  }
};

const infectedCity = infectCites(2);
