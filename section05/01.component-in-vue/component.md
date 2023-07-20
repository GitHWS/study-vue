# Component란?

컴포넌트는 큰 애플리케이션을 작은 조각 여러 개로 분할하여 재사용할 때에 유용하다.

### Component 등록

Vue에서 컴포넌트를 component 메서드를 호출하는데 생성하려면 아래와 같다.

```js
// Vue 앱 인스턴스에 새 컴포넌트를 생성하고 싶다라고 Vue에게 알린다.
app.component('identifier', {
  template: `
    // HTML 코드 템플릿
  `,
  // implementation
  data() {
    return {
      // ...
    };
  },
  methods: {
    // ...
  },
});
```

### component 메서드의 매개변수

- 식별자(identifier) : 컴포넌트는 기본적으로 커스텀 HTML 엘리먼트이기 때문에 커스텀 HTML 태그 식별자의 등록이 필요하다. 식별자를 등록할 때 반드시 대쉬 기호 '-'를 포함하는 `Kebab Case`로 등록해야한다. 대쉬 기호를 붙이는 이유는 공식적으로 내장된 HTML 엘리먼트와의 충돌을 피하기 위함이다.

> 식별자의 등록과 관련하여 대쉬 기호를 사용하는 `Kebab Case`도 가능하지만 `Pascal Case`를 사용하여 등록하는 것도 가능하다. <br/>
> Vue는 `Pascal Case`로 등록된 컴포넌트에 대한 `Kebab Case` 태그 해석도 지원하고 있다. <br/>
> 예를 들어 `MyComponent`로 등록된 컴포넌트의 경우 `<MyComponent>` 또는 `<my-component>`를 통해 템플릿에서 참조 가능하다.

- 구현체(implementation) : `createApp`에 전달하는 것과 같은 구성 객체이다. 구성 객체에는 `data`, `methods` 등과 같은 옵션을 추가할 수 있다.

> 본질적으로 Vue 컴포넌트는 Vue 앱 인스턴스와 동일하다. 즉, 메인 Vue 앱 인스턴스에 속한 다른 Vue 앱 인스턴스일 뿐이다.

컴포넌트는 새로운 앱 인스턴스로 자체 템플릿이 필요하다. 그래서 구현체 내부에는 HTML 코드 문자열을 설정한 `template` 옵션이 필요하다.

### Component의 사용

등록한 컴포넌트는 Vue 앱이 제어하는 부분 내에서 Vue가 컴포넌트를 인식할 수 있다.
Vue 앱이 제어하는 부분 외에서는 브라우저가 무시하기 때문에 사용할 수 없다.

사용법은 아래와 같다.

```html
<!-- Vue 앱 인스턴스가 제어하는 부분에서 등록된 식별자명으로 HTML에서 사용할 수 있다. -->
<identifer></identifer>
```

하지만 HTML 태그로써 사용된다고 하더라도 Vue 컴포넌트는 브라우저가 인식하는 진짜 HTML 엘리먼트는 아니다는 것을 기억하자.

### Component의 특징

아래의 코드처럼 같은 컴포넌트를 두번 사용했다고 하자.

```html
<identifer></identifer> <identifer></identifer>
```

이 두 컴포넌트는 서로 완전히 분리되어 독립적으로 동작한다. 즉, HTML 코드의 복제와 동시에 사용한 각 컴포넌트 구현체(`data`, `methods` 등의 옵션)의 `캡슐화`가 이루어진다.
