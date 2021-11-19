window.__timeCursorISO = "2021-06-01T00:00:00";
window.__locationCursor = "needham";

module.exports = {
    moveLocation: function(newLoc) {
        var movement = {from: window.__locationCursor, to: newLoc};
        window.__locationCursor = newLoc;
        return movement;
    },
    getLocation: function() {
        return window.__locationCursor;
    },
    getTime: function() {
        return window.__timeCursorISO;
    },
    offsetMinutes: function(mins) {
        var originalTime = window.__timeCursorISO;
        
        var date = new Date(window.__timeCursorISO + "Z");
        console.log("mins", date.getMinutes() + mins);
        date.setMinutes(date.getMinutes() + mins);
        var newTimeISO = date.toISOString();
        newTimeISO = newTimeISO.replace(/\.\d{3}Z/, "");
        
        window.__timeCursorISO = newTimeISO;
        
        return {
            from: originalTime,
            to: newTimeISO
        };
    },
    moveTime: function(newTimeISO) {
        var originalTime = window.__timeCursorISO;
        
        var intendedIndexOfT = originalTime.indexOf("T");
        if(newTimeISO.indexOf("T") == -1) throw newTimeISO + " has no 'T'";
        
        //pad the start with spaces until the Ts match up
        while(newTimeISO.indexOf("T") < intendedIndexOfT) newTimeISO = " " + newTimeISO;
        
        //ensure they have the same length
        while(newTimeISO.length < originalTime.length) newTimeISO += " ";
        
        if(newTimeISO.length != originalTime.length) throw "new time's length " + newTimeISO.length + " is greater than the original length!";
        
        //merge!
        var mergedToTime = "";
        for(var i = 0; i < newTimeISO.length; i++) {
            if(newTimeISO[i] == " ") mergedToTime += originalTime[i];
            else mergedToTime += newTimeISO[i];
        }
        
        window.__timeCursorISO = mergedToTime;
        
        return {
            from: originalTime,
            to: mergedToTime
        }
    }
};
