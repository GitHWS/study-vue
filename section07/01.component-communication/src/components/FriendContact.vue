<!-- template 내에서 Props를 사용 시 props명으로 데이터를 참조할 수 있다. -->
<template>
  <li>
    <h2>{{ name }} {{ isFavorite ? '(Favorite)' : '()' }}</h2>
    <button @click="toggleFavorite">Toggle Favorite</button>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>
    <button @click="$emit('delete', id)">Delete</button>
  </li>
</template>

<script>
export default {
  // 부모 컴포넌트로부터 데이터를 전송받을 때는 props 옵션을 사용해서 필요한 데이터를 '문자열'로 배열에 저장하여 전송받을 수 있다.
  // props 옵션을 배열 대신 '객체'로 대체할 수 있다. 객체로 설정할 시 해당 props의 타입(String, Number ...)을 지정할 수 있다. 지정한 타입이 아닌 값이 들어오면 에러가 발생한다.
  // 참고 : https://v3-docs.vuejs-korea.org/api/options-state.html#props
  // props의 타입을 옵션과 함께 더 자세히 지정하고 싶다면 객체의 형식으로 작성할 수도 있다. 옵션을 이용하면 개발 중 발생한 실수를 빠르게 찾을 수 있다는 장점이 있다. 옵션은 required(필수), default(기본값 설정), validator(유효성)가 있다.
  // required, validator 옵션에 적절한 값이 props로 오지않으면 에러는 발생하지 않지만 콘솔창에 경고가 출력된다.
  // 전송받은 props는 Vue 컴포넌트 구성 객체 내에서 this 키워드를 통해 참조가 가능하다.
  // props명을 케밥 케이스로 전송했는데 '카멜 케이스'로 작성하는 이유는 대쉬를 사용하면 JavaScript에서는 유효하지 않은 프로퍼티가 되기 때문이다.
  // 또한 Vue는 카멜 케이스 props를 자동으로 해석해서 대쉬를 포함한 케밥 케이스로도 변환해준다.
  // props: ['name', 'phoneNumber', 'emailAddress', 'isFavorite'],
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
      // validator: function (value) {
      //   return value === '1' || value === '0';
      // },
    },
  },
  // $emit 메서드에 추가적인 데이터를 전달하지 않고 emits 옵션을 사용해서 컴포넌트가 어떠한 시점에 발생시킬 커스텀 이벤트를 정의할 수 있다.
  emits: ['toggle-favorite', 'delete'],
  // emits: {
  //   'toggle-favorite': function (id) {
  //     if (id) {
  //       return true;
  //     } else {
  //       console.warn('Id is missing');
  //       return false;
  //     }
  //   },
  // },
  data() {
    return {
      detailsAreVisible: false,
      // props로 전달받은 데이터는 현재 컴포넌트의 초기값으로 취급하여 업데이트를 할 수 있다.
      // friendIsFavorite: this.isFavorite,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
  },
};
</script>

<!-- ⚠️ 부모로부터 전달받은 props는 불변해야한다. -->
<!-- Vue는 '단방향 데이터 플로우'라는 개념을 사용한다. 간단하게 말하자면 부모 컴포넌트에서 전달한 props는 자식 컴포넌트에게는 전달할 수만 있고 데이터의 업데이트는 부모 컴포넌트에서만 가능하다. -->

<!-- 
  부모 컴포넌트로부터 전달받은 데이터를 자식 컴포넌트에서 변경하는 방법은 두가지가 있다.

  1. 부모 컴포넌트에게 변경하고 싶다고 알려서 부모 컴포넌트가 자체적으로 데이터를 변경한 후 자식 컴포넌트로 업데이트된 데이터를 다시 전달하는 방법 

  2. 부모 컴포넌트로부터 전달받은 데이터를 자식 컴포넌트의 내부 초기 데이터로 취급하여 자식 컴포넌트 내에서 변경하는 방법, 이 방법은 자식 컴포넌트에만 변경 사항이 반영되고 부모 컴포넌트에는 반영되지 않는다.
-->

<!-- 
  자식 컴포넌트에서 부모 컴포넌트 업데이트된 데이터를 전달하는 방법

  자식 컴포넌트에서 부모 컴포넌트에게 무언가 일어났다는 정보를 알리려면 자식 컴포넌트는 부모 컴포넌트가 수신할 이벤트를 발생시켜야한다.
  이것을 위해 this의 내장 메서드인 '$emit'을 호출할 수 있다.

  $emit은 부모 컴포넌트에서 수신할 수 있는 커스텀 이벤트를 발생시켜준다.

  $emit 메서드의 첫번째 인자로는 커스텀 이벤트의 식별자를 임의로 설정할 수 있다.
  설정한 식별자는 부모 컴포넌트에서 v-on(@) 디렉티브와 함께 @event-name 형태로 커스텀 이벤트명으로 사용된다.

  두번째 인자부터는 '추가적인 데이터'를 전달할 수 있다.
  전달되는 추가적인 데이터는 이 커스텀 이벤트를 수신하는 메서드의 첫번째 인자로써 제공된다.

  이를 통해 단방향 데이터 플로우를 양방향 데이터 플로우로 만들 수 있다.
-->
