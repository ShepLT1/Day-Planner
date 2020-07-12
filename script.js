// At end of script code, store current value for day variable in local storage.

// localStorage.clear();

$(document).ready(function() {

    // if local storage day variable does not equal current day variable, clear local storage & update textareas

    var chosenButton = "";

    var toDo = "";

    var today = new Date();

    var day = today.getDay();

    var dayMonth = today.getDate();

    var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekday = dayArr[day];

    // syntactic sugar
    // console.log(`this is day: ${weekday}`);

    var options = { 
        month: 'long'
    };

    var month = new Intl.DateTimeFormat('en-US', options).format(today);

    $("#date").text(weekday + ", " + month + " " + dayMonth);

    // If last 2 digits of time are both 0, apply color theme (past times greyed out, current time in 1 color)

    // Save button on click, link that section's current text content to the section's data attribute (time) via an array of objects, stringify, and store in local storage


    for (i = 9; i < 13; i++) {

        toDo = JSON.parse(localStorage.getItem(i));

        $("#" + i).text(toDo);

    }

    for (j = 1; j < 6; j++) {

        toDo = JSON.parse(localStorage.getItem(j));

        $("#" + j).text(toDo);

    }

    $("button").on("click", function() {

        chosenButton = $(this).attr("value");

        localStorage.setItem(chosenButton, JSON.stringify($("#" + chosenButton).val()));

    });

})