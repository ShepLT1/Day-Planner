
// localStorage.clear();

$(document).ready(function() {

    var chosenButton = "";

    var toDo = "";

    var matches = "";

    var d = "";

    var m = "";

    var y = "";

    var composedDate = "";

    var dateChosen = "";

    var chosenWeekday = "";

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

    // syntactic sugar
    // console.log(`this is day: ${weekday}`);

    var loggedDay = JSON.parse(localStorage.getItem("Current day of month"));

    var currentDay = (date.month + 1) + "/" + date.dayMonth + "/" + date.year;

    $("#date").text(weekday + ", " + date.longMonth[date.month] + " " + date.dayMonth);

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
    
        matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);

            if (matches == null) {
                
                return false

            };
        
        d = matches[2];
        
        m = matches[1] - 1;
        
        y = matches[3];
        
        composedDate = new Date(y, m, d);
        
        return composedDate.getDate() == d &&
                composedDate.getMonth() == m &&
                composedDate.getFullYear() == y;
    }

    if (loggedDay !== date.dayMonth) {

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

        toDo = JSON.parse(localStorage.getItem(currentDay + ", " +  i));

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

        if (isValidDate(dateChosen)) {

            // change textarea shading based on future/past date; can pull current month (if current month > chosenMonth then make all greyed out & opposite for current month < chosenMonth; if same month, set up if statements the same but sub days for months)

            if (d.charAt(0) == 0) {

                d = d.substring(1);

            }

            chosenWeekday = date.dayArr[composedDate.getDay()];

            $("#date").text(chosenWeekday + ", " + date.longMonth[m] + " " + d);

            dateChosen = (m + 1) + "/" + d + "/" + y;

            if (date.year > y) {

                for (k = 9; k < 18; k++) {

                    $(`#${k}`).css("background-color", "grey");
            
                }

            } else if (date.year < y) {

                for (k = 9; k < 18; k++) {

                    $(`#${k}`).css("background-color", "tomato");
            
                }

            } else if (date.year == y) {

                if (date.month > m) {

                    for (k = 9; k < 18; k++) {

                        $(`#${k}`).css("background-color", "grey");
                
                    }

                } else if (date.month < m) {

                    for (k = 9; k < 18; k++) {
    
                        $(`#${k}`).css("background-color", "tomato");
                
                    }

                } else if (date.month == m) {

                    if (date.dayMonth > d) {

                        for (k = 9; k < 18; k++) {

                            $(`#${k}`).css("background-color", "grey");
                    
                        }

                    } else if (date.dayMonth < d) {

                        for (k = 9; k < 18; k++) {
        
                            $(`#${k}`).css("background-color", "tomato");
                    
                        }
    
                    } else if (date.dayMonth == d) {

                        for (j = date.hour; j > 8; j--) {

                            $(`#${j}`).css("background-color", "grey");
                    
                        }

                    }

                }

            }

            for (n = 9; n < 18; n++) {

                toDo = JSON.parse(localStorage.getItem(dateChosen + ", " +  n));

                $("#" + n).text("");
        
                $("#" + n).text(toDo);
        
            }

        } else {

            alert("Please enter a valid date and click 'Find' or press 'Enter'");

        }

    });

})