const googleContainerId = "rcnt";
const googleContainer = document.getElementById(googleContainerId)

const appContainer = document.createElement("div");
appContainer.setAttribute("class", "app-container");
googleContainer.appendChild(appContainer);

const fetchOptions = function() {
    return new Promise((resolve) => {
        chrome.storage.sync.get({
            accessToken: "",
            teamId: ""
        }, (options) => {
            resolve(options);
        });
    });
};

fetchOptions()
    .then((options) => {
        // Inject options.
        Object.keys(options)
            .forEach((key) => {
                const meta = document.createElement("meta");
                meta.setAttribute("name", key);
                meta.setAttribute("content", options[key]);
                document.head.appendChild(meta);
            })
    })
    .then(() => {
        const appHtmlURL = chrome.runtime.getURL("app.html");
        return fetch(appHtmlURL)
    })
    .then((response) => { return response.text(); })
    .then((html) => {
        appContainer.innerHTML = html;

        // Inject scripts.
        const scriptSrcs = [
            "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
            chrome.runtime.getURL("repository/options_repository.js"),
            chrome.runtime.getURL("repository/posts_repository.js"),
            chrome.runtime.getURL("app.js")
        ];

        const appDiv = document.getElementById("app");
        const appDivContainer = appDiv.parentElement;

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
