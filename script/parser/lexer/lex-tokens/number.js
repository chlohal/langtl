module.exports = function(token) {
    var r = "";
    for(var i = 0; i < token.length; i++) {
        var l = token[i];
        if(isDigit(l) || l == "." || l == "*" || l == "^" || l == "-") r += l;
        else break;
    }
    return {
        type: "number",
        value: eval(r.replace(/\^/g, "**")),
        stringValue: r
    };
}

function isDigit(str) {
    var c = str.charCodeAt(0);
    
    return c >= 0x30 && c <= 0x39;
}