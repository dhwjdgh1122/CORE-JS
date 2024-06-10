## 함수
프로그램을 구성하는 주요 '구성 요소'이다. 함수를 이용하면 중복 없이 유사한 동작을 하는 코드를 여러 번 호출할 수 있다.

앞에 다양한 예시에서 `alert(message)`, `prompt(message, default)`, `confirm(question)`과 같은 내장 함수를 사용했다. 이번 챕터에선 함수를 직접 만드는 방법에 대해 알아보자.

## 함수 선언 
***함수 선언*** 방식을 이용하면 함수를 만들 수 있다(함수 선언 방식은 함수 선언문이라고 부르기도 한다.)

함수 선언 방식은 아래와 같이 작성할 수 있다.

    function showMessage() {
      alert( '안녕하세요!' );
    }

`function` 키워드, 함수 이름, 괄호로 둘러싼 매개변수를 차례로 써주면 함수를 선언할 수 있다. 위 함수는 매개변수가 없는데, 만약 매개변수가 여러 개 있다면 각 매개변수를 콤마로 구분해준다. 이어서 함수를 구성하는 코드의 모임인 '함수 본문'을 중괄호로 감싸 붙여준다.

    function name(parameter1, parameter2, ... parameterN) {
      // 함수 본문
    }

새롭게 정의한 함수는 함수 이름 옆에 괄호를 붙여 **호출**할 수 있다. `showMessage()`처럼

    function showMessage() {
      alert( '안녕하세요!' );
    }

    showMessage();
    showMessage();

`showMessage()`로 함수를 호출하면 함수 본문이 실행된다. 위 예시에선 showMessage를 두 번 호출했으므로 얼럿 창이 두 번 뜬다.

함수의 주요 용도 중 하나는 중복 코드 피하기이다. 위 예시를 통해 이를 확인하자.

얼럿 창에 보여줄 메시지를 바꾸거나 메시지를 보여주는 방식 자체를 변경하고 싶다면, 함수 본문 중 출력에 관여하는 코드 딱 하나만 수정해주면 된다.

## 지역 변수
함수 내에서 선언한 변수인 지역 변수는 함수 안에서만 접근할 수 있다.

    function showMessage() {
      let message = "안녕하세요!"; // 지역 변수

      alert( message );
    }

    showMessage(); // 안녕하세요!

    alert( message ); // ReferenceError: message is not defined (message는 함수 내 지역 변수이기 때문에 에러가 발생한다.)

변수의 범위(scope)는 변수의 선언 위치에 따라 결정된다. `let` 키워드를 사용하여 변수 `message`를 선언했고, 해당 변수는 '블록 범위'(block scope)를 갖는다. 함수 내에서 선언된 변수는 해당 함수 블록 내에서만 접근할 수 있는 **지역 변수**가 된다.

`let` 키워드로 선언된 변수는 블록 범위를 가지고 블록 범위는 `{}` 중괄호로 둘러싸인 코드 블록 내부에서만 변수가 유효하다는 의미를 가짐

## 외부 변수
함수 내부에서 함수 외부의 변수인 외부 변수에 접근할 수 있다.

    let userName = 'John';

    function showMessage() {
      let message = 'Hello, ' + userName;
      alert(message);
    }

    showMessage(); // Hello, John
함수에선 외부 변수에 접근하는 것뿐만 아니라, 수정도 할 수 있다.

    let userName = 'John';

    function showMessage() {
      userName = "Bob"; // (1) 외부 변수를 수정함

      let message = 'Hello, ' + userName;
      alert(message);
    }

    alert( userName ); // 함수 호출 전이므로 John 이 출력됨

    showMessage();

    alert( userName ); // 함수에 의해 Bob 으로 값이 바뀜
외부 변수는 지역 변수가 없는 경우에만 사용할 수 있다.

함수 내부에 외부 변수와 동일한 이름을 가진 변수가 선언되었다면, 내부 변수는 외부 변수를 가린다. 예시를 보자. 함수 내부에 외부 변수와 동일한 이름을 가진 지역 변수 `userName`가 선언되어 있다. 외부 변수는 내부 변수에 가려져 값이 수정되지 않았다.

    let userName = 'John';

    function showMessage() {
      let userName = "Bob"; // 같은 이름을 가진 지역 변수를 선언합니다.

      let message = 'Hello, ' + userName; // Bob
      alert(message);
    }

    // 함수는 내부 변수인 userName만 사용합니다,
    showMessage();

    alert( userName ); // 함수는 외부 변수에 접근하지 않습니다. 따라서 값이 변경되지 않고, John이 출력됩니다.

---
**전역 변수**    
위 예시의 `userName`처럼, 함수 외부에 선언된 변수는 ***전역 변수***라고 부른다. 전역 변수는 같은 이름을 가진 지역 변수에 의해 가려지지만 않는다면 모든 함수에서 접근할 수 있다.

