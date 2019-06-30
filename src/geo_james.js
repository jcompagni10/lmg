

// GET LOCATION
$("#share-location-btn").click(function() {
  $(this).prop("disabled", true);
  $("#checking-location-msg").removeClass("hidden");

  navigator.geolocation.getCurrentPosition(validateLocation, handle_response_geo);
});

const LMG_LAT = 37.752462;
const LMG_LONG = -122.415675;
const MAX_DIST = .5; // miles? feet?

function validateLocation(location){
  let lat = location.coords.latitude;
  let long = location.coords.longitude;
  let distance = distanceBetweenCoords(lat, long, LMG_LAT, LMG_LONG);
  if (distance < MAX_DIST){
    var response = {success: true}
    handle_response_geo(response) 
  } else {
    var response = {success: false}
    handle_response_geo(response) 
  }
}
function distanceBetweenCoords(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}
function handle_response_geo(response) {
  $("#share-location-btn").prop("disabled", false);
  $("#checking-location-msg").addClass("hidden");
  if (response.success) {
    goToNextPage();
  } else {
    let errorText;
    switch(error.code) {
    case error.PERMISSION_DENIED:
      errorText = "It looks like location sharing was denied. Please click the button above again, then <b> click 'Yes' or 'Allow' on the subsequent pop-up</b> so that we can receive your location.</p>";
      break;

    case error.POSITION_UNAVAILABLE:
      errorText = "We can't determine your location. Ensure you're connected to the Internet (our WiFi info can be found in the troubleshooter below), then please try again. If that doesn't work, try sharing location at a browser level, see <a href='https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome' target='_blank'>this</a> guide for Google Chrome or <a href='https://support.apple.com/en-us/HT207092' >this</a> guide for Safari";
      break;

    default:
      errorText = "We apologize, there is an unknown error with location sharing. Please call us at <%= ENV['pretty_phone'] %>. A support agent will need to transfer you to a manager for remote unlocking.";
      break;
    }

    // add last case: it was successful but error in that they're too far away
    // errorText = "It looks like you're too far away from the store at <b>3156 24th Street in San Francisco</b>. Please click the button above again once you're outside the store"

    $("#error-content").html(errorText);
  }
}
function goToNextPage() {
  $(".next_page").click()
}
