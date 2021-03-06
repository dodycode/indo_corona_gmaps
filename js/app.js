// var markers = [
//   ['Taman Nasional Gunung Gede Pangrango', -6.777797700000000000 , 106.948689100000020000],
//   ['Gunung Papandayan', -7.319999999999999000, 107.730000000000020000],
//   ['Gunung Cikuray', -7.3225, 107.86000000000001],
//   ['Gunung Bromo', -7.942493600000000000, 112.953012199999990000],
//   ['Gunung Semeru', -8.1077172, 112.92240749999996],
//   ['Gunung Merapi', -7.540717500000000000, 110.445724100000000000],
//   ['Gunung Merbabu', -7.455000000000001000, 110.440000000000050000],
//   ['Gunung Prau', -7.1869444, 109.92277779999995]
// ];

function initMap() {
  fetch('https://api.covid19.arproject.web.id/nasional')
  .then(response => response.json())
  .then((data) => {
    var respData = data.data;
    var markers = [];

    Object.keys(respData).forEach((key) => {
      var label = key+'\n(Positif: '+respData[key].positif+')';
      markers.push([label, respData[key].center.lat, respData[key].center.lng]);
    });

    console.log(markers);

    visualizeMap(markers);
  })
  .catch((error) => {
    alert('Gagal mengambil data API! silahkan hubungi pihak admin!');
    console.error('Error:', error);
  });
}

function visualizeMap(markers){
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }     
  var map = new google.maps.Map(mapCanvas, mapOptions)

  var infowindow = new google.maps.InfoWindow(), marker, i;
  var bounds = new google.maps.LatLngBounds(); 
  for (i = 0; i < markers.length; i++) {  
    pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(pos); 
    marker = new google.maps.Marker({
        position: pos,
        map: map
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infowindow.setContent(markers[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
    map.fitBounds(bounds); 
  }
}
