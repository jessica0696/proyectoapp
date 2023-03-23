//mapa leaflet
var map = L.map('map').setView([20.68139306044883, -103.35294671539657], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
//selector en el mapa
document.getElementById('select-location').addEventListener('change',function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,18);
  });
//marcadores ejemplo
L.marker([20.68139306044883, -103.35294671539657]).addTo(map)
    .bindPopup('Carro abandonado')
    .openPopup();

    L.marker([20.663315, -103.385290], { draggable: true }).addTo(map)
    .bindPopup('Tacos baratos de bistec')
    .openPopup();
//buscador barra
L.Control.geocoder().addTo(map);

//onclick marker

//guardar datos leaflet

//llamar datos
const getData = async () =>{
    const responseParaderoa = await fetch('./css/paraderos-rutas.json');
    const dataParaderos = await responseParaderoa.json();
    paraderos = dataParaderos.features;

    const getLine = (nameLine) => paraderos.filter(paradero => paradero.properties.vigilanciaanimal.includes(nameLine))

    console.log(paraderos);
            L.geoJSON(paraderos).addTo(map)
            .bindPopup("aqui esta un pin json")
            .openPopup();
}

getData();

//flecha up 
$(document).ready(function(){
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});
});
