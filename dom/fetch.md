## fetch

자바스크립트를 사용하면 필요할 때 서버에 네트워크 요청을 보내고 새로운 정보를 받아오는 일을 할 수 있다.

네트워크 요청은 다음과 같은 경우에 이뤄진다.

- 주문 전송
- 사용자 정보 읽기
- 서버에서 최신 변경분 가져오기 등

그런데 이 모든 것들은 페이지 새로 고침 없이도 가능하다.

쉽게 서술해보자 => 자바스크립트를 사용하면 웹 페이지가 새로 고침되지 않아도 서버와 정보를 주고 받을 수 있는 이유는 **비동기 요청**을 통해서이다.

이 과정은 웹 페이지를 **동적으로 업데이트** 할 수 있게 해준다.

**비동기 요청**이란 웹 페이지가 새로 고침 없이도 서버와 데이터를 주고받는 방법이다. 자바스크립트에서는 `fetch`나 `axios`와 같은 도구를 사용하여 수행할 수 있다.

`fetch()`는 구식 브라우저에선 지원하진 않지만(폴리필을 쓰면 사용 가능) 대부분의 모던 브라우저가 지원한다.

기본 문법은 아래와 같다.

```js
let promise = fetch(url, [options])
```

- `url` - 접근하고자 하는 URL
- `options` - 선택 매개변수, method나 header 등을 지정할 수 있다.

`options`에 아무것도 넘기지 않으면 요청은 `GET` 메서드로 진행되어 `url`로부터 콘텐츠가 다운로드 된다.

`fetch()`를 호출하면 브라우저는 네트워크 요청을 보내고 프라미스가 반환된다. 반환되는 프라미스는 `fetch()`를 호출하는 코드에서 사용된다.

응답은 대개 두 단계를 거쳐 진행된다.

**먼저, 서버에서 응답 헤더를 받자마자 `fetch` 호출 시 반환받은 `promise`가 내장 클래스 Response의 인스턴스와 함께 이행상태가 된다.**

이 단계는 아직 본문(body)이 도착하기 전이지만, 개발자는 응답 헤더를 보고 요청이 성공적으로 처리되었는지 아닌지를 확인할 수 있다.

네트워크 문제나 존재하지 않는 사이트에 접속하려는 경우가이 HTTP 요청을 보낼 수 없는 상태에선 프라미스는 거부상태가 된다.

HTTP 상태는 응답 프로퍼티를 사용해 확인할 수 있다.

- `status` - HTTP 상태 코드(200)
- `ok` - 불린 값 HTTP 상태 코드가 200~299 사이일 경우

```js
let response = await fetch(url);

if (response.ok) { // HTTO 상태 코드가 200~299일경우
// 응답을 받는다
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**두 번째 단계에선 추가 메서드를 호출해 응답 본문을 받는다.**

`response` 에는 프라미스를 기반으로 하는 다양한 메서드가 있다. 이 메서드들을 사용하면 다양한 형태의 응답 본문을 처리할 수 있다.

- `response.text()` - 응답을 읽고 텍스트를 반환한다.
- `response.json()` - 응답을 읽고 JSON 형태로 파싱한다.
- `response.formData()` - 응답을 `FormData` 객체 형태로 반환한다.
- `response.blob()` - 응답을 Blob 형태로 반환한다.
- `response.arrayBuffer()` - 응답을 ArrayBuffer 형태로 반환한다.
- 이 외에도 `response.body` 가 있는데, ReadableStream 객체인 `response.body`를 사용하면 응답 본문을 청크 단위로 읽을 수 있다.

GitHub에서 마지막 커밋을 JSON 객체 형태로 받아보자.

```js
let url = 'https://api.github.com/repos/javascript-tutorial/ko.javascript.info/commits';
let response = await fetch(url);

let commits = await response.json(); // 응답 본문을 읽고 JSON 형태로 파싱함

alert(commits[0].author.login);
```

위 코드를 `await` 없이 프라미스만 사용하면 다음과 같이 바꿀 수 있다.

```js
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

응답을 텍스트 형태로 읽으려면 `.json()` 대신 `await response.text()`를 사용하면 된다.

```js
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // 응답 본문을 텍스트 형태로 읽습니다.

alert(text.slice(0, 80) + '...');
```

`fetch`를 사용해 로고(바이너리 데이터)를 가져와 보자

```js
let response = await fetch('/article/fetch/logo-fetch.svg');

let blob = await response.blob(); // 응답을 Blob 객체 형태로 다운로드받습니다.

// 다운로드받은 Blob을 담을 <img>를 만듭니다.
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// 이미지를 화면에 보여줍니다.
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 3초 후 이미지를 숨깁니다.
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

**본문을 읽을 때 사용되는 메서드는 딱 하나만 사용할 수 있다.**

`response.text()`를 사용해 응답을 얻었다면 본문의 콘텐츠는 모두 처리 된 상태이기 때문에 `response.json()`은 동작하지 않는다.

```js
let text = await response.text(); // 응답 본문이 소비된다.
let parsed = await response.json(); // 실패
```

## 응답 헤더

응답 헤더는 `response.headers` 에 맵과 유사한 형태로 저장된다.

맵은 아니다 하지만 맵과 유사한 메서드를 지원한다. 이 메서드들은 사용하면 헤더 일부만 추출하거나 헤더 전체를 순회할 수 있다.

```js
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// 헤더 일부를 추출
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// 헤더 전체를 순회
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

