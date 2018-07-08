class PostsRepository {
    fetchPosts(query, options) {
        const path = "https://api.esa.io/v1/teams/" + options.teamId + "/posts?q=" + query;
        const requestOptions = { headers: { "Authorization": "Bearer " + options.accessToken } };

        return fetch(path, requestOptions)
            .then((response) => { return response.json(); })
            .then((json) => {
                return json.posts.map((post) => {
                    return {
                        id: post.number,
                        title: post.name,
                        url: post.url,
                        date: post.updated_at,
                        author: post.created_by.screen_name
                    };
                });
            });
    }
}

Vue.prototype.$postsRepository = new PostsRepository();
