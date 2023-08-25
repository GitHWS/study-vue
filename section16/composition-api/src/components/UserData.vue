<template>
  <div>
    <h2>{{ userName }}</h2>
    <h2>{{ age }}</h2>
  </div>
</template>
<script>
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  props: ['firstName', 'lastName'],
  emits: ['save-data'],
  setup(props, context) {
    const userName = computed(() => props.firstName + ' ' + props.lastName);

    // context.emit을 사용하여 커스텀 이벤트 사용
    context.emit('save-data', 1);

    // provide-inject
    const age = inject('userAge');

    // Composition API가 지원하는 생명 주기 함수 - beforeCreate, Created 훅은 Composition API의 setup 메서드와 속성이 해당 시점에 실행되기 때문에 대체가 가능하여 존재하지 않는다.
    onBeforeMount(() => {
      console.log('onBeforeMount');
    });
    onMounted(() => {
      console.log('onMounted');
    });
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    });
    onUpdated(() => {
      console.log('onUpdated');
    });
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    });
    onUnmounted(() => {
      console.log('onUnmounted');
    });

    return { userName, age };
  },
};
</script>
<style></style>
