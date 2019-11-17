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
  } // end for loop
  // console.log(currentDaysCellIDs);

  /* process to turn the empty cells grey and fill in the previous (or next) month's numbers*/
  tDate.setDate(1); // sets date to 1 to start the process
  var gDay = tDate.getDay() - 1; // sets first grey cell's day to the one before the first day in the month
  var gMonthPrev = tMonth - 1; // gets the previous month (previous month in correspondence to current table month)
  var gMonthNext = tMonth + 1; // gets the next month (next month in correspondence to current table month)

  var daysInPrevMonth = days_in_month[gMonthPrev]; // gets the number of days in the previous month

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










/***************************************************************************************************************************************************/
/***************************************************************************************************************************************************/
/***************************************************************************************************************************************************/


function getCellID(cell) {
    // if(cell.id != "") {console.log(cell.id);}
} // end getCellID function


function mOver(cID) {
  var theID = document.getElementById(cID);
  theID.style.backgroundColor = "red";
} // end mOver function

/* This is a test function to add rows to a table at the click of a button */
function testFunction(){

  // prompts the user for what they want to add to the test event list below the calendar
  var anr = prompt("What event do you want to add?");

  /* Data input validation if block
   * Does not create a new empty row
   * if user cancels the request or
   * enters a blank line. */
  if(anr != null && anr.length>0) {
    var valid = false; // initializes a boolean
    for (var i = 0; i < anr.length; i++) { // for loop checks the full string
      if(anr.charAt(i) != ' ') {valid = true; break;} // breaks the loop if bool is true
    } // end for loop

    if(valid){ // if the bool eventually turns true...
      var table = document.getElementById('Schedule'); // gets the test table of events
      var newRow = table.insertRow(table.length); // adds a new row to the test table
      var newCell1 = newRow.insertCell(0); // creates a new cell for that new row
      newCell1.innerHTML = anr; // puts the user's input into the new cell
    } // end nested if
  } // end if
} // END testFunction


// there are 42 cells
function determineCell2(row, col) {
  /* ROW 0 */
  if(row==0 && col==0) {return "RC00";}
  else if(row==0 && col==1) {return "RC01";}
  else if(row==0 && col==2) {return "RC02";}
  else if(row==0 && col==3) {return "RC03";}
  else if(row==0 && col==4) {return "RC04";}
  else if(row==0 && col==5) {return "RC05";}
  else if(row==0 && col==6) {return "RC06";}
  /* ROW 1 */
  else if(row==1 && col==0) {return "RC00";}
  else if(row==1 && col==1) {return "RC01";}
  else if(row==1 && col==2) {return "RC02";}
  else if(row==1 && col==3) {return "RC03";}
  else if(row==1 && col==4) {return "RC04";}
  else if(row==1 && col==5) {return "RC05";}
  else if(row==1 && col==6) {return "RC06";}

  /* ROW 2 */
  else if(row==2 && col==0) {return "RC00";}
  else if(row==2 && col==1) {return "RC00";}
  else if(row==2 && col==2) {return "RC00";}
  else if(row==2 && col==3) {return "RC00";}
  else if(row==2 && col==4) {return "RC00";}
  else if(row==2 && col==5) {return "RC00";}
  else if(row==2 && col==6) {return "RC00";}

  /* ROW 3 */
  else if(row==3 && col==0) {return "RC00";}
  else if(row==3 && col==1) {return "RC00";}
  else if(row==3 && col==2) {return "RC00";}
  else if(row==3 && col==3) {return "RC00";}
  else if(row==3 && col==4) {return "RC00";}
  else if(row==3 && col==5) {return "RC00";}
  else if(row==3 && col==6) {return "RC00";}

  /* ROW 4 */
  else if(row==4 && col==0) {return "RC00";}
  else if(row==4 && col==1) {return "RC00";}
  else if(row==4 && col==2) {return "RC00";}
  else if(row==4 && col==3) {return "RC00";}
  else if(row==4 && col==4) {return "RC00";}
  else if(row==4 && col==5) {return "RC00";}
  else if(row==4 && col==6) {return "RC00";}
  else if(row==4 && col==0) {return "RC00";}

  /* ROW 5 */
  else if(row==5 && col==1) {return "RC00";}
  else if(row==5 && col==2) {return "RC00";}
  else if(row==5 && col==3) {return "RC00";}
  else if(row==5 && col==4) {return "RC00";}
  else if(row==5 && col==5) {return "RC00";}
  else if(row==5 && col==6) {return "RC00";}
} // end determineCell funciton

function detRow(row) {return row;}
function detCol(col) {return col;}
/***************************************************************************************************************************************************/
/***************************************************************************************************************************************************/
/***************************************************************************************************************************************************/
