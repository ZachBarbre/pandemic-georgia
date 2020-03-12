
get playerdeck
let drawn = []
let infectdrawn = []


drawn = playerdeck.pop()
console.log(drawn)

infectdrawn = infectdeck.pop()
UPDATE game SET playerdeck = `${playerDeck}`, 
infectdeck =`${infectDeck}`, discard = `${infectdrawn}` 
WHERE id = `${req.session.user_id};