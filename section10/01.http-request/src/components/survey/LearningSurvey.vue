<template>
  <section>
    <base-card>
      <h2>How was you learning experience?</h2>
      <form @submit.prevent="submitSurvey">
        <div class="form-control">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" v-model.trim="enteredName" />
        </div>
        <h3>My learning experience was ...</h3>
        <div class="form-control">
          <input
            type="radio"
            id="rating-poor"
            value="poor"
            name="rating"
            v-model="chosenRating"
          />
          <label for="rating-poor">Poor</label>
        </div>
        <div class="form-control">
          <input
            type="radio"
            id="rating-average"
            value="average"
            name="rating"
            v-model="chosenRating"
          />
          <label for="rating-average">Average</label>
        </div>
        <div class="form-control">
          <input
            type="radio"
            id="rating-great"
            value="great"
            name="rating"
            v-model="chosenRating"
          />
          <label for="rating-great">Great</label>
        </div>
        <p v-if="invalidInput">
          One or more input fields are invalid. Please check your provided data.
        </p>
        <p v-if="error">{{ error }}</p>
        <div>
          <base-button>Submit</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      enteredName: '',
      chosenRating: null,
      invalidInput: false,
      error: null,
    };
  },
  // emits: ['survey-submit'],
  methods: {
    submitSurvey() {
      if (this.enteredName === '' || !this.chosenRating) {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;

      // NOTE : 데이터베이스에 저장하기 때문에 주석 처리
      // this.$emit('survey-submit', {
      //   userName: this.enteredName,
      //   rating: this.chosenRating,
      // });
      this.error = null;
      fetch(
        'https://vue-http-demo-f4838-default-rtdb.firebaseio.com/surveys.json',
        {
          // NOTE : 기본적으로 GET 요청, 'POST', 'DELETE', 'PUT' 등의 요청으로 변경할 수 있다.
          method: 'POST',
          // NOTE : POST 요청에 메타 데이터를 추가, 'Content-Type': 'application/json'로 JSON 형식의 일부 데이터가 요청에 추가된 걸 서버에 알린다.
          headers: {
            'Content-Type': 'application/json',
          },
          // NOTE : 데이터베이스에 추가하려는 데이터를 JSON.stringify 메서드로 일반 JavaScript 객체를 JSON 형태로 변환하여 추가한다.
          body: JSON.stringify({
            name: this.enteredName,
            rating: this.chosenRating,
          }),
        }
        // NOTE 브라우저 내에서 발생하는 기술적인 오류의 경우 catch 메서드가 포착할 수 있으나 서버 사이드로부터 발생하는 에러(4xx, 5xx 에러와 같은 서버 문제로 인해 생성된 에러)는 catch 메서드가 포착할 수 없다.
        // NOTE 그래서 then 메서드를 통해 해당 응답이 정상적으로 이루어졌는지에 대해 먼저 확인 후 로직을 계속 진행하거나 에러를 발생시킨다.
      )
        .then((response) => {
          // response의 ok 프로퍼티로 서버 사이드의 요청이 정상적으로 이루어졌는지에 대한 확인이 가능하다.
          if (response.ok) {
            // HTTP 요청이 정상적으로 진행되었을 때 해당 로직을 실행한다.
          } else {
            // 4xx, 5xx 상태 코드가 응답으로 반환되었을 때 에러를 발생시킨다. Error 생성자는 자동으로 catch 메서드가 인식하게 하여 이 생성자에 인자로 전달된 문자열은 아래 catch문의 error 인자의 message 프로퍼티의 값으로 전달된다.
            throw new Error('Could not save data!');
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        });

      this.enteredName = '';
      this.chosenRating = null;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
</style>
