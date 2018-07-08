Vue.component('esa-post', {
    props: ['post'],
    template: '<li class="esa-post">' +
      '<h3><a :href=post.url>{{ post.title }}</a></h3>' +
      'by <span>{{ post.author }}</span> at <span>{{ post.date }}</span>' +
      '</li>'
});

new Vue({
    el: "#app",
    data: {
        searchResults: []
    },
    methods: {
        search: function() {
            const query = this.$queryRepository.getQuery();

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