## 요청 헤더
`headers` 옵션을 사용하면 `fetch` 에 요청 헤더를 설정할 수 있다. `headers`엔 아래와 같이 다양한 헤더 정보가 담긴 객체를 넘기게 된다.

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});
```
그런데 `headers`를 사용해 설정할 수 없는 헤더도 있다.

- Accept-Charset, Accept-Encoding
- Access-Control-Request-Headers
- Access-Control-Request-Method
- Connection
- Content-Length
- Cookie, Cookie2
- Date
- DNT
- Expect
- Host
- Keep-Alive
- Origin
- Referer
- TE
- Trailer
- Transfer-Encoding
- Upgrade
- Via
- Proxy-*
- Sec-*

이런 제약은 HTTP를 목적에 맞고 안전하게 사용할 수 있도록 하려고 만들어졌다. 금지 목록에 있는 헤더는 브라우저만 배타적으로 설정, 관리할 수 있다.

## POST 요청

`GET` 이외의 요청을 보내려면 추가 옵션을 사용해야 한다.    

- `method` - HTTP 메서드(ex: post)
- `body` - 요청 본문으로 다음 항목 중 하나이어야 한다.   
   - 문자열(ex: JSON 문자열)
   - `FormData` 객체 - `form/multipart` 형태로 데이터를 전송하기 위해 쓰인다.
   - `Blob`나 `BufferSource` - 바이너리 데이터 전송을 위해 쓰인다.
   - `URLSearchParams` - 데이터를 `x-www-form-urlencoded` 형태로 보내기 위해 쓰이는데, 요즘엔 잘 사용하지 않는다.

대부분은 JSON을 요청 본문에 실어 보내게 된다.

`user` 객체를 본문에 실어 보내는 코드를 살펴보자.

```js
let user = {
  name: 'John',
  surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);
```

`POST` 요청을 보낼 때 주의할 점은 요청 **본문**이 문자열일 때 `Content-Type` 헤더가 `text/plain;charset=UTF-8`로 기본 설정된다는 점이다.

하지만 위 예시에선 JSON을 전송하고 있기 때문에 `headers`에 제대로 된 `Content-Type`인 `application/json`을 설정해 주었다.

## 이미지 전송하기

`Blob`나 `BufferSource` 객체를 사용하면 `fetch`로 바이너리 데이터를 전송할 수 있다.

`<canvas>`에 마우스를 움직여 이미지를 만들고 '전송'버튼을 눌러 이미지를 서버에 전송해보자.

```js
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="전송" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // 전송이 잘 되었다는 응답이 오고 이미지 사이즈가 얼럿창에 출력됩니다.
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```
`Blob` 객체는 내장 타입을 갖기 때문에 특별히 `Content-Type`를 설정하지 않아도 된다. 예시는 이미지를 전송하기 때문에 `toBlob`에 의해 `image/png`가 자동으로 설정되었다. 이렇게 `Blob` 객체의 경우 해당 객체의 타입이 `Content-Type` 헤더의 값이 된다.

위 예시의 함수 `submit()`을 `async/await` 없이 작성하면 아래 코드와 같다.

```js
function submit() {
  canvasElem.toBlob(function(blob) {
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## 요약 

일반적인 `fetch` 요청은 두 개의 `await` 호출로 구성된다.

```js
let response = await fetch(url, options); // 응답 헤더와 함께 이행됨
let result = await response.json(); // json 본문을 읽음
```

물론 `await` 없이도 요청을 보낼 수 있다.

```js
fetch(url, options)
  .then(response => response.json())
  .then(result =>)
```

응답 객체의 프로퍼티는 다음과 같다.
- `response.status` - 응답의 HTTP 코드
- `response.ok` - 응답 상태가 200과 299사이에 있는 경우 `true`
- `response.headers` - 맵과 유사한 형태의 HTTP 헤더

응답 본문을 얻으려면 다음과 같은 메서드를 사용하면 된다.

- `response.text()` - 응답을 텍스트 형태로 반환
- `response.json()` - 응답을 파싱해 JSON 객체로 변경함
- `response.formData()` - 응답을 `FormData` 객체 형태로 반환
- `response.blob()` - 응답을 Blob 형태로 반환
- `response.arrayBuffer()` - 응답을 ArrayBuffer 형태로 반환

`fetch` 옵션은 아래와 같다.
- `method` - HTTP 메서드
- `headers` - 요청 헤드가 담긴 객체
- `body` - 보내려는 데이터로 `string`이나 `FormData`, `BufferSource`, `Blob`, `UrlSearchParams` 객체 형태