## 매개변수
매개변수(parameter)를 이용하면 임의의 데이터를 함수 안에 전달할 수 있다. 매개변수는 인자라고 불리기도 한다.

아래 예시에서 함수 showMessage는 매개변수 `from`과 `text`를 가진다.

    function showMessage(from, text) { // 인자: from, text
      alert(from + ': ' + text);
    }

    showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
    showMessage('Ann', "What's up?"); // Ann: What's up? (**)

`(*)`, `(**)`로 표시한 줄에서 함수를 호출하면, 함수에 전달된 인자는 지역변수 `from`과 `text`에 복사된다. 그 후 함수는 지역변수에 복사된 값을 사용한다.

예시 하나를 더 살펴보면. 전역 변수 `from`이 있고, 이 변수를 함수에 전달하고. 함수가 from을 변경하지만, 변경 사항은 외부 변수 `from`에 반영되지 않는다. 함수는 언제나 복사된 값을 사용하기 때문입니다.

    function showMessage(from, text) {

      from = '*' + from + '*'; // "from"을 좀 더 멋지게 꾸며줍니다.

      alert( from + ': ' + text );
    }

    let from = "Ann";

    showMessage(from, "Hello"); // *Ann*: Hello

    // 함수는 복사된 값을 사용하기 때문에 바깥의 "from"은 값이 변경되지 않습니다.
    alert( from ); // Ann

함수의 매개변수에 전달된 값을 **인수(argument)**라고 부르기도 한다.
- 매개변수는 함수 선언 방식 괄호 사이에 있는 변수이다(선언 시 쓰이는 용어)
- 인수는 함수를 호출할 때 매개변수에 전달되는 값이다(호출 시 쓰이는 용어)

즉, 함수 선언 시 매개변수를 나열하게 되고, 함수를 호출할 땐 인수를 전달해 호출한다.    
위 예에서 함수 `showMessage`는 `from`과 `text`라는 두 매개변수를 사용해 선언되었고, 그 후 호출시엔 `from`, `Hello`라는 두 인수를 사용해 호출되었다.

## 기본값
함수 호출 시 매개변수에 인수를 전달하지 않으면 그 값은 `undefined`가 된다.    
위에서 정의한 함수 `showMessage(frmo, text)`는 매개변수가 2개지만, 아래와 같이 인수를 하나만 넣어서 호출할 수 있다.

    showMessage("Ann");

이렇게 코드를 작성해도 에러가 발생하지 않는다. 두 번째 매개변수에 값을 전달하지 않았기 때문에 `text`엔 `undefined`가 할당될 뿐이다. 따라서 에러 없이 `"Ann: undefined"`가 출력된다.

매개변수에 값을 전달하지 않아도 그 값이 `undefined`가 되지 않게 하려면 함수를 선언할 때 `=`를 사용해 '기본값'을 설정하면 된다.

    function showMessage(from, text = "no text given") {
      alert( from + ": " + text );
    }

    showMessage("Ann"); // Ann: no text given

이젠 `text`가 값을 전달받지 못해도 `undefined`대신 기본값 `"no text given"`이 할당된다.    
매개변수에 값을 전달해도 그 값이 `undefined`와 엄격히 일치한다면 기본값이 할당된다.

    showMessage("Ann", undefined); // Ann: no text given

위 예시에선 문자열 `"no text given"`을 기본값으러 설정했다. 하지만 아래와 같이 복잡한 표현식도 기본값으로 설정할 수 있다.

    function showMessage(from, text = anotherFunction()) {
      // anotherFunction()은 text값이 없을 때만 호출됨
      // anotherFunction()의 반환 값이 text의 값이 됨
    }

---
**매개변수 기본값 평가 시점**    
자바스크립트에선 함수를 호출할 때마다 매개변수 기본값을 평가한다. 물론 해당하는 매개변수가 없을 때만 기본값을 평가한다.

위 예시에선 매개변수 `text`에 값이 전달되는 경우 `anotherFunction()`은 호출되지 않는다.    
반면 `text`에 값이 없는 경우 `showMessage()`를 호출할 때마다 `anotherFucntion()`이 호출된다.

## 매개변수 기본값을 설정할 수 있는 또 다른 방법
가끔은 함수를 선언할 때가 아닌 함수 선언 후에 매개변수 기본값을 설정하는 것이 적절한 경우도 있다.    
이런 경우엔 함수를 호출할 때 매개변수를 `undefined`와 비교하여 매개변수가 전달되었는지를 확인한다.

    function showMessage(text) {
      // ...

      if (text === undefined) { // 매개변수가 생략되었다면
        text = '빈 문자열';
      }

      alert(text);
    }

    showMessage(); // 빈 문자열

