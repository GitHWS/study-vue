<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  // SECTION - 선언적 탐색 방식 vs 프로그래밍적 탐색 방식
  // NOTE router-link처럼 클릭을 통해 이동하는 방식(선언 방식) 말고도 프로그램 자체에서 이동해야 할 때 '프로그래밍 방식'으로 이동할 수 있다. 예를 들어 어떠한 작업이 끝나면 현재 위치를 벗어나야할 때 프로그래밍 방식을 활용할 수 있다.
  // NOTE Vue 앱 인스턴스 내부에서 this.$router를 통해 라우터 인스턴스에 접근할 수 있다. this.$router로 인스턴스에 접근하고 push 메서드의 인자로 String 타입의 경로를 전달하면 해당 경로를 라우팅 히스토리에 푸시하고 그 경로로 탐색을 진행한다.
  // LINK https://router.vuejs.kr/guide/essentials/navigation.html#programmatic-navigation
  // LINK https://router.vuejs.kr/api/interfaces/Router.html#interface-router
  // 위의 링크에서 해당 라우터 인스턴스에서 사용할 수 있는 탐색 메서드(back, forward 등)을 볼 수 있다.
  // !SECTION
  methods: {
    confirmInput() {
      // do something...
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  // SECTION - 컴포넌트 내부 네비게이션 가드
  // 컴포넌트 내부에 네비게이션 가드 추가할 수 있다.

  // SECTION - beforeRouteEnter
  // NOTE beforeRouteEnter '메서드가 먼저 호출된 후' 이 컴포넌트로의 이동이 승인된다.
  // NOTE 이 컴포넌트로의 이동이 승인되기 전에 해당 메서드의 내부 코드가 모두 실행되기 때문에 next 함수를 호출하여 페이지로의 이동을 승인하거나 거부 또는 리디렉션을 할 수 있다.
  beforeRouteEnter(to, from, next) {
    console.log('UserList component beforeRouteEnter');
    console.log(to, from);
    next();
  },
  // SECTION - 네비게이션 가드, leave
  // NOTE leave 네비게이션 가드는 사용자가 페이지를 떠나려 할 때 호출되는 가드이다. 당연히 한 페이지를 떠나서 다른 페이지로 이동할 경우 before로 시작하는 가드들이 모두 호출되나 떠나기 직전에 기존 컴포넌트에서 어떠한 코드를 실행해야할 때 유용하게 사용할 수 있다.
  // 또한 페이지를 떠나는 것을 거부해야할 때도 사용할 수 있다.
  // 예를 들어, 컴포넌트 내 form 태그가 있는데 페이지를 떠날 경우 아직 저장되지 않는 데이터는 사라질 수 있으니 확실히 저장하라고 사용자에게 알리는 등의 작업을 할 수 있다.
  // 이를 통해 데이터 유실 상황에 대해 예방할 수 있어 사용자 경험을 크게 개선할 수 있다.
  // NOTE 아래의 예는 form 태그에 입력된 데이터를 저장하지 않고 페이지를 이동할 때 상황을 가정한다.
  beforeRouteLeave(to, from, next) {
    console.log('UsersList Component beforeRouteLeave');
    console.log(to, from);

    // form에 입력된 변경된 데이터의 저장했는지(this.changesSaved)에 따라 페이지의 이동을 승인하거나 거부한다.
    if (this.changesSaved) {
      // 변경된 데이터를 저장한 상태라면 페이지 이동을 승인한다.
      next();
    } else {
      // 변경된 데이터를 저장하지 않은 상태라면 prompt의 사용자 응답에 따라 페이지 이동을 승인하거나 거부한다.
      const userWantToLeave = confirm('Are you sure? You got unsaved changes!');
      next(userWantToLeave);
    }
  },
  // !SECTION

  // NOTE unmouted 생명주기 메서드의 경우 leave 네비게이션 가드와 동일하게 사용자가 페이지를 떠날 때 내부 코드를 실행한다.
  // NOTE 하지만 unmounted는 페이지의 이동이 승인된 후 실행이 된 것이기 때문에 페이지의 이동을 취소할 수가 없다.
  unmounted() {
    console.log('unmounted');
  },

  // !SECTION
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
