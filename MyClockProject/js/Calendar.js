/***************************************************************************************************************************************************/
/* SET OF GLOBAL VARIABLES TO STORE CURRENT DATE, LIST OF MONTHS, MONTH LENGTHS, DAYS OF THE WEEK AND CELL OBJECTS */

/* Making new date to keep track of the CURRENT date not the table's date */
var DATE = new Date();
var day = DATE.getDate();
var month = DATE.getMonth();
var year = DATE.getFullYear();

/* Array to store the names of the months */
var months = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

/* Array to store number of days in each month  */
var days_in_month = [31,28,31,30,31,30,31,31,30,31,30,31]; // number of days in each month
if(year%4 == 0 && year!=1900) {days_in_month[1]=29;} // leap year control

/* Array to store the names if the days */
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* Today's date */
var date_today = days[DATE.getDay()] + ', ' + months[month] + ' ' + day + ', ' + year;
// console.log("Today's Date: " + date_today);

/* Array to store the object created for each cell */
var cellObjs = new Array();

var viewingDate = new Date();
var viewingMonth = viewingDate.getMonth();
var viewingYear = viewingDate.getFullYear();

/* END GLOBAL VARIABLES SECTION */
/***************************************************************************************************************************************************/


/***************************************************************************************************************************************************/
/* BUILDS CALENDAR UPON LOADING THE PAGE */
window.onload = makeCalendar();
/***************************************************************************************************************************************************/

