<template>
  <!-- SECTION - transition-group을 사용하여 List에 애니메이션 적용하기 -->
  <!-- 단 하나의 직속 자식 엘리먼트를 다루는 transition 컴포넌트와 다르게 transition-group은 애니메이션을 여러 요소에 동시에 적용할 수 있다. -->
  <!-- 또 transition 컴포넌트의 경우 최종적으로 DOM에 렌더링하는 엘리먼트가 없이 단지 애니메이션을 Vue에게 지시한다. 하지만 transition-group의 경우 DOM에 엘리먼트를 렌더링하는데 tag prop의 값으로 태그명이나 커스텀 컴포넌트를 설정하여 transition-group 컴포넌트를 tag prop에 설정한 태그나 컴포넌트로써 렌더링한다. -->
  <!-- NOTE transition 컴포넌트는 두 엘리먼트 간 교체나 단일 엘리먼트의 애니메이션에 최적화가 되어있으며 transition-group은 여러 엘리먼트에 동시에 애니메이션을 할 때 최적화되어 있으므로 상황에 맞게 사용하면 된다. -->
  <transition-group name="user-list" tag="ul">
    <li v-for="user in users" :key="user" @click="removeUser(user)">
      {{ user }}
    </li>
  </transition-group>
  <!-- !SECTION -->
  <div>
    <input type="text" ref="userNameInput" />
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: ['Max', 'Manu', 'Julie', 'Angela', 'Michael'],
    };
  },
  methods: {
    removeUser(user) {
      this.users = this.users.filter((username) => username !== user);
    },
    addUser() {
      const enteredUserName = this.$refs.userNameInput.value;
      this.users.unshift(enteredUserName);
      this.$refs.userNameInput.value = '';
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

/* NOTE transition-group 또한 transition 컴포넌트와 동일하게 name prop에 설정된 값을 enter-*, leave-*와 같은 특수한 CSS 클래스의 접두사로 사용할 수 있다. */
/* 또한 해당 CSS 클래스를 통해 Vue는 애니메이션의 지속 시간을 인지한다. */
/* NOTE List에서 새로운 엘리먼트가 추가되거나 제거될 때 새 엘리먼트가 들어갈 위치를 만들거나 없앤 엘리먼트의 위치를 채우기 위해 추가/제거되지 않은 기존의 다른 엘리먼트 또한 위치를 변경하는데 이때 부드럽게 추가되지 않고 끊기면서 '점프'하는 현상이 나타나는데 이것을 CSS 클래스를 통해 해결할 수 있다. */
/* {prefix}-move CSS 클래스는 엘리먼트의 추가/제거로 인한 다른 엘리먼트의 위치 재설정을 위한 애니메이션을 설정하는데 사용한다. 해당 클래스의 설정을 통해 Vue가 CSS transform을 사용하여 자동으로 엘리먼트를 재배치한다. */
/* NOTE {prefix}-move 클래스는 위치가 변경되는 엘리먼트에만 추가된다. 예를 들어, 여러 항목 중 중간의 엘리먼트를 제거했을 때 가장 위의 항목은 위치가 변경되지 않아 클래스가 추가되지 않고 제거되는 엘리먼트 아래의 항목의 경우 위치의 재설정이 필요하므로 클래스가 추가된다. */

.user-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.user-list-enter-to,
.user-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.user-list-enter-active {
  transition: all 1s ease-out;
}

/* 단, 엘리먼트 제거 시 여전히 점프 현상이 발생하는데 이를 해결하기 위해 position:absolute를 사용하여 레이아웃 flow에서 나머지 항목을 꺼낸다. */
.user-list-leave-active {
  transition: all 1s ease-in;
  position: absolute;
}

.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.user-list-move {
  transition: transform 0.8s ease;
}
</style>
