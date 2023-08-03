<template>
  <!-- SECTION - 라우터 이동 간 transition 애니메이션 적용하기 -->
  <!-- router-view의 경우 단일 엘리먼트이기 때문에 transition 컴포넌트를 사용하는 것이 적절하다. -->
  <!-- NOTE 단, router-view의 경우 transition 컴포넌트로 래핑하여 사용 시 경고 메세지를 볼 수 있는데 Vue2에서는 여전히 사용할 수 있으나 Vue3에서 직접 사용할 수 없다. -->
  <!-- 그러므로 아래의 형식을 따라 작성해야 Vue3에서 router-view와 transition 컴포넌트를 사용할 수 있다. -->
  <!-- 여기서 router-view가 내부에서 렌더링할 엘리먼트를 가져오는 것을 지원하기 때문에 활성화된 라우트에 따라 실제 컴포넌트가 어디서 렌더링될지 설정해야한다. 이를 위해 router-view를 통해 범위가 지정된 슬롯 구문을 내부적으로 사용하면 된다. 이것은 보통 없어도 되나 router와 transition을 함께 사용하기 위해선 필요하다. -->
  <!-- v-slot 디렉티브를 통해 slotProps를 추출하여 내장 router-view 컴포넌트에서 얻을 수 있도록 하여 동적 컴포넌트인 component에 is prop에 slotProps.Component를 바인딩한다. 여기서 slotProps는 현재 선택된 라우트에서 로드되어야할 컴포넌트(Component 프로퍼티)를 가진다. -->
  <!-- 애니메이션이 두 요소가 동시에 나타나면서 적용되는 경우엔 mode prop을 'in-out' 또는 'out-in'을 설정하여 애니메이션 적용 우선순위를 설정한다. -->
  <router-view v-slot="slotProps">
    <transition name="fade-button" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <!-- !SECTION -->
  <div class="container">
    <user-list></user-list>
  </div>
  <div class="container">
    <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <!-- SECTION - Transition 컴포넌트를 통한 애니메이션 효과 -->
    <!-- LINK https://v3-docs.vuejs-korea.org/guide/built-ins/transition.html#css-based-transitions -->
    <!-- transition 컴포넌트는 Vue에 내장된 컴포넌트로 transition 컴포넌트에 v-if, v-show와 같은 디렉티브가 설정된 '단 하나의 래핑된 요소(직속 자식 요소)'를 조작할 수 있다. -->
    <!-- NOTE DOM 상에서 요소가 추가되고 제거되는 경우에는 transition 컴포넌트의 도움을 받아야한다. -->
    <!-- NOTE v-if, v-show가 없다면 transition 컴포넌트를 사용할 필요없이 CSS만으로 적용해도 무방하다. -->
    <!-- transition 컴포넌트는 래핑된 요소에 CSS 유틸리티 클래스를 자체적으로 추가하는데 DOM에 래핑된 요소가 처음 추가되었을 때 v-enter-from, v-enter-active, v-enter-to를 추가한다. -->
    <!-- 래핑된 요소가 제거되었을 때 v-leave-from, v-leave-active, v-leave-to 클래스를 추가한다. -->
    <!-- name prop이 설정되었다면 {name}-enter-from처럼 접두사(prefix)가 v 대신 name prop의 값이 스타일명으로 변경된다.  -->
    <!-- transition 컴포넌트로 인해 추가되는 특수한 클래스 전체를 변경하고 싶다면 시점에 맞게 enter-*-class, leave-*-class prop을 추가하여 변경할 수 있다. -->
    <!-- <transition enter-to-class="some-class" enter-active-class="...">
      <p v-if="paraIsVisible">This is only sometimes visible...</p>
    </transition> -->
    <!-- SECTION transition 컴포넌트의 enter/leave 이벤트의 사용 -->
    <!-- transition 컴포넌트의 enter/leave 이벤트를 사용할 수 있다. -->
    <!-- transition 컴포넌트의 enter/leave 이벤트를 통해 CSS가 아닌 JavaScript만으로 transition 애니메이션을 구현할 수 있다. 이때 JavaScript 전용 transition을 사용하려면 :css=false prop을 추가하여 CSS 트랜지션을 자동으로 감지하는 것을 건너뛰도록 명시적으로 지시한다. 간단히 CSS transition 애니메이션을 사용하지 않고 전체적인 transition 애니메이션을 JavaScript가 제어한다고 Vue에게  명시하는 prop이다. 성능 방면에서도 소폭 향상이 되며 CSS 규칙이 실수로 JavaScript 전용 transition 애니메이션을 방해하는 것을 방지할 수 있다. -->
    <!-- 성능 향상의 이유는 Vue가 transition 컴포넌트 내에 각 CSS 클래스에서 CSS 코드를 찾는 동작(애니메이션의 지속 시간 분석 등)을 생략할 수 있기 때문이다. -->
    <!-- LINK https://v3-docs.vuejs-korea.org/guide/built-ins/transition.html#javascript-hooks -->
    <transition
      name="para"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="paraIsVisible">This is only sometimes visible...</p>
    </transition>
    <!-- !SECTION -->
    <!-- !SECTION -->
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <!-- SECTION - transition 컴포넌트가 하나 이상의 직속 자식 엘리먼트를 가질 수 있는 예외의 경우 -->
  <!-- NOTE  transition 컴포넌트가 래핑할 때 하나 이상의 직속 자식 엘리먼트가 존재하지만 가능한 경우는 '실제 DOM에서 제거되는 동시에 제거되는 한 요소를 즉시 대체하는 다른 요소가 있다'면 성립한다. -->
  <!-- 즉, 아래의 예시로는 같은 v-if 디렉티브가 usersAreVisible 데이터에 따라 DOM에서 보여지고 제거되는데 usersAreVisible이 true일 때 Show 버튼이 제거됨과 동시에 Hide 버튼이 즉시 대체되기 때문에 성립하는 것이다. -->
  <!-- NOTE 단, 이 경우엔 v-if를 여러 개 사용하여 한번에 하나의 엘리먼트만 보여주는 것이 아닌 v-if와 v-else를 꼭 사용해야한다. -->
  <!-- NOTE 그 이유는 transition 컴포넌트를 사용했을 때 v-if 디렉티브로 인해 하나의 엘리먼트가 사라지고 다른 엘리먼트가 그 자리를 즉시 대체하더라도 Vue는 데이터에 따라 보여주는 v-if의 조건 자체를 분석하지 못하기 때문에 한 번에 하나의 엘리먼트가 표시될 것이라는 것을 보장할 수 없기 때문이다. 그러므로 반드시 v-else를 사용하여 하나의 엘리먼트만 무조건 표시된다는 것을 Vue에게 알려야한다. -->
  <!-- NOTE 아래의 경우 동시에 두 버튼이 보이면서 나타나고 사라지는 이상한 현상을 볼 수 있는데 이것은 mode prop(in-out/out-in)을 통해 해결할 수 있다. -->
  <!-- LINK https://v3-docs.vuejs-korea.org/api/built-in-components.html#transition -->
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <button @click="showUsers" v-if="!usersAreVisible">Show Users</button>
      <button @click="hideUsers" v-else>Hide Users</button>
    </transition>
  </div>
  <!-- !SECTION -->
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
import UserList from './components/UserList.vue';

