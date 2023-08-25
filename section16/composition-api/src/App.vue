<template>
  <section class="container">
    <!-- NOTE template는 반응형 값을 사용 시 해당 반응형 객체의 value 프로퍼티를 Vue가 확인하여 가져오기 때문에 직접 value 프로퍼티에 접근할 필요가 없다.-->
    <!-- <h2>{{ userName }}</h2> -->
    <!-- <h3>{{ age }}</h3> -->
    <!-- <h2>{{ user.name }}</h2> -->
    <!-- <h3>{{ user.age }}</h3> -->
    <user-data :first-name="firstName" :last-name="lastName"></user-data>
    <button @click="setAge">Change age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" ref="lastNameInput" />
      <button @click="setLastName">Set Last Name</button>
    </div>
  </section>
</template>

<script>
// SECTION Options API
// export default {
// data() {
//   return {
//     userName: 'Maximilian',
//   };
// },
// methods: {
//  setNewAge(){
//    this.age = 32;
//  }
// },
// };
// !SECTION

// SECTION Composition API
// import { ref, isRef, isReactive, toRefs } from 'vue';
import { ref, reactive, computed, watch, provide } from 'vue';
import UserData from './components/UserData.vue';

export default {
  components: {
    UserData,
  },
  // NOTE setup 메서드가 data(), computed, watcher, methods 옵션을 통합하여 대체한다.
  setup() {
    // SECTION ref 함수의 사용 방법
    // NOTE ref 함수는 인자를 받아 해당 인자의 값을 저장하는 반응형 객체를 가지는데 이 객체를 Vue가 감시하여 변화가 감지되면 DOM 업데이트를 진행한다.
    // const uName = ref('Maximilian');
    // const uAge = ref(31);
    // NOTE 반응형 값 업데이트 시 value 프로퍼티에 접근하여 할 수 있다.
    // setTimeout(() => {
    //   uName.value = 'Max';
    //   uAge.value = 32;
    // }, 2000);
    // NOTE 활용할 반응형 값의 경우 반드시 객체 형태로 반환하여 template 내에서 사용할 수 있다.
    // return { userName: uName, age: uAge };
    // !SECTION
    // SECTION ref 함수와 객체 인자의 사용 방법
    // const user = ref({
    //   name: 'Maximilian',
    //   age: 31,
    // });
    // setTimeout(() => {
    //   user.value.name = 'Max';
    //   user.value.age = 32;
    // }, 2000);
    // NOTE 직접 반응형 객체 내부의 정보인 name과 age에 접근하여 가져오는 userName과 age이기 때문에 Vue는 반응성이 없는 단순한 String, Number로 인지한다. 그러므로 해당 값을 template에서 사용 시 setTimeout으로 인한 값 재할당으로 인해 업데이트가 진행되지 않는다.
    // NOTE 반응성을 가지지 않는 String, Number 값이 아닌 가공되지 않는 반응형 객체 자체를 template에 제공하면 반응성을 유지할 수 있다.
    // return { userName: user.value.name, age: user.value.age, user: user };
    // !SECTION
    // SECTION reactive 함수의 사용 방법 & 반응형 확인 Helper
    // NOTE reactive 함수는 다양한 값을 인자로 가지는 ref 함수와 다르게 '객체'만 인자로 가지는 함수이다.
    // const uName = ref('Maximilian');
    const uAge = ref(31);
    const firstName = ref('');
    const lastName = ref('');
    const lastNameInput = ref(null);
    // NOTE Composition API에서 computed 함수는 계산된 값을 반환하는 함수이다.
    const fullName = computed(() => firstName.value + ' ' + lastName.value);
    const user = reactive({
      name: 'Maximilian',
      age: 31,
    });

    // provide-inject
    provide('userAge', uAge);

    // NOTE watch 함수는 두 개의 인자(의존성=반응형 데이터, watcher 함수)를 가진다. watcher 함수는 참조하는 의존성의 값의 변경이 감지되면 실행한다.
    watch([fullName, uAge], (newValues, oldValues) => {
      console.log('oldValue : ', oldValues);
      console.log('newValue : ', newValues);
    });

    // NOTE 반응형 확인 Hepler 함수 isRef, isReactive
    // console.log('ref 객체 자체는 반응형인가? : ', isRef(uName));
    // console.log('reactive의 프록시 객체는 반응형인가? : ', isReactive(user));
    // console.log('ref 객체의 value는 반응형인가? : ', isRef(uName.value));
    // console.log(
    //   'reactive의 객체의 프로퍼티의 값은 반응형인가? : ',
    //   isReactive(user.name),
    //   isReactive(user.age)
    // );

    // NOTE reactive 함수로 반환된 객체는 Proxy 객체로 감싸기 때문에 내부 리스너로 인해 변화가 감지되며 reactive 함수의 반환 객체를 감싸는 Proxy 객체 내부에는 ref 함수의 반환 객체를 감싸는 객체의 value 프로퍼티, getter, setter가 존재하지 않아 프로퍼티에 일반 객체가 접근하듯이 값에 접근할 수 있다.
    // setTimeout(() => {
    //   user.name = 'Max';
    //   user.age = 32;
    // }, 2000);

    // NOTE toRefs는 전달받은 인자인 객체의 내부 프로퍼티를 반응형(ref)로 변경한다. 내부 프로퍼티가 반응형으로 변경된 객체의 프로퍼티에 접근하여 template에 제공할 수 있다.
    // const userRefs = toRefs(user);
    // !SECTION

    // SECTION Options API methods => Composition API 일반 함수로 전환
    function setNewAge() {
      uAge.value = 32;
      user.age = 32;
    }

    function setLastName() {
      console.log('첫번째 value : ', lastNameInput.value);
      console.log('두번째 value : ', lastNameInput.value.value);
      lastName.value = lastNameInput.value.value;
    }

    // !SECTION
    // setup() 메서드의 객체 반환은 template에서 사용할 수 있는 데이터를 제공하는 것과 같다.
    return {
      // user: user,
      age: uAge,
      firstName,
      lastNameInput,
      lastName,
      fullName,
      setAge: setNewAge,
      setLastName,
    };
  },
};
// !SECTION
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

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
