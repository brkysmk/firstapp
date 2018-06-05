var textField2;
function myKeyUpFunction(){
	if (event.type == "keyup") {
		var textField = document.querySelector("#text").value;
		if (textField != textField2) {
			textField2 = document.querySelector("#text").value;
			window.localStorage.setItem("invoer", textField2);
			console.log(document.querySelector("#text").value);
		}
	}
}
var element = document.querySelector("#text");
element.addEventListener("keyup", myKeyUpFunction);