var splitCommands = require("./split-commands");
var tokenSplit = require("./split-tokens-intelligently");

module.exports = function(code) {
    var commands = splitCommands(code);
    
    return commands.map(x=>tokenSplit(x));
}