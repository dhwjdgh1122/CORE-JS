
### DOM 학습 저장소.

---

## 브라우저 환경과 다양한 명세서

자바스크립트는 본래 웹 브라우저에서 사용하려고 만든 언어이다. 이후 진화를 거쳐 다양한 사용처와 플랫폼을 지원하는 언어로 변모하였다.

자바스크립트가 돌아가는 플랫폼은 **호스트(host)** 라고 불린다. 호스트는 브라우저, 웹서버, 심지어는 커피 머신이 될 수도 있다. 각 플랫폼은 해당 플랫폼에 특정되는 기능을 제공하는데, 자바스크립트 명세서에선 이를 **호스트 환경(host environment)** 이라고 부른다.

호스트 환경은 랭귀지 코어에 더하여 플랫폼에 특정되는 객체와 함수를 제공한다. 웹 브라우저는 웹 페이지를 제어하기 위한 수단을 제공하고, Node.js는 서버 가이드 기능을 제공해준다.

아래 그림은 호스트 환경이 웹 브라우저일 때 사용할 수 있는 기능을 개괄적으로 보여준다.

<img src="lib\dom\Dom1.png" width="300" height="200" >

최상단엔 `window`라 불리는 '루트'객체가 있다. `window` 객체는 2가지 역할을 한다.
1. 전역 객체에서 알다시피 자바스크리브 코드의 전역 객체이다.
2. '브라우저 창'을 대변하고, 이를 제어할 수 있는 메서드를 제공한다.

아래 코드는 `window` 객체를 전역 객체로 사용하고 있다.

    function sayHi() {
      alert("안녕하세요");
    }

    // 전역 함수는 전역 객체(window)의 메서드이다.
    window.sayHi();

아래 코드는 `window` 객체가 브라우저 창을 대변하고 있으며, 이를 이용해 창의 높이를 출력한다.

    alert(window.innerHeight); // 창 내부 (inner window) 높이

`window` 객체엔 다양한 메서드와 프로퍼티가 있다.

## 문서 객체 모델(Dom)

문서 객체 모델(Document Object Model, Dom)은 웹 페이지 내의 모든 콘텐츠를 **객체**로 나타내준다. 이 객체는 수정 가능하다.

`document` 객체는 페이지의 기본 '진입점' 역할을 한다. `document` 객체를 이용해 페이지 내 그 무엇이든 변경할 수 있고, 원하는 것을 만들 수도 있다.

    // 배경을 붉은색으로 변경하기
    document.body.style.background = "red";

    // 1초 후 원상태로 복귀하기
    setTimeout(() => document.body.style.background = "", 1000);

문서 객체 모델은 위에서 말한 `document.body.style` 외에도 수많은 기능을 제공한다.

**Dom은 브라우저만을 위한 모델이 아니다.**    
Dom 명세서엔 문서의 구조와 이를 조작할 수 있는 객체에 대한 설명이 담겨있다. 그런데 브라우저가 아닌 곳에서도 Dom을 사용하는 경우도 있다.

HTML 페이지를 다운로드하고 이를 가공해주는 서버 사이드 스크립트에서도 Dom을 사용한다. 이런 스크립트에선 명세서 일부만을 지원한다.

---
**스타일링을 위한 CSSOM**    
CSS 규칙과 스타일시트는 HTML과는 다른 구조를 띤다. 따라서 CSS 규칙과 스타일시트를 객체로 나타내고 이 객체를 어떻게 읽고 쓸 수 있을지에 대한 설명을 담은 별도의 명세서, CSS 객체 모델이 존재한다

CSSOM은 문서에 쓰이는 스타일 규칙을 수정할 때 Dom과 함께 쓰인다. 그런데 CSS 규칙은 대부분 정적이기 때문에 CSSOM을 실무에서 자주 접하지는 않는다. 자바스크립트를 이용해 CSS 규칙을 추가 혹은 제거해야 하는 경우는 극히 드물긴 하지만, 이때 CSSOM이 사용된다.

## 브라우저 객체 모델(Bom)

브라우저 객체 모델(Browser Object Model, Bom)은 문서 이외의 모든 것을 제어하기 위해 브라우저(호스트 환경)가 제공하는 추가 객체를 나타낸다.

예시:    
- navigator 객체는 브라우저와 운영체제에 대한 정보를 제공한다. 객체엔 다양한 프로퍼티가 있는데, 가장 잘 알려진 프로퍼티는 현재 사용 중인 브라우저 정보를 알려주는 `navigator,userAgent`와 브라우저가 실행 중인 운영체제 정보를 알려주는 `navigator.platform`이다.
- location 객체는 현재 URL을 읽을 수 있게 해주고 새로운 URL로 변경 할 수 있게 해준다.

아래 코드는 `location` 객체를 어떻게 활용할 수 있을지 보여준다.

    alert(location.href); // 현재 URL을 보여줌
    if (confirm("위키피디아 페이지로 이동)) {
      location.href = "http://wikipedia.org"; // 페이지로 이동
    }

`alert/confirm/prompt` 역시 BOM의 일부이다. 문서와 직접 연결되어 있진 않지만, 사용자와 브라우저 사이의 커뮤니케이션을 도와주는 순수 브라우저 메서드이다.

**BOM은 HTML 명세서의 일부이다**
BOM에 관련된 명세가 따로 있지는 않다. https://html.spec.whatwg.org 에서 볼 수 있는 HTML 명세서는 태그 HTML 속성(attribute) 같은 'HTML' 뿐만 아니라 다양한 객체와 메서드, 브라우저에서만 사용되는 DOM 확장을 다룬다. 이 모든 것이 HTML 기술에 속하기 때문이다. HTML 명세서엔 이 외에도 https://spec.whatwg.org 에 있는 내용도 들어간다.

## 요약

**DOM 명세서**    
문서 구조, 조작, 이벤트에 관한 설명이 담겨 있다.

**CSSOM 명세서**    
스타일시트와 스타일 규칙, 이 둘을 어떻게 조작할 수 있는지, 이 둘과 문서 사이의 관계를 어떻게 조작할 수 있는지에 대한 설명이 담겨있다.

**HTML 명세서**    
태그 등의 HTML 언어, `setTimeout`, `alert`, `location` 등의 다양한 브라우저 기능을 정의한 BOM에 대한 설명이 담겨있다. DOM 명세서에 다양한 프로퍼티와 메서드를 추가해 확장한 명세서이다.






