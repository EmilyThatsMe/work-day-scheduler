// variables 
var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $schedule = $(".schedule");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

// task array
var taskArr = [];

// set up array 
function setArray(){

    // for each time block
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisHour = parseInt($thisBlock.attr("data-hour"));

        var taskObject = {
            hour: thisHour,
            text: "",
        }
        // add object to array
        taskArr.push(taskObject);
    });

    // save array to local storage
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    console.log(taskArr);

}

// set timeblock colors based on past, present, future
function setBlockColor(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisHour = parseInt($thisBlock.attr("data-hour"));

        // add styling based on day
        if (thisHour == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisHour < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisHour > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}