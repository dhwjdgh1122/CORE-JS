## 주요 노드 프로퍼티

DOM 노드를 좀 더 알아보자

## DOM 노드 클래스

DOM 노드는 종류에 따라 각각 다른 프로퍼티를 지원한다. 태그 `<a>`에 대응하는 요소 노드엔 링크 관련된 프로퍼티를, `<input>` 에 대응하는 요소 노드엔 입력 관련프로퍼티를 제공한다. 텍스트 노드는 요소 노드와 다른 프로퍼티를 지원하는 것은 말할 필요도 없다. 그런데 모든 DOM 노드는 공통 조상으로부터 만들어지기 때문에 노드 종류는 다르지만, 모든 DOM 노드는 공통된 프로퍼티와 메서드를 지원한다.

DOM 노드는 종류에 따라 대응하는 내장 클래스가 다르다.

계층 구조 꼭대기엔 **EventTarget**이 있는데, **Node**는 EventTarget을 다른, DOM 노드들은 Node 클래스를 상속 받는다.

이런 관계를 그림으로 나타내면 다음과 같다.

<img src="Dom5.png" width="400" height="300" >

각 클래스는 다음과 같은 특징을 가진다.
- `EventTarget` - 루트에 있는 '추상'클래스로, 이 클래스에 대응하는 객체는 실제로 만들어지지 않는다.
EventTarget가 모든 DOM 노드의 베이스에 있기 때문에 DOM 노드에서 '이벤트'를 사용할 수 있다.
- `Node` - 역시 '추상'클래스로, DOM 노드의 베이스 역할을 한다. getter 역할을 하는 `parentNode`, `nextSibling`, `childNodes` 등의 주요 트리 탐색 기능을 제공한다. `Node` 클래스의 객체는 절대 생성되지 않는다. 하지만 이 클래스를 상속받는 클래스는 여럿 있습니다. 텍스트 노드를 위한 `Text` 클래스와 요소 노드를 위한 `Element` 클래스, 주석 노드를 위한 `Comment` 클래스는 `Node` 클래스를 상속 받는다.
- `Element` - DOM 요소를 위한 베이스 클래스이다. `nextElementSibling`, `children` 이나 `getElementByTagName`, `querySelector` 같이 요소 전용 탐색을 도와주는 프로퍼티나 메서드가 이를 기반으로 한다. 브라우저는 HTML뿐만 아니라 XML,SVG도 지원하는데 `Element` 클래스는 이와 관련된 `SVGElement`, `XMLElement`, `HTMLElement` 클래스의 베이스 역할을 한다.
- `HTMLElement` - HTML 요소 노드의 베이스 역할을 하는 클래스이다. 아래 나열한 클래스들은 실제 HTML 요소에 대응하고 `HTMLElement`를 상속 받는다.

   - `HTMLInputElement` - `<input>` 요소에 대응하는 클래스
   - `HTMLBodyElement` - `<body>` 요소에 대응하는 클래스
   - `HTMLAnchorElement` - `<a>` 요소에 대응하는 클래스
   - 이외에도 다른 클래스가 많은데, 각 태그에 해당하는 클래스는 고유한 프로퍼티와 메서드를 지원한다.

이렇게 특정 노드에서 사용할 수 있는 프로퍼티와 메서드는 상속을 기반으로 결정된다.

`<input>` 요소에 대응하는 DOM 객체를 예로 들어보자. 이 객체는 **HTMLInputElement** 클래스를 기반으로 만들어진다.

객체엔 아래에 나열한 클래스에서 상속받은 프로퍼티와 메서드가 있을 것이다.

- `HTMLInputElement` – 입력 관련 프로퍼티를 제공하는 클래스
- `HTMLElement` – HTML 요소 메서드와 `getter`, `setter`를 제공하는 클래스
- `Element` – 요소 노드 메서드를 제공하는 클래스
- `Node` – 공통 DOM 노드 프로퍼티를 제공하는 클래스
- `EventTarget` – 이벤트 관련 기능을 제공하는 클래스
- `Object` – `hasOwnProperty` 같이 ‘일반 객체’ 메서드를 제공하는 클래스

우리는 앞서 객체는 `constructor` 프로퍼티를 가진다는 걸 배운 적 있다. 이런 특징을 이용하면 DOM 노드 클래스 이름을 확인할 수 있다. `constructor` 프로퍼티는 클래스 생성자를 참조하고 이름은 `constructor.name`에 저장되어 있다는 점을 이용하면 된다.

    alert( document.body.constructor.name); // HTMLBodyElement

