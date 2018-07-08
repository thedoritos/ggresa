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

        // Executes scripts.
        const appDiv = document.getElementById("app");
        const appDivContainer = appDiv.parentElement;

        const scriptSrcs = [
            "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
            chrome.runtime.getURL("app.js")
        ];

        const injectScripts = (scriptSrcs) => {
            if (scriptSrcs.length === 0) { return; }

            const script = document.createElement("script");
            script.setAttribute("src", scriptSrcs[0]);
            script.addEventListener('load', () => {
                injectScripts(scriptSrcs.slice(1));
            });

            appDivContainer.appendChild(script);
        };

        injectScripts(scriptSrcs);
    });
