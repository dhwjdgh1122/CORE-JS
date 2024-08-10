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

**innerHTML** 프로퍼티를 사용하면 요소 안의 HTML을 문자열 형태로 받아올 수 있다.

요소 안 HTML을 수정하는 것도 가능하다. innerHTML은 페이지를 수정하는 데 쓰이는 강력한 방법의 하나이다.

`document.body` 안의 내용을 출력하고 완전히 바꾸는 예시를 살펴보자

    <body>
      <p>p 태그</p>
      <div>div 태그</div>

      <script>
        alert( document.body.innerHTML ); // 내용 읽기
        document.body.innerHTML = '새로운 BODY!`; // 교체
      </script>

    </body>

문법이 틀린 HTML을 넣으면 브라우저가 자동으로 고쳐준다.

    <body>

      <script>
        document.body.innerHTML = '<b>test'; // 닫는 태그를 잊음
        alert( document.body.innerHTML ); // <b>test</b> (자동으로 수정됨)
      </script>

    </body>

**스크립트는 실행되지 않는다**    
`innerHTML`을 사용해 문서에 `<script>` 태그를 삽입하면 해당 태그는 HTML의 일부가 되긴 하지만 실행은 되지 않는다.

## 'innerHTML+='사용 시 주의점
`elem.innerHTML+="추가 html"`을 사용하면 요소에 HTML을 아래와 같이 추가할 수 있다.

    chatDiv.innerHTML += "<div>안녕<img src='smile.gif'/> </div>;
    chatDiv.innerHTML += " 잘 지내?";

그런데 'innerHTML+='은 추가가 이날 내용을 덮어쓰기 때문에 주의해서 사용해야 한다.

기술적으로 아래 두 줄의 코드는 동일한 역할을 한다.

    elem.innerHTML += "...";
    // 위 코드는 아래 코드의 축약 버전이다.
    elem.innerHTML = elem.innerHTML + "..."

즉, `innerHTML+=`는 아래와 같은 일을 한다.

1. 기존 내용 삭제
2. 기존 내용과 새로운 내용을 합친 새로운 내용을 씀


**기존 내용이 '완전히 삭제'된 후 밑바닥부터 다시 내용이 쓰여지기 때문에 이미지 등의 리소스 전부가 다시 로딩된다.

`chatDiv` 예시의 `chatDiv.innerHTML+="잘 지내?"` 윗줄의 HTML 내용이 재생성되고 `smile.gif` 역시 다시 로딩되는 것이다. 어딘가에 이런 리소스들을 캐싱해 놓았다면 좋았을 거라는 생각이 든다. `chatDiv`에 텍스트와 이미지가 많이 있었다면 내용을 다시 불러올 때 버벅임이 생기는걸 눈으로 확인할 수 있다.

이 외에도 `innerHTML+=`은 여러 부작용이 있다. 기존에 있던 텍스트를 마우스로 드래그한 상황이라면 내용을 다시 써야하기 때문에 드래그가 해제될 것이다. `<input>` 태그에서 사용자가 입력한 값이 사라지기도 한다.

## outerHTML로 요소의 전체 HTML 보기

`outerHTML` 프로퍼티엔 요소 전체 HTML이 담겨있다. `outerHTML`은 `innerHTML`에 요소 자체를 더한 것이라고 생각하면 된다.

    <div id="elem>hello <b>world</b></div>

    <script>
      alert(elem.outerHTML); // <div id="elem">hello <b>world</b></div>
    </script>

`innerHTML`과 달리 `outerHTML`을 사용해서 HTML을 쓸땐 요소 자체가 바뀌지 않는다. 대신 `outerHTML`은 DOM 안의 요소를 교체한다.

뭔가 이상하가 구체적인 예시를 살펴보며 이해해 보자

    <div>Hello, world!</div>

    <script>
      let div = document.querySelector('div');

      // div.outerHTML를 사용해 <p>...</p>로 교체
      div.outerHTML = '<p>새로운 요소</p>; // (*)

      // div가 그대로이네?
      alert(div.outerHTML);  // <div>Hello, world!</div> (**)
    </script>

뭔가 이상하다.

`(*)`로 표시한 줄에서 `div`를 `<p>새로운 요소</p>` 로 교체했기 때문에 예시를 실행하면 의도한 대로 문서(DOM)에 `<div>`가 아닌 새로운 내용이 보인다. 그런데 `(**)`에서 기존의 `div` 를 출력한다.

이런 결과가 나타난 이유는 `outerHTML`에 하는 할당 연산이 DOM 요소(outerHTML 연산의 대상으로, 위 예시에선 변수 `div`)를 수정하지 않기 때문이다. 할당 연산은 요소를 DOM 에서 제거하고 새로운 HTML 조각을 넣는다.

즉, `div.ouetHTML=...`는 아래와 같은 일을 한다.

