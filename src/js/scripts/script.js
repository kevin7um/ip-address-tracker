var apiKey = API_KEY;
var ipDom = document.getElementById("ip");
var localDom = document.getElementById("local");
var timezoneDom = document.getElementById("timezone");
var ispDom = document.getElementById("isp");

var form = document.getElementById('js-form');

async function getLocation(input) {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${input}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
    console.log("Erro ao obter dados:", error);
	}
}


function addDataToHTML(ip, city, region, timezone, isp) {
  ipDom.innerText = ip;
	localDom.innerText = city + ", " + region;
	timezoneDom.innerText = timezone;
	ispDom.innerText = isp;
}

// Leaflet
var map = L.map("map", {
  zoomControl: false,
}).setView([23.719189, -29.3808503],3);

//Exibindo o mapa
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([37.40599, -122.078514]).addTo(map);

function addMapToHTML(lat, lng){
  map.setView([lat, lng], 13);

  // Adicionando marcador
  marker.setLatLng([lat, lng]) 
}    

async function viewResult(search){
  const data = await getLocation(search);
  
  addDataToHTML(
    data.ip,
    data.location.city,
    data.location.region,
    data.location.timezone,
    data.isp
  )
  
  addMapToHTML(
    data.location.lat, 
    data.location.lng
  ) 
  
}

form.addEventListener("submit", function(event){
  event.preventDefault();
  
  const search = document.getElementById('input').value
  
  viewResult(search) 
})  
