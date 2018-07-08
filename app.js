const googleContainerId = "rcnt";
const googleContainer = document.getElementById(googleContainerId)

const appContainer = document.createElement("div");
appContainer.setAttribute("class", "app-container");
googleContainer.appendChild(appContainer);

const appHtmlURL = chrome.runtime.getURL("app.html");
fetch(appHtmlURL)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        appContainer.innerHTML = html;
    });
