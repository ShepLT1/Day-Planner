// At end of script code, store current value for day variable in local storage.

// localStorage.clear();

$(document).ready(function() {

    // if local storage day variable does not equal current day variable, clear local storage & update textareas

    var chosenButton = "";

    var toDo = "";

    var dateChosen = "";

    var today = new Date();

    var date = {

        day: today.getDay(),
        dayMonth: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        hour: today.getHours(),
        longMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayArr: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    }

    var weekday = date.dayArr[date.day];

    console.log(date.dayMonth);

    // syntactic sugar
    // console.log(`this is day: ${weekday}`);

    var loggedDay = JSON.parse(localStorage.getItem("Current day of month"));

    var currentDay = (date.month + 1) + "/" + date.dayMonth + "/" + date.year;

    $("#date").text(weekday + ", " + date.longMonth[date.month] + " " + date.dayMonth);

    // If last 2 digits of time are both 0, apply color theme (past times greyed out, current time in 1 color)

    // Save button on click, link that section's current text content to the section's data attribute (time) via an array of objects, stringify, and store in local storage

    $( function() {
        $( "#datepicker" ).datepicker({
          showOn: "button",
          buttonImage: "calendar-icon.png",
          buttonImageOnly: true,
          buttonText: "Select date"
        });
    });

    // retrieved from https://stackoverflow.com/questions/276479/javascript-how-to-validate-dates-in-format-mm-dd-yyyy

    function isValidDate(date) {
    
    var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);

        if (matches == null) {
            
            return false

        };
    
    var d = matches[2];
    
    var m = matches[1] - 1;
    
    var y = matches[3];
    
    var composedDate = new Date(y, m, d);
    
    return composedDate.getDate() == d &&
            composedDate.getMonth() == m &&
            composedDate.getFullYear() == y;
    }

    if (loggedDay !== date.dayMonth) {

        localStorage.clear();

        for (k = 9; k < 18; k++) {

            $(`#${k}`).css("background-color", "tomato");
    
        }

    }

    for (j = date.hour; j > 8; j--) {

        $(`#${j}`).css("background-color", "grey");

    }
    
    $(`#${date.hour}`).css("background-color", "turquoise");

    localStorage.setItem("Current day of month", JSON.stringify(date.dayMonth));

    localStorage.setItem("Current hour", JSON.stringify(date.hour));

    for (i = 9; i < 18; i++) {

        toDo = JSON.parse(localStorage.getItem(i));

        $("#" + i).text(toDo);

    }

    $(".save-button").on("click", function() {

        chosenButton = $(this).attr("value");

        if (dateChosen === "") {

            localStorage.setItem(currentDay + ", " + chosenButton, JSON.stringify($("#" + chosenButton).val()));

        } else if (isValidDate(dateChosen)) {

            localStorage.setItem(dateChosen + ", " + chosenButton, JSON.stringify($("#" + chosenButton).val()));

        } else {

            alert("Please enter a valid date and click 'Find' or press'Enter'");

        }

    });

    $("form").on("submit", function(event) {

        event.preventDefault();

        dateChosen = $("#datepicker").val();

        if (isValidDate(dateChosen)) {;

            if (dateChosen.charAt(3) == 0) {

                dateChosen = dateChosen.slice(0, 3) + dateChosen.slice(4, dateChosen.length);

            }

            if (dateChosen.charAt(0) == 0) {

                dateChosen = dateChosen.substring(1);

            }

        } else {

            alert("Please enter a valid date and click 'Find' or press 'Enter'");

        }

    })

    console.log((date.month + 1) + "/" + date.dayMonth + "/" + date.year);

    console.log(today);

})