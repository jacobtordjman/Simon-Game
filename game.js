var buttonColours = ["yellow", "blue", "red", "green"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    animatePress(randomChosenColour)
    // console.log(gamePattern[level-1])
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            $("body").addClass("round-over")
            setTimeout(function(){$("body").removeClass("round-over")},200)
            setTimeout(function(){nextSequence()},1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")},200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern=[]
    started = false
}

$(document).on('keydown', function(event) {
if(!started){
    started = true
    $("#level-title").text("Level " + level);
    nextSequence()
    $(document).off('keypress');
}})

$(".btn").on("click", function(){
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
    // console.log(userClickedPattern[lastIndex])
})