var parsers = {
    "c": require("./commands/c"), //create
    "r": require("./commands/r"), //route
    "l": require("./commands/l"), //timeline
    "v": require("./commands/v"), //view
    "o": require("./commands/o") //meta-- out
}

module.exports = function(tokenarr, otherCommands) {
    var commandParser = parsers[tokenarr[0]];
    return commandParser(tokenarr, otherCommands);
}