describe("Test distanceBetweenCoords", function() {

    it("Calculates the correct distance between NY and SF", function() {
        var lat1 = 37.774;
        var long1 = -122.419;
        var lat2 = 41.712;
        var long2 = -74.002;

        var ny_to_sf_dist = distanceBetweenCoords(lat1, long1, lat2, long2);

        expect(Math.floor(ny_to_sf_dist)).toBe(2552);
    });
});

describe("Test validateGPS", function() {

    beforeEach(function(){
        affix("#error-content");
    });

    it("redirects to next page when within range of lmg", function() {
        var location1 = {coords: {latitude: 37.7527,
                                  longitude: -122.415}};

        spyOn(window, "setWindowLocation");
        validateGPS(location1);

        expect(window.setWindowLocation).toHaveBeenCalledWith("https://www.lastmingear.com/nextpage");
        expect($("#error-content").text()).toBe("");
    });

    it("It adds error text when not within range", function() {
        affix("#error-content");
        var location2 = {coords: {latitude: 37.6527,
                                  longitude: -122.515}};

        spyOn(window, "setWindowLocation");
        validateGPS(location2);

        expect(window.setWindowLocation).not.toHaveBeenCalled();
        expect($("#error-content").text()).toBe("Show instruction for out of range here.");
    });
});

describe("handleError", function() {

    beforeEach(function(){
        affix("#error-content");
    });
    var PositionError = {PERMISSION_DENIED: 1,
                         POSITION_UNAVAILABLE: 2,
                         TIMEOUT: 3};

    it("Handles a Permissions denied error", function() {
        PositionError.code = 1;
        handleError(PositionError);
        expect($("#error-content").text()).toBe("It looks like location sharing was denied. Please click the button above again, and make sure to click 'Yes' or 'Allow' so that we can receive your location.");

    });

    it("Handles a Permissions unavailable error", function() {
        PositionError.code = 2;
        handleError(PositionError);
        expect($("#error-content").text()).toBe("We can't determine your location. Ensure you're connected to the Internet, then please try again. If that doesn't work, try sharing location at a browser level, see this guide for Google Chrome or this guide for Google Chrome or this guide for Safari (can you try to find a guide for Safari?)");
    });

    it("Handles all other errors error", function() {
        PositionError.code = 3;
        handleError(PositionError);
        expect($("#error-content").text()).toBe("We apologize, there is an unknown error with location sharing. Please call us at <%= ENV['pretty_phone'] %>. A support agent will need to transfer you to a manager for remote unlocking.");
    });
});


describe("Enables GPS on button click", function() {

    beforeEach(function(){
        affix("#enable-gps-btn");
        init ();
    });

    it("Calls enableGPS when button is clicked when button is clicked", function (){
        spyOn(navigator.geolocation, "getCurrentPosition");
        $("#enable-gps-btn").click();
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
});


