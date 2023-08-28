// NOTE 전역 Mixin은 모든 컴포넌트에 영향을 미치게 되며 주로 생명 주기 메서드와 함께 사용한다. 사용의 예로 컴포넌트가 마운트할 때마다 실행하는 로깅(Logging) 기능이나 분석 기능이 있다.
export default {
  mounted() {
    console.log('마운트되었습니다.');
  },
};
