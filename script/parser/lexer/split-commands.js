
/**
 * Transform a langTL string into an array of tokens
 * @param {string} code 
 * @returns {string[][]} Each command, as a xargs-like array.
 */
module.exports = function(code) {
    var result = [];
    
    var state = "DEFAULT";
    var command = [];
    var word = "";
    for(var i = 0; i < code.length; i++) {
        switch(state) {
            case "DEFAULT":
                if(isLowercaseLetter(code[i])) {
                    if(command.length != 0) {
                        command.push(word);
                        word = "";
                        result.push(command);
                    }
                    command = [code[i]];
                } else if(isQuoteCharacter(code[i])) {
                    command.push(word);
                    state = "IN_QUOTE";
                    word = "";
                } else {
                    word += code[i];
                }
                break;
            case "IN_QUOTE":
                if(!isEscapeCharacter(code[i - 1]) && isQuoteCharacter(code[i])) {
                    command.push("'" + word + "'");
                    word = "";   
                    state = "DEFAULT";
                } else {
                    word += code[i];
                }
        }
    }
    if(word) command.push(word);
    result.push(command);
    
    return result;
}

function isEscapeCharacter(str) {
    return str == "\\";
}

function isQuoteCharacter(str) {
    return str == "'" || str == "\"";
}

function isLowercaseLetter(str) {
    var c = (str + "").charCodeAt(0);
    return c >= 0x61 && c <= 0x79;
}

 function isUppercaseLetter(str) {
    var c = (str + "").charCodeAt(0);
    return c >= 0x41 && c <= 0x5A;
}