
## Data Types    
- 숫자형(Number)
- BigInt
- 문자형(String)
- 불린형(Boolean)
- null
- undefined
- 심볼(Symbol)
- 객체형(Object)    
배열(array)    
함수(function)    

심볼까지는 primitive type이다.

## 1. 숫자형    
정수, 소수건 상관없이 숫자로 인식한다. 숫자형엔 일반적인 숫자 외에 `infinity`, `-infinity`, `nan` 값은 특수 숫자 값이 포함된다. `infinity`는 어떤 숫자보다 더 큰 툭수 값 무한대를 나타낸다, 어느 숫자든 0으로 나누면 무한대를 얻을 수 있다.    

    '안녕' +5; // 안녕5라는 문자가 된다 => 접합연산

## 2. Bigint    
`2^53-1` 가장 큰 수= 실제로 가장 큰 수라는 의미가 아니라 js에서 쓸 수 있는 가장 안전한 수, 값은 변화한다.    
`Bigint` 는 일반적인 숫자 뒤에 n을 붙인다 `ex) 123n`

## 3. 문자형    
    let name = 'jungho'
    let age = 26;
    '안녕 나는 + name + '이야 내 나이는' + age + '이야'

옛날 방식, 그래서 등장한게 `백틱`    

    `안녕 나는 $(name)이야 내 나이는 $(age)살이야'
퓨어한 문자만 담을때는 `따옴표`를 사용한다.    
`백틱`은 계산도 가능

    안녕 나는 $(name)이야 내 나이는 $(10+30)살이야 
    안녕 나는 $(name)이야 내 나이는 $(age-10)살이야

## 4. 불린형    
    let a = 4 > 1;  -> 계산된 결과값 true 
    alert(a); 하면 // true 라는 결과가 나옴

## 5. null 값    
어느 자료형에도 속하지 않는 값 `null` 값은 오로지 `null` 값만 포함하는 별도의 자료형을 만든다.    
    
    let age = null;
나이를 알 수 없거나 그 값이 비어있음을 보여준다.
`js`에서 `null`은 의도해서 비워둔 값이다 라고 생각하면 편함.

## 6. undefined 값
자신만의 자료형을 형성한다, 값이 할당되지 않은 상태 변수는 선언했지만, 값을 할당하지 않았다면 해당 변수에 undefined가 자동으로 출력됨

`null` vs `undefined` 차이점    
의도해서 비웠나 안 비웠나

## 7. 객체와 심볼
객체형은 특수형 자료형이다 객체형을 제외한 다른 자료형은 문자열이든 숫자든 한 가지만 표현할 수 있기 때문에 `원시타입`, `원시형 자료`라고 한다. 원시형이냐에 따라서 메모리에 저장하는게 달라진다 객체는 데이터 컬렉션이나 복잡한 객체를 표현할 수 있다 이러한 특징 때문에 `js`에선 객체는 좀 더 특별한 취급을 받는다.    
심볼형은 객체의 고유한 식별자를 만들 때 사용된다.

## typeof 연산자    
`typeof` 연산자는 인수의 자료형을 반환한다, 두 가지 형태의 문법을 지원한다    
1. 연산자: `typeof x`
2. 함수: `typeof(x)`    

    
       typeof 1 + 3
 number3 출력 문자+숫자 하면 문자출력 => 접합연산

    const str = new String('hello');
    console.log(str);
`new String` 구문은 `String` 함수 생성자를 사용하여 문자열 객체를 만든다. `str`은 `String`객체이다. 문자열 객체는 문자열 원시값과 달리 객체로 취급되며, 프로퍼티와 메서드를 가질 수 있다.    

    const str1 = 'hello'
    const str2 = 'hello'
    str1 === str2 // true

    const str3 = new String('hello');
    const str4 = new String('hello');

    str3 === str4 // false
`str1`과 `str2`는 둘다 문자열 원시 값이라 `true`, `str3` 과 `str4` 는 문자열 객체라 메모리 내에서 고유한 참조를 가지므로 비록 같은 문자열을 담고 있더라도 다른 객체이므로 `false`    
    sayHi: function() {  //normal function 
    return 'hello'
    };

    user.sayHi(콘솔에서)   //arrow function 

    sayHi2:()=> {
    return 'hi'
    };


    sayHi() {		// concise method 
    return 'hi'
    }
`this`의 차이점으로 `concise`를 많이 사용한다 => `this 바인딩 차이`

`arrow`는 화살표 함수가 선언된 위치의 `this`를 사용한다.
`concise`는 객체의 메서드로 정의되며, 해당 객체에서 호출될 떄 객체 자신을 가리키는 `this`를 바인딩한다

`arrow`는 `this`가 함수가 선언된 위치의 상위 스코프를 참조하고, `concise`의 `this`는 메서드를 호출한 객체를 참조


