// time variables

var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $schedule = $(".schedule");
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

// task array
var tasks = [];


// display schedule

function displaySchedule(){
    // load tasks
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);

    // determine data-hour
    for (var i = 0; i < tasks.length; i++){
        var hour = tasks[i].hour;
        var taskText = tasks[i].text;

        $("[data-hour =" + hour + "]").children("textarea").value(taskText);
    }

    console.log(tasks);
}


// save to local storage
localStorage.setItem("tasks", JSON.stringify(tasks));