`toString`을 사용해도 된다.

    alert( document.body); // [object HTMLBodyElement]

상속 여부는 `instanceof`를 사용해 확인할 수 있다.

    alert( document.body instanceof HTMLBodyElement ); // true
    alert( document.body instanceof HTMLElement ); // true
    alert( document.body instanceof Element ); // true
    alert( document.body instanceof Node ); // true
    alert( document.body instanceof EventTarget ); // true

지금까지 본 바와 같이 DOM 노드는 프로토타입을 기반으로 상속 관계를 갖는 일반 자바스크립트 객체이다.

브라우저 콘솔에 `console.dir(elem)`를 입력하면 이런 관계를 쉽게 확인할 수 있다. `HTMLElement.prototype`,`Element.prototype` 등이 콘솔에 출력될 것이다.

**`console.dir(elem)`과 `console.log(elem)`의 차이**

브라우저 개발자 도구 대부분은 `console.log`와 `console.dir` 명령어를 지원한다. 이 명령어들은 콘솔에 인수를 출력해준다. 인수가 자바스크립트 객체라면 두 명령어는 대개 같은 결과를 보여준다.

하지만 인수가 DOM 요소일 때는 결과가 다르다.

- `cnosole.log(elem)`는 요소의 DOM 트리를 출력한다
- `console.dir(elem)`는 요소를 DOM 객체처럼 취급하여 출력한다. 따라서 프로퍼티를 확인하기 쉽다는 장점이 있다.

## 'nodeType' 프로퍼티

`nodeType`프로퍼티는 DOM 노드의 '타입'을 알아내고자 할 때 쓰이는 구식 프로퍼티이다.

각 노드 타입은 상숫값을 가진다.

- `elem.nodeType == 1` - 요소노드
- `elem.nodeType == 3` - 텍스트 노드
- `elem.nodeType == 9` - 문서 객체

      <body>
        <script>
          let elem = document.body;

          // 타입을 알아보자
          alert(elem.nodeType); 11 -> 요소 노드

          // 첫 번째 자식 노드
          alert(elem.firstChild.nodeType); // 3 => 텍스트 노드

          // 문서 객체의 타입 확인
          alert( document.nodeType); // 9 => 문서 객체
          </script>
      </body> 

모던 자바스크립트에선 노드의 타입을 `instanceof`나 클래스 기반의 테스트를 이용해 확인하는데, 가끔은 `nodeType`를 쓰는 게 간단할 때도 있다. `nodeType`은 타입 확인 하는 데만 쓸 수 있고 바꾸지는 못한다.

## nodeName과 tagName 으로 태그 이름 확인하기

`nodeName`이나 `tagName` 프로퍼티를 사용하면 DOM 노드의 태그 이름을 알아낼 수 있다.

    alert( document.body.nodeName); // BODY
    alert( document.body.tagName); // BODY

그럼 `tagName`과 `nodeName`의 차이는 없는걸까?

물론 있다. 미묘하지만 이름에서 그 차이를 유추할 수 있다.

- `tagName` 프로퍼티는 `요소`노드에만 존재한다.
- `nodeName` 은 모든 `Node`에 있다.
  - 요소 노드를 대상으로 호출하면 `tagName` 과 같은 역할을 한다.
  - 텍스트 노드, 주석 노드 등에선 노드 타입을 나타내는 문자열을 반환한다.

`nodeName` 은 모든 노드에서 지원되지만, `tagName`은 `Element` 클래스로부터 유래되었기 때문에 요소 노드에서만 지원된다.

`document` 와 주석 노드를 사용해 `tagName`과 `nodeName`의 차이점을 확인해보자

      <body><!-- 주석 -->

      <script>
        // 주석 노드를 대상으로 두 프로퍼티 비교
        alert( document.body.firstChild.tagName ); // undefined (요소가 아님)
        alert( document.body.firstChild.nodeName ); // #comment

        // 문서 노드를 대상으로 두 프로퍼티 비교
        alert( document.tagName ); // undefined (요소가 아님)
        alert( document.nodeName ); // #document
      </script>
    </body>

요소 노드만 다루고 있다면 `tagName`과 `nodeName` 에는 차이가 없으므로 둘 다 사용할 수 있다.

## innerHTML로 내용 조작하기

