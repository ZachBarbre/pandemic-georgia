// basic sql funciton to update the decks on the server
class update {
    constructor (cardspots){
    this.cardspots = cardspots }
function updateDs(){
    UPDATE game SET playerdeck = playerDeck,discard = discard, infectdeck = infectDeck
    WHERE id = user_id
} 


//needs to be updated with how we are keeping track of player turn
function updatehand(){
    UPDATE game SET playerhand = player${}hand
     WHERE id = user_id
}}