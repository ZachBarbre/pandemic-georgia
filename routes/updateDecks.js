
// basic sql funciton to update the decks on the server
function updateDs(){
    UPDATE game SET playerdeck = playerDeck,discard = discard, infectdeck = infectDeck
    WHERE id = user_id
}