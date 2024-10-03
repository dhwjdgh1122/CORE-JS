## 웹 컴포넌트 API

웹 컴포넌트 (Web Components)는 웹 사이트, 웹 앱에서 사용할 새로운 사용자 정의요소(custom element)를 생성하는 웹 플랫폼 API 세트이다. 사용자가 정의한 HTML 구조, CSS 스타일, JavaScript 로직 등을 설계하고 등록하면 웹 애플리케이션에서 커스텀 요소를 사용할 수 있다. 

공식 문서에는 위와 같이 나와있다.


공식 문서 글은 너무 딱딱한 것 같아 내가 학습했던 내용으로 작성하자면, 아래와 같다.

웹 컴포넌트(Web Components) API는 웹 애플리케이션에서 **재사용 가능한 사용자 정의 요소(Custom Elements)** 를 만들기 위한 기술이다. 웹 컴포넌트를 사용하면 HTML,CSS,JavaScript로 구성된 **독립적인 UI 요소**를 만들고, 이를 다른 프로젝트나 페이지에서 재사용할 수 있다. 웹 개발자에게 모듈화된 코드와 더 나은 유지 보수를 가능하게 해준다.

##

**웹 컴포넌트는 주로 세 가지 주요 기술로 구성된다**

## 1. **Custom Elements**    
 - 기존 HTML 요소와 같이 사용할 수 있는 새로운 요소를 만들 수 있다. 예를 들어, `<my-button>` 과 같은 커스텀 태그를 정의하고, 그 안에 원하는 기능을 구현할 수 있다.

 - 이를 통해 HTML 요소의 기능을 확장하거나, 완전히 새로운 요소를 정의할 수 있다.
 
 - 커스텀 엘리먼트는 `class`를 통해 정의되며, `HTMLElement`를 상속한다.

 ```js
 class MyButton extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<button>Click Me</button>';
  }
 }

customElements.define('my-button', MyButton);
```

위 코드에서 `my-button`이라는 커스텀 요소를 정의하고, 이를 HTML에서 사용 가능하다.


## 2. **Shadow DOM**
- **캡슐화된 DOM**을 생성하여 외부 스타일이나 스크립트의 영향을 받지 않도록 한다. 이를 통해 컴포넌트 내부의 구조나 스타일을 외부로부터 보호할 수 있다.
- 컴포넌트의 독립성을 높여 여러 컴포넌트를 한 페이지에서 사용할 때 스타일 충동을 방지할 수 있다.

`attachShadow()`메서드를 사용해 Shadow DOM을 오픈(활성화) 할 수 있다.



상황을 예로 들어보자.

나는 두 개의 버튼을 만들거야 하나는 사이트 전역에서 사용하는 일반 버튼이고, 다른 하나는 특수한 상황에서 사용되는 커스텀 버튼이야,

일반 버튼 : 모든 버튼은 기본적으로 파란색이여함

커스텀 버튼 : 특정 상황에서는 빨간색 버튼이여야함

이 두 버튼이 같은 페이지에 동시에 존재하게 되면, 전역 CSS 스타일이 서로 영향을 줄 수 있는 문제가 발생할 수 있기 때문에 일반 버튼의 스타일이 커스텀 버튼에서 적용될 수 있다.

그래서 쉐도우 돔을 사용하는 것!!! 

```html
<!-- 일반 버튼 -->
<button class="global-button">일반 버튼</button>

<!-- 커스텀 버튼 -->
<custom-button></custom-button>

<style>
  .global-button {
    background-color: blue; /* 모든 일반 버튼은 파란색 */
  }
</style>

<script>
  class CustomButton extends HTMLElement {
    constructor() {
      super();

      // 쉐도우 돔을 생성하고 'open' 모드로 설정 (열려 있는 상태)
      const shadow = this.attachShadow({ mode: 'open' });

      // 쉐도우 돔 안에 커스텀 버튼의 HTML과 스타일을 정의
      shadow.innerHTML = `
        <style>
          button {
            background-color: red; /* 커스텀 버튼만 빨간색 */
          }
        </style>
        <button>커스텀 버튼</button>
      `;
    }
  }

  customElements.define('custom-button', CustomButton);
</script>
```

## 3. HTML Templates
- `<template>`태그를 사용해 **정적 컨텐츠**를 미리 정의하고, JavaScript로 이를 재사용할 수 있다.
- 템플릿은 처음 로딩 시 DOM에 추가되지 않고, 필요할 때, JavaScript로 인스턴스화하여 삽입할 수 있다.

쉽게 서술하면 **재사용 가능한 콘텐츠 구조를 미리 정의** 해 놓고, 필요할 때마다 사용할 수 있는 기능이다. 템플릿은 처음 페이지가 로드될 때는 화면에 나타나지 않지만, JavaScript로 활성화시키면 **동적으로** 화면에 추가된다.


html은 아래와 같다.
```html
<template id = "my-template">
  <style>
    p { color: blue; }

  </style>
  <p>This is a template content</p>

</template>
```
JavaScript로 템플릿을 삽입하는 방법
```js
const template = document.getElementById('my-template');
const content = template.content.clonNode(true);
documnet.body.appendChild(content);
```


## 웹 컴포넌트의 장점
- **재사용성** : 한 번 만들어 두면 다양한 프로젝트에서 재사용할 수 있다.
- **캡슐화** : Shadow DOM을 사용해 외부의 영향을 받지 않도록 보호할 수 있다.
- **표준 기술** : 웹 컴포넌트는 브라우저에서 기본적으로 지원되는 표준 기술로, 프레임워크에 종속되지 않는다.

웹 컴포넌트는 UI 요소를 더 쉽게 관리하고 모듈화할 수 있도록 해주는 강력한 도구이다.

