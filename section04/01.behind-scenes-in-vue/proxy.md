# ✅ Vue가 사용하는 JavaScript 내장 기능, Proxy

```js
let message = 'Hello!';
let longMessage = message + ' World!';

console.log(longMessage); // Hello! World!가 출력된다.
```

## 🤔 message의 문자를 다른 값으로 재할당하면?

```js
message = 'Hello!!!!';
console.logI(longMessage); // 여전히 Hello! World!가 출력된다.
```

## 🤔 message의 값이 변경되었음에도 Hello! World!가 출력되는 이유는?

기본적으로 JavaScript는 '반응형'이 아니기 때문이다. 그래서 `message`의 값이 변경된다고 해서 앞서 작성한 연산(`message` + ' World!')에서 변경사항을 반영하기 위해 다시 실행되진 않는다.

반면에 Vue의 경우 내장된 메커니즘을 통해 `message`의 변경사항을 감지하고 앱에서 `message`와 관련있는 부분을 모두 업데이트한다. 이 과정에서 Vue는 `Proxy`를 활용한다.

# ✅ JavaScript의 Proxy는 어떻게 작동하나?

```js
// Proxy가 래핑할 객체(생성자 함수 Proxy의 첫번째 인자)
const data = {
  message: 'Hello!',
  // 새로운 프로퍼티 longMessage는 message가 변경되면 바뀌도록 한다.
  longMessage: 'Hello! World!',
};

// Proxy에 래핑된 객체에 대한 핸들러를 담은 객체(생성자 함수 Proxy의 두번째 인자)
const handler = {
  // Proxy가 지원하는 '트랩'을 설정할 수 있다.
  // 트랩으로 set 함수를 추가하면 자동으로 그 인수로써 target과 key 그리고 value를 전송받는다.
  // set 함수(setter)는 proxy에 새로운 프로퍼티가 설정될 때마다 트리거된다. 이것을 통해 새 값이 설정된 프로퍼티(key)가 무엇이며 설정된 새 값(value)은 무엇이고 래핑된 원본 객체(target)가 무엇인지 알 수 있다.
  set(target, key, value) {
    // console.log(target); // 첫번째 래핑된 data 객체 출력 => { message : 'Hello!' }
    // console.log(key); // 방금 새로운 값을 설정한 프로퍼티 출력 => message
    // console.log(value); // 새롭게 설정한 값 => Hello!!!

    // message의 값이 업데이트되면 longMessage를 변경한다.
    if (key === 'message') {
      target.longMessage = value + ' World!';
    }
    target.message = value;
  },
};

// data 객체와 래핑된 객체에 대한 handler 객체를 JavaScript에 내장된 생성자 함수인 Proxy의 인자로 래핑한다.
const proxy = new Proxy(data, handler);

// new Proxy로 생성한 proxy 객체가 data 객체를 첫번째 인수로 래핑되면서 data 객체는 message 프로퍼티를 갖기 때문에 액세스이 가능하다.
proxy.message = 'Hello!!!!';

// 위의 코드에서 message의 값이 변경되어 setter 함수가 호출되고 이후 longMessage를 출력하면 변경된 message의 값이 적용된 것을 확인할 수 있다.
// message의 변경사항에 따라 업데이트하는 것은 자체적인 반응형 시스템을 구축했다고 할 수 있다.
// 이러한 작업을 Vue는 내부적으로 수행한다.
console.log(proxy.longMessage);
```
