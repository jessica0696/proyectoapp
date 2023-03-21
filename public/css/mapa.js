var map = L.map('map').setView([20.68139306044883, -103.35294671539657], 20);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
document.getElementById('select-location').addEventListener('change',function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,18);
  });
L.marker([20.68139306044883, -103.35294671539657]).addTo(map)
    .bindPopup('Carro abandonado')
    .openPopup();