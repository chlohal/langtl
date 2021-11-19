__initRequire();
require("./script/");

function __initRequire() {
    var __require_cache = {};

    window.require = function(scr, parentUrl) {
        
        parentUrl = parentUrl || "";
        if(parentUrl.includes("/")) parentUrl = parentUrl.substring(0, parentUrl.lastIndexOf("/") + 1);
        
        if(scr.endsWith("/")) scr += "index.js";
        if(!scr.endsWith(".js")) scr += ".js";
        
        var scrUrl = parentUrl + scr;
        
        scrUrl = scrUrl.replace(/(\/|^)\.\//g, "/");
        
        var _module;
        
        if(__require_cache[scrUrl] === undefined) {
            _module = (__require_cache[scrUrl] = requireRequest(scrUrl))(scrUrl);
            if(_module.style) addStylesheet(_module.style);
        } else {
            _module = __require_cache[scrUrl](scrUrl);            
        }
        
        return _module.exports;
    }

    function requireRequest(scrUrl) {        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", scrUrl, false);
        xhr.send();
        
        if(xhr.status != 200) throw "Bad status " + xhr.status + "for " + scrUrl;
    
        var reply = xhr.responseText;
        
        var replacedContent = reply.replace(/(require\("\.[^"]+")\)/g, "$1,__filename)");
        
        var evalContent = `(function(__filename) {var module = {};${replacedContent}; return module;})`;
        
        var evalResult;
        try {
            evalResult = eval(evalContent);
        } catch(e) {
            console.error("error in " + scrUrl);
            console.error(e);
            throw e;
        }
        
        return evalResult;
    }
    
    function addStylesheet(style) {
        var sheet = document.createElement("style");
        sheet.innerHTML = style;
        document.head.appendChild(sheet);
    }
}