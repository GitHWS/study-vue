<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['teams', 'users'],
  // SECTION - 라우터로 인해 로드되는 컴포넌트에서 props 전달받기
  // NOTE $route 대신 props를 사용하면 컴포넌트를 재사용하기가 쉬워진다.
  // NOTE 라우터는 기본 설정상 로드된 컴포넌트에 props를 추가하지 않는다. 하지만 라우터를 통해 로드된 컴포넌트에서 props를 필요로 한다면 Router 인스턴스의 해당 라우트 경로의 옵션에 props를 true로 활성화하면 props를 추가할 수 있다.
  // 여기서 props로 전달되는 값은 라우팅이 발생하는 URL 경로의 'params' 값이 자동으로 전달된다. 즉, /teams/:teamId일 경우 teamId가 props로 전달된다.
  props: ['teamId'],
  // !SECTION
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMember(teamId) {
      // SECTION - Router 인스턴스의 라우팅 데이터(동적 경로의 Params)에 $route를 통해 액세스하는 방법
      // NOTE this.$route는 전체 라우팅 데이터에 액세스할 수 있게 해준다.
      // this.$route.params는 입력된 동적 경로의 Params(:teamId)에 접근할 수 있다.
      // const teamId = this.$route.params.teamId;
      // !SECTION
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;

      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  // NOTE created 생명 주기 메서드는 컴포넌트 생성 시 모든 데이터가 사용 가능 상태이며 화면에 표시는 되기 전에 호출된다.
  created() {
    this.loadTeamMember(this.teamId);
    // SECTION - query 옵션을 통해 전달된 쿼리 매개변수 추출
    // NOTE 라우트의 query 옵션을 통해 전달된 쿼리 매개변수를 추출할 때 this.$route.query로 추출할 수 있다.
    // console.log(this.$route.query);
    // !SECTION
  },
  // SECTION - beforeRouteUpdate 컴포넌트 내부 네비게이션 가드
  // NOTE Vue는 라우트가 변경되어 새로운 데이터를 가지고 해당 컴포넌트를 재사용해야할 때마다 beforeRouteUpdate 메서드를 호출한다.
  beforeRouteUpdate(to, from, next) {
    console.log('TeamMembers Component beforeRouteUpdate');
    console.log(to, from);
    // 아래와 같이 해당 메서드를 watcher 역할의 대안으로도 사용할 수 있다. 아래의 코드는 해당 컴포넌트가 라우팅으로 로드가 된 후 컴포넌트를 재사용할 때마다 호출되기 때문에 메서드의 to 인자를 통해 이동할 페이지의 params인 teamId를 loadTeamMember 메서드의 인자로써 전달하고 있다.
    // this.loadTeamMember(to.params.teamId);
    next();
  },

  // SECTION - $route의 변화를 감시하는 감시자 사용
  // NOTE $route의 변화를 감시한다. 즉, 라우트가 변경될 때마다 watcher가 실행된다.
  // watcher는 감시하는 대상의 이름이 함수명이 되며 전달받는 인자는 업데이트가 이루어진 '새로운 값'이 전달된다. 즉 t1 경로에서 t2 경로로 변경되었다면 t2 경로의 라우트가 전달된다.
  // watch: {
  //   $route(newRoute) {
  //     this.loadTeamMember(newRoute);
  //   },
  // },
  // !SECTION
  watch: {
    teamId(newId) {
      this.loadTeamMember(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
