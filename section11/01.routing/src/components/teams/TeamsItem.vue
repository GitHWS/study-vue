<template>
  <li>
    <h3>{{ name }}</h3>
    <div class="team-members">{{ memberCount }} Members</div>
    <router-link :to="teamMembersLink">View Members</router-link>
  </li>
</template>

<script>
export default {
  props: ['id', 'name', 'memberCount'],
  computed: {
    teamMembersLink() {
      // return '/teams/' + this.id + '?sort=asc';
      // SECTION 이름있는 경로(name 옵션을 사용하는 라우트)를 router-link의 to 속성에 전달하여 해당 경로를 연결할 수 있다.
      // name 옵션을 통해 해당 라우트 경로를 받아와서 router-link의 to 속성에 전달한다.
      // NOTE 중첩된 자식 라우트의 name을 전달했어도 전달되는 동적 세그먼트의 이름과 사용될 값을 params 옵션을 통해 객체 형식으로 전달해야한다.
      // NOTE 이름있는 경로를 중첩 라우터에 사용 시 가독성과 유지 관리가 용이하며 특히 name 옵션의 값에 따라 경로를 설정하기 때문에 부모 라우트의 path 옵션이 변경되었을 때 중첩 라우트의 경로를 번거롭게 수정하지 않아도 된다는 장점이 있다.
      // NOTE 또한 추가적으로 필요한 정보를 컴포넌트에 전달하기 위해 선택적으로 쿼리 매개변수를 객체 형태로 query 옵션을 통해 통해 전달할 수 있다.
      // NOTE query로 전달된 매개변수는 this.$route의 query로만 추출할 수 있다. props의 형태로 추출할 수 없다.
      // 아래의 라우트는 our-domain.com/teams/t1?sort=asc가 된다.
      return {
        name: 'team-members',
        params: { teamId: this.id },
        query: { sort: 'asc' },
      };
      // NOTE 이름있는 경로의 경우 프로그래밍적 방식($router.push 메서드)에서도 사용할 수 있다.
      // vue-router는 전달한 객체를 분석해서 설정된 라우트와 비교한 후 로드할 라우트와 컴포넌트에 대한 올바른 경로를 생성한다.
      // this.$router.push({ name: 'team-members', params: { teamId: this.id }})
      // !SECTION
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;
}
</style>
