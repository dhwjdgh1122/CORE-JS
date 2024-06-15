## 함수의 prototype 프로퍼티

리터럴 뿐만 아니라 `new F()`와 같은 생성자 함수로도 새로운 객체를 만들 수 있다.

이번엔 '함수'를 사용해 객체를 만든 경우에 프로토타입이 어떻게 동작하는지에 대해 알아보자. 생성자 함수로 객체를 만들었을 때 리터럴 방식과 다른점은 생성자 함수의 프로토타입이 객체인 경우에 `new` 연산자를 사용해 만든 객체는 생성자 함수의 프로토타입 정보를 사용해 `[[Prototype]]`을 설정한다는 것이다.

생성자 함수(`F`)의 프로토타입을 의미하는 `F.prototype`에서 `"prototype"`은 `F`에 정의된 일반 프로퍼티라는 점에 주의하자. `F.Prototype`에서 `"protype"`은 바로 앞에서 학습한 '프로토타입'과 비슷하지만 이름만 같을 뿐 실제론 다른 익히 알고있는 일반적인 프로퍼티이다.

    let animal = {
      eats: true
    };

    function Rabbit(name) {
      this.name = name;
    }

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("흰 토끼"); //  rabbit.__proto__ == animal

    alert( rabbit.eats ); // true

`Rabbit.prototype = animal`은 `new Rabbit`을 호출해 만든 새로운 객체의 `[[Prototype]]`을 `animal`로 설정하라는 것을 의미한다.

Rabbit ->(prototype) animal eats: true <-[[Prototype]] rabbit name: "White Rabbit"

여기서 첫 번째 화살표는 일반 프로퍼티인 `"prototype"`을, 두 번째 화살표는 `[[Prototype]]`을 나타낸다, 두 번째 화살표는 `rabbit`이 `animal`을 상속받았다는 것을 의미한다.

## 함수의 디폴트 프로퍼티 prototype과 constructor 프로퍼티

개발자가 특별히 할당하지 않더라도 모든 함수는 기본적으로 `"prototype"`프로퍼티를 갖는다.

디폴트 프로퍼티 `"prototype"`은 `constructor` 프로퍼티 하나만 있는 객체를 가리키는데, 여기서 `constructor` 프로퍼티는 함수 자신을 가리킨다.

이 관계를 코드로 나타내면 아래와 같다.

    function Rabbit() {}

    /* 디폴트 prototype
    Rabbit.prototype = { constructor: Rabbit };
    */

Rabbit prototype <-> default "prototype" constructor

    function Rabbit() {}
    // 함수를 만들기만 해도 디폴트 프로퍼티인 prototype이 설정됩니다.
    // Rabbit.prototype = { constructor: Rabbit }

    alert( Rabbit.prototype.constructor == Rabbit ); // true

특별한 조작을 가하지 않았다면 `new Rabbit`을 실행해 만든 토끼 객체 모두에서 `constructor` 프로퍼티를 사용할 수 있는데, 이때 `[[Prototype]]을 거친다.

    function Rabbit() {}
    // 디폴트 prototype:
    // Rabbit.prototype = { constructor: Rabbit }

    let rabbit = new Rabbit(); // {constructor: Rabbit}을 상속받음

    alert(rabbit.constructor == Rabbit); // true ([[Prototype]]을 거쳐 접근함)

`constructor` 프로퍼티는 기존에 있던 객체의 `constructor`를 사용해 새로운 객체를 만들때 아래와 같이 사용할 수 있다.

    function Rabbit(name) {
      this.name = name;
      alert(name);
    }

    let rabbit = new Rabbit("흰 토끼");

    let rabbit2 = new rabbit.constructor("검정 토끼");

이 방법은 객체가 있는데 이 객체를 만들 때 어떤 생성자가 사용되었는지 알 수 없는 경우(객체가 서드 파티 라이브러리에서 온 경우 등) 유용하게 쓸 수 있다.

`"constructor"` 의 가장 중요한 점은    
**자바스크립트는 알맞은 `"constructor"`값을 보장하지 않는다**는 점이다.

함수엔 기본으로 `"prototype"`이 설정된다라는 사실 그게 전부이다. `"constructor"`와 관련해서 벌어지는 모든 일은 전적으로 개발자에게 달려있다.

함수에 기본적으로 설정되는 `"prototype"` 프로퍼티 값을 다른 객체로 바꿔 무슨일이 일어나는지 살펴보자 new를 사용해 객체를 만들었지만 이 객체에 `"constructor"`가 없는 것을 확인할 수 있다.

    function Rabbit() {}
    Rabbit.prototype = {
      jumps: true
    };

    let rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false

이런 상황을 방지하고 `constructor`의 기본 성질을 제대로 활용하려면 `"prototype"`에 뭔가를 하고 싶을 때 `"prototype"` 전체를 덮어쓰지 말고 디폴트 `"prototype"`에 원하는 프로퍼티를 추가,제거해야한다.

    function Rabbit() {}

    // Rabbit.prototype 전체를 덮어쓰지 말고
    // 원하는 프로퍼티가 있으면 그냥 추가합니다.
    Rabbit.prototype.jumps = true
    // 이렇게 하면 디폴트 프로퍼티 Rabbit.prototype.constructor가 유지됩니다.

실수로 `"prototype"`을 덮어썼다 하더라도 `constructor` 프로퍼티를 수동으로 다시 만들어주면 `constructor`를 다시 사용할 수 있다.

    Rabbit.prototype = {
      jumps: true,
      constructor: Rabbit
    };

    // 수동으로 constructor를 추가해 주었기 때문에 우리가 알고 있던 constructor의 특징을 그대로 사용할 수 있습니다.

## 요약 

생성자 함수를 이용해 만든 객체의 `[[Prototype]]` 이 어떻게 설정되는지 알아보았다.

- 생성자 함수에 기본으로 세팅되는 프로퍼티(`F.prototype`)는 `[[Prototype]]`과 다르다 `F.prototype`은 `new F()`를 호출할 때 만들어지는 새로운 객체의 `[[Prototype]]을 설정한다.
- `F.prototype`의 값은 객체나 null만 가능하고 다른 값은 무시된다.
- 지금까지 학습한 내용은 생성자 함수를 `new`를 사용해 호출할 때만 적용된다.

참고로 일반 객체엔 `"prototype"` 프로퍼티를 추가해도 아무런 일이 일어나지 않는다.
