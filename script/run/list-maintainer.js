module.style = `
body {
    margin: 0;
}
.timeline-list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 1em;
    gap: 1em;
}
`

var timelineList = document.createElement("ul");
timelineList.classList.add("timeline-list");

document.body.appendChild(timelineList);