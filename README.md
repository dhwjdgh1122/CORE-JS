
### 코어 자바스크립트 학습 저장소.

---

## `live-server`    
- `live-server`를 그냥 열어서 확인하면 되는데 왜 `json`에 다운해서 열었는지? 이유에 대해서    
기존의 내가 자주 사용하던 `live-server`는 `vscode`의 확장 프로그램이다, 누군가가 그 파일을 달라고 했을 때, `vscode`만 깔려있는 사람은 확인을 못함 why? `live-server`가 다운로드 되지 않았으니까, 그래서 `live-server`를 다운받은 형태로 보내줘야함
그래서 `json` 파일에 `npx live-server clien` 로 다운 받아 논거임
결국 협업을 위해서이다

### 전역 설치 `npm install -g`    
- 도서관 비유: 도서관의 모든 컴퓨터에서 접근 가능한 프로그램 설치
- 예시: 도서 관리 시스템을 도서관 전체에 설치

### 로컬 설치 `npm install`
- 도서관 비유: 특정 책상에서만 사용할 수 있는 도구 설치, 다른 책상에서는 사용 X
- 예시: 참고 자료 관리 도구를 특정 책상에 설치

### Basic    

- [x] Code Structure [Code Structure README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Code-Structure.md)
- [x] Variable [Variable README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/variable.md)
- [x] Strict Mode [Strict Mode README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Strict%20Mode.md)
- [x] Global This [Global This README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Global%20This.md)
- [x] Legacy Var [Legact var README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Legacy%20var.md)
- [x] DataTypes [DataTypes README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/DataTypes.md)
- [x] Type Conversion [Type Conversion README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Type-Conversion.md)

---

### Operations
- [x] Operations (기본 연산자) [Operations1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Operations.md)
- [x] Operations (비교 연산자) [Operations2 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Operations2.md)


---
### Condition
- [x] Condition (if조건문) [Conditions1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Conditions1.md)
- [x] Condition (논리연산자) [Conditions2 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Conditions2.md)
- [x] Condition (switch..case) [Conditions3 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Conditions3.md)
- [x] Condition (nullish) [Conditions4 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Conditions4.md)


---
### Loop
- [x] loop (while,for,do..while,for...in,for...of) [loop README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/loop.md)

---
### Function
- [x] function (함수선언문) [function1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/function1.md)
- [x] function (함수표현식) [function2 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/function2.md)
- [x] function (함수표함수) [function3 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/function3.md)
- [x] function (재귀함수) [function4 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/function4.md)

---
### Object
- [x] object (객체) [object1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Object1.md)
- [x] object (copy by reference) [object2 .README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Object2.md)
- [x] object (garbage collection) [object3 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Object3.md)
- [x] object (method and this) [object4 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Object4.md)

---
### Prototype
- [x] prototype (프로토타입의 상속) [Prototype1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Prototype1.md)
- [x] prototype (클래스) [Prototype2 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Prototype2.md)

---
### Class
- [x] Class (클래스와 기본문법) [Class README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Class.md)

---
### Closure
- [x] Closure (클로저, 시나리오) [Closure1 README.md](https://github.com/dhwjdgh1122/core-js/blob/main/core/Closure1.md)

---
### 옵셔널 체이닝

옵셔널 체이닝 `?.`을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

### 옵셔널 체이닝이 필요한 이유

사용자가 여러 명 있는데 그중 몇 명은 주소 정보를 가지고 있지 않다고 가정해보자. 이럴 때 `user.address.street`.를 사용해 주소 정보에 접근하면 에러가 발생할 수 있다.

    let user = {}; // 주소 정보가 없는 사용자

    alert(user.address.street); // TypeError: Cannot read property 'street' of undefined

다른 예시로 브라우저에서 동작하는 코드를 개발할 때 발생할 수 있는 문제가 있다. 자바스크립트를 사용해 페이지에 존재하지 않는 요소에 접근해 요소의 정보를 가져오려 하면 문제가 발생한다.

    // querySelector(...) 호출 결과가 null인 경우 에러 발생
    let html = document.querySelector('.my-element').innerHTML;

명세서에 `?.`이 추가되기 전엔 이런 문제들을 해결하기 위해 `&&`연산자를 사용하곤 했다.

let user = {}; // 주소 정보가 없는 사용자

alert( user && user.address && user.address.street ); // undefined, 에러가 발생하지 않습니다.

중첩 객체의 특정 프로퍼티에 접근하기 위해 거쳐야 할 구성요소들을 AND로 연결해 실제 해당 객체나 프로퍼티가 있는지 확인하는 방법을 사용했었는데 코드가 아주 길어진다는 단점이 있다.

## 옵셔널 체이닝의 등장

`?.`은 `?.` '앞'의 평가 대상이 `undefined`나 `null`이면 평가를 멈추고 `undefined`를 반환한다.

**평가 후 결과가 `null`이나 `undefined`가 아닌 경우엔 값이 있다(존재한다).