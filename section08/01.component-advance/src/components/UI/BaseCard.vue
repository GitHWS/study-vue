<!-- NOTE Slot 사용하기 -->
<!-- Slot은 HTML 태그를 다른 HTML 태그를 감쌀 때 내부 컨텐츠를 자식 컴포넌트에게 제공한다. React의 children props로 유사하다. -->
<!-- NOTE 여러 슬롯을 사용할 때 Vue는 콘텐츠가 어느 슬롯에 가야할지 모르기 때문에 name 속성을 통해 각 슬롯에 이름을 추가하여 구별할 수 있게 한다. -->
<!-- 이름이 없는 슬롯은 암묵적으로 "default"라는 이름을 갖습니다. -->
<template>
  <div>
    <!-- 슬롯에 내부 컨텐츠가 없을 경우 v-if문으로 슬롯에 있는 내부 컨텐츠의 존재 유무를 판단하여 래핑하는 엘리먼트를 렌더링할지 결정할 수 있다. -->
    <header v-if="$slots.header">
      <!-- header라는 이름을 가진 slot -->
      <slot name="header">
        <!-- name이 header인 슬롯에 내부 컨텐츠가 없을 때 슬롯 폴백  -->
        <!-- 해당 슬롯에 어떤 컨텐츠가 무엇일지 예측할 수 없을 때 슬롯 폴백 콘텐츠인 기본 콘텐츠가 표시한다. -->
        <!-- <h2>The Default</h2> -->
      </slot>
    </header>
    <!-- slot은 BaseCard 컴포넌트로 감싸진 내부 자식 태그를 가리킨다. -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  // NOTE $slots으로 사용해서 특정 슬롯에 대한 데이터를 수신하는지 확인할 수 있다.
  mounted() {
    console.log(this.$slots.header);
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>
