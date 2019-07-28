function settingsLaunch() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("settingsBTN");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
  modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
  modal.style.display = "none";
}

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var draggie = new Draggabilly('.modal');

  var startingHCPGrid = document.getElementById('TColor');
  startingHCPGrid.style.display = 'none';

  checkbox = document.getElementById('theToggle');
  checkbox.addEventListener('change', e => {
    if(e.target.checked){
        document.getElementById('currentCP').innerHTML = "Text Color";
        var sGrid = document.getElementById('TColor');
        var hGrid = document.getElementById('BGColor');
        sGrid.style.display = 'block';
        hGrid.style.display = 'none';
    }

    else {
      document.getElementById('currentCP').innerHTML = "Backgroud Color";
      var sGrid = document.getElementById('BGColor');
      var hGrid = document.getElementById('TColor');
      sGrid.style.display = 'block';
      hGrid.style.display = 'none';
    } // end else block
  }); // end checkbox event listener function.

  checkbox2 = document.getElementById('theTimeToggle');
  checkbox.addEventListener('change', e => {
    if(e.target.checked){
      changeTime();
    }

    else {
      
    } // end else block
  }); // end checkbox event listener function.

} // end settings launcher funciton
