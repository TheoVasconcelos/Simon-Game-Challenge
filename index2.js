var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {

    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }

    console.log(level);
});


$(".btn").click( function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animmatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {

    userClickedPattern = [];
    
   level++;
   $("h1").text("Level " + level);
    
   var randomNumber  = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   
   playSound(randomChosenColour);
};

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
};

function animmatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed")
    }, 100);
};

// function checkAnswer(currentLevel) {
//     if(currentLevel === gamePattern[gamePattern.length - 1]) {
//         console.log("Correct!");
//         alert("Correct!");
//         nextSequence();
//     } else {
//         console.log("Wrong!");
//         alert("Wrong!");
//     }
// };


// function checkAnswer(currentLevel) {
//     if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

//         console.log("Correct!");

//         if(userClickedPattern.length === gamePattern.length) {
        
//         setTimeout(() => {
//             nextSequence();
//         }, 1000);

//         } else {
//             console.log("Wrong!");

//             $(body).addClass("game-over");

//             setTimeout(() => {
//                 $("body").removeClass("game-over");
//             }, 200);
//         }
//     }


// };

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      $("body").addClass("game-over");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart")

      startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}