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
        stad.addEventListener("click", function() {
            showWeather(myJson.latitude, myJson.longitude, myJson.city)
        });
        showWeather(myJson.latitude, myJson.longitude, myJson.city);
        loadCountries();


    });


}

function showWeather(latitude, longitude, city) {
    console.log(city);
    console.log(window.localStorage.getItem(city) == null);

    var apiKey = "2397de13512a74818c925701c2da9312";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    console.log(Date.now());
    var currentdate = Date.now();
    JSON.call = currentdate;

    if (window.localStorage.getItem(city) === null || currentdate - JSON.parse(window.localStorage.getItem(city)).tijdStip >= 10000  ) {
        console.log(city + " OPGEHAALD UIT API!");

        fetch(apiUrl)
            .then(response => response.json())
    .then(function (myJson) {
            myJson.tijdStip = currentdate;
            document.getElementById("temperatuur").innerHTML = (myJson.main.temp - 273).toFixed(1);
            document.getElementById("luchtvochtigheid").innerHTML = myJson.main.humidity;
            document.getElementById("locatie").innerHTML = "Het weer in: " + city;
            document.getElementById("windsnelheid").innerHTML = myJson.wind.speed;
            document.getElementById("windrichting").innerHTML = windrichting(myJson.wind.deg);
            document.getElementById("zonsondergang").innerHTML = timeConverter(myJson.sys.sunset);
            document.getElementById("zonsopgang").innerHTML = timeConverter(myJson.sys.sunrise);
            window.localStorage.setItem(city , JSON.stringify(myJson));
            console.log(window.localStorage);

        });

    } else {
        var json = JSON.parse(window.localStorage.getItem(city));
        console.log(city + " OPGEHAALD UIT LOCALSTORAGE!");
        console.log(window.localStorage);

        document.getElementById("temperatuur").innerHTML = (json.main.temp - 273).toFixed(1);
        document.getElementById("luchtvochtigheid").innerHTML = json.main.humidity;
        document.getElementById("locatie").innerHTML = "Het weer in: " + city;
        document.getElementById("windsnelheid").innerHTML = json.wind.speed;
        document.getElementById("windrichting").innerHTML = windrichting(json.wind.deg);
        document.getElementById("zonsondergang").innerHTML = timeConverter(json.sys.sunset);
        document.getElementById("zonsopgang").innerHTML = timeConverter(json.sys.sunrise);


    }
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
    fetch("restservices/countries")
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

            var valueWijzig = document.createElement("input");
            valueWijzig.setAttribute("type", "submit");
            valueWijzig.setAttribute("value", "Wijzig");
            valueWijzig.setAttribute("id", country.code);
            row.appendChild(valueWijzig);

            var valueDelete = document.createElement("input");
            valueDelete.setAttribute("type", "submit");
            valueDelete.setAttribute("value", "Delete");
            valueDelete.setAttribute("id", country.code);
            row.appendChild(valueDelete);

            valueDelete.addEventListener("click", deleteFunc);
            valueWijzig.addEventListener("click", wijzigFunc);

            row.addEventListener("click", function() {
                showWeather(country.latitude,country.longitude, country.capital)
            });

            document.querySelector("#landenLijst").appendChild(row);
        }
    })
}

var add = document.querySelector("#add");
add.addEventListener("click", addCountryFunc);

function deleteFunc() {
    var id = this.id;

    fetch("restservices/countries/" + id, {method: 'DELETE', headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")}} )
        .then(function (response) {
            if (response.ok)
                console.log("Country deleted")
            else if (response.status == 404)
                console.log("Country not found")
            else console.log("Cannot delete country")
        })
}

function putHandler() {
    var id = document.getElementById("countrycode").value;
    var formData = new FormData(document.querySelector("#wijzigGegevens"));
    var encData = new URLSearchParams(formData.entries());

    fetch("restservices/countries/" + id, { method: 'PUT', body: encData, headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")}} )
        .then(response => response.json())
        .then(function (myJson) { console.log(myJson); })
};

function wijzigFunc() {
    modal.style.display = "block";
    console.log("wijzig functie test " + this.id);
    fetch("restservices/countries/" + this.id)
        .then(response => response.json())
.then(function (myJson) {
        document.getElementById("wijzigGegevens").innerHTML = '<input name="name" type="text" value="' + myJson.name + '">LAND<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input name="capital" type="text" value="' + myJson.capital + '">CAPITAL<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input name="region" type="text" value="' + myJson.region + '">REGION<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input name="surface" type="number" value="' + myJson.surface + '">SURFACE<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input name="population" type="number" value="' + myJson.population + '">POPULATION<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input id="countrycode" name="countrycode" type="text" value="' + myJson.code + '" readonly>CODE<br><br>';
        document.getElementById("wijzigGegevens").innerHTML += '<input id="put" type="submit" value="Verzend"><br><br>';
        document.querySelector("#put").addEventListener("click", putHandler);
    });
}

function addCountryFunc() {
    modal.style.display = "block";
    document.getElementById("wijzigGegevens").innerHTML += '<input id="countrycode" name="countrycode" type="text" value="">CODE<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="iso3" type="text" value="" >ISO3<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="name" type="text" value="" >NAME<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="capital" type="text" value="">CAPITAL<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="continent" type="text" value="" >CONTINENT<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="region" type="text" value="" >REGION<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="surface" type="number" value="" >SURFACEAREA<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="population" type="number" value="" >POPULATION<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="governmentform" type="text" value="" >GOVERNMENTFORM<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="latitude" type="number" value="">LATITUDE<br><br>';
    document.getElementById("wijzigGegevens").innerHTML += '<input name="longitude" type="number" value="" >LONGITUDE<br><br>';

    document.getElementById("wijzigGegevens").innerHTML += '<input id="post" type="submit" value="Verzenden"><br><br>';
    document.querySelector("#post").addEventListener("click", addFunc);

}



function addFunc() {
    var formData = new FormData(document.querySelector("#wijzigGegevens"));
    var encData = new URLSearchParams(formData.entries());

    fetch("restservices/countries", { method: 'POST', body: encData, headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")}} )
        .then(response => response.json())
.then(function (myJson) { console.log(myJson); });
}

var login = document.querySelector("#logIn");
login.addEventListener("click", addLogin);

function addLogin() {
	modal.style.display = "block";
	document.getElementById("wijzigGegevens").innerHTML = '<p1>Username </p1><input name="username" type=" text" value="" required><br><br>';
	document.getElementById("wijzigGegevens").innerHTML += '<p1>Password </p1><input name="password" type="password" value="" required><br><br>';
	document.getElementById("wijzigGegevens").innerHTML += '<input type="button" id="login" value="login"><br><br>';
	document.querySelector("#login").addEventListener("click", loginButton);
}

function loginButton(event) {
	console.log("Stap 1");
    var formData = new FormData(document.querySelector("#wijzigGegevens"));
    var encData = new URLSearchParams(formData.entries());
    
    fetch("restservices/authentication", { method: 'POST', body: encData})
    	.then(function (response) {
    		if (response.ok)
    			return response.json();
    		else throw "wrong username/password";
    	})
    	.then(myJson => window.sessionStorage.setItem("myJWT", myJson.JWT))
    	.catch(error => console.log(error));
	
}

initPage();

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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