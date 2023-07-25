<template>
  <section>
    <base-card>
      <!-- NOTE name이 있는 슬롯을 적용할 때 template HTML 태그로 래핑하고 v-slot 디렉티브의 값으로 해당 슬롯의 이름을 지정하여 Vue에게 특정 콘텐츠가 어디로 가야할지 알려준다. -->
      <!-- v-slot의 축약어는 #이다. -->
      <template #header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <!-- v-slot이 적용되지 않은 컴포넌트 내부 슬롯 컨텐츠는 자동으로 default 슬롯으로 이동한다. -->
      <!-- 아래의 template 태그 자체를 생략해도 default 슬롯으로 이동한다. -->
      <!-- <template v-slot:default>
        <p>{{ infoText }}</p>
      </template> -->
      <p>{{ infoText }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['fullName', 'infoText', 'role'],
};
</script>

<style scoped></style>
