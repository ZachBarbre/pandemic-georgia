// basic sql funciton to update the decks on the server
const db = require("./con");
const db = require("./teams");

class update {
    constructor (cardspots){
    this.cardspots = cardspots }
function updateDs(){
    `UPDATE game SET playerdeck = playerDeck,discard = discard, infectdeck = infectDeck
     WHERE game.id = ${teamID};`
} 


//needs to be updated with how we are keeping track of player turn
function updatehand(){
    `UPDATE game SET playerhand = player${}hand
     WHERE game.id = ${teamID};`
        
}}
module.exports = update;