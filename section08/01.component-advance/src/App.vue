<template>
  <div>
    <!-- NOTE 케밥 케이스의 컴포넌트 작성 시 셀프 클로징 태그를 사용할 수 없고, 파스칼 케이스의 컴포넌트 작성 시 셀프 클로징 태그를 사용할 수 있다. -->
    <!-- <the-header></the-header> -->
    <TheHeader />
    <!-- <badge-list></badge-list> -->
    <!-- <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"></user-info> -->
    <!-- slotProps라는 임의의 slot의 props에서 Course-goals 컴포넌트의 템플릿에서 전달된 item prop을 참조하고 있다. -->
    <!-- NOTE dash 기호가 있는 slotProp의 경우 카멜 케이스로 해석이 된다. dash 기호가 있는 대괄호 표기법으로도 접근할 수 없다. 반드시 카멜 케이스로 접근해야한다. -->
    <!-- <course-goals #default="slotProps">
      <h2>{{ slotProps.item }}</h2>
      <p>{{ slotProps.anotherProp }}</p>
    </course-goals> -->
    <button @click="setSelectedComponent('active-goals')">Active Goals</button>
    <button @click="setSelectedComponent('manage-goals')">Manage Goals</button>
    <!-- v-if를 사용해서 selectedComponent의 값에 따라 다른 컴포넌트를 동적으로 렌더링할 수 있으나 수가 많을 때 번거로울 수 있다. -->
    <!-- <active-goals v-if="selectedComponent === 'active-goals'"></active-goals>
    <manage-goals v-if="selectedComponent === 'manage-goals'"></manage-goals> -->
    <!-- 그럴 땐 component라는 Vue의 특수한 엘리먼트와 Vue의 특수한 속성 is를 통해 동적인 컴포넌트 바인딩을 할 수 있다. -->
    <!-- is 속성은 component 요소의 자리에 정의한 컴포넌트 중 어떤 컴포넌트를 보여줄지 Vue에게 알려줌으로써 동적 컴포넌트 바인딩을 할 수 있다. -->
    <!-- keep-alive 태그는 Vue의 특수한 태그로 내부에 래핑된 동적으로 토글되는 컴포넌트를 캐시한다. 즉, 토글이 동작하여 DOM에서 사라지는 컴포넌트를 캐시하여 다시 토글이 동작해서 사라진 컴포넌트가 나타날 때 이전의 데이터를 그대로 유지하게 만들어준다. -->
    <keep-alive>
      <component :is="selectedComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
// NOTE 지역 컴포넌트(Local Component)로의 등록
// 지역 컴포넌트는 하나의 컴포넌트에서만 사용하는 컴포넌트가 있는 경우 사용을 고려하면 좋다.
import TheHeader from './components/layout/TheHeader.vue';
// import BadgeList from './components/BadgeList.vue';
// import UserInfo from './components/UserInfo.vue';
// import CourseGoals from './components/CourseGoals.vue';
import ManageGoals from './components/ManageGoals.vue';
import ActiveGoals from './components/ActiveGoals.vue';

export default {
  // NOTE 지역 컴포넌트(Local Component)로 등록한 컴포넌트의 사용(커스텀 HTML 태그명 : 컴포넌트 구성객체)
  // components: {
  //   'the-header': TheHeader,
  // },
  // NOTE key-value 형태가 아닌 아래와 같이 입력해도 파스칼 케이스인 것을 케밥 케이스로 자동으로 번역한다(TheHeader => the-header). 당연히 케밥 케이스만 아닌 파스칼 케이스로도 컴포넌트의 사용이 가능하다.
  components: {
    TheHeader,
    // BadgeList,
    // UserInfo,
    // CourseGoals,
    ManageGoals,
    ActiveGoals,
  },
  data() {
    return {
      selectedComponent: 'active-goals',
      activeUser: {
        name: 'Maximilian Schwarzmüller',
        description: 'Site owner and admin',
        role: 'admin',
      },
    };
  },
  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp;
    },
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
