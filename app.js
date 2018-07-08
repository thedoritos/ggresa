Vue.component('esa-post', {
    props: ['post'],
    template: '<li>{{ post.title }}</li>'
});

new Vue({
    el: "#app",
    data: {
        searchResults: []
    },
    methods: {
        search: function() {
            const query = "Android";

            this.$optionsRepository.fetchOptions()
                .then((options) => {
                    return this.$postsRepository.fetchPosts(query, options)
                })
                .then((posts) => {
                    this.searchResults = posts;
                });
        }
    },
    mounted: function() {
        this.search();
    }
});
