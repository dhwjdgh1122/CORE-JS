## 프로토타입 상속

개발을 하다 보면 기존에 있는 기능을 가져와 확장해야 하는 경우가 생긴다.

사람에 관한 프로퍼티와 메서드를 가진 `user`라는 개체가 있는데, `user`와 상당히 유사하지만 약간의 차이가 있는 `admin`과 `guest`객체를 만들어야 한다고 가정하자. 이때 `user`의 메서드를 복사하거나 다시 구현하지 않고 `user`에 약간의 기능을 얹어 `admin`과 `guest`객체를 만들 수 있지 않을까? 라는 생각이 든다.

자바스크립트 언어의 고유 기능인 ***프로토타입 상속***을 이용하면 위와 같은 생각을 실현할 수 있다.

## [[Prototype]]

자바스크립트의 객체는 명세서에서 명명한 `[[Prototype]]`이라는 숨김 프로퍼티를 갖는다. 이 숨김 프로퍼티 값은 `null`이거나 다른 객체에 대한 참조가 되는데, 다른 객체를 참조하는 경우 참조 대상을 '프로토타입'이라 부른다.

프로토타입의 동작 방식은 '신비스러운'면이 있다. `object`에서 프로퍼티를 읽으려고 하는데 해당 프로퍼티가 없으면 자바스크립트는 자동으로 프로토타입에서 프로퍼티를 찾기 때문이다. 프로그래밍에선 이런 동작 방식을 '프로토타입 상속'이라 부른다. 언어 차원에서 지원하는 편리한 기능이나 개발 테크닉 중 프로토타입 상속에 기반해 만들어진 것들이 많다.

`[[Prototype]] 프로퍼티는 내부 프로퍼티이면서 숨김 프로퍼티이지만 다양한 방법을 사용해 개발자가 값을 설정할 수 있다.

아래 예시처럼 특별한 이름인 `__proto__`을 사용하면 값을 설정할 수 있다.

    let animal = {
      eats: true
    };
    let rabbit = {
      jumps: true
    };

    rabbit.__proto__ = animal;

---
`__proto__`는 `[[Prototype]]` 용 getter-setter이다.`__proto__`는 `[[Prototype]]`과 다르다. `__proto__`는 `[[Prototype]]`의 getter(획득자)이자 setter(설정자)이다.

객체 `rabbit`에서 프로퍼티를 얻고싶은데 해당 프로퍼티가 없다면, 자바스크립트는 자동으로 `animal`이라는 객체에서 프로퍼티를 얻는다.

    let animal = {
      eats: true
    };
    let rabbit = {
      jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // 프로퍼티 eats과 jumps를 rabbit에서도 사용할 수 있게 되었습니다.
    alert( rabbit.eats ); // true (**)
    alert( rabbit.jumps ); // true

`(*)`로 표시한 줄에선 `animal`이 `rabbit`의 프로토타입이 되도록 설정했다.

`(**)`로 표시한 줄에서 `alert` 함수가 `rabbit.eats` 프로퍼티를 읽으려 했는데, `rabbit`엔 `eats`라는 프로퍼티가 없다. 이때 자바스크립트는 `[[Prototype]]` 이 참조하고 있는 객체인 `animal`에서 `eats`를 얻어낸다.

animal eats: true <-[[Prototype]] rabbit jumps: ture

이제 `rabbit`의 프로토타입은 `animal`이다. 혹은 `rabbit`은 `animal`을 상속받는다.라고 말할 수 있다.

프로토타입을 설정해 준 덕분에 `rabbit`에서도 `animal`에 구현된 유용한 프로퍼티와 메서드를 사용할 수 있게 되었다. 이렇게 프로토타입에서 상속받은 프로퍼티를 '상속 프로퍼티'라고 한다.

상속 프로퍼티를 사용해 `animal`에 정의된 메서드를 `rabbit`에서 호출해 보자.

    let animal = {
      eats: true,
      walk() {
        alert("동물이 걷습니다.");
      }
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    // 메서드 walk는 rabbit의 프로토타입인 animal에서 상속받았습니다.
    rabbit.walk(); // 동물이 걷습니다.

프로토타입(`animal`)에서 `walk`를 자동으로 상속받았기 때문에 `rabbit`에서도 `walk`를 호출할 수 있게 되었다.

animal eats: true, walk: function <-[[Prototype]] rabbit jumps: true

프로토타입 체인은 더 길어질 수 있다.

    let animal = {
      eats: true,
      walk() {
        alert("동물이 걷습니다.");
      }
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    let longEar = {
      earLength: 10,
      __proto__: rabbit
    };

    // 메서드 walk는 프로토타입 체인을 통해 상속받았습니다.
    longEar.walk(); // 동물이 걷습니다.
    alert(longEar.jumps); // true (rabbit에서 상속받음)

프로토타입 체이닝엔 두 가지 제약사항이 있다.

1. 순환 참조는 허용되지 않는다. `__proto__`를 이용해 닫힌 형태로 다른 객체를 참조하면 에러가 발생한다.
2. `__proto__`의 값은 객체나 `null`만 가능하다. 다른 자료형은 무시된다.

여기에 더하여 객체엔 오직 하나의 `[[Prototype]]만 있을 수 있다는 당연한 제약도 있다. 객체는 두 개의 객체를 상속받지 못한다.

