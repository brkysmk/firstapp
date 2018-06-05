// Manier 1

//function TikTak() {
//	var localStorage = window.localStorage.getItem("invoer");
//	document.querySelector("label").innerHTML = localStorage;
//}
//var intervalID = setInterval(TikTak, 1000);
//

// Manier 2:
window.addEventListener('storage', function(event) {  
	document.querySelector("label").innerHTML = event.newValue;
});