class QueryRepository {
    getQuery() {
        const params = document.location.search.slice(1);
        if (params === "") { return undefined; }

        const query = params.split("&")
            .map((pair) => pair.split("="))
            .find((pair) => pair[0] === "q")

        if (query === undefined) { return undefined; }
        return query[1];
    }
}

Vue.prototype.$queryRepository = new QueryRepository();
