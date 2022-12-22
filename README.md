#FOR RUNNING
BACKEND =>
    first move to the backend folder
    npm install
    npm run dev

FRONTEND => 
    first move to the frontend folder
    npm install
    npm run dev



#Logical explanation
   1. Here the basic logic is to maintain the moves array in       database and after every submit of move cheking the who is winner.
   2. winner property in my case have 3 property pending,win/lose,draw on the basis of that displaying the desire result.


#Assumption
    The owner of game always have move x.
    The oppenent can not make move till owner not make move.
    Any body can not add any invalid player.
    Any one can not play game with him self.


#Problem which i faced
    |-> Difficulty to maintaining the move.
    |-> let suppose user mistakly choose a box where he/she dont want to place move to doing it undo is very defficult part for me to implement
    |-> Maintaining the game winner status.
