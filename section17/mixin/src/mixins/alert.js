// NOTE 강의 내에서 Failed to resolve ~ 경고가 출력된다 -> 현재 mixin에서 재사용할 컴포넌트 참조와 컴포넌트를 components 옵션에 추가하는 것은 경고가 출력되지 않고 정상적으로 동작한다.
import UserAlert from '../components/UserAlert.vue';

export default {
  components: {
    UserAlert,
  },
  data() {
    return {
      alertIsVisible: false,
    };
  },
  methods: {
    showAlert() {
      this.alertIsVisible = true;
    },
    hideAlert() {
      this.alertIsVisible = false;
    },
  },
};
