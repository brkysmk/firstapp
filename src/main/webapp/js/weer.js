
function initPage() {
	fetch("https://ipapi.co/json/")
	.then(response => response.json())
	.then(function(myJson) {
	var textnode = document.createTextNode(myJson.country);
	document.querySelector("#landcode").append(textnode);
	
	var textnode = document.createTextNode(myJson.country_name);
	document.querySelector("#land").append(textnode);
	
	var textnode = document.createTextNode(myJson.region);
	document.querySelector("#regio").append(textnode);
	
	var textnode = document.createTextNode(myJson.city);
	document.querySelector("#stad").append(textnode);
	
	var textnode = document.createTextNode(myJson.postal);
	document.querySelector("#postcode").append(textnode);
		
	var textnode = document.createTextNode(myJson.latitude);
	document.querySelector("#latitude").append(textnode);
	
	var textnode = document.createTextNode(myJson.longitude);
	document.querySelector("#longitude").append(textnode);
	
	var textnode = document.createTextNode(myJson.ip);
	document.querySelector("#ip").append(textnode);
	
	var stad = document.querySelector("#stad");
	stad.setAttribute("class", "hover");
    stad.addEventListener("click", function() {
        showWeather(myJson.latitude, myJson.longitude, myJson.city)
    });
	
	loadCountries();
	showWeather(myJson.latitude, myJson.longitude, myJson.city);
	
	});	
	
	
}
initPage();



function showWeather(latitude, longitude, city) {
	var apiKey = "2397de13512a74818c925701c2da9312";
	apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
	fetch(apiUrl)
	.then(response => response.json())
	.then(function(myJson) {
		
	document.getElementById("temperatuur").innerHTML = (myJson.main.temp - 273).toFixed(1);
	document.getElementById("luchtvochtigheid").innerHTML = myJson.main.humidity;
	document.getElementById("locatie").innerHTML = "Het weer in: " + city;
	document.getElementById("windsnelheid").innerHTML = myJson.wind.speed;
	document.getElementById("windrichting").innerHTML = windrichting(myJson.wind.deg);
	document.getElementById("zonsondergang").innerHTML = timeConverter(myJson.sys.sunset);
	document.getElementById("zonsopgang").innerHTML = timeConverter(myJson.sys.sunrise);
	
});
}

function windrichting(num){
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["Noord", "Noord-Noord-Oost", "Noord-Oost", "Oost-Noord-Oost", "Oost", "Oost-Zui-Oost", "Zuid-Oost", "Zuid-Zuid-Oost", "Zuid", "Zuid-Zuid-West", "Zuid-West", "West-Zuid-West", "West", "West-Noord-West", "Noord-West", "Noord-Noord-West"];
    return arr[(val % 16)];
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec ;
    return time;
}

function loadCountries(){
    fetch("/firstapp/restservices/countries")
    .then(response => response.json())
    .then(function (myJson) {
        for (const country of myJson){

            var row = document.createElement("tr");
            row.setAttribute("class", "hover");
            
            var countryName = document.createElement("td");
            countryName.appendChild(document.createTextNode(country.name));
            row.appendChild(countryName);

            var capital = document.createElement("td");
            capital.appendChild(document.createTextNode(country.capital));
            row.appendChild(capital);

            var region = document.createElement("td");
            region.appendChild(document.createTextNode(country.region));
            row.appendChild(region);

            var surface = document.createElement("td");
            surface.appendChild(document.createTextNode(country.surface));
            row.appendChild(surface);

            var population = document.createElement("td");
            population.appendChild(document.createTextNode(country.population));
            row.appendChild(population);

            row.addEventListener("click", function() {
                showWeather(country.latitude,country.longitude, country.capital)
            });

            document.querySelector("#landenLijst").appendChild(row);
        }

    })

}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// var textnode = document.createTextNode(myJson.main.temp);
// document.querySelector("#temperatuur").append(textnode);
//
// var textnode = document.createTextNode(myJson.main.humidity);
// document.querySelector("#luchtvochtigheid").append(textnode);
//
// var textnode = document.createTextNode(city);
// document.querySelector("#locatie").append(textnode);
//
// var textnode = document.createTextNode(myJson.wind.speed);
// document.querySelector("#windsnelheid").append(textnode);
//
// var textnode = document.createTextNode(windrichting(myJson.wind.deg));
// document.querySelector("#windrichting").append(textnode);
//
// var textnode = document.createTextNode(timeConverter(myJson.sys.sunset));
// document.querySelector("#zonsondergang").append(textnode);
//
// var textnode = document.createTextNode(timeConverter(myJson.sys.sunrise));
// document.querySelector("#zonsopgang").append(textnode);


