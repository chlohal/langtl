var relativeResolver = require("../../../relative-resolver");
var mapbox = require("../../../mapbox");

module.exports = function(commandTokens) {
    var from, to;
    
    //remove hyphen & 'r'-- doesn't matter
    commandTokens = commandTokens.filter(x=>x!="-"&&x!="r");
    
    var stringArgs = commandTokens.filter(x=>x.type == "string").map(x=>x.value);
    
    if(stringArgs.length == 0) {
        from = relativeResolver.getLocation(),
        to = relativeResolver.getLocation()
    }
    if(stringArgs.length == 1) {
        from = relativeResolver.moveLocation(stringArgs[0]).from;
        to = stringArgs[0];
    }
    else if(stringArgs.length >= 2) {
        from = stringArgs[0];
        to = stringArgs[1];
        relativeResolver.moveLocation(stringArgs[1]);
    } 
    
    var mapboxFrom = mapbox.search(from);
    var mapboxTo = mapbox.search(to);
    
    var route = mapbox.route(mapboxFrom, mapboxTo);
    
    var result = {
        type: "r",
        from: mapboxFrom,
        to: mapboxTo,
        meters: route.distance,
        minutes: route.duration / 60
    };
    
    return result;
}