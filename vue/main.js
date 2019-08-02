const Vue = require('vue');
const app = require('./components/app.vue');
new Vue({
    el: '#app',
    render: (h) => h(app)
})