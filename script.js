
// localStorage.clear();

$(document).ready(function() {

    var chosenButton = "";

    var toDo = "";

    var matches = "";

    var newDay = "";

    var newMonth = "";

    var newYear = "";

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

    var loggedDay = JSON.parse(localStorage.getItem("Today's date"));

    var currentDay = (date.month + 1) + "/" + date.dayMonth + "/" + date.year;

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
        
        newDay = matches[2];
        
        newMonth = matches[1] - 1;
        
        newYear = matches[3];
        
        composedDate = new Date(newYear, newMonth, newDay);
        
        return composedDate.getDate() == newDay &&
                composedDate.getMonth() == newMonth &&
                composedDate.getFullYear() == newYear;
    }

    function changeAllShading(color) {

        for (k = 9; k < 18; k++) {

            $(`#${k}`).css("background-color", color);
    
        }

    }

    function changeDayShading() {

        for (j = date.hour; j > 8; j--) {

            $(`#${j}`).css("background-color", "rgb(70, 70, 70)");
    
        }
        
        $(`#${date.hour}`).css("background-color", "rgb(164, 45, 1)");

    }

    $("#date").text(weekday + ", " + date.longMonth[date.month] + " " + date.dayMonth);

    if (loggedDay !== currentDay) {

        changeAllShading("rgb(2, 120, 102)");

    }

    changeDayShading();

    localStorage.setItem("Today's date", JSON.stringify(currentDay));

    for (i = 9; i < 18; i++) {

        toDo = JSON.parse(localStorage.getItem(currentDay + ", " +  i));

        $("#" + i).text(toDo);

    }

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