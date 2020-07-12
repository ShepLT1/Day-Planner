// At end of script code, store current value for day variable in local storage.

// localStorage.clear();

$(document).ready(function() {

    // if local storage day variable does not equal current day variable, clear local storage & update textareas

    var chosenButton = "";

    var toDo = "";

    var today = new Date();

    var day = today.getDay();

    var dayMonth = today.getDate();

    var hour = today.getHours();

    var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekday = dayArr[day];

    // syntactic sugar
    // console.log(`this is day: ${weekday}`);

    var options = { 
        month: 'long'
    };

    var month = new Intl.DateTimeFormat('en-US', options).format(today);

    var loggedDay = JSON.parse(localStorage.getItem("Current day of month"));

    var loggedHour = JSON.parse(localStorage.getItem("Current hour"));

    $("#date").text(weekday + ", " + month + " " + dayMonth);

    // If last 2 digits of time are both 0, apply color theme (past times greyed out, current time in 1 color)

    // Save button on click, link that section's current text content to the section's data attribute (time) via an array of objects, stringify, and store in local storage

    if (loggedDay !== dayMonth) {

        localStorage.clear();

    }

    if (loggedHour !== hour) {

        for (j = hour; j > 8; j--) {

            $(`#${j}`).css("background-color", "grey");
    
        }

    }

    if (hour > 8 & hour < 18) {
    
        hour.css("background-color", "turquoise");

    }
;
    localStorage.setItem("Current day of month", JSON.stringify(dayMonth));

    localStorage.setItem("Current hour", JSON.stringify(hour));

    for (i = 9; i < 18; i++) {

        toDo = JSON.parse(localStorage.getItem(i));

        $("#" + i).text(toDo);

    }

    $("button").on("click", function() {

        chosenButton = $(this).attr("value");

        localStorage.setItem(chosenButton, JSON.stringify($("#" + chosenButton).val()));

    });

})