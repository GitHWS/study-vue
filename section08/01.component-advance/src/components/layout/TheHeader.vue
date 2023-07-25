<template>
  <header>
    <h1>More on Vue Components</h1>
  </header>
</template>

<!-- NOTE style 태그에 정의한 스타일은 컴포넌트 내에서 선언되었어도 모든 파일에 영향을 주는 '전역 스타일'로 취급한다. -->
<!-- NOTE SFC CSS 기능 : https://v3-docs.vuejs-korea.org/api/sfc-css-features.html -->
<!-- 단 style 태그에 scoped 속성을 설정하면 정의된 스타일은 같은 파일의 템플릿(컴포넌트)에만 스타일이 적용된다. -->
<!-- scoped 속성이 활성화되면 컴포넌트의 각 HTML 태그에는 Vue가 부여하는 'data-v'로 시작하는 고유의 속성이 붙는데 Vue가 내부적으로 CSS 선택자를 변경하여 스타일 적용 범위를 한정하여 적용한다.  -->
<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #14005e;
}

header h1 {
  color: white;
  margin: 0;
}
</style>
