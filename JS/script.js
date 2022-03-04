const KEY = "97e14e805040f29c78c57c05e88862b9"

let lon, lat, object, local;

getLocation();


function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
        console.log("O seu navegador não suporta Geolocalização.");
    }

}

function showPosition(position){
    console.log(`Latitude: ${position.coords.latitude}  
    Longitude: ${position.coords.longitude}`); 
    
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    getInfo();
}

function showInputs() {
    document.querySelector(".informations").classList.remove("hidden")
    document.querySelector("section").classList.add("hidden")
}

function hideInputs(){
    document.querySelector(".informations").classList.add("hidden")
    document.querySelector("section").classList.remove("hidden")
}


function getInfo(){
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`
  
    const promisse = axios.get(link);
  
    promisse.then(resposta);
  
}

function getInfoLocal(zip, country){
    const link = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${KEY}`

    const requisition = axios.get(link);

    requisition.then(locationInfo);
}
  
function resposta(resp){
    object = resp.data
    console.log(object);

    displayInfo();
}

function locationInfo(resp){
    local = resp.data;
    console.log(local);

    getInfoByInput();
}

function displayInfo(){
    const nome = object.name;
    const temp = object.main.temp;
    const country = object.sys.country;
    const clima = object.weather[0].description;
    const codigo = object.weather[0].icon;
    const icone = `http://openweathermap.org/img/wn/${codigo}@2x.png`

    const text = document.getElementById("text");
    text.innerHTML = "Tempo agora em:"

    const location = document.getElementById("location");
    location.innerHTML = `${nome}, ${country}`
    
    const temperature = document.getElementById("temperature");
    temperature.innerHTML = `${convert(temp)}°C`

    const icon = document.getElementById("icon");
    icon.innerHTML = `<img src="${icone}"/>`

    const weather = document.getElementById("weather");
    weather.innerHTML = `${clima}`
    
    console.log(nome,country, convert(temp), clima, codigo);
}

function convert(tempK){
    const tempC = tempK - 273.15;

    return (tempC).toFixed(2);
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("Acesso a localização negado");
        showInputs();
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Localização indisponível");
        showInputs();
        break;
      case error.TIMEOUT:
        alert("Tempo esgotado");
        break;
      case error.UNKNOWN_ERROR:
        alert("Erro desconhecido");
        break;
    }
}

function getInput(){
    let zip = document.querySelector(".zip-code").value
    let country = document.querySelector(".country-code").value

    getInfoLocal(zip, country);
}

function getInfoByInput(){
    lat = local.lat;
    lon = local.lon;

    getInfo();

    hideInputs();
}
