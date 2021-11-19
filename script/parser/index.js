var lexer = require("./lexer/");
var parser = require("./parser/");

module.exports = function (code) {
    var lexed = lexer(code);
    var parsed = [];
    
    for(var i = lexed.length - 1; i >= 0; i--) parsed.push(parser(lexed[i], parsed));
    
    return parsed[parsed.length - 1];
}
