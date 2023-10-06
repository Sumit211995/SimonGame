// alert("Hello");


var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//keep track of whether if the game has started or not
var started = false;

var level = 0;
 
//jQuery to detect when a keyboard key has been pressed
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    //To check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      //play this sound if the user got one of the answers wrong.
      playSound("wrong");

      // In the styles file,  apply game-over class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence(){
    userClickedPattern = []; //reset the userClickedPattern to an empty array ready for the next level.

    level++;
    $("#level-title").text("Level " + level); //update the h1 with this change in the value of level.
    let randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    // audio.autoplay = "";
    // audio.muted ="false";
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed"); //Adding css

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed"); //Removing css
      }, 100);

}

function startOver() {

    //reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }