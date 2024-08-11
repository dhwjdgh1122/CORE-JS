## 속성과 프로퍼티

브라우저는 웹 페이지를 만나면 HTML을 읽어(파싱(parsing)) DOM 객체를 생성한다. 요소 노드(element node)에서 대부분의 표준 HTML 속성(attribute)은 DOM 객체의 프로퍼티(property)가 된다.

태그 `<body id="page">` 가 있을 때, DOM 객체에서 `<body id="page">`를 사용할 수 있는 것 같이 말이다.

그런데 속성-프로퍼티가 항상 일대일로 매핑되지는 않는다. 속성과 프로퍼티를 어떻게 다룰 수 있는지, 두 가지가 언제 일대일로 매핑되는지, 언제는 매핑되지 않는지에 주의하면서 두 개념을 알아보자.

## DOM 프로퍼티

앞서 내장 DOM 프로퍼티에 대해 살펴본 적 있다. DOM 프로퍼티의 종류는 엄청나게 많다. 하지만 이런 내장 프로퍼티만으로 충분하지 않은 경우 자신만의 프로퍼티를 만들 수도 있다.

DOM 노드는 자바스크립트 객체이다. 객체를 바꿔보자.

`domcument.body`에 새로운 프로퍼티를 만들어 보자.

    document.body.myData = {
        name: 'Caesar',
        title: 'Imperator'
    };

    alert(document.body.myData.title); // Imperator

메서드도 하나 추가해 보자

    document.body.sayTagName = function() {
    alert(this.tagName);
    };

    document.body.sayTagName(); // BODY (sayTagName의 'this'엔 document.body가 저장됩니다.)

`Element.prototype` 같은 내장 프로토타입을 수정해 모든 요소 노드에서 이 메서드를 사용하게 할 수도 있다.

    Element.prototype.sayHi = function() {
      alert(`Hello, I'm ${this.tagName}`);
    };

    document.documentElement.sayHi(); // Hello, I'm HTML
    document.body.sayHi(); // Hello, I'm BODY

DOM 프로퍼티와 메서드는 일반 자바스크립트 객체처럼 행동하므로 아래와 같은 특징을 보인다.    
- 어떤 값이든 가질 수 있다.
- 대.소문자를 가린다. `elem.nodeType`는 동작하지만, `elem.noDeTyPe`는 동작하지 않는다.

## HTML 속성

HTML에서 태그는 복수의 속성을 가질 수 있다. 브라우저는 HTML을 파싱해 DOM 객체를 만들 때 HTML 표준 속성을 인식하고, 이 표준 속성을 사용해 DOM 프로퍼티를 만든다.

따라서 요소가 `id` 같은 표준 속성으로만 구성되어 있다면, 이에 해당하는 프로퍼티가 자연스레 만들어진다. 하지만 표준이 아닌 속성일 때는 상황이 달라진다.

    <body id="test" something="non-standard">
      <script>
        alert(document.body.id); // test
        // 비표준 속성은 프로퍼티로 전환되지 않습니다.
        alert(document.body.something); // undefined
      </script>
    </body>

한 요소에선 표준인 속성이 다른 요소에선 표준이 아닐 수 있다는 점에도 주의해야 한다. `"type"`은 `<input>` 요소 에선 표준이지만, `<body>`에선 아니다. 요소에 어떤 표준 속성이 있는지 알아보려면 해당 요소의 명세서에 정보를 찾을 수 있다.

아래 코드를 보자

    <body id="body" type="...">
      <input id="input" type="text">
      <script>
        alert(input.type); // text
        alert(body.type); // type은 body의 표준 속성이 아니므로 DOM 프로퍼티가 생성되지 않아 undefined가 출력됩니다.
      </script>
    </body>

이처럼 표준 속성이 아닌 경우, 이에 매핑하는 DOM 프로퍼티가 생성되지 않는다. 그렇다면 비표준 속성은 접근할 수 없는걸까?

물론 방법이 있다. 모든 속성은 아래의 메서드를 사용해 접근할 수 있다. 

- `elem.hasAttribute(name)` – 속성 존재 여부 확인
- `elem.getAttribute(name)` – 속성값을 가져옴
- `elem.setAttribute(name, value)` – 속성값을 변경함
- `elem.removeAttribute(name)` – 속성값을 지움

위 메서드들은 HTML에서 명시한 속성을 대상으로 동작한다.

여기에 더하여 `elem.attributes`을 사용하면 모든 속성값을 읽을 수도 있다. `elem.attributes`을 호출하면 내장 클래스 **Attr**를 구현한 객체들을 담은 컬렉션이 반환되는데, 객체엔 `name`과 `value` 프로퍼티가 존재한다.

비표준 프로퍼티를 읽는 예시를 살펴보자

    <body something "non-standard">
    <script>
      alert(document.body.getAttribute('something'));; // 비표준 속성에 접근
      </script>
    </body>

HTML 속성은 아래와 같은 특징을 보인다.
- 대소문자를 가리지 않는다. `id`와 `ID`는 동일하다.
- 값은 항상 문자열이다.

HTML 속성을 어떻게 다루는지에 대한 예시를 살펴보자

    <body>
      <div id="elem" about="Elephant"></div>

      <script>
        alert( elem.getAttribute('About') ); // (1) 'Elephant', 속성 읽기

        elem.setAttribute('Test', 123); // (2) 속성 추가하기

        alert( elem.outerHTML ); // (3) 추가된 속성 확인하기

        for (let attr of elem.attributes) { // (4) 속성 전체 나열하기
          alert( `${attr.name} = ${attr.value}` );
        }
      </script>
    </body>

주의해서 볼 점은 다음과 같다.

1. `getAttribute('About')` - 첫 번째 글자가 대문자 A이지만, HTML 안에서는 모두 소문자가 된다. 속성은 대소문자를 구분하지 않으므로 괜찮다
2. 어떤 값이든 속성에 대입할 수 있지만, 최종적으론 문자열로 바뀐다. 숫자 123이 문자열 `"123"`으로 바뀌었다.
3. `outerHTML`을 사용하면 직접 추가한 속성을 비롯한 모든 속성을 볼 수 있다.
4. `attribute`가 반환하는 컬렉션은 열거 가능(iterable)하다. 컬렉션에 담긴 각 객체의 `name`, `value` 프로퍼티를 사용하면 속성 전체에 접근할 수 있다.

## 프로퍼티 - 속성 동기화

표준 속성이 변하면 대응하는 프로퍼티는 자동으로 갱신된다. 몇몇 경우를 제외하고 프로퍼티가 변하면 속성 역시 마찬가지로 갱신된다.

아래 예시에서 속성 `id`가 수정되면 이에 대응하는 프로퍼티가 갱신되는 것을 확인할 수 있다. 그 반대도 마찬가지이다.
