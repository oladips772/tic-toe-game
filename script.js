// selecting required selectors
const selectBox = document.querySelector(".select-playbox"),
 selectXBtn = document.querySelector(".playerX"),
 selectOBtn = document.querySelector(".playerO"),
 playboard = document.querySelector(".play-board"),
 allBox = document.querySelectorAll("section span"),
 players = document.querySelector(".players"),
 resultBox = document.querySelector(".result-box"),
 wonText = document.querySelector(".won-text"),
 replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //once window loads...
        for (let i = 0; i < allBox.length; i++){   // add onclick attribute to all selected span
               allBox[i].setAttribute("onclick", "clickedBox(this)");
        }
    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the selectBox when clicked by player x
        playboard.classList.add("show");// show playboard when a button is clicked
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide"); //hide the selectBox when clicked when clicked by player O
        playboard.classList.add("show");// show playboard when a button is clicked
        players.setAttribute("class", "players active player");  // adding three class names in player element 
    }
}
 
let playerXIcon = "X";   /// font awesome class name for cross icon
let playerOIcon = "O"; /// font awesome class name for circle icon 
let playerSign = "X";  /// suppose player will be x
let runBot = "true";

// user click function

function clickedBox(element){
    // console.log(element);
   if(players.classList.contains("player")){
       element.innerHTML = "O";  /// adding circle icon for player O
       players.classList.add("active");
      // if player will be o then we will change the sign 
       playerSign = "O"
       element.setAttribute("id",playerSign);
       playboard.style.pointerEvents = "none"; /// once user select the he cant selct any box
       element.style.pointerEvents = "none";  //// box cannot be clicked agin after clicked once 
   }else{
       element.innerHTML = "X";    /// adding  cross for player X  
       players.classList.add("active");
       element.setAttribute("id",playerSign);
       playboard.style.pointerEvents = "none"; /// once user select the he cant selct any box
       element.style.pointerEvents = "none";  //// box cannot be clicked agin after clicked once 
   }
   selectWinner(); // calling the winner function
   playboard.style.pointerEvents = "none"; /// once user select the he cant selct any box
   element.style.pointerEvents = "none";  //// box cannot be clicked agin after clicked once 
   let randomDelayTime = ((Math.random()* 1000) + 200).toFixed(); /// generating random time to delay
   setTimeout(()=>{
       bot(runBot); /// calling bot function
   }, randomDelayTime); /// passing random time 
}
// bot click function
function bot(runBot){
    /// change the user sign
   if (runBot) {
    playerSign = "O";
    let array =[];  /// creating an empty array
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0){   /// if span has no child element
            array.push(i);  /// inserting unselected boxes inside array
            // console.log(i + " " + "has no children");
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];  //// get random box from array so bot will select random box
    if(array.length > 0){
        if(players.classList.contains("player")){
        allBox[randomBox].innerHTML = "X";  /// adding cross icon for player x
        players.classList.remove("active");
        /// if user is o then box id will be x
        playerSign = "X"
        allBox[randomBox].setAttribute("id", playerSign);
     }else{
        allBox[randomBox].innerHTML = "O";    /// adding  circle for player o  
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner(); // calling the winner function
    }
   allBox[randomBox].style.pointerEvents = "none";
   playboard.style.pointerEvents = "auto";
   playerSign = "X"; /// passing the x value
   }
}


//lets work on winner message
function getClass(idname){
    return document.querySelector(".box" + idname).id; // returning id name 
}

function checkClass(val1, val2, val3, sign){
   if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign ){
     return true;
   }
}

function selectWinner(){ /// if one of them match then select winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(6,7,8,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
       console.log(playerSign + " " + "is the winner");
       runBot = false;
       bot(runBot);
       setTimeout(()=>{ /// we will delay to show result box
          playboard.classList.remove("show");
          resultBox.classList.add("show");
       }, 700);   /// 700 ms time
       wonText.innerHTML = `player <p>${playerSign}</p> won the game!`;
    }else{
        // if match has been drawn

        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{ /// we will delay to show result box
            playboard.classList.remove("show");
            resultBox.classList.add("show");
       }, 700);   /// 700 ms time
       wonText.textContent = `Match has been drawn!`;
        } 
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); /// window should reload and game starts all over again
}