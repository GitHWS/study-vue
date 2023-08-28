import { ref } from 'vue';

// NOTE Custom Compositon Function은 use라는 접두어가 붙으며 해당 함수 내에서 Compositon API의 기능(ref 등)을 사용할 수 있다.
// NOTE Custom Compositon Function은 함수로써 인자를 전달받아 사용하는 컴포넌트마다 다른 결과값을 반환하여 유연하게 사용할 수 있다.
export default function useAlert(startingVisibility = false) {
  const alertIsVisible = ref(startingVisibility);

  function showAlert() {
    alertIsVisible.value = true;
  }

  function hideAlert() {
    alertIsVisible.value = false;
  }

  // NOTE Custom Composition Function은 외부에서 사용하기 위해 반환값을 가지며 반환값의 형태는 객체, 배열도 가능하다.
  return [alertIsVisible, showAlert, hideAlert];
}
