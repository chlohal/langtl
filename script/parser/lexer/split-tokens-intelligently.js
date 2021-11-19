var parseString = require("./lex-tokens/string");
var parseTime = require("./lex-tokens/time");
var parseNumber = require("./lex-tokens/number");
var parseOffset = require("./lex-tokens/offset");

module.exports = function(tokenArr) {
    var r = [];
    
    for(var i = 0; i < tokenArr.length; i++) {
        if(tokenArr[i].length == 0) {
            continue;
        }
        
        var token = tokenArr[i];
        
        while(token.length > 0) {
            //time!
            if(/^(\d\d:\d\d|\d\d(\d\d)?\/)/.test(token)) {
                var parsed = parseTime(token);
                r.push(parsed);
                token = token.substring(parsed.stringValue.length);
            }
            //strings!
            else if(token.startsWith("'")) {
                var parsed = parseString(token);
                r.push(parsed);
                token = token.substring(parsed.stringValue.length);
            }
            //numbers!
            else if(isDigit(token[0])) {
                var parsed = parseNumber(token);
                r.push(parsed);
                token = token.substring(parsed.stringValue.length);
            }
            //offsets!
            else if(token.startsWith("+") || token.startsWith("-")) {
                var parsed = parseOffset(token);
                r.push(parsed);
                token = token.substring(parsed.stringValue.length);
            } else if(isLowercaseLetter(token[0])) {
                r.push(token[0]);
                token = token.substring(1);
            } else if(isUppercaseLetter(token[0])) {
                r.push({ type: "key", value: token[0], stringValue: token[0] });
                token = token.substring(1);
            } else {
                throw "unsupported token " + JSON.stringify(token);
            }
            
            token = token.trim();
        }
        
    }
    
    return r;
}

function isDigit(str) {
    var c = str.charCodeAt(0);
    
    return c >= 0x30 && c <= 0x39;
}


function isLowercaseLetter(str) {
    var c = (str + "").charCodeAt(0);
    return c >= 0x61 && c <= 0x79;
}

function isUppercaseLetter(str) {
    var c = (str + "").charCodeAt(0);
    return c >= 0x41 && c <= 0x5A;
}