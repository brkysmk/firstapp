function calculate(scherm) {
	if (scherm === "=") {
		ingevoerd = document.querySelector("#display").innerHTML;
		som = eval(ingevoerd);
		document.querySelector("#display").innerHTML = som;

	} else if (scherm === "C") {
		document.querySelector("#display").innerHTML = "";
	} else {
		document.querySelector("#display").innerHTML += scherm;
	}
	console.log(document.querySelector("#display"));
	console.log((scherm));
}
document.addEventListener("click", function() {
	calculate(event.target.textContent)
});
