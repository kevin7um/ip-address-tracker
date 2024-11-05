
var map = L.map('map').setView([-22.3311744,-41.7541465,], 13) ;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-22.3311744,-41.7541465]).addTo(map)    