이렇게 `if`문을 쓰는 것 대신 논리 연산자 `||`를 사용할 수도 있다.

    // 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당됩니다.
    function showMessage(text) {
      text = text || '빈 문자열';
      ...
    }

이 외에도 모던 자바스크립트 엔진이 지원하는 **nullish 병합 연산자(nullish coalescing operator)** `??`를 사용하면 0처럼 falsy로 평가되는 값들을 일반 값처럼 처리할 수 있어서 좋습니다.

    // 매개변수 'count'가 `undefined` 또는 `null`이면 'unknown'을 출력해주는 함수
    function showCount(count) {
      alert(count ?? "unknown");
    }

    showCount(0); // 0
    showCount(null); // unknown
    showCount(); // unknown

## 반환 값
함수를 호출했을 때 함수를 호출한 그곳에 특정 값을 반환하게 할 수 있다. 이때 이 특정 값을 반환 값(return value)이라고 부른다.    
인수로 받은 두 값을 더해주는 간단한 함수를 만들어 반환 값에 대해 알아보자.

    function sum(a, b) {
      return a + b;
    }

    let result = sum(1, 2);
    alert( result ); // 3

지시자 `return`은 함수 내 어디서든 사용할 수 있다. 실행 흐름이 지시자 `return`을 만나면 함수 실행은 즉시 중단되고 함수를 호출한 곳에 값을 반환한다. 위 예시에선 반환 값을 `result`에 할당했다.    
아래와 같이 함수 하나에 여러 개의 `return`문이 올 수도 있다.

    function checkAge(age) {
      if (age >= 18) {
        return true;
      } else {
        return confirm('보호자의 동의를 받으셨나요?');
      }
    }

    let age = prompt('나이를 알려주세요', 18);

    if ( checkAge(age) ) {
      alert( '접속 허용' );
    } else {
      alert( '접속 차단' );
    }

아래와 같이 지시자 `return`만 명시하는 것도 가능하다. 이런 경우는 함수가 즉시 종료된다.

    function showMovie(age) {
      if ( !checkAge(age) ) {
        return;
      }

      alert( "영화 상영" ); // (*)
      // ...
    }

위 예시에서, `checkAge(age)`가 `false`를 반환하면, `(*)`로 표시한 줄은 실행이 안 되기 때문에 함수 `showMovie`는 얼럿 창을 보여주지 않는다.

---
`return`문이 없거나 `return`지시자만 있는 함수는 `undefined`를 반환한다.    
`return`문이 없는 함수도 무언가를 반환한다. 바로 `undefined`

    function doNothing() { /* empty */ }

    alert( doNothing() === undefined ); // true

`return` 지시자만 있는 경우도 `undefined`를 반환한다. `return`은 `return` `undefined`와 동일하게 동작한다.

    function doNothing() {
      return;
    }

    alert( doNothing() === undefined ); // true

---
`return`과 값 사이에 절대 줄을 삽입하지 말 것!    
자바스크립트는 `return`문 끝에 세미콜론을 자동으로 넣기 때문에 반환하고자 했던 표현식을 반환하지 못하고 아무것도 반환하지 않는 것처럼 되어버릴 수 있다. 표현식을 여러 줄에 걸쳐 작성하고 싶다면 표현식이 `return` 지시자가 있는 줄에서 시작하도록 작성해야 한다.

## 함수 이름짓기
함수는 어떤 `동작`을 수행하기 위한 코드를 모아놓은 것이다. 따라서 함수의 이름은 대개 동사이다. 함수 이름은 가능한 한 간결하고 명확해야 한다. 함수가 어떤 동작을 하는지 설명할 수 있어야 하기 때문이다! 코드를 읽는 사람은 함수 이름만 보고도 함수가 어떤 기능을 하는지 힌트를 얻을 수 있어야 한다.    

함수가 어떤 동작을 하는지 축약해서 설명해 주는 동사를 접두어로 붙여 함수 이름을 만드는 게 관습이다. 다만, 팀 내에서 그 뜻이 반드시 합의된 접두어만 사용해야 한다.

`"show"`로 시작하는 함수는 대개 무언가를 보여주는 함수이다.

이 외에 아래와 같은 접두어를 사용할 수 있다.
- `"get…"` – 값을 반환함
- `"calc…"` – 무언가를 계산함
- `"create…"` – 무언가를 생성함
- `"check…"` – 무언가를 확인하고 불린값을 반환함

위 접두어를 사용하면 아래와 같은 함수를 만들 수 있다.

    showMessage(..)     // 메시지를 보여줌
    getAge(..)          // 나이를 나타내는 값을 얻고 그 값을 반환함
    calcSum(..)         // 합계를 계산하고 그 결과를 반환함
    createForm(..)      // form을 생성하고 만들어진 form을 반환함
    checkPermission(..) // 승인 여부를 확인하고 true나 false를 반환함

