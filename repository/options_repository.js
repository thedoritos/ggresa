class OptionsRepository {
    fetchOptions() {
        return new Promise((resolve, reject) => {
            const metas = Array.from(document.getElementsByTagName("meta"));
            const options = { "accessToken": undefined, "teamId": undefined };

            Object.keys(options).forEach((key) => {
                const meta = metas.find((meta) => meta.name === key);
                options[key] = meta.content;
            });

            resolve(options);
        });
    }
}

Vue.prototype.$optionsRepository = new OptionsRepository();
