## Custom Elements

클래스를 사용해 자체 메서드, 속성, 이벤트 등을 가진 커스텀 HTML 엘리먼트를 생성할 수 있다.

커스텀 엘리먼트가 정의되면 내장 HTML 엘리먼트와 같이 사용할 수 있다.

HTML의 태그는 많지만 마음대로 커스텀 하거나 수정할 수 없다.

특별한 클래스로 정의한 다음 HTML의 일부인 것처럼 사용할 수 있다.

**두 가지** 유형의 커스텀 엘리먼트가 있다.

- 자율 커스텀 엘리먼트 - 추상 HTMLElement 클래스를 확장하는 "새로운" 엘리먼트이다.
- 사용자 정의된 내장 엘리먼트 - HTMLButtonElement 등을 기반으로 한 사용자 정의된 버튼과 같이 내장된 엘리먼트를 확장한다.

커스텀 엘리먼트를 만들려면 브라우저에게 여러 세부 정보를 알려야 한다. 어떻게 표시할지, 엘리먼트가 페이지에 추가되거나 제거될 때 어떤 작업을 수행할지 등

이를 위해 특별한 메서드를 포함한 클래스를 만들면 된다. 메서드가 몇개밖에 존재하지 않고 모두 선택 사항이기 때문에 사용하기 편하다.

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // 엘리먼트가 생성됨
  }

  connectedCallback() {
    // 엘리먼트가 문서에 추가될 때 브라우저가 이 메서드를 호출한다.
    // 엘리먼트가 반복적으로 추가/제거되면 여러 번 호출될 수 있음
  }

  disconnectedCallback() {
    // 엘리먼트가 문서에서 제거될 때 브라우저가 이 메서드를 호출한다.
    // 엘리먼트가 반복적으로 추가/제거되면 여러 번 호출될 수 있음
  }

  static get observedAttributes() {
    return [/* 변경 사항을 모니터링할 속성 이름의 배열 */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 위에 나열된 속성 중 하나가 수정될 때 호출된다.
  }

  adoptedCallback() {
    // 엘리먼트가 새 문서로 이동될 때 호출된다.
    // (document.adoptNode에서 사용되며 매우 드물게 사용된다)
  }

  // 다른 것들
}
```

그리고 엘리먼트를 등록해야 한다.

```js
// 브라우저에게 <my-element>가 우리의 새 클래스에 의해 제공된다고 알린다.
customElements.define("my-element", MyElement);
```

이제 `<my-element>` 태그를 가진 모든 HTML 엘리먼트에 대해 MyElement의 인스턴스가 생성되고 앞에서 언급한 메서드가 호출된다. 또한 JavaScript에서 `document.createElement('my-element')`를 사용할 수 있다.

커스텀 엘리먼트의 이름은 반드시 **하이픈(-)**을 포함해야 한다. 내장된 HTML 엘리먼트와 커스텀 엘리먼트간에 이름 충돌이 없도록 보장하기 위함.

## 예시 코드 : time-formatted

예를 들어, HTML에는 날짜/시간을 위한 `<time>` 엘리먼트가 이미 존재하지만 자체적으로 어떠한 서식을 제공하지는 않는다.

우리는 시간을 멋지게 표시하는 형태로 만들기 위해 `<time-formatted>` 엘리먼트를 만들어보자.

```js
<script>
class TimeFormatted extends HTMLElement { // (1)

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

customElements.define("time-formatted", TimeFormatted); // (2)
</script>

<!-- (3) -->
<time-formatted datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

위 코드에서 (1)은 TimeFormatted 클래스를 정의하고, (2)는 "`time-formatted`"라는 이름으로 이를 커스텀 엘리먼트로 등록한다.
(3)에서는 `<time-formatted>` 엘리먼트를 사용하면서 속성을 설정하여 시간을 원하는 형식으로 표시할 수 있다.

해당 클래스에는 `connectedCallback()`이라는 메서드가 하나뿐이다. 브라우저는 `<time-formatted>` 엘리먼트가 페이지에 추가될 때 이 메서드를 호출하며, 내장된 `Intl.DateTimeformat` 데이터 포메터를 사용하여 브라우저 간에 잘 지원되는 방식으로 시간을 멋지게 형식화하여 표시한다.

새로운 엘리먼트를 `customElements.define(tag, class)`로 등록해야 한다. 그러면 어디서든 사용할 수 있다.



## 커스텀 엘리먼트 업그레이드
