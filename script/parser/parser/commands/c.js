var relativeResolver = require("../../../relative-resolver");

module.exports = function(commandTokens, otherCommands) {
    
    var timeArgs = commandTokens.filter(x=>x.type == "time");
    
    var from, to, fromLocation = relativeResolver.getLocation(), toLocation = relativeResolver.getLocation();
    
    if(timeArgs.length == 2) {
        from = timeArgs[0].value;
        to = timeArgs[1].value;
    } else if(timeArgs.length == 1) {
        from = relativeResolver.getTime();
        to = timeArgs[0].value;
    }
    
    var offsetArgs = commandTokens.filter(x=>x.type == "offset");
    
    if(offsetArgs.length == 2) {
        from = relativeResolver.offsetMinutes(offsetArgs[0].value).to;
        to = relativeResolver.offsetMinutes(offsetArgs[1].value).to;
    } else if(offsetArgs.length == 1) {
        from = relativeResolver.getTime();
        to = relativeResolver.offsetMinutes(offsetArgs[0].value).to;
    }
    
    var routeCommand = otherCommands.find(x=>x.type=="r");
    if(routeCommand) {
        if(offsetArgs.length == 1 || timeArgs.length == 1) from = to;
        else from = relativeResolver.getTime();
        
        to = relativeResolver.offsetMinutes(routeCommand.minutes).to;
        
        fromLocation = routeCommand.from;
        toLocation = routeCommand.to;
    }
    
    var titleArg = commandTokens.find(x=>x.type == "string");
    var title = "";
    if(titleArg) title = titleArg.value;
    
    
    return {
        "type": "c",
        "from": from,
        "to": to,
        "title": title,
        "fromLocation": fromLocation,
        "toLocation": toLocation
    }
}