module.exports = function(token) {
    var r = token[0];
    for(var i = 1; i < token.length; i++) {
        var l = token[i];
        if(isDigit(l) || l == ".") {
            r += l;
        } else if(isUppercaseLetter(l)) {
            r += l;
            break;
        } else {
            break;
        }
    }
    
    var lastLetter = r[r.length - 1];
    var unitCoef = 1;
    var minutes = +r;
    if(isUppercaseLetter(lastLetter)) {
        unitCoef = getUnitCoef(lastLetter);
        minutes = +r.substring(0, r.length - 1) * unitCoef;
    }
    
    return {
        type: "offset",
        value: minutes,
        stringValue: r
    };
}

function isDigit(str) {
    var c = str.charCodeAt(0);
    
    return c >= 0x30 && c <= 0x39;
}
function isUppercaseLetter(str) {
    var c = (str + "").charCodeAt(0);
    return c >= 0x41 && c <= 0x5A;
}

function getUnitCoef(unit) {
    switch(unit) {
        case "H": return 60;
        case "D": return 60*60;
        case "M": return 1;
        default: throw "Unknown unit " + unit;
    }
}