## try..catch와 핸들링

에러가 발생하면 스크립트는 즉시 중단되고, 콘솔에 에러가 출력된다.

그러나 `try..catch` 문법을 사용하면 스크립트가 죽는 걸 방지하고, 에러를 '잡아서'(catch) 더 합당한 무언가를 할 수 있다.

## try..catch 문법    
`try..catch` 문법은 'try'와 'catch'라는 두 개의 주요 블럭으로 구성된다.

    try {

      // 코드...

    } catch (err) {

      // 에러 핸들링

    }

동작 알고리즘은 다음과 같다.

1. `try {...}` 안의 코드가 실행된다.
2. 에러가 없다면 `try` 안의 마지막 줄까지 실행되고, `catch` 블록은 건너뛴다.
3. 에러가 있다면, `try` 안 코드의 실행이 중단되고, `catch(err)` 블록으로 제어 흐름이 넘어간다. 변수 `err`(아무 이름이나 사용 가능)는 무슨 일이 일어났는지에 대한 설명이 담긴 에러 객체를 포함한다.

예시를 살펴보자.

- 에러가 없는 예시: `(1)`과 `(2)`를 `alert` 창에 보여준다.

      tyy {
      alert('try 블록 시작'); // (1) <--

      // 에러 없음

      alert('try 블록 끝'); // (2) <--
      } catch(err) {

        alert('에러가 없으므로, catch는 무시된다.'); // (3)
      }

- 에러가 있는 예시: `(1)`과 `(3)`을 보여준다.


      try {

      alert('try 블록 시작');  // (1) <--

      lalala; // 에러, 변수가 정의되지 않음!

      alert('try 블록 끝(절대 도달하지 않음)');  // (2)

      } catch(err) {

      alert(`에러가 발생했습니다!`); // (3) <--

      }

**`try..catch`는 오직 런타임 에러에만 동작한다**    
자바스크립트 엔진은 코드를 읽고 난 후 코드를 실행한다. 코드를 읽는 중에 발생하는 에러는 `parse-time 에러` 라고 부르는데, 엔진은 이 코드를 이해할 수 없기 때문에 `parse-time`에러는 코드 안에서 복구가 불가능하다.

`try..catch`는 유효한 코드에서 발생하는 에러만 처리할 수 있다. 이런 에러를 `런타임 에러` 혹은 `예외` 라고 부른다.

## 에러 객체    
에러가 발생하면 자바스크립트는 에러 상세내용이 담긴 객체를 생성한다. 그 후, `catch` 블록에 이 객체를 인수로 전달한다.

    try {
      // ....
    } catch(err) { // <-- '에러 객체', err 대신 다른 이름으로도 쓸 수 있음
    // ...
    }

내장 에러 전체와 에러 객체는 두 가지 주요 프로퍼티를 가진다.

`name`    
에러 이름, 정의되지 않은 변수 때문에 발생한 에러라면 `"ReferenceError"`가 이름이 된다.

`message`    
에러 상세 내용을 담고 있는 문자 메시지

표준은 아니지만 `name`과 `message` 이외에 대부분의 호스트 환경에서 지원하는 프로퍼티도 있다. `stack`은 가장 널리 사용되는 비표준 프로퍼티 중 하나이다.

`stack`    
현재 호출 스택, 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열로 디버깅 목적으로 사용된다.

