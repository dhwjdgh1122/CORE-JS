## 콜백

**브라우저 메서드를 사용합니다**    
콜백, 프라미스 등을 어떻게 사용하는지 알기 위해 브라우저 전용 메서드를 사용할 예정이다. 스크립트를 불러오고 완성된 문서에 간단한 조작을 하는 예시에서 특히 브라우저 메서드가 사용될 예정이다.

브라우저 메서드가 익숙치 않아 이해가 잘 되지 않는다면 문서 객체 모델의 챕터 몇 개를 읽어보자.

---

자바스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 **비동기**동작을 스케줄링 할 수 있다. 원하는 때에 동작이 시작하도록 할 수 있다.

**비동기적**이란 하나의 요청에 따른 응답을 즉시 처리하지 않아도, 그 대기 시간동안 또 다른 요청에 대해 처리 가능한 방식이다. 여러 개의 요청을 동시에 처리할 수 있는 장점이 있지만 동기 방식보다 속도가 떨어질 수 있다.

요청과 결과가 동시에 일어나지 않을 것이라는 약속

`setTimeout`은 스케줄링에 사용되는 가장 대표적인 함수이다.

실무에서 맞닥뜨리는 비동기 동작은 아주 다양한데, 스크립트나 모듈을 로딩하는 것 또한 비동기 동작이다.

`src`에 있는 스크립트를 읽어오는 함수 `loadScript(src)`를 예시로 비동기 동작 처리가 어떻게 일어나는지 보자.

```js
function loadScript(src) {
  // <script> 태그를 만들고 페이지에 태그를 추가합니다.
  // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행합니다.
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```
함수 `loadScript(src)`는 `<script src="...">`를 동적으로 만들고 이를 문서에 추가한다. 브라우저는 자동으로 태그에 있는 스크립트를 불러오고, 로딩이 완료되면 스크립트를 실행한다.

`loadScript(src)` 사용법은 아래와 같다.

```js
// 해당 경로에 위치한 스크립트를 불러오고 실행함
loadScript('/my/script.js');
```

그런데 이 때 스크립트는 '비동기적으로'실행된다. 로딩은 지금 당장 시작되더라도 실행은 함수가 끝난 후에야 되기 때문이다. 

따라서 `loadScript(...)` 아래에 있는 코드들은 스크립트 로딩이 종료되는 걸 기다리지 않는다.

```js
loadScript('/my/script.js');
// loadScript 아래의 코드는
// 스크립트 로딩이 끝날 때까지 기다리지 않는다.
```

스크립트 로딩이 끝나자마자 이 스크립트를 사용해 무언가를 해야만 한다고 가정하자. 스크립트 안에 다양한 함수가 정의되어 있고, 우리는 이 함수를 실행하길 원하는 상황이다.

그런데 `loadScript(...)`를 호출하자마자 내부 함수를 호출하면 원하는 대로 작동하지 않는다.

```js
loadScript('/my/script.js'); // script.js엔 "function newFunction() {…}"이 있습니다.

newFunction(); // 함수가 존재하지 않는다는 에러가 발생합니다!
```

에러는 브라우저가 스크립트를 읽어올 수 있는 시간을 충분히 확보하지 못했기 때문에 발생한다. 그런데 현재로서는 함수 `loadScript` 에서 스크립트 로딩이 완료되었는지 알 방법이 없다. 원하는 대로 스크립트 안의 함수나 변수를 사용하려면 스크립트 로딩이 끝났는지 여부를 알 수 있어야 한다.

`loadScript`의 두 번째 인수로 스크립트 로딩이 끝난 후 실행될 함수인 `콜백`함수를 추가해보자 (콜백 함수는 나중에 호출할 함수를 의미한다)

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```
새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는 대로 외부 스크립트 안의 함수를 사용할 수 있다.

```js
loadScript('script.js', function() {
  // 콜백 함수는 스크립트 로드가 끝나면 실행된다.
  newFunction(); // 이제 함수 호출이 제대로 동작한다.
  ...
});
```

아롷개 두 번째 인수로 전달된 함수(대개 익명 함수)는 원하는 동작이 완료되었을 때 실행된다.

아래 코드는 실제 존재하는 스크립트를 이용해 만든 예시이다.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`${script.src}가 로드되었습니다.`);
  alert( _ ); // 스크립트에 정의된 함수
});
```

이런 방식을 '콜백 기반' 비동기 프로그래밍이라고 한다. 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 `콜백`을 인수로 반드시 제공해야 한다.

위 코드에선 `loadScript`의 인수로 콜백을 제공해 주었는데, 이렇게 콜백을 사용한 방식은 비동기 프로그래밍의 일반적인 접근법이다.

## 콜백 속 콜백

