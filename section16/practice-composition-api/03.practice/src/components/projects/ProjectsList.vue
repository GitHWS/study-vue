<template>
  <base-container v-if="props.user">
    <h2>{{ props.user.fullName }}: Projects</h2>
    <base-search
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <!-- <base-search
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search> -->
    <ul v-if="hasProjects">
      <project-item
        v-for="prj in availableProjects"
        :key="prj.id"
        :title="prj.title"
      ></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue';

import ProjectItem from './ProjectItem.vue';

const props = defineProps(['user']);

const enteredSearchTerm = ref('');
const activeSearchTerm = ref('');

const hasProjects = computed(() => {
  return props.user.projects && availableProjects.value.length > 0;
});

const availableProjects = computed(() => {
  if (activeSearchTerm.value) {
    return props.user.projects.filter((prj) =>
      prj.title.includes(activeSearchTerm.value)
    );
  }
  return props.user.projects;
});

const updateSearch = (val) => {
  enteredSearchTerm.value = val;
};

watch(enteredSearchTerm, (newValue) => {
  setTimeout(() => {
    if (newValue === enteredSearchTerm.value) {
      activeSearchTerm.value = newValue;
    }
  }, 300);
});

// NOTE watch 함수에 props.property를 감시할 때 주의할 점
// watch 함수의 감시하는 대상으로 반드시 ref와 reactive와 같은 '반응형 객체'여야한다. 여기선 props 자체로는 반응형이지만 prop의 내부 프로퍼티의 데이터에 접근 시 해당 값은 비반응형인 '순수한 값'이다. 이러한 이유로 Vue가 비반응형 데이터를 감시를 못한다.
// 그러므로 아래의 방법 중 상황에 따라 하나를 선택하여 사용할 수 있다.
// NOTE 1. toRefs 메서드를 사용하여 반응형 객체로 변환하여 인자로 전달 - 감시해야할 props가 여러 개일 때 유용
// const { user } = toRefs(props);
// watch(user, () => {
//   enteredSearchTerm.value = '';
// });
// NOTE 2. 값을 반환하는 익명의 getter 함수를 사용하여 인자로 전달 - 감시해야할 props가 여러 개일 때 유용
// watch(() => props.user, () => {
//   enteredSearchTerm.value = '';
// });
// NOTE 3. 감시할 대상인 props의 값이 하나일 때 props 객체 자체를 인자로 전달
watch(props, () => {
  enteredSearchTerm.value = '';
});

// SECTION Options API
// export default {
//   components: {
//     ProjectItem,
//   },
//   props: ['user'],
//   data() {
//     return {
//       enteredSearchTerm: '',
//       activeSearchTerm: '',
//     };
//   },
//   computed: {
//     hasProjects() {
//       return this.user.projects && this.availableProjects.length > 0;
//     },
//     availableProjects() {
//       if (this.activeSearchTerm) {
//         return this.user.projects.filter((prj) =>
//           prj.title.includes(this.activeSearchTerm)
//         );
//       }
//       return this.user.projects;
//     },
//   },
//   methods: {
//     updateSearch(val) {
//       this.enteredSearchTerm = val;
//     },
//   },
//   watch: {
//     enteredSearchTerm(val) {
//       setTimeout(() => {
//         if (val === this.enteredSearchTerm) {
//           this.activeSearchTerm = val;
//         }
//       }, 300);
//     },
//     user() {
//       this.enteredSearchTerm = '';
//     },
//   },
// };
// !SECTION
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
