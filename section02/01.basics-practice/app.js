const app = Vue.createApp({
  data() {
    return {
      me: {
        name: 'Hyunwoo',
        age: 29,
      },
      imgUrl:
        'https://images.unsplash.com/photo-1611462985358-60d3498e0364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      inputValue: 'Hello, Vue',
      someHtml: '<h2>Vue VS React</h2>',
    };
  },
  methods: {
    after5years() {
      return this.me.age + 5;
    },
  },
});

app.mount('#assignment');
