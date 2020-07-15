
// Runs JS code once document html finishes loading
$(document).ready(function() {

    // Save button selected
    var chosenButton = "";

    // Textarea value
    var toDo = "";

    // Array to validate user date selected
    var matches = "";

    // Day of month selected by user
    var newDay = "";

    // Month selected by user
    var newMonth = "";

    // Year selected by user
    var newYear = "";

    // Date user selected
    var composedDate = "";

    // Reformatted user selected date
    var dateChosen = "";

    // Day of week of user selected date
    var chosenWeekday = "";

    // Today's date
    var today = new Date();

    // Date object for retrieving desired date attributes
    var date = {

        day: today.getDay(),
        dayMonth: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        hour: today.getHours(),
        longMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayArr: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    }

    // Today's day of week
    var weekday = date.dayArr[date.day];

    // Formats current day for local storage use
    var currentDay = (date.month + 1) + "/" + date.dayMonth + "/" + date.year;

    // Displays dropdown calendar on datepicker input field selection
    $( function() {
        $( "#datepicker" ).datepicker({
          showOn: "button",
          buttonImage: "calendar-icon.png",
          buttonImageOnly: true,
          buttonText: "Select date"
        });
    });

    // Validates & outputs user selected date; retrieved from https://stackoverflow.com/questions/276479/javascript-how-to-validate-dates-in-format-mm-dd-yyyy
    function isValidDate(date) {
    
        matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);

            if (matches == null) {
                
                return false

            };
        
        newDay = matches[2];
        
        newMonth = matches[1] - 1;
        
        newYear = matches[3];
        
        composedDate = new Date(newYear, newMonth, newDay);
        
        return composedDate.getDate() == newDay &&
                composedDate.getMonth() == newMonth &&
                composedDate.getFullYear() == newYear;
    }

    // Changes shading of text areas for every hour
    function changeAllShading(color) {

        for (k = 9; k < 18; k++) {

            $(`#${k}`).css("background-color", color);
    
        }

    }

    // Changes selected day shading based on past & current hours
    function changeDayShading() {

        for (j = date.hour; j > 8; j--) {

            $(`#${j}`).css("background-color", "rgb(70, 70, 70)");
    
        }
        
        $(`#${date.hour}`).css("background-color", "rgb(164, 45, 1)");

    }

    // Sets date currently viewing text equal to selected date
    $("#date").text(weekday + ", " + date.longMonth[date.month] + " " + date.dayMonth);

    // Calls on function to change today's shading based on current hour
    changeDayShading();

    // Retrieves today's scheduled items and displays in text areas
    for (i = 9; i < 18; i++) {

        toDo = JSON.parse(localStorage.getItem(currentDay + ", " +  i));

        $("#" + i).text(toDo);

    }

    // Stores value of text area associated with save button clicked & current/selected date in local storage
    $(".save-button").on("click", function() {

        chosenButton = $(this).attr("value");

        if (dateChosen === "") {

            localStorage.setItem(currentDay + ", " + chosenButton, JSON.stringify($("#" + chosenButton).val()));

        } else if (dateChosen) {

            localStorage.setItem(dateChosen + ", " + chosenButton, JSON.stringify($("#" + chosenButton).val()));

        } else {

            alert("Please enter a valid date");

        }

    });

    // On date selecttion, validates date. If date valid, formats selected date to local-storage-friendly format, displays selected date above schedule, changes shading of schedule based on past, current, future, and updates text areas with associated saved values from local storage.
    $("#datepicker").datepicker({

        onSelect: function(dateText, inst) {

            dateChosen = $("#datepicker").val();

            if (isValidDate(dateChosen)) {

                if (newDay.charAt(0) == 0) {

                    newDay = newDay.substring(1);

                }

                chosenWeekday = date.dayArr[composedDate.getDay()];

                $("#date").text(chosenWeekday + ", " + date.longMonth[newMonth] + " " + newDay);

                dateChosen = (newMonth + 1) + "/" + newDay + "/" + newYear;

                if (date.year > newYear) {

                    changeAllShading("rgb(70, 70, 70)");

                } else if (date.year < newYear) {

                    changeAllShading("rgb(2, 120, 102)");

                } else if (date.year == newYear) {

                    if (date.month > newMonth) {

                        changeAllShading("rgb(70, 70, 70)");

                    } else if (date.month < newMonth) {

                        changeAllShading("rgb(2, 120, 102)");

                    } else if (date.month == newMonth) {

                        if (date.dayMonth > newDay) {

                            changeAllShading("rgb(70, 70, 70)");

                        } else if (date.dayMonth < newDay) {

                            changeAllShading("rgb(2, 120, 102)");
        
                        } else if (date.dayMonth == newDay) {

                            changeAllShading("rgb(2, 120, 102)");

                            changeDayShading();

                        }

                    }

                }

                for (n = 9; n < 18; n++) {

                    toDo = JSON.parse(localStorage.getItem(dateChosen + ", " +  n));
            
                    $("#" + n).val(toDo);
            
                }

            } else {

                alert("Please enter a valid date");

            }

        }

    });

})