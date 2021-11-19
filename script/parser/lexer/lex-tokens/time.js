var relativeResolver = require("../../../relative-resolver");

module.exports = function(token) {
    
    var lettersToGo;
    if(/^\d\d\d\d\//.test(token)) lettersToGo = 4;
    else lettersToGo = 2;
    
    var result = "";
    
    for(var i = 0; lettersToGo >= 0; i++) {
        if(token[i] == "/") lettersToGo = 2;
        if(token[i] == ":") lettersToGo = 2;
        
        if(token[i+1] == "/" || token[i+1] == ":") lettersToGo++;
        
        result += token[i] || "";
        lettersToGo--;
    }
    
    var parsableTime = result.replace(/\//g, "-");
    parsableTime = parsableTime.replace(/-(\d\d):/, "-$1T");
    if(!parsableTime.includes("T")) parsableTime = "T" + parsableTime;
    
    var timeValue = relativeResolver.moveTime(parsableTime);
    return {
        type: "time",
        value: timeValue.to,
        stringValue: result
    }
}

function parsePaddedInt(s) {
    return parseInt(s.replace(/^0+/));
}