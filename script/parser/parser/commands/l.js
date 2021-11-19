module.exports = function(commandTokens) {
    var name = (commandTokens[1] || {}).value;
    
    return {
        type: "l",
        name: name
    }
}