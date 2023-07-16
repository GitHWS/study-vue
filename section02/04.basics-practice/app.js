// 👻 My Solution
const app = Vue.createApp({
  data() {
    return {
      inputValue: '',
      InputBackgroundColor: '',
      paraIsVisible: true,
    };
  },
  computed: {
    setParaVisibility() {
      return this.paraIsVisible ? 'visible' : 'hidden';
    },
  },
  methods: {
    toggleParaVisible() {
      this.paraIsVisible = !this.paraIsVisible;
    },
  },
});

app.mount('#assignment');

// 🔥 Solution

// const app = Vue.createApp({
//   data() {
//     return {
//       inputClass: '',
//       paragraphIsVisible: true,
//       inputBackgroundColor: '',
//     };
//   },
//   computed: {
//     paraClasses() {
//       return {
//         user1: this.inputClass === 'user1',
//         user2: this.inputClass === 'user2',
//         visible: this.paragraphIsVisible,
//         hidden: !this.paragraphIsVisible,
//       };
//     },
//   },
//   methods: {
//     toggleParagraphVisibility() {
//       this.paragraphIsVisible = !this.paragraphIsVisible;
//     },
//   },
// });

// app.mount('#assignment');
