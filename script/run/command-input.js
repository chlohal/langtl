var id = "input-" + Math.random().toString(16).substring(2);

module.style = `
    #${id} {
        position: absolute;
        pointer-events: none;
        opacity: 0;
    }
`

var input = document.createElement("input");
input.id = id;

document.body.appendChild(input);

document.addEventListener("keydown", function(e) {
    if(e.key == "Escape") {
        hideInput();
    } else {
        showInput();
        input.focus();
    }
});

function hideInput() {
    input.style.opacity = 0;
}

function showInput() {
    input.style.opacity = 1;
    
}