- '문서'에서 `div`를 삭제
- 새로운 HTML 조각인 `<p>A new element</p>`을 삭제 후 생긴 공간에 삽입
- `div`엔 여전히 기존 값이 저장되어 있고 새로운 HTML 조각은 어디에도 저장되어 있지 않음

`outerHTML`의 이런 동작 방식 때문에 `outerHTML`을 사용할 땐 실수 할 여지가 많다. `div.outerHTML`을 수정한 후 `div`에 새로운 내용이 들어갔다고 착각하며 작업하는 경우가 많다. 정리하면 이렇다. `innerHTML`은 `div`를 수정하지만 `outerHTML`은 `div`를 수정하지 않는다.

그렇기 때문에 `elem.outerHTML`에 무언가를 쓸 때는 `elem`이 수정되지 않는다는 점을 꼭 명심하고 있어야 한다. 할당받은 HTML은 `elem`이 있던 공간에 들어간다. 새롭게 만들어진 요소를 참조하려면 DOM 쿼리 메서드를 사용해야한다.

## nodeValue/data로 텍스트 노드 내용 조작하기

`innerHTML` 프로퍼티는 요소 노드에만 사용할 수 있다.

텍스트 노드 같은 다른 타입의 노드에는 `innerHTML`과 유사한 역할을 해주는 프로퍼티인 `nodeValue`와 `data`를 사용해야 한다. 이 두 프로퍼티는 아주 유사하고, 실무에서도 구분 없이 쓰긴 하지만 명세서상에 작은 차이가 있다. `data`가 좀 더 짧기 때문에 여기선 `data`를 사용하자

텍스트 노드와 주석 노드의 내용을 읽는 예시를 보자

    <body>
      안녕
      <!-- 주석 -->
      <script>
        let text = document.body.firstChild;
        alert(text.data); // 안녕

        let comment = text.nextSibling;
        alert(comment.data); // 주석
      </script>
    </body>


텍스트 노드의 내용을 읽거나 수정하는 일은 일어날 법 한데 주석 노드는 왜 이런 기능이 필요할까??

개발자들은 종종 아래와 같은 방식으로 정보나 지시사항을 HTML에 삽입한다.

    <!-- if isAdmin -->
      <div>관리자로 로그인하였습니다.</div>
    <!-- /if -->

이럴 때 `data` 프로퍼티 기능을 사용해 주석 노드의 내용을 읽고 삽입된 지시사항을 처리하면 유용하다.

## textContent로 순수한 텍스트만

`textContent`를 사용하면 요소 내의 텍스트에 접근할 수 있다. `<태그>`는 제외하고 오로지 텍스트만 추출할 수 있다.

    <div id="news">
    <h1>주요 뉴스!</h1>
    <p>화성인이 지구를 침공하였습니다!</p>
    </div>

    <script>
      // 주요 뉴스! 화성인이 지구를 침공하였습니다!
      alert(news.textContent);
    </script>

코드를 실행하면 원래부터 `<태그>`가 없었던 것처럼 텍스트만 반환되는 것을 확인할 수 있다.

그런데 실무에선 텍스트 읽기를 단독으로 쓰는 경우는 흔치 않다.

`textContent`를 사용하면 텍스트를 '안전한 방법'으로 쓸 수 있기 때문에 실무에선 `textContent`를 쓰기 용으로 유용하게 사용한다.

사용자가 입력한 임의의 문자열을 다시 출력해주는 경우를 생각해 보자.

- `innerHTML`을 사용하면 사용자가 입력한 문자열이 'HTML 형태로' 태그와 함께 저장된다.
- `textContent`를 사용하면 사용자가 입력한 문자열이 '순수 텍스트 형태로' 저장되기 때문에 태그를 구성하는 특수문자들이 문자열로 처리된다.

두 프로퍼티를 비교해보자.

    <div id="elem1"></div>
    <div id="elem2"></div>

    <script>
      let name = prompt("이름을 알려주세요.", "<b>이보라</b>");

      elem1.innerHTML = name;
      elem2.textContent = name;
    </script>

1. 첫 번째 `<div>`엔 이름이 'HTML 형태'로 저장된다 입력한 태그는 태그로 해석되어 굵은 글씨가 출력된다.
2. 두 번째 `<div>`엔 이름이 '텍스트 형태'로 저장된다. 따라서 입력한 값 그대로 `<b>이보라</b>` 가 출력된다.

`<b>이보라</b>` 를 입력하면 첫 번째 `div`엔 'HTML 형태'로 저장되기 때문에 굵은글씨가 나오고, 두 번째 `div`에는 '텍스트 형식'인 `<b>이보라</b>`가 출력되는 거임

## hidden 프로퍼티

hidden 속성과 hidden 프로퍼티는 요소를 보여줄지 말지 지정할 때 사용할 수 있다.

`hidden`은 HTML 안에서 쓸 수도 있고 자바스크립트에서도 쓸 수 있다.

    <div>아래 두 div를 숨겨봅시다.</div>

    <div hidden>HTML의 hidden 속성 사용하기</div>

    <div id="elem">자바스크립트의 hidden 프로퍼티 사용하기</div>

    <script>
      elem.hidden = true;
    </script>

`hidden`은 기술적으로 `style="display:none"` 와 동일하다.

`hidden`을 사용해 요소를 깜빡이게 해보자.

    <div id="elem">깜빡이는 요소</div>

    <script>
      setInterval(() => elem.hidden = !elem.hidden, 1000);
    </script>


## 기타 프로퍼티

살펴본 프로퍼티 외에도 DOM 요소엔 다양한 프로퍼티가 있는데, 클래스마다 특징적인 프로퍼티 몇 가지를 알아보자

- `value` - `<input>`과 `<select>`, `<textarea>`의 값이 저장된다. 대응하는 클래스는 `HTMLInputElement`, `HTMLSelectElement` 등
- `href`- `<a href="...">`의 href 속성 값이 저장된다. 대응하는 클래스는 `HTMLAnchorElement`이다.
- `id` - id 속성 값이 저장된다. 모든 요소 노드에서 사용할 수 있으며, 대응하는 클래스는 `HTMLElement`이다.

      <input type="text" id="elem" value="value">

      <script>
        alert(elem.type); // "text"
        alert(elem.id); // "elem"
        alert(elem.value); // value
      </script>

대부분의 표준 HTML 속성은 그에 대응하는 DOM 프로퍼티를 가지고 있는데, 위 예시와 같은 방식으로 프로퍼티에 접근할 수 있다.

특정 클래스에서 지원하는 프로퍼티 전체를 보고 싶으면 명세서를 읽으면 된다

명세서를 읽지 않고도 개발자 도구의 콘솔 창에 `console.dir(elem)`를 입력하면 해당 요소에서 지원하는 프로퍼티 목록을 확인할 수 있다.

## 요약

각 DOM 노드는 고유한 클래스에 속한다. 클래스들은 계층 구조를 형성한다. DOM 노드에서 지원하는 프로퍼티와 메서드는 계층 구조에서 어떤 클래스를 상속받느냐에 따라 결정된다.

주요 DOM 노드 프로퍼티는 다음과 같다.

`nodeType`    
요소 타입을 알고 싶을 때 사용한다. 요소 노드라면 `1`을, 텍스트 노드라면 `3`을 반환한다. 두 타입 외에도 각 노드 타입엔 대응하는 상수값이 있다. 읽기 전용이다.

`nodeName/tagName`    
요소 노드의 태그 이름을 알아낼 때 사용한다. XML 모드일 때를 제외하고 태그 이름은 항상 대문자로 변환된다.
요소 노드가 아닌 노드에는 `nodeNam`을 사용하면 된다 읽기 전용이다.

`innerHTML`    
요소 안의 HTML을 알아낼 수 있다. 이 프로퍼티를 사용하면 요소 안의 HTML을 수정할 수도 있다.

`outerHTML`    
요소의 전체 HTML을 알아낼 수 있다. `elem.outerHTML`에 무언가를 할당해도 `elem` 자체는 바뀌지 않는다. 대신 새로운 HTML이 외부 컨텍스트에서 만들어지고, `elem`이 삭제된 자리를 채운다.

`nodeValue/data`    
요소가 아닌 노드(텍스트, 주석 노드 등)의 내용을 읽을 때 쓰인다. 두 프로퍼티는 거의 동일하게 동작하낟. 주로 `data`를 많이 사용하는 편이며 내용을 수정할 때도 이 프로퍼티를 쓸 수 있다.

`textContent`    
HTML에서 모든 `<태그>`를 제외한 텍스트만 읽을 때 사용한다. 할당 연산을 통해 무언가를 쓸 수도 있는데 이때 태그를 포함한 모든 특수문자는 문자열로 처리된다. 사용자가 입력한 문자를 안전한 방법으로 처리하기 때문에 원치 않는 HTML이 사이트에 삽입되는 것을 예방할 수 있다.

`hidden`    
`true`로 설정하면 CSS에서 `display:none`을 설정한 것과 동일하게 동작한다.

DOM 노드는 클래스에 따라 이 외에도 다른 프로퍼티를 가진다. `<input>` 요소 (`HTMLInputElement`)는 `value`, `type` 프로퍼티를, `<a>` 요소(`HTMLAnchorElement`)는 `href` 프로퍼티를 지원하는 것 같이 말이다. 대부분의 표준 HTML 속성은 대응하는 DOM 프로퍼티를 가집니다.

그런데 HTML 요소와 DOM 프로퍼티가 항상 같은 것은 아니다.