/* Function to build the calendar */
function makeCalendar() {

  /* represents the row of the calendar that the number goes in. */
  var rowNum = 0;

  /* makes new date to be used for creating the table and keeping track of the TABLE'S date, not the current date */
  var tDate = new Date(); //viewingDate;
  var tDay = tDate.getDay(); // gets the day of the week (0-6)
  var dayOfMonth = tDate.getDate(); // gets the number day of the month (SAME AS i+1)

  tDate.setMonth(viewingMonth);
  tDate.setFullYear(viewingYear);

  var tMonth = tDate.getMonth();
  var tTotal = days_in_month[tMonth]; // total days in the current month

  var currentDaysCellIDs = []; // a list of colored cell IDs to be used for later access. Initialized to an empty array

  /* for loop to put the numbers of the calendar into the correct cell */
  for(var i = 0; i < tTotal; i++) {

    // tDate.setMonth(8); // comment and uncomment this line to manually change the viewing month

    tDate.setDate(i+1); // sets the date to i + 1 (initializes at 1)
    tDay = tDate.getDay(); // gets the day of the week (0-6)
    dayOfMonth = tDate.getDate(); // gets the number day of the month (SAME AS i+1)
    tMonth = tDate.getMonth();

    /* Set the Month header row for the calendar */
    var currentMonth = document.getElementById("MonthRow");
    currentMonth.innerHTML = '<th id="MonthRow">' + months[viewingMonth] + " " + viewingYear + '</th>';

    var cellID = determineCell(rowNum, tDay); // gets the cell's id
    currentDaysCellIDs.push(cellID); // adds the current day cell IDs to the list of colored cell IDs to be accessed later
    var cell = document.getElementById(cellID); // targets the cell
    cell.innerHTML = '<td id=' + cell + '>' + (i+1) + '</td>'; // puts the number in the cell
    cell.style.backgroundColor = "lightcyan";
    if(((tDay+1) % 7) == 0) {rowNum++;} // if the day of the week is divisible by 7, start a new week thus a new row

    /* If block to find the current date durring the main calendar creation for loop iteration and set its cell's color to stand out */
    if(i+1 == day){ // if the day the loop is on matches the current date
      if(viewingMonth == month) { // if the viewing month the calendar is building for matches the current date's month
        if(viewingYear == year) {cell.style.backgroundColor = "#E77471";} // if the viewing year the calendar is building for matches the current date's year
      } // end if block for checking current month to viewing month
    } // end main if block for checking today's date to iteration date
  } // end for loop
  // console.log(currentDaysCellIDs);

  /* process to turn the empty cells grey and fill in the previous (or next) month's numbers*/
  tDate.setDate(1); // sets date to 1 to start the process
  var gDay = tDate.getDay() - 1; // sets first grey cell's day to the one before the first day in the month
  var gMonthPrev = tMonth - 1; // gets the previous month (previous month in correspondence to current table month)
  var gMonthNext = tMonth + 1; // gets the next month (next month in correspondence to current table month)

  var daysInPrevMonth = days_in_month[gMonthPrev]; // gets the number of days in the previous month
  if(viewingMonth == 0){daysInPrevMonth = 31;} // if the month is january, then the previous month (december from the previous year) has 31 days
                                               // this is a nessesary line because with out it, there is a NaN or an undefined bug.
                                               // It is unable to go to a previous month from a previous year AKA going to december form January
                                               // This is a specific edge case.

  var gCellIDList = []; // a list of grey cell IDs to be used for later access. Initialized to an empty array
  /* for loop to place the correct number into the empty cells at the start of the table and to turn the cells grey */
  for(var i = gDay; i >= 0; i--) { // i is set to the number of the day of the week that is right before the first day of the month and decrements
    var gCellID = determineCell(0, i); // gets the id of the empty cell in row 0 and column i
    gCellIDList.push(gCellID); // adds the start grey cell IDs to the list of grey cell IDs to be accessed later
    var gCell = document.getElementById(gCellID); // targets the cell using the recently aquired id
    gCell.innerHTML = '<td id=' + gCellID + '>' + daysInPrevMonth + '</td>'; // sets the month number for the cell
    gCell.style.backgroundColor = "#b6b5b3"; // sets the background color to grey
    daysInPrevMonth--; // decrements days in previous month to have the next correct number ready for the next iteration of the loop
  } // end for loop

  tDate.setDate(days_in_month[tMonth]); // sets the date to the last day in the table's month
  var gDayEnd = tDate.getDay() + 1; // sets the grey day at the end of the month's day of the week  to the day after the month's last day
  if(gDayEnd == 7) {gDayEnd = 0;} // if the last day of the month is Sunday, set the grey day to Monday
  var nextMonthGNum = 1; // sets the number of the day of the month for the next month

  /* for loop to place the correct number into the empty cells at the end of the table and to turn the cells grey */
  for(var i = gDayEnd; i < 7; i++) { // i is set to the number of the day of the week that is right after the last day of the month and increments
    var gEndCellID = determineCell(rowNum, i); // gets the id of the empty cell in the last used row of the table so far and column i
    gCellIDList.push(gEndCellID); // adds the end grey cell IDs to the list of grey cell IDs to be accessed later
    var gEndCell = document.getElementById(gEndCellID); // targets the cell using the recently aquired id
    gEndCell.innerHTML = '<td id=' + gEndCellID + '>' + nextMonthGNum + '</td>'; // sets the month number for the cell
    gEndCell.style.backgroundColor = "#b6b5b3"; // sets the background color to grey
    nextMonthGNum++; // increments the number for the day in the next month to have the next correct number ready for the next iteration of the loop
    if(rowNum < 5 && i==6) {rowNum++; i = -1;} // if the table is not full yet but the loop has ended, set i to -1 so that it gets incremented to 0
                                               // this will restart the loop and continue to fill out the table without causing an infinitie loop
                                               // checking if the row num is less than 5 checks if the process is on the final row of the table
  } // end for loop
  // console.log(gCellIDList);
  cellsAreButtons(); // turns ever cell in the table into a clickable button
  createCellObjs(cellObjs, tMonth); // creates an object for every cell of the table.
} // end makeCalendar function

/***************************************************************************************************************************************************/
/* Gets the cell's id given the cell's row and column */
function determineCell(row, col) {return "RC" + row + col}
/***************************************************************************************************************************************************/

/* "Cells Are Clickable" Functions Section */
/***************************************************************************************************************************************************/

