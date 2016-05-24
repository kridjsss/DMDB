
//Get the modal
var modal = document.getElementById('modal01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayChartModal(element) {
	  document.getElementById("img01").innerHTML = element.innerHTML;
	  document.getElementById("modal01").style.display = "block";
}