import { ref, computed, watch } from 'vue';

// NOTE props를 통해 받는 데이터의 경우 Custom Hook의 인자를 통해 받아 사용할 수 있다.
export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(function () {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      // NOTE Custom Hook에서 컴포넌트마다 함수의 로직이 다를 경우 각 컴포넌트에서 실행할 로직이 정의된 함수를 직접 인자(filterFn)를 통해 받아 사용할 수 있다.
      // filteredItems = items.filter(filterFn);
      // NOTE 만약 동일한 로직을 사용하나 컴포넌트마다 다른 프로퍼티의 데이터를 추출해야하는 경우 동적 프로퍼티명를 함수의 인자(searchProp)로 받아 사용할 수 있다.
      filteredItems = items.value.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, function (newValue) {
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
}
