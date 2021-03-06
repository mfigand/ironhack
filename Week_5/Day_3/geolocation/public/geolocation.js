var map;
var positionArray = JSON.parse(localStorage.getItem("position")) || [];

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){
  // We can't just directly feed the position into our google map
  // The objects are formatted differently, google maps is looking for
  // an object with "lat" and "lng" keys.
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setUpAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
  $.each(positionArray,function(index,val) {
    createMarker(val);
  })

}

function createMarker(position) {
  var marker = new google.maps.Marker({
   position: position,
   map: map
 });
 positionArray.push(position)
 localStorage.setItem("position",JSON.stringify(positionArray));
}

function setUpAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    var address = place.formatted_address;
    $('#map').on('click', markerClick(address))
    var position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      createMarker(position);
    } else {
      alert("The place has no location...?")
    }
  });
}

var markerClick(address) = function(event){
  $(".modal-body").empty();
  $(".modal-body").append("address");
  // console.log('llego',$(this).prop('id'));
  // window.P = $(event.currentTarget)
  // var request = $.get('https://api.spotify.com/v1/albums/'+$(this).prop('id'));
  // request.done(show_songs);
  // request.fail(handleError);
}