예시:

    try {
      lalala; // 에러, 변수가 정의되지 않음!
    } catch(err) {
      alert(err.name); // ReferenceError
      alert(err.message); // lalala is not defined
      alert(err.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

      // 에러 전체를 보여줄 수도 있습니다.
      // 이때, 에러 객체는 "name: message" 형태의 문자열로 변환됩니다.
      alert(err); // ReferenceError: lalala is not defined
    }

## try..catch 사용

`try..catch`가 실무에서 어떻게 사용되는가

앞서 JSON으로 인코딩된 값을 읽을 수 있도록 해주는 JSON.parse(str) 메서드는 주로 서버 등에서 네트워크를 통해 전달받은 데이터를 디코딩하는 데 사용한다.

전달받은 데이터에 `JSON.parse`를 호출하는 식으로 사용된다.

    let json = '{"name":"John", "age": 30}'; // 서버로부터 전달받은 데이터

    let user = JSON.parse(json); // 전달받은 문자열을 자바스크립트 객체로 변환

    // 문자열 형태로 전달받은 user가 프로퍼티를 가진 객체가 됨
    alert( user.name ); // John
    alert( user.age );  // 30

**잘못된 형식의 `json`이 들어온 경우, `JSON.parse`는 에러를 만들기 때문에 스크립트가 '죽는다'

서버에서 전달받은 데이터가 잘못되어 스크립트가 죽는 경우, 사용자는 개발자 콘솔을 열지 않는 이상 절대 원인을 알 수 없다.

`try..catch`를 사용해 이를 처리해보자

    let json = "{ bad json }";

    try {

      let user = JSON.parse(json); // <-- 여기서 에러가 발생하므로
      alert( user.name ); // 이 코드는 동작하지 않습니다.

    } catch (e) {
      // 에러가 발생하면 제어 흐름이 catch 문으로 넘어옵니다.
      alert( "데이터에 에러가 있어 재요청을 시도합니다." );
      alert( e.name );
      alert( e.message );
    }

에러가 발생했다는 걸 보여주기 위해 간단히 예외처리했지만, `catch` 블록 안에서 새로운 네트워크 요청 보내기, 사용자에게 대안 제안하기, 로깅 장치에 에러 정보 보내기 등과 같은 구체적인 일을 할 수 있다. 스크립트가 죽도록 놔두는 것보다 훨씬 나은 대책이다.


## 직접 에러를 만들어서 던지기

`json`이 문법적으로 잘못되진 않았지만, 스크립트 내에서 사용 중인 필수 프로퍼티 `name`을 가지고 있지 않다면 무슨 일이 생길까?

let json = '{ "age": 30 }'; // 불완전한 데이터

    try {

      let user = JSON.parse(json); // <-- 에러 없음
      alert( user.name ); // 이름이 없습니다!

    } catch (e) {
      alert( "실행되지 않습니다." );
    }

위 예시에서 `JSON.parse`는 정상적으로 실행되었지만 `name`이 없는건 에러를 유발하는 상황이다.    
이제 `throw` 연산자를 사용해 에러 처리를 통합해보자.

## throw` 연산자

`throw` 연산자는 에러를 생성한다.    
문법은 아래와 같다.

    throw <error object>

이론적으로 숫자, 문자열 같은 원시형 자료를 포함한 어떤 것이든 에러 객체(error object)로 사용할 수 있다. 하지만 내장 에러와의 호환을 위해 되도록 에러 객체에 `name`과 `message` 프로퍼티를 넣어주는 것을 권장한다.

자바스크립트는 `Error`, `SyntaxError`, `TypeError` 등의 표준 에러 객체 관련 생성자를 지원한다. 이 생성자들을 이용해 에러 객체 아래처럼 만들 수 있다.

    let error = new Error(message);
    // or
    let error = new SyntaxError(message);
    let error = new ReferenceError(message);
    // ...

일반 객체가 아닌 내장 생성자를 사용해 만든 내장 에러 객체의 `name` 프로퍼티는 생성자 이름과 동일한 값을 갖는다. 프로퍼티 `message`의 값은 인수에서 가져온다.

    let error = new Error("이상한 일이 발생했습니다. o_O");

    alert(error.name); // Error
    alert(error.message); // 이상한 일이 발생했습니다. o_O

잘못된 데이터를 받았을 때, `JSON.parse`가 어떤 종류의 에러를 만들어내는지 아래 코드를 통해 살펴보자.


    try {
      JSON.parse("{ 잘못된 형식의 json o_O }");
    } catch(e) {
      alert(e.name); // SyntaxError
      alert(e.message); // Unexpected token b in JSON at position 2
    }

`SyntaxError` 가 발생한다.

사용자를 나타내는 객체에 `name` 프로퍼티는 반드시 있어야 하므로, 이제 `name`이 없으면 에러가 발생한 것으로 간주하고 예외처리해보자.

`throw` 연산자를 사용해 에러를 던져보자

    let json = '{ "age": 30 }'; // 불완전한 데이터

    try {

      let user = JSON.parse(json); // <-- 에러 없음

      if (!user.name) {
        throw new SyntaxError("불완전한 데이터: 이름 없음"); // (*)
      }

      alert( user.name );

    } catch(e) {
      alert( "JSON Error: " + e.message ); // JSON Error: 불완전한 데이터: 이름 없음
    }

`(*)`로 표시한 줄에서 `throw` 연사자는 `message`를 이용해 `SyntaxError`를 생성하낟. 에러 생성 방식은 자바스크립트가 자체적으로 에러를 생성하는 방식과 동일하다. 에러가 발생했으므로 `try`의 실행은 즉시 중단되고 제어 흐름이 `catch`로 넘어간 것을 얼럿 창을 통해 확인할 수 있다.

이제 `JSON.parse`에서 에러가 발생한 경우를 포함해서 모든 에러를 `catch` 블록 안에서 처리할 수 있게 되었다.

## 에러 다시 던지기

위 예시에선 불완전한 데이터를 `try..catch`로 처리하였다. 그런데 또 다른 예기치 않은 에러가 `try{...}`블록 안에서 발생 할 수도 있다. 정의되지 않은 변수 사용 등의 프로그래밍 에러가 발생할 가능성은 항상 있다.

    let json = '{ "age": 30 }'; // 불완전한 데이터

    try {
      user = JSON.parse(json); // <-- user 앞에 let을 붙이는 걸 잊었네요.

      // ...
    } catch(err) {
      alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
      // (실제론 JSON Error가 아닙니다.)
    }

`catch`는 예상치 못한 에러를 잡아내 주긴 했지만, 에러 종류와 관계없이 `"JSON.Error"` 메시지를 보여준다. 이렇게 에러 종류와 관계없이 동일한 방식으로 에러를 처리하는 것은 디버깅을 어렵기 만들기 때문에 좋지 않다.

이런 문제를 피하고자 '다시 던지기' 기술을 사용한다.

1. catch가 모든 에러를 받는다.
2. `catch(err) {...}`블록 안에서 에러 객체 `err`를 분석한다.
3. 에러 처리 방법을 알지 못하면 `throw err`를 한다.

보통 에러 타입을 `instanceof` 명령어로 체크한다.

    try {
      user = { /*...*/ };
    } catch(err) {
      if (err instanceof ReferenceError) {
        alert('ReferenceError'); //  정의되지 않은 변수에 접근하여 'ReferenceError' 발생
      }
    }

`err.name` 프로퍼티로 에러 클래스 이름을 알 수도 있다. 기본형 에러는 모두 `err.name` 프로퍼티를 가진다. 또는 `err.constructor.name`를 사용할 수도 있다.

에러를 다시 던져서 `catch` 블록에선 `SyntaxError`만 처리되도록 해보자.

    let json = '{ "age": 30 }'; // 불완전한 데이터
    try {

      let user = JSON.parse(json);

      if (!user.name) {
        throw new SyntaxError("불완전한 데이터: 이름 없음");
      }

      blabla(); // 예상치 못한 에러

      alert( user.name );

    } catch(e) {

      if (e instanceof SyntaxError) {
        alert( "JSON Error: " + e.message );
      } else {
        throw e; // 에러 다시 던지기 (*)
      }

    }

`catch` 블록 안의 `(*)`로 표시한 줄에서 다시 던져진 에러는 `try..catch` 밖으로 던져진다. 이때 바깥에 `try..catch`가 있다면 여기서 에러를 잡는다. 아니라면 스크립트는 죽는다.

이렇게 하면 `catch` 블록에선 어떻게 다룰지 알고 있는 에러만 처리하고, 알 수 없는 에러는 건너뛸 수 있다.

이제 `try..catch`를 하나 더 만들어, 다시 던져진 예상치 못한 에러를 처리해보자

    function readData() {
      let json = '{ "age": 30 }';

      try {
        // ...
        blabla(); // 에러!
      } catch (e) {
        // ...
        if (!(e instanceof SyntaxError)) {
          throw e; // 알 수 없는 에러 다시 던지기
        }
      }
    }

    try {
      readData();
    } catch (e) {
      alert( "External catch got: " + e ); // 에러를 잡음
    }

`readData`는 `SyntaxError`만 처리할 수 있지만, 함수 바깥의 `try..catch`에서는 예상치 못한 에러도 처리할 수 있게 되었다.

## try..catch..finally

`try..catch`는 `finally`라는 코드 절을 하나 더 가질 수 있다.

`finally` 안의 코드는 다음과 같은 상황에서 실행된다.

- 에러가 없는 경우 : `try` 실행이 끝난 후
- 에러가 있는 경우: `catch` 실행이 끝난 후


`finally`를 사용하면 `try..catch`를 다음과 같이 확장할 수 있다.

    try {
      ... 코드를 실행 ...
    } catch(e) {
      ... 에러 핸들링 ...
    } finally {
      ... 항상 실행 ...
    }

---

    try {
      alert( 'try 블록 시작' );
      if (confirm('에러를 만드시겠습니까?')) 이상한_코드();
    } catch (e) {
      alert( 'catch' );
    } finally {
      alert( 'finally' );
    }

위 코드는 두 가지 경로로 실행된다.

1. "에러를 만드시겠습니까?"에 ok로 답한 경우: `try -> catch -> finally`
2. 'No'로 답한 경우: `try -> finally`

`finally` 절은 무언가를 실행하고, 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용된다.

피보나치 함수 `fib(n)`의 연산 시간을 측정하고 싶다고 가정하자. 함수 실행 전에 측정을 시작해서 실행이 끝난 후 측정을 종료하면 된다. 그런데 함수 실행 도중 에러가 발생하면 어떻게 될까? 아래 `fib(n)`에는 음수나 정수가 아닌 수를 입력할 경우 에러가 발생한다.

이런 경우에 `finally`를 사용할 수 있다. `finally` 절은 무슨 일이 일어났든 관계없이 연산 시간 측정을 끝마치기 적절한 곳이다.

`fib` 함수가 에러 없이 정상적으로 실행되든 에러가 발생하든 상관없이, `finally`를 사용하면 연산 시간을 제대로 측정할 수 있다.

    let num = +prompt("양의 정수를 입력해주세요.", 35)

    let diff, result;

    function fib(n) {
      if (n < 0 || Math.trunc(n) != n) {
        throw new Error("음수나 정수가 아닌 값은 처리할 수 없습니다.");
      }
      return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }

    let start = Date.now();

    try {
      result = fib(num);
    } catch (e) {
      result = 0;
    } finally {
      diff = Date.now() - start;
    }

    alert(result || "에러 발생");

    alert( `연산 시간: ${diff}ms` );

코드를 실행하고 프롬포트 대화상자에 `35`를 입력하면 `try` 다음에 `finally`가 정상적으로 실행되면서 연산 시간을 확인할 수 있다. `-1`을 입력하면 에러가 발생하고, 연산 시간은 `0ms`가 된다. 두 경우 모두 연산 시간이 정상적으로 측정되었다.

함수는 `return`이나 `throw`를 만나면 종료되는데, 이렇게 `finally` 절을 사용하면 두 경우 모두를 처리할 수 있다.

**try..catch..finally 안의 변수는 지역 변수이다**


## 요약

`try..catch` 을 이용하면 런타임 에러를 처리할 수 있다. `try` 에선 코드를 실행하고, 에러가 발생하면 `catch` 에서 잡아낸다.

문법은 아래와 같다

    try {
      // 이곳의 코드를 실행
    } catch(err) {
      // 에러가 발생하면, 여기부터 실행된다.
      // err는 에러 객체
    } finally {
      // 에러 발생 여부와 상관없이 try/catch 이후에 실행된다.
    }

`try..catch`, `try..catch..finally` 이외에도 `try..finally`를 사용할 수 있다.

에러 객체엔 다음과 같은 프로퍼티가 있다.

- `message` - 사람이 읽을 수 있는 형태의 에러 메시지
- `name` - 에러 이름을 담은 문자열(에러 생성자 이름)
- `stack` - 표준이 아니지만 대부분의 호스트 환경이 지원하는 프로퍼티로 에러가 발생한 순간의 스택을 나타냄

에러 객체가 필요 없으면 `catch(err) {` 대신 `catch {`를 쓸 수 있다.

`throw` 연산자를 사용하면 에러를 직접 만들 수 있다. 이론상으론, `throw` 인수에 모든 것을 넘길 수 있지만, 대개 내장 `Error` 클래스를 상속받은 에러 객체를 인수에 넘긴다.

**다시 던지기**는 에러 처리 시 사용되는 중요한 패턴이다. `catch` 블록에선 대개 예상하였거나 어떻게 다룰지 알고 있는 에러를 다루고, 예상치 못한 에러는 다시 던지기 한다.

`try..catch`가 없어도 대부분의 호스트 환경이 '전역'에러 핸들러를 지원하기 때문에 '떨어져 나온' 에러를 잡을 수 있다. 