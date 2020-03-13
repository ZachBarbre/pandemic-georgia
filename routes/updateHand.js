
//needs to be updated with how we are keeping track of player turn
function updatehand(){
    UPDATE game SET playerhand = player${}hand
     WHERE id = user_id
}