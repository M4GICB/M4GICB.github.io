"use strict";

function launch() {
  var textElem = document.getElementById("clocktext");
  var targetWidth = 0.9; // proportion offull screen targetWidth
  var curFontSize = 20;
  var milTime = false;

  function checkFormat(isMilitaryTimeBoolean) {
    if(!isMilitaryTimeBoolean) {milTime = true;}
    else {milTime = false;}
  } // end check format function

  function getClockText(isMilitaryTimeBoolean) {
    var d = new Date();

    var theTime = "";
    function twHR(time) {
      time += ((d.getHours() + 11) % 12 + 1) + ":";
      time += (10 > d.getMinutes() ? "0" : "") + d.getMinutes() + ":";
      time += (10 > d.getSeconds() ? "0" : "") + d.getSeconds() + "\u00A0";
      time += d.getHours() >= 12 ? "pm" : "am";
      theTime = time;
    } // end 12 hour time format function

    function tfHR(time) {
      time += d.getHours() + ":";
      time += (10 > d.getMinutes() ? "0" : "") + d.getMinutes() + ":";
      time += (10 > d.getSeconds() ? "0" : "") + d.getSeconds() + "\u00A0";
      theTime = time;
    } // end 24 hour time format function

    if(isMilitaryTimeBoolean) {tfHR("");}
    else if (!isMilitaryTimeBoolean) {twHR("");}
    else {theTime = "ERROR..."; alert("Unexpected Error... Please Refresh the Page...");}
    var finalTime = document.getElementById("time");
    finalTime.innerHTML = theTime;

    var clock = document.getElementById("clockText");

    var dayOfWeek = "";
    switch (d.getDay()) {
      case 0: dayOfWeek = "Sunday"; break;
      case 1: dayOfWeek = "Monday"; break;
      case 2: dayOfWeek = "Tuesday"; break;
      case 3: dayOfWeek = "Wednesday"; break;
      case 4: dayOfWeek = "Thursday"; break;
      case 5: dayOfWeek = "Friday"; break;
      case 6: dayOfWeek = "Saturday";
    } // end switch statement
    document.getElementById("day").innerHTML = dayOfWeek;

    var numOfMonth = d.getDate();

    var month = "";
    switch (d.getMonth()) {
      case 0: month = "January"; break;
      case 1: month = "February"; break;
      case 2: month = "March"; break;
      case 3: month = "April"; break;
      case 4: month = "May"; break;
      case 5: month = "June"; break;
      case 6: month = "July"; break;
      case 7: month = "August"; break;
      case 8: month = "September"; break;
      case 9: month = "October"; break;
      case 10: month = "November"; break;
      case 11: month = "Decemeber";
    } // end month switch statement

    var year = d.getFullYear();
    document.getElementById("date").innerHTML = month + " " + numOfMonth + ", " + year;
  } // end getClockText function

  document.getElementById("switch").addEventListener("click", changeTime);
  function changeTime() {
    checkFormat(milTime);
  } // end changeTime function

  // functionality of the slider within the settings menu
  var timeSlider = document.getElementById('theTimeToggle');
  timeSlider.addEventListener('change', e => {changeTime();});

  function updateClock() {
    document.getElementById("currentTimeFormat").innerHTML = (milTime) ? "Current Time Format: 24 HR" : "Current Time Format: 12 HR";
    getClockText(milTime);
    setTimeout(updateClock, 300);
  } // end updateClock function

  function updateTextSize() {
    for (var i = 0; 3 > i; i++) {
      curFontSize = 64;
      textElem.style.curFontSize = curFontSize + "pt";
    } // end for loop
  } // end updateTextSize function

  updateClock();
  updateTextSize();
  window.addEventListener("resize", updateTextSize);
}
