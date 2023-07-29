<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences"
          >Load Submitted Experiences</base-button
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">
        {{ error }}
      </p>
      <p v-else-if="!isLoading && (!results || results.length === 0)">
        No stored experiences found. Start adding some survey results first.
      </p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      this.error = null;
      // NOTE HTTP 요청 작업이 진행되는 동안 JavaScript는 이전 코드의 결괏값이 도착할 때까지 코드 실행을 멈추고 기다리는 언어가 아니다.
      // NOTE fetch는 Promise를 반환한다. fetch는 데이터가 도착하면 이를 수신할 수 있는 객체를 반환하고 그 후 데이터가 도착했을 때 코드를 설정 및 실행한다.
      // NOTE then 메서드는 fetch에서 결과값이 반환되었을 때 인자로 받은 함수를 실행한다.
      fetch(
        'https://vue-http-demo-f4838-default-rtdb.firebaseio.com/surveys.json'
      )
        .then((response) => {
          // 성공적인 요청이라면 아래의 실행문을 실행한다.
          if (response.ok) {
            // then 블록 내에서의 작업에도 Promise를 반환한다.
            return response.json();
          }
        })
        // 위에서 반환한 Promise가 완료되었을 때 트리거된다.
        .then((data) => {
          this.isLoading = false;
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              name: data[id].name,
              rating: data[id].rating,
            });
          }
          this.results = results;
        })
        // NOTE 데이터 베이스의 패칭(브라우저로부터 발생한 기술적 에러)하는 then 메서드에서 에러가 발생 시(HTTP 요청 실패 시)마다 에러를 포착하여 트리거된다.
        // NOTE 하지만 서버 사이드로부터 발생하는 에러(4xx, 5xx 에러와 같은 서버 문제로 인해 생성된 에러)는 해당 catch 메서드가 포착할 수 없다.
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.error = 'Failed to fetch data - please try again later.';
        });
    },
  },
  // NOTE 해당 컴포넌트가 마운트 완료 시 생명주기 메서드(mounted) 내의 코드를 실행한다.
  mounted() {
    this.loadExperiences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
