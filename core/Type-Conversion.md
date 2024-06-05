## Type Conversion 형 변환
함수와 연산자에 전달되는 값은 대부분 적절한 자료형으로 자동 변환된다. 자동 변환은 이제 암시적이냐 명시적이냐에 따라 고려해야함

문자형으로 변환
- 문자형으로의 형 변환은 문자형의 값이 필요할 때 일어난다. `alert` 메서드는 매개변수로 문자열을 받기 때문에, `alert(value)`에서 `value`는 문자형이어야 한다.
만약, 다른 형의 값을 전달받으면 이 값은 문자형으로 자동 변환된다. `String(value)` 함수를 호출해 전달받은 값을 문자열로 변환 할 수도 있다.

      let value = true;
      alert(typeof value); // boolean

      value = String(value); // 변수 value엔 문자열   "true"가 저장됩니다.
      alert(typeof value); // string

암시적 변환
- **JavaScript** 엔진이 자동으로 수행하며, 주로 연산자와 함께 사용될 때 발생
- 예) 문자열 연결, 조건문, 숫자 연산 등 

명시적 변환
- 개발자가 코드에서 명확하게 수행하며, 변환 함수를 호출하거나 연산자를 사용
- 예) `String()`, `Number()`, `Boolean()`, `parseInt()`, `parseFloat()`, `.toString()`, 단항 더하기 연산자 등