스크립트가 두 개가 있는 경우, 어떻게하면 두 스크립트를 순차적으로 불러올 수 있을까? 두 번째 스크립트 로딩은 첫 번째 스크립트의 로딩이 끝난 이후가 되길 원한다면 말이다.

가장 자연스러운 해결 방법은 아래와 같이 콜백 함수 안에서 두 번째 `loadScript`를 호출하는 것이다.

```js
loadScript('/my/script.js', function(script) {

  alert(`${script.src}을 로딩했습니다. 이젠, 다음 스크립트를 로딩합시다.`);

  loadScript('/my/script2.js', function(script) {
    alert(`두 번째 스크립트를 성공적으로 로딩했습니다.`);
  });

});
```

이렇게 중첩 콜백을 만들면 바깥에 위치한 `loadScript`가 완료된 후, 안쪽 `loadScript` 가 실행된다.

그런데 여기에 더하여 스크립트를 하나 더 불러오고 싶다면 어떻게 해야 할까?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    loadScript('/my/script3.js', function(script) {
      // 세 스크립트 로딩이 끝난 후 실행됨
    });

  })

});
```

위와 같이 모든 새로운 동작이 콜백 안에 위치하게 작성하면 된다. 그런데 이렇게 콜백 안에 콜백을 넣는 것은 수행하려는 동작이 단 몇 개뿐이라면 괜찮지만, 동작이 많은 경우엔 좋지 않다.

## 에러 핸들링

지금까지 살펴본 것들은 스크립트 로딩이 실패하는 경우 등의 에러를 고려하지 않고 작성했다. 그런데 스크립트 로딩이 실패할 가능성은 언제나 있다. 물론 콜백 함수는 이런 에러를 핸들링할 수 있어야 한다.

`loadScript` 에서 로딩 에러를 추적할 수 있게 기능을 개선해보자

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}
```

이제 `loadScript`는 스크립트 로딩에 성공하면 `callback(null, script)`을, 실패하면 `callback(error)`을 호출한다.

개선된 `loadScript`의 사용법은 아래와 같다.

```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```

이렇게 에러를 처리하는 방식은 흔히 사용되는 패턴이다. 이런 패턴은 '오류 우선 콜백'이라고 부른다

오류 우선 콜백은 다음 관례를 따른다.

1. `callback`의 첫 번째 인수는 에러를 위해 남겨둔다. 에러가 발생하면 이 인수를 이용해 `callback(err)`이 호출된다.
2. 두 번째 인수(필요하면 인수 추가 가능)는 에러가 발생하지 않았을 때를 위해 남겨둔다. 원하는 동작이 성공한 경우엔 `callback(null, result1, result2...)`이 호출된다.

오류 우선 콜백 스타일을 사용하면, 단일 `콜백` 함수에서 에러 케이스와 성공 케이스 모두를 처리할 수 있다.

## 멸망의 피라미드

콜백 기반 비동기 처리는 언뜻 봤을 때 꽤 쓸만해 보이고, 실제로도 그렇다. 한 개 혹은 두 개의 중첩 호출이 있는 경우는 보기에도 나쁘지 않다.

하지만 꼬리에 꼬리를 무는 비동기 동작이 많아지면 아래와 같은 코드 작성이 불가피해진다.

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
          }
        });

      }
    })
  }
});
```

위 코드는 다음과 같이 동작한다.

1. `1.js`를 로드합니다. 그 후 에러가 없으면,
2. `2.js`를 로드합니다. 그 후 에러가 없으면,
3. `3.js`를 로드합니다. 그 후 에러가 없으면 `(*)`로 표시한 줄에서 또 다른 작업을 수행한다.

호출이 계속 중첩되면서 코드가 깊어지고 있다.

이렇게 깊은 중첩 코드가 만들어내는 패턴은 소위 '콜백 지옥' 혹은 '멸망의 피라미드' 라고 불린다.

<img src="Dom12.png" width="600" height="250" >

비동기 동작히 하나씩 추가될 때마다 중첩 호출이 만들어내는 '피라미드'는 오른쪽으로 점점 커진다. 

각 동작을 독립적인 함수로 만들어 위와 같은 문제를 완화해보자.

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // 모든 스크립트가 로딩되면 다른 동작을 수행합니다. (*)
  }
};
```

새롭게 작성한 코드는 각 동작을 분리해 최상위 레벨의 함수로 만들었기 때문에 깊은 중첩이 없다. 그리고 콜백 기반 스타일 코드와 동일하게 동작한다.

동작상의 문제는 없지만, 코드가 찢어진 종잇조각 같아 보인다는 문제가 있고 읽는 것도 어려워진다.

게다가 `step*` 이라고 명명한 함수들은 '멸망의 피라미드'를 피하려는 용도만으로 만들었기 때문에 재사용이 불가능하다.

피할 방법 중 가장 좋은 방법은 '프라미스'를 사용하는 것이다.