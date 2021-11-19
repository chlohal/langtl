module.exports = function(token) {
    for(var i = 1; i < token.length; i++) {
        if(token[i] == "'") return {
            type: "string",
            value: token.substring(1, i),
            stringValue: token.substring(0, i + 1)
        };
    }
    
}