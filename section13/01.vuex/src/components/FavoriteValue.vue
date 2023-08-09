<template>
  <h3>{{ counter }}</h3>
  <p>We do more...</p>
</template>

<script>
export default {
  computed: {
    counter() {
      // NOTE namespaced 옵션이 활성화된 지역 모듈에 접근하려면 아래와 같이 '접근하려는 옵션'에 [대괄호 표기법]으로 작성한다.
      // 대괄호 내에 슬래시를 사용하여 '{ namespace }/{ ActionName, GetterName ... }'로 작성한다. 아래의 코드는 namespace가 numbers인 normalizeCounter라는 getter의 값에 접근하는 것이다.
      return this.$store.getters['numbers/normalizeCounter'];
    },
  },
};
</script>
