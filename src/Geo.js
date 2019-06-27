const LMG_LAT = 37.752462;
const LMG_LONG = -122.415675;
const MAX_DIST = .5;

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

//This is kinda unneccesary, but its makes testing easier;
function setWindowLocation(loc){
    document.location.href = loc;
}

function validateGPS (location){
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let distance = distanceBetweenCoords(lat, long, LMG_LAT, LMG_LONG);
    if (distance < MAX_DIST){
        // TODO: Put url for next page here
        setWindowLocation("https://www.lastmingear.com/nextpage");
    } else {
        $("#enable-gps-btn").show();
        $("#checking-location-msg").hide();
        // TODO: Change copy here
        let outOfRangeText = "<p>Show instruction for out of range here.</p>";
        $("#error-content").html(outOfRangeText);
    }
}

function handleError (error){
    console.log(error);
    $("#enable-gps-btn").show();
    $("#checking-location-msg").hide();
    let errorText;
    switch(error.code) {
    case error.PERMISSION_DENIED:
        errorText = "<p>It looks like location sharing was denied. Please click the button above again, and make sure to click 'Yes' or 'Allow' so that we can receive your location.</p>";
        break;

    case error.POSITION_UNAVAILABLE:
        errorText = "<p>We can't determine your location. Ensure you're connected to the Internet, then please try again. If that doesn't work, try sharing location at a browser level, see <a href='https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome' target='_blank'>this</a> guide for Google Chrome or <a href='https://support.apple.com/en-us/HT207092' target='_blank'>this</a> guide for Google Chrome or <a href='https://support.apple.com/en-us/HT207092' >this</a> guide for Safari (can you try to find a guide for Safari?)</p>";
        break;

    default:
        errorText = "<p>We apologize, there is an unknown error with location sharing. Please call us at <%= ENV['pretty_phone'] %>. A support agent will need to transfer you to a manager for remote unlocking.</p>";
        break;
    }
    $("#error-content").html(errorText);

}
function enableGPS(){
    $("#enable-gps-btn").hide();
    $("#checking-location-msg").show();

    navigator.geolocation.getCurrentPosition(validateGPS, handleError);
}

function init(){
    $("#enable-gps-btn").click(enableGPS);
}

$(document).ready(init);
