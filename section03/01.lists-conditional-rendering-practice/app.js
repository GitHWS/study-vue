const app = Vue.createApp({
  data() {
    return {
      enteredTask: '',
      tasks: [],
      listIsVisible: true,
    };
  },
  computed: {
    toggleButtonCaption() {
      return this.listIsVisible ? 'Hide' : 'Show';
    },
  },
  methods: {
    addTask() {
      if (this.enteredTask.trim() === '') {
        alert('Please enter your task!');
      } else {
        this.tasks.push(this.enteredTask);
        this.enteredTask = '';
      }
    },
    toggleListVisibility() {
      this.listIsVisible = !this.listIsVisible;
    },
  },
});

app.mount('#assignment');