export default {
  components: {
    UserList,
  },
  data() {
    return {
      animatedBlock: false,
      dialogIsVisible: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null,
    };
  },
  methods: {
    // SECTION - transition 컴포넌트의 특수한 이벤트 호출 시점
    // NOTE transition 컴포넌트의 특수한 이벤트에 설정된 메서드는 Vue를 통해 자동으로 인수를 가진다. 이러한 인수를 통해 JavaScript로 애니메이션을 제어하여 스타일링을 변경하는 등의 동작을 수행할 수 있다.

    // NOTE enter 애니메이션이 삭제되었을 때(실행되고 있던 애니메이션이 끝나지 않은 상태에서 새로운 애니메이션이 시작하려고 할 때)마다 호출
    enterCancelled(el) {
      console.log('enterCancelled', el);
      // interval 로직이 저장된 enterInterval에 접근하여 실행 중인 기존 애니메이션을 제거한다.
      clearInterval(this.enterInterval);
    },
    // NOTE leave 애니메이션이 삭제되었을 때(실행되고 있던 애니메이션이 끝나지 않은 상태에서 새로운 애니메이션이 시작하려고 할 때)마다 호출
    leaveCancelled(el) {
      console.log('leaveCancelled', el);
      // interval 로직이 저장된 leaveInterval에 접근하여 실행 중인 기존 애니메이션을 제거한다.
      clearInterval(this.leaveInterval);
    },
    // NOTE enter(진입) 애니메이션이 시작하기 전(엘리먼트가 DOM에 삽입되기 전) 호출
    beforeEnter(el) {
      console.log('beforeEnter', el);
      el.style.opacity = 0;
    },
    // NOTE enter 애니메이션이 시작하는 시점에 호출(앨리먼트가 삽입 후 1프레임 이후)
    // NOTE 해당 enter 애니메이션의 동작이 끝났을 때 알려주는 역할을 하는 done 함수 인자가 포함된다.
    // JavaScript로 transition 애니메이션을 구현할 때 아래의 자체적인 로직(setInterval을 통한 transition 구현)을 Vue는 이해하지 못하기 때문에 언제 애니메이션이 끝나는지 알 수 없기 때문에 애니메이션이 완료되어 호출되어야하는 afterEnter도 애니메이션이 완료되지 않는 상태에서 바로 호출된다. 그러므로 done 함수를 호출하여 애니메이션이 끝났다는 것을 명확히 알려야한다.
    // NOTE CSS를 이용한 transition 애니메이션의 경우 Vue가 애니메이션의 지속 시간을 분석하여 인지하기 때문에 done 함수를 사용할 필요가 없다.
    enter(el, done) {
      console.log('enter', el);
      let round = 1;
      // interval을 다른 메서드에서도 접근할 수 있게 만들기 위해 data로 지정하여 this를 통해 접근할 수 있게 한다.
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        // round가 100보다 클 때 해당 interval을 제거하고 애니메이션이 끝났다는 것을 done 함수를 호출하여 Vue에게 알린다.
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    // NOTE enter 애니메이션이 완료되면 호출
    afterEnter(el) {
      console.log('afterEnter', el);
    },
    // NOTE leave(진출) 애니메이션 시작하기 전에(엘리먼트가 DOM에 제거되기 전) 호출, 보통 before-Leave를 사용하지 않고 leave 이벤트를 바로 사용한다.
    beforeLeave(el) {
      console.log('beforeLeave', el);
      el.style.opacity = 1;
    },
    // NOTE leave 애니메이션이 시작하는 시점에 호출
    // 해당 leave 애니메이션의 동작이 끝났을 때 알려주는 역할을 하는 done 함수 인자가 포함된다.
    leave(el, done) {
      console.log('leave', el);
      let round = 1;
      // interval을 다른 메서드에서도 접근할 수 있게 만들기 위해 data로 지정하여 this를 통해 접근할 수 있게 한다.
      this.leaveInterval = setInterval(() => {
        el.style.opacity = 1 - round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    // NOTE leave 애니메이션이 완료 된 후(엘리먼트가 DOM에서 제거된 후) 호출
    afterLeave(el) {
      console.log('afterLeave', el);
    },
    // !SECTION
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    animateBlock() {
      this.animatedBlock = !this.animatedBlock;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
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
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}

.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.animate {
  /* transform: translateX(-150px); */
  animation: slide-scale 0.3s ease-out forwards;
}

/* NOTE 기본적으로 transition 컴포넌트로 인해 추가되는 v-*로 시작하는 특수한 클래스는 모든 transition 컴포넌트에 클래스에 추가된 애니메이션을 적용한다. 그러므로 모든 transition 컴포넌트가 동일한 애니메이션을 가지게 된다. */
/* NOTE 만약 transition 컴포넌트가 여러 개일 때 각 transition 컴포넌트에 개별적으로 애니메이션을 적용하려면 name prop을 통해 이름을 설정한 후 {name}-enter-to 형식으로 각각 다른 애니메이션을 설정할 수 있다. */

/* NOTE v-enter-* : DOM에 transition 컴포넌트로 래핑된 엘리먼트가 처음 추가될 때 추가되는 클래스 */
/* DOM에 추가될  엘리먼트의 처음 상태 */
/*
.para-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
*/

/* NOTE v-enter-active에서 정의된 transition의 지속 시간을 Vue가 분석하여 애니메이션의 소요 시간을 인지한다. */
/* NOTE animation 속성을 active 클래스에 적용할 때는 animation에 모든 시점(from~to)의 애니메이션을 정의하기 때문에 enter-from, enter-to 클래스를 추가할 필요가 없다. */
/* 해당 특수 클래스는 애니메이션이 끝나면 Vue가 자동적으로 클래스를 제거하기 때문에 animation 속성의 forwards와 같은 animation-fill-mode는 설정하지 않아도 된다.*/
/*
.para-enter-active {
  transition: all 0.3s ease-out;
  animation: slide-scale 2s ease-out reverse;
}
*/

/* DOM에 추가될 엘리먼트의 마지막 상태 */
/*
.para-enter-to {
  opacity: 1;
  transform: translateY(0);
}
*/

/* NOTE v-leave-* : DOM에서 transition 컴포넌트로 래핑된 요소가 제거 될 때 추가되는 클래스 */
/* DOM에서 제거될 엘리먼트의 처음 상태 */
/*
.para-leave-from {
  opacity: 1;
  transform: translateY(0);
}
*/

/* v-leave-* 클래스에 한하여 적용되는 transition */
/*
.para-leave-active {
  transition: all 0.3s ease-in;
  animation: slide-scale 0.3s ease-out;
}
*/

/* DOM에서 제거될 엘리먼트의 마지막 상태 */
/*
.para-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
*/

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

.route-enter-active {
  animation: slide-scale 0.4s ease-out;
}

.route-leave-active {
  animation: slide-scale 0.4s ease-in reverse;
}

@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>
