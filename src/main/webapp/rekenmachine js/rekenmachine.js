var laatsteResultaat;
var tweedeResultaat;
var filledInOperator = "";
var displayText = "0";
var answerGiven = false;

function displayCheck() {
	if(displayText == "0" || filledInOperator != "" || answerGiven == true) {
		displayText = "";
		answerGiven = false;
	}
}

function getDisplayText() {
	return parseInt(document.getElementById("display").innerHTML);
}

function clear() {
	laatsteResultaat = "";
	filledInOperator = "";
	answerGiven = true;
}

function changeText(id) {
	if(id != "btn_0") {
		displayCheck();
	}
	
	if(id == "btn_7") {
		displayText += "7";
	}
	else if(id == "btn_8") {
		displayText += "8";
	}
	else if(id == "btn_9") {
		displayText += "9";
	}
	else if(id == "btn_div") {// /
		laatsteResultaat = displayText;
		filledInOperator = "/";
	}
	else if(id == "btn_4") {
		displayText += "4";
	}
	else if(id == "btn_5") {
		displayText += "5";
	}
	else if(id == "btn_6") {
		displayText += "6";
	}
	else if(id == "btn_prod") {//*
		laatsteResultaat = displayText;
		filledInOperator = "*";
	}
	else if(id == "btn_1") {
		displayText += "1";
	}
	else if(id == "btn_2") {
		displayText += "2";
	}
	else if(id == "btn_3") {
		displayText += "3";
	}
	else if(id == "btn_min") {//-
		laatsteResultaat = displayText;
		filledInOperator = "-";
	}
	else if(id == "btn_clear") {//C
		displayText = "0";
		clear();
	}
	else if(id == "btn_0") {
		if(getDisplayText() != 0) {
			displayText += "0";
		}
	}
	else if(id == "btn_eq") {//=
		//console.log("dt: " + getDisplayText());
		if(filledInOperator == "-") {
			displayText = (parseInt(laatsteResultaat) - getDisplayText());
		}
		else if(filledInOperator == "+") {
			displayText = (parseInt(laatsteResultaat) + getDisplayText());
		}
		else if(filledInOperator == "*") {
			displayText = (parseInt(laatsteResultaat) * getDisplayText());
		}
		else if(filledInOperator == "/") {
			displayText = (parseInt(laatsteResultaat) / getDisplayText());
		}
		//console.log("=: " + parseInt(laatsteResultaat) + " " + getDisplayText());
		clear();
	}
	else if(id == "btn_plus") {//+
		laatsteResultaat = displayText;
		filledInOperator = "+";
		//console.log("+: " + laatsteResultaat)
	}

	document.getElementById("display").innerHTML = displayText;
}