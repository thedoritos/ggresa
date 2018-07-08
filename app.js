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
            this.searchResults = [
                { id: 0, title: "Android DataBinding Overview" },
                { id: 1, title: "Spek: Test Your App Today" },
                { id: 2, title: "RxAndroid is dead. Long live LiveData" }
            ];
        }
    },
    mounted: function() {
        this.search();
    }
});
