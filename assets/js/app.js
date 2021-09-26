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

// display tasks on schedule
function displaySchedule() {
    taskArr = localStorage.getItem("tasks");
    taskArr = JSON.parse(taskArr)

    // assign text to timeblock
    for (var i = 0; i < taskArr.length; i++) {
        var taskHour = taskArr[i].hour;
        var taskText = taskArr[i].text;

        $("[data-hour=" + taskHour + "]").children("textarea").val(taskText);
    }
    console.log(taskArr);
}

// save schedule to local storage
function saveSchedule(){

    var updateHour = $(this).parent().attr("data-hour");
    var addTask = (($(this).parent()).children("textarea")).val();

    // loop through  tasks to see if it needs updating based on hour
    for (var i = 0; i < taskArr.length; i++) {
        if(taskArr[i].hour == updateHour){
            taskArr[i].text = addTask;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    displaySchedule();
}

// load schedule
$(document).ready(function(){
    setBlockColor();
    if(!localStorage.getItem("tasks")){
        setArray();
    }
    // show current day
    $currentDay.text(currentDate);
    // render schedule
    displaySchedule();
    // save schedule on click
    $schedule.on("click", "button", saveSchedule);
});