---
함수는 동작 하나만 담당해야 한다.
함수는 함수 이름에 언급되어 있는 동작을 정확히 수행해야 하고, 그 이외의 동작은 수행해선 안 된다.    

독립적인 두 개의 동작은 독립된 함수 두 개에서 나눠서 수행할 수 있게 해야 한다.

번번히 하는 실수
- `getAge` 함수는 나이를 얻어오는 동작만 수행해야 한다. `alert` 창에 나이를 출력해 주는 동작은 이 함수에 들어가지 않는 것이 좋다.
- `createForm` 함수는 form을 만들고 이를 반환하는 동작만 해야 한다. form을 문서에 추가하는 동작이 해당 함수에 들어가 있으면 좋지 않다.
- `checkPermission` 함수는 승인 여부를 확인하고 그 결과를 반환하는 동작만 해야 한다. 승인 여부를 보여주는 메시지를 띄우는 동작이 들어가 있으면 좋지 않다.

## 함수 == 주석
함수는 간결하고, 한 가지 기능만 수행할 수 있게 만들어야 한다. 함수가 길어지면 함수를 잘게 쪼갤 때가 되었다는 신호로 받아들여야 한다. 함수를 쪼개는 건 쉬운 작업은 아니다. 하지만 함수를 분리해 작성하면 많은 장점이 있기 때문에 함수가 길어질 경우엔 함수를 분리해 작성할 것

함수를 간결하게 만들면 테스트와 디버깅이 쉬워짐. 그리고 함수 그 자체로 주석의 역할까지 한다!    
같은 동작을 하는 함수, `showPrimes(n)`을 두 개 만들어 비교해 보자 `showPrimes(n)`은 `n`까지의 **소수**를 출력해준다.

첫 번째 `showPrimes(n)`에선 레이블을 사용해 반복문을 작성해보자

    function showPrimes(n) {
      nextPrime: for (let i = 2; i < n; i++) {

        for (let j = 2; j < i; j++) {
          if (i % j == 0) continue nextPrime;
        }

        alert( i ); // 소수
      }
    }

두 번째 `showPrimes(n)`는 소수인지 아닌지 여부를 검증하는 코드를 따로 분리해 `isPrime(n)`이라는 함수에 넣어서 작성.

    function showPrimes(n) {

      for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i);  // a prime
      }
    }

    function isPrime(n) {
      for (let i = 2; i < n; i++) {
        if ( n % i == 0) return false;
      }
      return true;
    }

두 번째 `showPrimes(n)`가 더 이해하기 쉽다. `isPrime`함수 이름을 보고 해당 함수가 소수 여부를 검증하는 동작을 한다는 걸 쉽게 알 수 있다. 이렇게 이름만 보고도 어떤 동작을 하는지 알 수 있는 코드를 ***자기 설명적***코드라고 부른다.

## 요약
함수 선언 방식으로 함수를 만들 수 있다.

    function 함수이름(복수의, 매개변수는, 콤마로, 구분합니다) {
      /* 함수 본문 */
    }

- 함수에 전달된 매개변수는 복사된 후 함수의 지역변수가 된다.
- 함수는 외부 변수에 접근할 수 있다. 하지만 함수 바깥에서 함수 내부의 지역변수에 접근하는 건 불가능하다.
- 함수는 값을 반환할 수 있다. 값을 반환하지 않는 경우는 반환 값이 `undefined`가 된다.

깔끔하고 이해하기 쉬운 코드를 작성하려면 함수 내부에서 외부 변수를 사용하는 방법 대신 지역 변수와 매개변수를 활용하는게 좋다.

매개변수를 받아서 그 변수를 가지고 반환 값을 만들어 내는 함수를 더 쉽게 이해할 수 있다. 매개변수 없이 함수 내부에서 외부 변수를 수정해 반환 값을 만들어 내는 함수는 쉽게 이해하기 힘들다.

함수 이름을 지을 땐 아래와 같은 규칙을 따르는 것이 좋다.
- 함수 이름은 함수가 어떤 동작을 하는지 설명할 수 있어야 한다. 이렇게 이름을 지으면 함수 호출 코드만 보아도 해당 함수가 무엇을 하고 어떤 값을 반환할지 바로 알 수 있다.
- 함수는 동작을 수행하기 때문에 이름이 주로 동사이다.
- `create...`, `show...`, `get...`, `check...`, 등의 잘 알려진 접두어를 사용해 이름을 지을 수 있다. 접두어를 사용하면 함수 이름만 보고도 해당 함수가 어떤 동작을 하는지 파악할 수 있다.

함수는 스크립트를 구성하는 주요 구성 요소이다. 지금까지 다룬 내용은 함수의 기본이다