/* Function for turning each cell into a clickable button */
function cellsAreButtons(){
  var table = document.getElementById("CalendarTable"); // gets the calendar table
  if (table != null) { // if the table is not empty

      /* for loop to iterate through the table's rows */
      for (var i = 0; i < table.rows.length; i++) { // i represents the row number

          /* nested for loop to iterate through the cells of the current row */
          for (var j = 0; j < table.rows[i].cells.length; j++) // j represents the column number
              /* if the current cell is clicked, run the clickCell function for the current cell */
              table.rows[i].cells[j].onclick = // gets the cell and sets the onclick property
                function () { // creates the function for the cell's onclick property
                  clickCell(this); // when the cell is clicked run the clickCell function interms of the current cell
                }; // end function call for onclick
      } // end inner for loop
  } // end outer for loop
} // end cellsAreButtons function

/* Function for telling the website what to do when the cell is clicked */
function clickCell(cell) {
  // console.log(cell.id); // prints the cell's id to the console (USED FOR TESTING PURPOSES)

    /* if case to say "if a cell that is not a date is clicked, do nothing" */
    if(cell.id != "") { // if the cell DOES  have an id (this should only apply to date cells)
      var cellIdRowNum = parseInt(cell.id.charAt(2)); // get the cell's row number in number form based on the id
      var cellIdColNum = parseInt(cell.id.charAt(3)); // get the cell's column number in number form based on the id
      var min = cellIdRowNum * 7; // cells in the cellObj array are labeled by a number 0 through 42.
                                  // it is based off of when they were added to the array.
                                  // min gets the smallest number that that label can be
      var max = min + 6; // max is the same concept as min but it is the biggest number instead.
                        // max is not used yet but is saved for future iterations just in case.
      var arrNum = min + cellIdColNum; // the cell's label should be the smallest value plus its column number.
                                       // this gets that label and stores the number to be used to access the cell object.
      cellObjs[arrNum].greeting(); // gets the cell from the cellObjs array and calls the cell's greeting function
    } // end if block
} // end clickCell function
/***************************************************************************************************************************************************/

/* Cell Objects Section */
/***************************************************************************************************************************************************/

/* Function (aka the class) for makeing an object for a cell given the cell and the month that the cell should belong to */
function CellObj(cellID, cellMonth) {

  this.name = cellID; // sets the cell's name to its id
  this.day = document.getElementById(cellID).innerHTML; // sets the cell's day to the number that is written in the cell
  this.month = months[cellMonth]; // sets the cells month to the month that it should belong to


  var idRowNum = parseInt(this.name.charAt(2)); // gets the third character of the cellID and converts it to a number to get the cell's row number

  var numDate = parseInt(this.day); // converts the cell's day of the month from a string into a number value
  if(idRowNum == 0) { // if the 3rd character in the cell's id is a zero. this checks if the cell is in the first row of the table
    if(numDate < 8) {this.month = months[cellMonth];} // if the numDate is less than 8, set the month to the month passed to the Function
                                                      // checking this checks if the cell is apart of the table's current month or previous month
    else {this.month = months[cellMonth-1];} // if the date the 8 or bigger AND in the first row, it means that it must belong to the previous month
  } // end if block for determining the month of the cell if it is in the first row

  else { // else block to determine the month if the cell is not in the first row
    if(idRowNum >= 4) { // if the 3rd character in the cell's id is a 4 or 5. this checks if the cell is in the last 2 rows of the table
      if(numDate >= 13) {this.month = months[cellMonth];} // if the date is at least 13 AND in the last 2 rows, the cell belongs to to current month
      else {this.month = months[cellMonth + 1];} // if the date is less than 12 AND in the last 2 rows, the cell belongs to the next month
    } // end nested if block for checking if the cell is in the last 2 rows
    else {this.month = months[cellMonth];} // if the cell is not in one of the last 2 rows, then it belongs to the current month
  } // end else block for determining the month of the cell if it is not in the first row

  this.cellDate = this.month + " " + this.day; // sets the date of the cell using the number date and the month that was determined.

  /* a function to print the cell's date to the console. (USED FOR TESTING PURPOSES.) */
  this.greeting = function() {
    // console.log('Day of Month: ' + this.day); // prints the cell's day of the month
    // console.log('Date: ' + this.cellDate); // prints the cell's date
    // console.log("---"); // prints a line break
  }; // end greeting function
} // end CellObj class

