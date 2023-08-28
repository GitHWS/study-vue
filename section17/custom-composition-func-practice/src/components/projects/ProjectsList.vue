<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
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

<script>
import { computed, watch, toRefs } from 'vue';

import ProjectItem from './ProjectItem.vue';
import useSearch from '../../hooks/search';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  setup(props) {
    // SECTION 공통 로직을 Custom Composition Function으로 대체
    const { user } = toRefs(props);

    // NOTE Props 객체 자체는 반응형이나 내부 프로퍼티에 직접 접근 시 순수 데이터이므로 computed 함수를 통해 Vue가 Props 내부 프로퍼티의 변화를 감지할 수 있도록 한다.
    const projects = computed(() => {
      return user.value ? user.value.projects : [];
    });

    const { enteredSearchTerm, availableItems, updateSearch } = useSearch(
      // NOTE 초기 값이 null일 경우 Custom Hook에서 사용하는 메서드로부터 에러가 발생하므로 변수/상수 Helper를 사용하여 조건부로 값을 설정해서 사용한다.
      projects,
      'title'
    );

    // const enteredSearchTerm = ref('');
    // const activeSearchTerm = ref('');

    // const availableProjects = computed(function () {
    //   if (activeSearchTerm.value) {
    //     return props.user.projects.filter((prj) =>
    //       prj.title.includes(activeSearchTerm.value)
    //     );
    //   }
    //   return props.user.projects;
    // });

    // watch(enteredSearchTerm, function (newValue) {
    //   setTimeout(() => {
    //     if (newValue === enteredSearchTerm.value) {
    //       activeSearchTerm.value = newValue;
    //     }
    //   }, 300);
    // });

    // function updateSearch(val) {
    //   enteredSearchTerm.value = val;
    // }

    // !SECTION

    const hasProjects = computed(function () {
      return user.value.projects && availableItems.value.length > 0;
    });

    // const propsWithRefs = toRefs(props);
    // const user = propsWithRefs.user;

    watch(user, function () {
      // NOTE Custom Hook을 사용한 컴포넌트에서 Custom Hook 내부에 정의된 ref나 요소를 직접 바꾸는 것은 가능하나 전체적인 코드의 파악에 어려움을 줄 수 있기 때문에 지양하는 것이 좋다. 그러므로 Custom Hook 내부에 별도의 업데이트 함수를 정의하여 컴포넌트에서 사용하는 것이 좋다.
      // enteredSearchTerm.value = '';
      updateSearch('');
    });

    return {
      enteredSearchTerm,
      availableProjects: availableItems,
      hasProjects,
      updateSearch,
    };
  },
  // data() {
  //   return {
  //     enteredSearchTerm: '',
  //     activeSearchTerm: '',
  //   };
  // },
  // computed: {
  //   hasProjects() {
  //     return this.user.projects && this.availableProjects.length > 0;
  //   },
  //   availableProjects() {
  //     if (this.activeSearchTerm) {
  //       return this.user.projects.filter((prj) =>
  //         prj.title.includes(this.activeSearchTerm)
  //       );
  //     }
  //     return this.user.projects;
  //   },
  // },
  // methods: {
  //   updateSearch(val) {
  //     this.enteredSearchTerm = val;
  //   },
  // },
  // watch: {
  //   enteredSearchTerm(val) {
  //     setTimeout(() => {
  //       if (val === this.enteredSearchTerm) {
  //         this.activeSearchTerm = val;
  //       }
  //     }, 300);
  //   },
  //   user() {
  //     this.enteredSearchTerm = '';
  //   },
  // },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
