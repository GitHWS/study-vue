<template>
  <the-navigation></the-navigation>
  <main>
    <!-- SECTION - router-view 컴포넌트의 사용 -->
    <!-- NOTE router-view 컴포넌트는 vue-router의 내장 컴포넌트로 라우터 경로에 따른 컴포넌트를 해당 위치에 렌더링하는 역할을 한다. -->
    <!-- !SECTION -->
    <router-view></router-view>
  </main>
  <footer>
    <!-- NOTE 이름있는 뷰의 사용, name 속성이 없는 같은 레벨의 router-view는 name을 작성하지 않아도 자동으로 default라는 name이 설정된다. -->
    <router-view name="footer"></router-view>
  </footer>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
      ],
    };
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