## 프로토타입은 읽기 전용이다
프로토타입은 프로퍼티를 읽을 때만 사용한다.

프로퍼티를 추가, 수정하거나 지우는 연산은 객체에 직접 해야 한다.

객체 `rabbit`에 메서드 `walk`를 직접 할당해보자.

    let animal = {
      eats: true,
      walk() {
        /* rabbit은 이제 이 메서드를 사용하지 않습니다. */
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.walk = function() {
      alert("토끼가 깡충깡충 뜁니다.");
    };

    rabbit.walk(); // 토끼가 깡충깡충 뜁니다.

`rabbit.walk()`를 호출하면 프로토타입에 있는 메서드가 실행되지 않고, 객체 `rabbit`에 직접 추가한 메서드가 실행된다.

그런데 접근자 프로퍼티는 setter 함수를 사용해 프로퍼티에 값을 할당하므로 접근자 프로퍼티에 값을 할당 `((**))`하면 객체(`admin`)에 프로퍼티(`fullName`)가 추가되는게 아니라 setter 함수가 호출되면서 위 예시와는 조금 다르게 동작한다.

아래 예시에서 `admin.fullName`이 의도한 대로 잘 동작하는지 확인해보자.

    let user = {
      name: "John",
      surname: "Smith",

      set fullName(value) {
        [this.name, this.surname] = value.split(" ");
      },

      get fullName() {
        return `${this.name} ${this.surname}`;
      }
    };

    let admin = {
      __proto__: user,
      isAdmin: true
    };

    alert(admin.fullName); // John Smith (*)

    // setter 함수가 실행됩니다!
    admin.fullName = "Alice Cooper"; // (**)

    alert(admin.fullName); // Alice Cooper, setter에 의해 추가된 admin의 프로퍼티(name, surname)에서 값을 가져옴
    alert(user.fullName); // John Smith, 본래 user에 있었던 프로퍼티 값

프로토타입 `user`엔 getter 함수 `get fullName`이 있기 때문에 `(*)`로 표시한 줄에선 `get fullName`이 호출되었다. 마찬가지로 프로토타입에 이미 setter함수(`set fullName`)가 정의되어 있기 때문에 `(**)`로 표시한 줄의 할당 연산이 실행되면 객체 `user`에 프로퍼티가 추가되는게 아니라 프로토타입에 있는 setter 함수가 호출된다.

## this가 나타내는 것

위 예시를 보면 `"set fullName(value)` 본문의 `this`엔 어떤 값이 들어가지? 라는 의문을 가질 수 있다.    
"프로퍼티 `this.name`과 `this.surname`에 값을 쓰면 그 값이 `user`에 저장될까, 아니면 `admin`에 저장될까?라는 의문도 생긴다.

이유는 `this`는 프로토타입에 영향을 받지 않는다.

**메서드를 객체에서 호출했든 프로토타입에서 호출했든 상관없이 `this`는 언제나 `.`앞에 있는 객체이다.

`admin.fullName=`으로 setter 함수를 호출할 때, `this`는 `user`가 아닌 `admin`이 된다.

객체 하나를 만들고 여기에 메서드를 많이 구현해 놓은 다음, 여러 객체에서 이 커다란 객체를 상속받게 하는 경우가 많기 때문에 이런 특징을 잘 알아두어야 한다. 상속받은 메서드를 사용하더라도 객체는 프로토타입이 아닌 자신의 상태를 수정한다.

'메서드 저장소' 역할을 하는 객체 `animal`을 `rabbit`이 상속받게 해보자.    
`rabbit.sleep()`을 호출하면 객체 `rabbit`에 `isSleeping`프로퍼티가 추가된다.

    // animal엔 다양한 메서드가 있습니다.
    let animal = {
      walk() {
        if (!this.isSleeping) {
          alert(`동물이 걸어갑니다.`);
        }
      },
      sleep() {
        this.isSleeping = true;
      }
    };

    let rabbit = {
      name: "하얀 토끼",
      __proto__: animal
    };

    // rabbit에 새로운 프로퍼티 isSleeping을 추가하고 그 값을 true로 변경합니다.
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined (프로토타입에는 isSleeping이라는 프로퍼티가 없습니다.)

객체의 상태는 다음과 같다.
animal walk: function, sleep: function <- [[Prototype]] rabbit name: "White Rabbit", isSleeping: true

`rabbit` 말고도 `bird`, `snake` 등이 `animal`을 상속받는다고 해보자. 이 객체들도 `rabbit`처럼 `animal`에 구현된 메서드를 사용할 수 있다. 이때 상속받은 메서드의 `this`는 `animal`이 아닌 실제 메서드가 호출되는 시점의 점(`.`)앞에 있는 객체가 된다. 따라서 `this`에 데이터를 쓰면 `animal`이 아닌 해당 객체의 상태가 변화한다.

이를 통해 우리는 메서드는 공유되지만, 객체의 상태는 공유되지 않는다고 결론 내릴 수 있다.

## for...in 반복문

`for..in`은 상속 프로퍼티도 순회대상에 포함시킨다.

    let animal = {
        eats: true
      };

      let rabbit = {
        jumps: true,
        __proto__: animal
      };

      // Object.keys는 객체 자신의 키만 반환합니다.
      alert(Object.keys(rabbit)); // jumps

      // for..in은 객체 자신의 키와 상속 프로퍼티의 키 모두를 순회합니다.
      for(let prop in rabbit) alert(prop); // jumps, eats



**obj.hasOwnProperty(key)를 이용하면 상속 프로퍼티를 순회 대상에서 제외할 수 있다. 이 내장 메서드는 `key`에 대응하는 프로퍼티가 상속 프로퍼티가 아니고 `obj`에 직접 구현되어 있는 프로퍼티일 때만 `true`를 반환한다.

`obj.hasOwnProperty(key)를 응용하면 아래 예시에서처럼 상속 프로퍼티를 걸러낼 수 있고, 상속 프로퍼티만을 대상으로 무언가를 할 수도 있다.

    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true,
      __proto__: animal
    };

    for(let prop in rabbit) {
      let isOwn = rabbit.hasOwnProperty(prop);

      if (isOwn) {
        alert(`객체 자신의 프로퍼티: ${prop}`); // 객체 자신의 프로퍼티: jumps
      } else {
        alert(`상속 프로퍼티: ${prop}`); // 상속 프로퍼티: eats
      }
    }

위 예시의 상속 관계는 `rabbit`은 `animal`을, `animal`은 `Object.prototype`을, `Object.prototype`은 `null`을 상속받고 있다. 참고로 `animal`이 `Object.prototype`를 상속받는 이유는 `animal`을 객체 리터럴 방식으로 선언하였기 때문이다.

`for..in`안에서 사용한 메서드 `hasOwnProperty`가 `Object.prototype.hasOwnProperty`에서 왔다는 것을 확인할 수있다.

그런데 상속 프로퍼티인 `eats`는 얼럿 창에 출력되는데, `hasOwnproperty`는 출력되지 않는다.

`hasOwnproperty`는 열거 가능한(enumerable) 프로퍼티가 아니기 때문이다.    
`Object.prototype`에 있는 모든 메서드의 `enumerable` 플래그는 `false`인데, `for..in`은 오직 열거 가능한 프로퍼티만 순회 대상에 포함하기 때문에 `hasOwnproperty`는 얼럿창에 출력되지 않는다.

## 요약
- 자바스크립트의 모든 객체엔 숨김 프로퍼티 `[[Prototype]]`이 있는데, 이 프로퍼티는 객체나 `null`을 가리킨다.
- `obj.__proto__`를 사용하면 프로토타입에 접근할 수 있다. `__proto__`는 `[[Prototype]]`의 getter-setter로 쓰이는데, 요즘엔 잘 쓰지 않는다.
- `[[Prototype]]`이 참조하는 객체를 '프로토타입'이라고 한다.
- 객체에서 프로퍼티를 읽거나 메서드를 호출하려는데 해당하는 프로퍼티나 메서드가 없으면 자바스크립트는 프로토타입에서 프로퍼티나 메서드를 찾는다.
- 접근자 프로퍼티가 아닌 데이터 프로퍼티를 다루고 있다면, 쓰기나 지우기와 관련 연산은 프로토타입을 통하지 않고 객체에 직접 적용된다.
- 프로토타입에서 상속받은 `method`라도 `obj.method()`를 호출하면 `method`안의 `this`는 호출 대상 객체인 `obj`를 가리킨다.
- `for..in` 반복문은 객체 자체에서 정의한 프로퍼티뿐만 아니라 상속 프로퍼티도 순회 대상에 포함한다. 반면,키-값과 관련된 내장 메서드 대부분은 상속 프로퍼티는 제외하고 객체 자체 프로퍼티만을 대상으로 동작한다.





































