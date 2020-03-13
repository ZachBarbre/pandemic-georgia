
// basic sql funciton to update the decks on the server
function updateDs(){
    UPDATE game SET playerdeck = playerDeck, infectdeck = infectDeck
    WHERE id = user_id
}