/* Function to create an object for each calendar cell (excluding days of the week and the month) and push them to an array */
function createCellObjs(cellObjsArr, currentViewingMonth) {

  /* array of all of the cells in the table (table data not headers)
   * td vs th keeps the top row of days of the week cells out of the equation */
  var allCells = document.getElementsByTagName("td");

  /* for loop to create the cell objects and add them to the array */
  for (var i=0; i < allCells.length; i++) { // iterate's through every cell on the page
    var cell = allCells[i]; // variable to get the current cell in the iteraion
    if(cell.id != "") { // if the cell's id is not null (this will need to be changed if new cells or tables are introduced.)
      cellObjsArr.push(new CellObj(cell.id, currentViewingMonth)); // make a new object for the cell and push it to the list
    } // end if block for checking the cell's id
  } // end for loop for iterating through all cells
} // end createCellObjs function

/***************************************************************************************************************************************************/

/* Next Month, Previous Month, and Today Buttons section*/
/***************************************************************************************************************************************************/

/* Button functionality for going to the next month */
function goToNextMonth() {
  if(viewingMonth == 11) {viewingMonth = 0; viewingDate.setFullYear(viewingDate.getFullYear() + 1); viewingYear = viewingYear + 1;}
  else {viewingMonth = viewingMonth+1;} // changes the current viewing month to the next month
  if(viewingYear%4 == 0 && year!=1900) {days_in_month[1]=29;} // leap year control
  else{days_in_month[1]=28;} // non leap year control
  makeCalendar(); // rebuilds the calendar and re creates the data of each cell
  var newCellObjs = new Array(); // makes a new list to hold the new Cell Objects
  createCellObjs(newCellObjs, viewingMonth); // makes the new cell objects based off of their newly created information
  cellObjs = newCellObjs; // sets the list of cell objects equal to the new list
  // console.log("The month currently being viewed is:    " + months[viewingMonth]);
} // end goToNextMonth function

/* Button functionality for going to the previous month */
function goToPrevMonth() {
  if(viewingMonth == 0) {viewingMonth = 11; viewingDate.setFullYear(viewingDate.getFullYear() - 1); viewingYear = viewingYear - 1;}
  else {viewingMonth = viewingMonth-1;} // changes the current viewing month to the previous month
  if(viewingYear%4 == 0 && year!=1900) {days_in_month[1]=29;} // leap year control
  else{days_in_month[1]=28;} // non leap year control
  makeCalendar(); // rebuilds the calendar and re creates the data of each cell
  var newCellObjs = new Array(); // makes a new list to hold the new Cell Objects
  createCellObjs(newCellObjs, viewingMonth); // makes the new cell objects based off of their newly created information
  cellObjs = newCellObjs; // sets the list of cell objects equal to the new list
  // console.log("The month currently being viewed is:    " + months[viewingMonth]);
} // end goToPrevMonth function

/* Button functionality for going to the current month */
function goToToday() {
  var d2 = new Date(); // creates a new date object to reflect the current month without updateing the offical date object
  viewingMonth = d2.getMonth(); // changes the current viewing month to the current month
  viewingYear = d2.getFullYear(); // changes the current viewing year to the current year
  if(viewingYear%4 == 0 && year!=1900) {days_in_month[1]=29;} // leap year control
  else{days_in_month[1]=28;} // non leap year control
  makeCalendar(); // rebuilds the calendar and re creates the data of each cell
  var newCellObjs = new Array(); // makes a new list to hold the new Cell Objects
  createCellObjs(newCellObjs, viewingMonth); // makes the new cell objects based off of their newly created information
  cellObjs = newCellObjs; // sets the list of cell objects equal to the new list
  // console.log("Today's Date: " + date_today);
} // end goToToday function

/***************************************************************************************************************************************************/
