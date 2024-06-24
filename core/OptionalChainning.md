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