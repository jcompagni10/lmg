const LMG_LAT = 37.752462;
const LMG_LONG = -122.415675;
const MAX_DIST = .5;

function distance_between_coords(lat1, lon1, lat2, lon2) {
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

function validateGPS (location){
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let distance = distance_between_coords(lat, long, LMG_LAT, LMG_LONG);
    if (distance < MAX_DIST){
        $("#slider_widget_wrapper").show();
    } else {
        $("#not_in_range_content").show();
    }
}

function enableGPS(){
    let errorFn = function(){window.alert("NO GPS")};
    navigator.geolocation.getCurrentPosition(validateGPS, errorFn);
}

function init(){
    $("#enable-gps-btn").click(enableGPS);
}

$(document).ready(init);
