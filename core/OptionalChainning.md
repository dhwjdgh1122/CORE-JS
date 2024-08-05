## 옵셔널 체이닝

옵셔널 체이닝 `?.`을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.

## 옵셔널 체이닝이 필요한 이유

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

옵셔널 체이닝을 사용해 `user.address.street`에 안전하게 접근하자

    let user = {}; // 주소 정보가 없는 사용자

    alert( user?.address?.street ); // undefined, 에러가 발생하지 않습니다.

`user?.address`로 주소를 읽으면 아래와 같이 `user` 객체가 조재하지 않더라도 에러가 발생하지 않는다.

    let user = null;

    alert( user?.address ); // undefined
    alert( user?.address.street ); // undefined

위 예시를 통해 `?.`은 `?.` '앞' 평가 대상에만 동작되고, 확장은 되지 않는다는 사실을 알 수 있다.

위 예시에서 사용된 `user?.`는 `user`가 `null`이나 `undefined`인 경우만 처리할 수 있다.

`user`가 `null`이나 `undefined`가 아니고 실제 값이 존재하는 경우엔 반드시 `user.address` 프로퍼티는 있어야 한다. 그렇지 않으면 `user?.address.street`의 두 번째 점 연산자에서 에러가 발생한다.


## 단락 평가

`?.`는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다. 

함수 호출을 비롯한 `?.` 오른쪽에 있는 부가 동작은 `?.`의 평가가 멈췄을 때 더는 일어나지 않는다.

    let user = null;
    let x = 0;

    user?.sayHi(x++); // 아무 일도 일어나지 않습니다.

    alert(x); // 0, x는 증가하지 않습니다.


## ?.()와 ?.[]

`?.`은 연산자가 아니다. `?.`은 함수나 대괄호와 함께 동작하는 특별한 문법 구조체이다.

함수 관련 예시와 함께 존재 여부가 확실치 않은 함수를 호출할 때 `?.()`를 어떻게 쓰는지 알아보자

한 객체엔 메서드 `admin`이 있지만 다른 객체엔 없는 상황

    let user1 = {
      admin() {
        alert("관리자 계정입니다.");
      }
    }

    let user2 = {};

    user1.admin?.(); // 관리자 계정입니다.
    user2.admin?.();

두 상황 모두에서 `user`객체는 존재하기 때문에 `admin` 프로퍼티는 `.`만 사용해 접근했다.

그리고 난 후 `?.()`를 사용해 `admin`의 존재 여부를 확인함. `user1`엔 `admin`이 정의되어 있기 때문에 메서드가 제대로 호출되었다. 반면 `user2`엔 `admin`이 정의되어 있지 않았음에도 불구하고 메서드를 호출하면 에러 없이 그냥 평가가 멈추는 것을 확인할 수 있다.

`.`대신 대괄호 `[]`를 사용해 객체 프로퍼티에 접근하는 경우엔 `?.[]`를 사용할 수도 있다. 위 예시와 마찬가지로 `?.[]`를 사용하면 객체 존재 여부가 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다.

    let user1 = {
      firstName: "Violet"
    };

    let user2 = null; // user2는 권한이 없는 사용자라고 가정해봅시다.

    let key = "firstName";

    alert( user1?.[key] ); // Violet
    alert( user2?.[key] ); // undefined

    alert( user1?.[key]?.something?.not?.existing); // undefined

`?.`은 `delete`와 조합해 사용할 수도 있다.

    delete user?.name; // user가 존재하면 user.name을 삭제한다.


## 요약
옵셔널 체이닝 문법 `?.`은 세 가지 형태로 사용할 수 있다.

1. `obj?.prop` – `obj`가 존재하면 `obj.prop`을 반환하고, 그렇지 않으면 `undefined`를 반환함
2. `obj?.[prop]` – `obj`가 존재하면 `obj[prop]`을 반환하고, 그렇지 않으면 `undefined`를 반환함
3. `obj?.method()` – `obj`가 존재하면 `obj.method()`를 호출하고, 그렇지 않으면 `undefined`를 반환함

옵셔널 체이닝 문법은 꽤 직관적이고 사용하기도 쉽다. `?.` 왼쪽 평가 대상이 `null`이나 `undefined`인지 확인하고 `null`이나 `undefined`가 아니라면 평가를 계속 진행한다.

`?.`를 계속 연결해서 체인을 만들면 중첩 프로퍼티들에 안전하게 접근할 수 있다.

`?.`은 `?.` 왼쪽 평가대상이 없어도 괜찮은 경우에만 선택적으로 사용해야 한다.