<template>
  <section>
    <header>
      <h1>My Friends</h1>
    </header>
    <new-friend @add-contact="addContact"></new-friend>
    <ul>
      <!-- 자식 컴포넌트에 props를 전달 시 케밥 케이스를 사용하는 것이 관례이다. -->
      <!-- v-bind:(:) 디렉티브를 사용하여 동적 프로퍼티 바인딩을 하여 문자열로 전달하던 props를 JavaScript 표현식과 불리언과 같은 문자열이 아닌 값을 전달하는데 유용하게 사용할 수 있다. -->
      <!-- v-for와 v-bind 디렉티브를 사용하여 동적 바인딩을 적용하면 적은 코드로 컴포넌트의 사용을 극대화할 수 있다. -->
      <friend-contact
        v-for="friend in friends"
        :key="friend.id"
        :id="friend.id"
        :name="friend.name"
        :phone-number="friend.phone"
        :email-address="friend.email"
        :is-favorite="friend.isFavorite"
        @toggle-favorite="toggleFavoriteStatus"
        @delete="deleteContact"></friend-contact>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          id: 'manuel',
          name: 'Manuel Lorenz',
          phone: '0123 45678 90',
          email: 'manuel@localhost.com',
          isFavorite: true,
        },
        {
          id: 'julie',
          name: 'Julie Jones',
          phone: '0987 654421 21',
          email: 'julie@localhost.com',
          isFavorite: false,
        },
      ],
    };
  },
  methods: {
    // 자식 컴포넌트의 $emit 메서드의 두번째 인자로 설정된 값은 이 메서드의 첫번째 인자가 된다.
    // 커스텀 이벤트에 등록된 메서드로 인해 데이터가 변경 시 Vue가 이를 감지하여 업데이트된 데이터를 확인하고 다시 자식 컴포넌트로 전달하여 UI를 업데이트한다.
    toggleFavoriteStatus(friendId) {
      const identifiedFriend = this.friends.find(
        (friend) => friend.id === friendId
      );
      identifiedFriend.isFavorite = !identifiedFriend.isFavorite;
    },
    addContact(name, phone, email) {
      const newFriendContact = {
        id: new Date().toISOString(),
        name,
        phone,
        email,
        isFavorite: false,
      };
      this.friends.push(newFriendContact);
    },
    deleteContact(friendId) {
      this.friends = this.friends.filter((friend) => friend.id !== friendId);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: 'Jost', sans-serif;
}
body {
  margin: 0;
}
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app li,
#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}
#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}
#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
#app input {
  font: inherit;
  padding: 0.15rem;
}
#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}
#app form div {
  margin: 1rem 0;
}
</style>
