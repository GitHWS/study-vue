<template>
  <header>
    <nav>
      <ul>
        <li>
          <!-- SECTION - 라우팅을 위한 router-link의 사용 -->
          <!-- NOTE router-link는 vue-router의 특별한 앵커(a) 태그이다. -->
          <!-- router-link는 자체적으로 브라우저의 기본 동작인 다른 페이지가 로드되는 것을 막고 vue-router를 통해 사용자가 클릭한 링크(경로)를 분석하여 URL을 업데이트하고 경로에 해당하는 알맞은 컴포넌트를 로드한다. -->
          <!-- router-link는 'to' 속성의 값으로 생성한 Router의 routes 옵션에 등록된 경로(path)를 설정하여 클릭 시 URL 업데이트를 하여 경로에 맞는 컴포넌트를 로드한다. -->
          <!-- router-link는 내부적으로 slot을 사용하기 때문에 내부에 텍스트, HTML 엘리먼트 등을 추가할 수 있다. -->
          <!-- router-link을 클릭하여 컴포넌트가 로드되면 활성 상태인 router-link의 class에 'router-link-active'와 'router-link-exact-active'가 추가된다. -->
          <!-- !SECTION -->
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

/* SECTION - 활성화 상태의 router-link에 기본적으로 추가되는 클래스를 통한 스타일링 */
/* NOTE 현재 활성화된 상태의 router-link 태그를 'router-link-active' 클래스를 통해 스타일링할 수 있다. */
/* 'router-link-active'와 'router-link-exact-active' 클래스의 차이점
- 'router-link-active'는 현재 활성화된 라우트의 현재 경로(to 속성의 경로)뿐만 아니라 현재 경로를 포함하는 'our-domain.com/team/teamid'와 같은 중첩된 라우터에도 적용이 된다.
- 'router-link-exact-active'는 현재 경로(to 속성의 경로)와 완벽하게 일치하는 경우에만 적용된다.
*/
/* NOTE 기본적으로 추가되는 위 클래스들은 Router 생성 시 설정하는 옵션(linkActiveClass과 linkExactActiveClass)을 통해 클래스명을 변경할 수 있다. */
/* !SECTION */

a:hover,
a:active,
a.active-router {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
