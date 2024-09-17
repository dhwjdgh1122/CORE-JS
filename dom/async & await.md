## async 와 await

`async`와 `await`라는 특별한 문법을 사용하면 프라미스를 좀 더 편하게 사용할 수 있다. `async`, `await`는 이해하기 쉽고 사용법도 어렵지 않다.

## async 함수

`async` 키워드, `async`는 function 앞에 위치한다.

```js
async function f() {
  return 1;
}
```

function 앞에 `async`를 붙이면 해당 함수는 항상 프라미스를 반환한다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스로 값을 감싸 이행된 프라미스가 반환되도록 한다.

아래 예시의 함수를 호출하면 `result`가 `1` 인 이행 프라미스가 반환된다.

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

명시적으로 프라미스를 반환하는 것도 가능한데, 결과는 동일하다.

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

`async`가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다. 굉장히 간단하다.

그런데 `async`가 제공하는 기능은 이뿐만이 아니다. 또 다른 키워드 `await`는 `async` 함수 안에서만 동작한다. `await`는 멋진놈이다!!!


## await

`await` 문법은 아래와 같다.

```js
// await는 async 함수 안에서만 동작한다.
let value = await promise;
```

자바스크립트는 `await` 키워드를 만나면 프라미스가 처리될 때까지 기다린다.

1초 후 이행되는 프라미스를 예시로 사용하여 `await`가 어떻게 동작하는지 살펴보자.

```js
async function f() {

  let pormise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다린다 (*)

  alert(result); // 완료
}

f();
```

함수를 호출하고, 함수 본문이 실행되는 도중에 `(*)`로 표시한 줄에서 실행이 잠시 '중단'되었다가 프라미스가 처리되면 실행이 재개된다. 이때 프라미스 객체의 `result` 값이 변수 result에 할당된다. 따라서 위 예시를 실행하면 1초 뒤에 완료가 출력된다.

`await`는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

`await`는 `promise.then` 보다 좀 더 세련되게 프라미스의 `result` 값을 얻을 수 있도록 해주는 문법이다.

`promise.then`보다 가독성 좋고 쓰기도 쉽다.

**일반 함수엔 `await`을 사용할 수 없다.**

`async` 함수가 아닌데 `await`을 사용하면 문법 에러가 발생한다.

```js
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```

function 앞에 `async`를 붙이지 않으면 이런 에러가 발생할 수 있다. `await`는 `async` 함수 안에서만 동작한다.

**프라미스 체이닝** 에서 `showAvatar()` 예시를 `async/await`를 사용해 다시 작성해보자.

1. `.then` 호출을 `await` 로 바꿔야 한다.
2. function 앞에 `async`를 붙여 `await`를 사용할 수 있도록 해야 한다.

```js
async function showAvatar() {

  // JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

프라미스를 사용한 것보다 코드가 깔끔해지고 가독성도 좋아짐.

**`await`는 최상위 레벨 코드에서 작동하지 않는다.**

`await`을 이제 막 사용하기 시작한 사람은 최상위 레벨 코드에 `await`을 사용할 수 없다는 사실을 잊곤한다. 아래와 같은 코드는 동작하지 않는다.

```js
// 최상위 레벨 코드에선 문법 에러가 발생함
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 `await`를 사용할 수 있다.

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

**`await`는 'thenable' 객체를 받는다.**

`promise.then`처럼 `await`에도 thenable 객체 (`then` 메서드가 있는 호출 가능한 객체)를 사용할 수 있다.
thenable 객체는 서드파티 객체가 프라미스가 아니지만 프라미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능이다. 서드파티에서 받은 객체가 `.then`을 지원하면 이 객체를 `await`와 함께 사용할 수 있다.

`await`는 데모용 클래스 `Thenable`의 인스턴스를 받을 수 있다.

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000밀리초 후에 이행됨(result는 this.num*2)
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 1초 후, 변수 result는 2가 됨
  let result = await new Thenable(1);
  alert(result);
}

f();
```

`await`는 `.then`이 구현되어있으면서 프라미스가 아닌 객체를 받으면, 내장 함수 `resolve`와 `reject`를 인수로 제공 하는 메서드인 `.then`을 호출한다(일반 `Promise` executor가 하는 일과 동일하다) 그리고 나서 `await`는 `resolve`와 `reject`중 하나가 호출되길 기다렸다가 `(*)`로 표시한 줄 호출 결과를 가지고 다음 일을 진행한다.

**async 클래스 메서드**

메서드 이름 앞에 `async`를 추가하면 async 클래스 메서드를 선언할 수 있다.

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```

`async` 메서드와 `async` 함수는 프라미스를 반환하고 `await`를 사용할 수 있다는 점에서 동일하다.

## 에러 핸들링

프라미스가 정상적으로 이행되면 `await promise`는 프라미스 객체의 `result`에 저장된 값을 반환한다. 반면 프라미스가 거부되면 마치 `throw`문을 작성한 것처럼 에러가 던져진다.

```js
async function f() {
  await Promise.reject(new Error("에러 발생!"));
}
```

위 코드는 아래 코드와 동일하다.

```js
async function f() {
  throw new Error("에러 발생!");
}
```

실제 상황에선 프라미스가 거부 되기 전에 약간의 시간이 지체되는 경우가 있다. 이런 경우엔 `await`가 에러를 던지기 전에 지연이 발생한다.

`await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try..catch`를 사용해 잡을 수 있다.

```js
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError : failed to fetch
  }
}

f();
```

에러가 발생하면 제어 흐름이 `catch` 블록으로 넘어간다. 여러 줄의 코드를 `try`로 감싸는 것도 가능하다.

```js
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-주소');
    let user = await response.json();
  } catch(err) {
    // fetch와 response.json에서 발행한 에러 모두를 여기서 잡습니다.
    alert(err);
  }
}

f();
```

`try..catch`가 없으면 아래 예시의 async 함수 `f()`를 호출해 만든 프라미스가 거부 상태가 된다. `f()`에 `.catch`를 추가하면 거부된 프라미스를 처리할 수 있다.

```js
async function f() {
  let response = await fetch('http://유효하지-않은-주소');
}

// f()는 거부 상태의 프라미스가 됩니다.
f().catch(alert); // TypeError: failed to fetch // (*)
```

`.catch`를 추가하는 걸 잊으면 처리되지 않은 프라미스 에러가 발생한다. 이런 에러는 프라미스와 에러 핸들링에서 공부한 전역 이벤트 핸들러 `unhandledrejection`을 사용해 잡을 수 있다.

**