// main () { ....
//declaring an array that contains all colors 
var allColorsArray = ["green", "red", "yellow", "blue"];
var  randomChosenArray = [];
var userChosenArray = [];

// when the game is not started yet. 
var level = 0; 

$("#level-title").text("press any key to start");
$(document).keypress(function(){
$("#level-title").text("Level "+ level);
nextLevel ();        
})

// step 2
//blick a button upon user click 
//and push the id of it to an array. 
// check if the entry is correct or not. 
$(".btn").click(function() {
    $(this).fadeOut().fadeIn();
    var userChosenColor = $(this).attr("id");
    userChosenArray.push(userChosenColor);
    playSound(userChosenColor);
    var current = (userChosenArray.length) - 1; 
    check(current); // this should compare each entry to randomChosenButton[], if no match... game over. else next level.
});


/////////////////////////////////////////////////////my functions//////////////////////////////////////////////////////////
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function blinkRandomButton(index) { 
    if (index >= level) { //the buttons will blink level numbers of time. 
        $(".wait-play").text("play now");
        return; // Stop when all buttons have blinked
    }
    
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenButton = allColorsArray[randomNumber];
    randomChosenArray.push(randomChosenButton);
    playSound(randomChosenButton);
    $(".wait-play").text("wait for your turn");
    $("#" + randomChosenButton).fadeOut().fadeIn(function () {
        setTimeout(function () {
            blinkRandomButton(index + 1); // Recursively call blinkRandomButton for the next button
        }, 200); // (0.2 second) delay between each blink
    });
}

function check(current) {
        if (userChosenArray[current] !== randomChosenArray[current]) {
            gameOver ();
            return;
        }
        else {
            if (userChosenArray.length === randomChosenArray.length) {
                userChosenArray = [];
                randomChosenArray = [];
                setTimeout(nextLevel, 1000); // nextLevel called. 
            }
    }

}

function nextLevel () {
    level++;
    $("#level-title").text("Level "+ level);
    $(".wait-play").css("visibility", "visible");
    randomChosenArray=[];
        setTimeout(blinkRandomButton, 500, 0);  // blinkRandomButton called.
}

function gameOver () {
    $("body").css("background-color", "red");
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();
    $(".btn").addClass("disabled");
    $(".wait-play").css("visibility", "hidden");
    $("#level-title").text("Game Over... press a key for re-game");
    $(document).keypress(playAgain);
}

function playAgain () {
    $("body").css("background-color", "black");
    $(".btn").removeClass("disabled");
    $(".wait-play").css("visibility", "visible");
    level = 0;
    userChosenArray = [];
    $("#level-title").text("Press any key to start"); // Reset the level title
    $(document).keypress(function () {
        $("#level-title").text("Level " + level);
        nextLevel();
    });
}