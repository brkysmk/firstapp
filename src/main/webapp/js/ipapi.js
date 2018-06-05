$( document ).ready(function() {
	initPage();
	loadCountries();
	
	window.setInterval(function(){
		initPage()
		}, (1000 * 60) * 10);
	
	$("#landen").click(function(e) {
		//console.log(e.target.id);
		if(e.target.id == "clickableCity") {
		  //console.log("TEST: " + $(e.target).text());
		  getWeatherData($(e.target).text());
		}
		});
	
//	fetch('http://localhost:8080/tomcatapp/restservices/countries', { method: 'GET'})
//		.then(response => response.json())
//		.then(json => {
//			console.log(json[0]);
//		});
});

function initPage() {

	$.getJSON('https://ipapi.co/json/', function(data){
	  //console.log("rW: " + data);
	  fillWeather(data);
	  getWeatherData(data.city);
	  localStorage.setItem('tempWeatherData', JSON.stringify(data));
	});
}

function getWeatherData(cityName) {
	var retrievedTemperatureData = localStorage.getItem(cityName);
	var temperatureData = JSON.parse(retrievedTemperatureData);
	var currentDate = Date.now();
	
	if(retrievedTemperatureData === null || currentDate - temperatureData.tijd >= 10000) {
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&APPID=c8ea6b7cc19440f40c73a66ee332d7ea', function(wD){
			  console.log("Opgehaald uit API: " + wD);
			  fillTemperature(wD);
			  $("#hetweerin").text("Het weer in " + cityName + "");
			  wD.tijd = currentDate;
			  localStorage.setItem(cityName, JSON.stringify(wD));
			});
	}
	else {
		fillTemperature(temperatureData);
		console.log("Opgehaald uit localstorage: " + temperatureData);
	}
}

function fillWeather(data) {
	$("#landcode").text("Landcode: " + data.country);
	$("#land").text("Land: " + data.country_name);
	$("#regio").text("Regio: " + data.region);
	$("#stad").text("Stad: " + data.city);
	$("#postcode").text("Postcode: " + data.postal);
	$("#lat").text("Latitude: " + data.latitude);
	$("#long").text("Longitude: " + data.longitude);
	$("#ip").text("IP: " + data.ip);
	
	$("#hetweerin").text("Het weer in " + data.city + "");
}

function fillTemperature(weatherData) {
	$("#temp").text("Temperatuur: " + weatherData.main.temp);
	$("#luchtv").text("Luchtvochtigheid: " + weatherData.main.humidity);
	$("#winds").text("Windsnelheid: " + weatherData.wind.speed);
	$("#windr").text("Windrichting: " + weatherData.wind.deg);
	$("#zonsop").text("Zonsopgang: " + weatherData.sys.sunrise);
	$("#zonsonder").text("Zonsondergang: " + weatherData.sys.sunset);
}

function loadCountries() {
	$.getJSON('http://localhost:8080/tomcatapp/restservices/countries', function(data) {
	  //console.log(data);
	  data.forEach(function(d) {
		  //console.log(d);
		  $("#landen").append("<span id='clickableCity'>" + d.name + "</span><br>");
		  $("#hoofdsteden").append(d.capital + "<br>");
		  $("#regios").append(d.region + "<br>");
		  $("#oppervlaktes").append(d.surface + "<br>");
		  $("#inwoners").append(d.population + "<br>");
	  })
	});
}