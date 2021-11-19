window.__mapbox_cache = {
    search: {},
    route: {}
};

module.exports = {
    search: search,
    route: route
}

function route(location1, location2) {
    var longlatarr = [location1.center.join(","), location2.center.join(",")];
    
    //if we try to find a route from somewhere to the same place, don't bother to re-do it
    if(longlatarr[0] == longlatarr[1]) {
        return {
            weight: 0,
            weight_name: "auto",
            duration: 0,
            distance: 0,
            legs: [],
            geometry: []
        }
    }
    
    var longlat = longlatarr.join(";");
    
    if(window.__mapbox_cache.route[longlat]) return window.__mapbox_cache.route[longlat].routes[0];
    
    var url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(longlat)}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoiY29sZWgyIiwiYSI6ImNrdzZjbTFrdTFlcHEyd21ueXNxeXRnMTkifQ.-OvaHW92X9ZtaaFMBNZYaA`;
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", url, false);
    
    xhr.send();
    
    if(xhr.status == 200) {
        window.__mapbox_cache.route[longlat] = JSON.parse(xhr.responseText);
    }
    
    return window.__mapbox_cache.route[longlat].routes[0];
}

function search(search) {
    if(window.__mapbox_cache.search[search]) return window.__mapbox_cache.search[search].features[0];
    
    var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search)}.json?limit=1&language=en&worldview=us&access_token=pk.eyJ1IjoiY29sZWgyIiwiYSI6ImNrdzZjbTFrdTFlcHEyd21ueXNxeXRnMTkifQ.-OvaHW92X9ZtaaFMBNZYaA`
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", url, false);
    
    xhr.send();
    
    if(xhr.status == 200) {
        window.__mapbox_cache.search[search] = JSON.parse(xhr.responseText);
    }
    
    return window.__mapbox_cache.search[search].features[0];
}