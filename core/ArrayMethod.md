### 배열과 메서드

배열은 다양한 메서드를 제공한다. 

### 요소 추가-제거 메서드

배열의 맨 앞이나 끝에 요소(item)를 추가하거나 제거하는 메서드 말고도

- `arr.push(...items)` - 맨 끝에 요소 추가
- `arr.pop()` - 맨 끝에 요소 제거
- `arr.shift()` - 맨 앞 요소 제거
- `arr.unshift(...items)` - 맨 앞에 요소 추가

### splice

배열에소 요소를 하나만 지우고 싶다면?    
배열 역시 객체형에 속하므로 프로퍼티를 지울 때 쓰는 연산자 `delete`를 사용해 볼 수 있다.

    let arr = ["I", "go", "home"];
    delete arr[1]; // "go" 삭제

    alert( arr[1] ); // undefined

    // delete를 써서 요소를 지우고 난 후 배열 --> arr = ["I", , "home"];
    alert( arr.length); // 3

요소를 지웠지만 배열의 요소는 여전히 3개이다. 

`delete obj.key`는 `key`를 이용해 해당 키에 상응하는 값을 지우기 때문이다. `delete` 메서드는 제 역할을 다 한 것이다. 그런데 삭제된 요소가 만든 빈 공간을 나머지 요소들이 자동으로 채울 것이라 기대하며 이 메서드를 사용했다. 배열의 길이가 더 짧아지길 기대한 것이지

이런 기대를 충족하려면 특별한 메서드를 사용해야 한다.

`arr.splice(start)`는 만능 스위스 맥가이버 칼 같은 메서드이다. 요소를 자유자재로 다룰 수 있게 해준다. 이 메서드를 사용하면 요소 추가, 삭제, 교체가 모두 가능하다.

문법은 아래와 같다

    arr.splice(index[, deleteCount, elem1, ..., elemN])

첫 번째 매개변수는 조작을 가할 첫 번째 요소를 가리키는 `인덱스(index)`이다. 두 번째 매개변수는 `deleteCount`로, 제거하고자 하는 요소의 개수를 나타낸다. `elem1, ..., elemN`은 배열에 추가할 요소를 나타낸다.

splice 메서드를 사용해 작성된 예시를 보자

요소 삭제

    let arr = ["I", "study", "javascript"];

    arr.splice(1, 1); // 인덱스 1부터 요소 한 개를 제거

    alert(arr); // ["I", "javascript]

인덱스 `1`이 가리키는 요소부터 시작해 요소 한 개(`1`)개를 지웠다.

요소 세 개(3)를 지우고, 그 자리를 다른 요소 두 개로 교체해보자

    let arr = ["one", "two", "three", "four", "five"];

    // 처음(0) 세 개(3)의 요소를 지우고, 이 자리를 다른 요소로 대체하기
    arr.splice(0, 3, "six", "seven");

    alert(arr) // ["six", "seven", "four", "five"]

`splice`는 삭제된 요소로 구성된 배열을 반환한다.

    let arr = ["one", "two", "three", "four", "five"];

    // 처음 두 개의 요소 삭제
    let removed = arr.splice(0, 2);

    alert(removed); // one,two <-- 삭제된 요소로 구성된 배열

`splice` 메서드의 `deleteCount`를 `0`으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 추가할 수 있다.

    let arr = ["one", "two", "three"];

    // 인덱스 2부터
    // 0개의 요소를 삭제한다
    // 그 후, "four"와 "five"를 추가한다.
    arr.splice(2, 0, "four", "five");

    alert(arr); // one two four five three

인덱스 2는 `three` 0개의 요소 삭제 후 그 자리에 `four`,`five`가 들어옴 그러고 인덱스 2였던 `three`가 들어옴

    let arr = [1, 2, 5];

    // 인덱스 -1부터 (배열 끝에서부터 첫 번째 요소)
    // 0개의 요소를 삭제하고
    // 3과 4를 추가합니다.
    arr.splice(-1, 0, 3, 4);

    alert( arr ); // 1,2,3,4,5

음수 인덱스도 가능하다

### slice

`arr.slice`는 `arr.splice`와 유사해 보이지만 훨씬 간단하다.

    arr.slice([start], [end])

이 메서드는 `"start"` 인덱스부터 (`"end"`를 제외한) `"end"` 인덱스까지의 요소를 복사한 새로운 배열을 반환한다. `start`와 `end`는 둘 다 음수일 수 있는데 이땐, 배열 끝에서부터의 요소 개수를 의미한다.
 
`arr.slice`는 문자열 메서드인 `str.slice`와 유사하게 동작하는데 `arr.slice`는 서브 문자열(substring) 대신 서브 배열(subarray)을 반환한다는 점이 다르다.

    let arr = ["t", "e", "s", "t"];

    alert( arr.slice(1, 3) ); // e,s (인덱스가 1인 요소부터 인덱스가 3인 요소까지를 복사(인덱스가 3인 요소는 제외))

    alert( arr.slice(-2) ); // s,t (인덱스가 -2인 요소부터 제일 끝 요소까지를 복사)

`arr.slice()`는 인수를 하나도 넘기지 않고 호출하여 `arr`의 복사본을 만들 수 있다. 이런 방식은 기존의 배열을 건드리지 않으면서 배열을 조작해 새로운 배열을 만들고자 할 때 자주 사용된다.

### concat

`arr.concat`은 기존 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용할 수 있다.

문법은 아래와 같다.

    arr.concat(arg1, arg2...)

인수엔 배열이나 값이 올 수 있는데, 인수 개수엔 제한이 없다.

메서드를 호출하면 `arr`에 속한 모든 요소와 `arg1`, `arg2` 등에 속한 모든 요소를 한데 모은 새로운 배열이 반환된다.

인수 `argN`가 배열일 경우 배열의 모든 요소가 복사된다. 그렇지 않은 경우는 인수가 그대로 복사된다.

    let arr = [1, 2];

    // arr의 요소 모두와 [3,4]의 요소 모두를 한데 모은 새로운 배열이 만들어집니다.
    alert( arr.concat([3, 4]) ); // 1,2,3,4

    // arr의 요소 모두와 [3,4]의 요소 모두, [5,6]의 요소 모두를 모은 새로운 배열이 만들어집니다.
    alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

    // arr의 요소 모두와 [3,4]의 요소 모두, 5와 6을 한데 모은 새로운 배열이 만들어집니다.
    alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

`concat` 메서드는 제공받은 배열의 요소를 복사해 활용한다. 객체가 인자로 넘어오면(배열처럼 보이는 유사 배열 객체이더라도) 객체는 분해되지 않고 통으로 복사되어 더해진다.

   let arr = [1, 2];

    let arrayLike = {
      0: "something",
      length: 1
    };

    alert( arr.concat(arrayLike) ); // 1,2,[object Object]

그런데 인자로 받은 유사 배열 객체에 특수한 프로퍼티 `Symbol.isConcatSpreadable`이 있으면 `concat`은 이 객체를 배열처럼 취급한다. 따라서 객체 전체가 아닌 객체 프로퍼티의 값이 더해진다.

    let arr = [1, 2];

    let arrayLike = {
      0: "something",
      1: "else",
      [Symbol.isConcatSpreadable]: true,
      length: 2
    };

    alert( arr.concat(arrayLike) ); // 1,2,something,else

### forEach로 반복 작업

`arr.forEach`는 주어진 함수를 배열 요소 각각에 대해 실행할 수 있게 해준다.

    arr.forEach(function(item, index, array) {
      // 요소에 무언가를 할 수 있습니다.
    });

아래는 요소 모두를 얼럿창을 통해 출력하는 코드이다.

    // for each element call alert
    ["Bilbo", "Gandalf", "Nazgul"].forEach(alert);

아래는 인덱스 정보까지 더해서 출력해주는 좀 더 정교한 코드이다.

    ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
      alert(`${item} is at index ${index} in ${array}`);
    });

인수로 넘겨준 함수의 반환값은 무시된다.


### 배열 탐색
배열 내에서 무언가를 찾고 싶을 때 쓰는 메서드

### indexOf, lastIndexOf, includes

`arr.indexOf`와 `arr.lastIndexOf`, `arr.includes`는 같은 이름을 가진 문자열 메서드와 문법이 동일하다. 물론 하는 일도 같다. 연산 대상이 문자열이 아닌 배열의 요소라는 점만 다르다.

- `arr.indexOf(item, from)`는 인덱스 `from`부터 시작해 `item(요소)`를 찾는다. 요소를 발견하면 해당 요소의 인덱스를 반환하고, 발견하지 못했으면 `-1`을 반환한다.
- `arr.lastIndexOf(item, from)`는 위 메서드와 동일한 기능을 하는데, 검색을 끝에서부터 시작한다는 점만 다르다.
- `arr.includes(item, from)`는 인덱스 `from`부터 시작해 `item`이 있는지를 검색하는데, 해당하는 요소를 발견하면 `true`를 반환한다.

    let arr = [1, 0, false];

    alert( arr.indexOf(0) ); // 1
    alert( arr.indexOf(false) ); // 2
    alert( arr.indexOf(null) ); // -1

    alert( arr.includes(1) ); // true

위 메서드들은 요소를 찾을 때 완전 항등 연산자 `===` 을 사용한다는 점에 주의하자. `false`를 검색하면 정확히 `false`만을 검색하지, 0을 검색하진 않습니다.

요소의 위치를 정확히 알고 싶은게 아니고 요소가 배열 내 존재하는지 여부만 확인하고 싶으면 `arr.includes`를 사용하는 게 좋다.

`includes`는 `NaN`도 제대로 처리한다는 점에서 `indexOf/lastIndexOf`와 약간의 차이가 있다.

    const arr = [NaN];
    alert( arr.indexOf(NaN) ); // -1 (완전 항등 비교 === 는 NaN엔 동작하지 않으므로 0이 출력되지 않습니다.)
    alert( arr.includes(NaN) );// true (NaN의 여부를 확인하였습니다.)

### find, findIndex

객체로 이루어진 배열이 있다고 가정하자. 특정 조건에 부합하는 객체를 배열 내에서 어떻게 찾을까?

`arr.find(fn)`을 사용할 수 있다

    let result = arr.find(function(item, index, array) {
      // true가 반환되면 반복이 멈추고 해당 요소를 반환합니다.
      // 조건에 해당하는 요소가 없으면 undefined를 반환합니다.
    });

요소 전체를 대상으로 함수가 순차적으로 호출된다.

- `item` - 함수를 호출할 요소
- `index` - 요소의 인덱스
- `array` - 배열 자기 자신

함수가 참을 반환하면 탐색은 중단되고 해당 `요소`가 반환된다. 원하는 요소를 찾지 못했으면 `undefined`가 반환된다.

`id`와 `name` 프로퍼티를 가진 사용자 객체로 구성된 배열을 예로 들자 배열 내에서 `id == 1` 조건을 충족하는 사용자 객체를 찾아보자

    let users = [
      {id: 1, name: "John"},
      {id: 2, name: "Pete"},
      {id: 3, name: "Mary"}
    ];

    let user = users.find(item => item.id == 1);

    alert(user.name); // John

실무에서 객체로 구성된 배열을 다뤄야 할 일이 잦기 때문에 `find` 메서드 활용법을 알아두면 좋다.

그런데 위 예시에서 `find` 안의 함수가 인자를 하나만 가지고 있다는 점을 보자(`item => item.id == 1`). 이런 패턴이 가장 많이 사용되는 편이다. 다른 인자들(`index, array`)은 잘 사용되지 않는다.

`arr.findIndex`는 `find`와 동일한 일을 하나, 조건에 맞는 요소를 반환하는 대신 해당 요소의 인덱스를 반환한다는 점이 다르다. 조건에 맞는 요소가 없으면 `-1`이 반환된다.

### filter

`find` 메서드는 함수의 반환 값을 `true`로 만드는 단 하나의 요소를 찾는다.

조건을 충족하는 요소가 여러 개라면 `arr.filter(fn)`를 사용하면 된다.

`filter`는 `find`와 문법이 유사하지만, 조건에 맞는 요소 전체를 담은 배열을 반환한다는 점에서 차이가 있다.

    let results = arr.filter(function(item, index, array) {
      // 조건을 충족하는 요소는 results에 순차적으로 더해집니다.
      // 조건을 충족하는 요소가 하나도 없으면 빈 배열이 반환됩니다.
    });

---
    let users = [
      {id: 1, name: "John"},
      {id: 2, name: "Pete"},
      {id: 3, name: "Mary"}
    ];

    // 앞쪽 사용자 두 명을 반환합니다.
    let someUsers = users.filter(item => item.id < 3);

    alert(someUsers.length); // 2

### 배열을 변형하는 메서드

배열을 변형시키거나 요소를 재 정렬해주는 메서드

### map

`arr.map`은 유용성과 사용 빈도가 아주 높은 메서드 중 하나이다.

`map`은 배열 요소 전체를 대상으로 함수를 호출하고, 함수 호출 결과를 배열로 반환한다.

    let result = arr.map(function(item, index, array) {
      // 요소 대신 새로운 값을 반환합니다.
    });

아래 예시는 각 요소(문자열)의 길이를 출력해준다.

    let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
    alert(lengths); // 5,7,6

### sort(fn)

`arr.sort()`는 배열의 요소를 정렬해준다. 배열 자체가 변경된다

메서드를 호출하면 재정렬 된 배열이 반환되는데, 이미 `arr` 자체가 수정되었기 때문에 반환 값은 잘 사용되지 않는 편이다

    let arr = [ 1, 2, 15 ];

    // arr 내부가 재 정렬됩니다.
    arr.sort();

    alert( arr );  // 1, 15, 2

재정렬 후 배열 요소가 `1,15,2`가 되었다 기대한 결과 `1,2,15`와는 다르다 why?

**요소는 문자열로 취급되어 재정렬되기 때문이다.**

모든 요소는 문자형으로 변환된 이후에 재정렬된다. 문자열 비교는 사전편집 순으로 진행되기 때문에 2는 15보다 큰 값으로 취급된다.

기본 정렬 기준 대신 새로운 정렬 기준을 만들려면 `arr.sort()`에 새로운 함수를 넘겨줘야 한다.

인수로 넘겨주는 함수는 반드시 값 두 개를 비교해야 하고 반환 값도 있어야 한다.

    function compare(a, b) {
      if (a > b) return 1; // 첫 번째 값이 두 번째 값보다 큰 경우
      if (a == b) return 0; // 두 값이 같은 경우
      if (a < b) return -1; //  첫 번째 값이 두 번째 값보다 작은 경우
    }

배열 요소를 오름차순 기준으로 정렬

    function compareNumeric(a, b) {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    }

    let arr = [ 1, 2, 15 ];

    arr.sort(compareNumeric);

    alert(arr);  // 1, 2, 15

드디어 기대했던 대로 요소가 정렬됨

`arr`엔 숫자,문자열,객체 등이 들어갈 수 있다. 알 수 없는 무언가로 구성된 집합이 되는거다. 이제 이 비 동질적인 집합을 정렬해야 한다고 가정하자. 무언가를 정렬하려면 기준이 필요하다. 이때 정렬 기준을 정의해주는 함수(ordering function, 정렬 함수)가 필요하다. `sort`에 정렬 함수를 인수로 넘겨주지 않으면 이 메서드는 사전편집 순으로 요소를 정렬한다.

`arr.sort(fn)`는 포괄적인 정렬 알고리즘을 이용해 구현되어있다. 대개 최적화된 **퀵 소트**를 사용하는데, `arr.sort(fn)`는 주어진 함수를 사용해 정렬 기준을 만들고 이 기준에 따라 요소들을 재배열하므로 개발자는 내부 정렬 동작 원리를 알 필요가 없다. 정렬 함수 `fn`을 만들고 이를 인수로 넘겨주는 것 뿐이다.

정렬 과정에서 어떤 요소끼리 비교가 일어났는지 확인할려면 아래 코드를 활용하면 된다.

    [1, -2, 15, 2, 0, 8].sort(function(a, b) {
      alert( a + " <> " + b );
      return a - b;
    });

### reverse

`arr.reverse`는 `arr`의 요소를 역순으로 정렬시켜주는 메서드이다.

    let arr = [1, 2, 3, 4, 5];
    arr.reverse();

    alert( arr ); // 5,4,3,2,1


### split, join

메시지 전송 앱을 만들고 있다고 가정하자. 수신자가 여러 명일 경우, 발신자는 쉼표로 각 수신자를 구분할것이다. `john, pete, mary` 같이 개발자는 긴 문자열 형태의 수신자 리스트를 배열 형태로 전환해 처리하고 싶을때 입력받은 문자열을 어떻게 배열로 바꿀 까??

`str.split(delim)`을 이용하면 된다 이 메서드는 구분자(delimiter) `delim`을 기준으로 문자열을 쪼개준다.

아래 예시에선 쉼표와 공백을 합친 문자열이 구분자로 사용되고 있다.

    let names = 'Bilbo, Gandalf, Nazgul';

    let arr = names.split(', ');

    for (let name of arr) {
      alert( `${name}에게 보내는 메시지` ); // Bilbo에게 보내는 메시지
    }


`split` 메서드는 두 번째 인수로 숫자를 받을 수 있다. 이 숫자는 배열의 길이를 제한해주므로 길이를 넘어서는 요소를 무시할 수 있다. 실무에서 자주 사용하는 기능은 아니다.

    let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

    alert(arr); // Bilbo, Gandalf

### reduce, reduceRight

`forEach`, `for`, `for..of`를 사용하면 배열 내 요소를 대상으로 반복 작업을 할 수 있다.

각 요소를 돌면서 반복 작업을 수행하고, 작업 결과물을 새로운 배열 형태로 얻으려면 `map`을 사용하면 된다.

`arr.reduce`와 `arr.reduceRight`도 이런 메서드들과 유사한 작업을 해준다. but 사용법이 조금 복잡하다. `reduce`와 `reduceRight`는 배열을 기반으로 값 하나를 도출할 때 사용된다.

    let value = arr.reduce(function(accumulator, item, index, array) {
      // ...
    }, [initial]);

인수로 넘겨주는 함수는 배열의 모든 요소를 대상으로 차례차례 적용되는데, 적용 결과는 다음 함수 호출 시 사용된다.

함수의 인수는 다음과 같다.

- `accumulator` - 이전 함수 호출의 결과 `initial`은 함수 최초 호출 시 사용되는 초기값을 나타낸다.
- `item` - 현재 배열 요소
- `index` - 요소의 위치
- `array` - 배열

이전 함수 호출 결과는 다음 함수를 호출할 때 첫 번째 인수로 사용된다.

첫 번째 인수는 앞서 호출했던 함수들의 결과가 누적되어 저장되는 '누산기'라고 생각하자. 마지막 함수까지 호출되면 이 값은 `reduce`의 반환 값이 된다.

`reduce`를 이용해 코드 한 줄로 배열의 모든 요소를 더한 값을 구현해보자.

    let arr = [1, 2, 3, 4, 5];

    let result = arr.reduce((sum, current) => sum + current, 0);

    alert(result); // 15

`reduce`에 전달한 함수는 오직 인수 두 개만 받고 있다. 대개 이렇게 인수를 두 개만 받는다.

1. 함수 최초 호출 시, `reduce`의 마지막 인수인 `0(초깃값)`이 `sum`에 할당된다. `current`엔 배열의 첫 번째 요소인 `1`이 할당된다. 따라서 함수의 결과는 `1`이 된다.

2. 두 번째 호출 시, `sum = 1` 이고 여기에 배열의 두 번째 요소`(2)`가 더해지므로 결과는 `3`이 된다.

3. 세 번째 호출 시, `sum = 3` 이고 여기에 배열의 다음 요소가 더해진다. 이런 과정이 계속 이어진다.


초기값을 생략하는 것도 가능하다.

    let arr = [1, 2, 3, 4, 5];

    // reduce에서 초깃값을 제거함(0이 없음)
    let result = arr.reduce((sum, current) => sum + current);

    alert( result ); // 15

초기값이 없으면 `reduce`는 배열의 첫 번째 요소를 초기값으로 사용하고 두 번째 요소부터 함수를 호출하기 때문이다.



### 요약 
#### 1. 요소를 더하거나 지우기
- `push(...items)` – 맨 끝에 요소 추가하기
-  `pop()` – 맨 끝 요소 추출하기
-  `shift()` – 첫 요소 추출하기
-  `unshift(...items)` – 맨 앞에 요소 추가하기
-  `splice(pos, deleteCount, ...items)` – pos부터 deleteCount개의 요소를 지우고, items 추가하기
-  `slice(start, end)` – start부터 end 바로 앞까지의 요소를 복사해 새로운 배열을 만듦
-  `concat(...items)` – 배열의 모든 요소를 복사하고 items를 추가해 새로운 배열을 만든 후 이를 반환함. items가 배열이면 이 배열의 인수를 기존 배열에 더해줌

#### 2. 원하는 요소 찾기
- `indexOf/lastIndexOf(item, pos)` – `pos`부터 원하는 `item`을 찾음. 찾게 되면 해당 요소의 인덱스를, 아니면 `-1`을 반환함
- `includes(value)` – 배열에 `value`가 있으면 `true`를, 그렇지 않으면 `false`를 반환함
- `find/filter(func)` – `func`의 반환 값을 `true`로 만드는 첫 번째/전체 요소를 반환함
- `findIndex`는 `find`와 유사함. 다만 요소 대신 인덱스를 반환함

#### 3. 배열 전체 순회하기
- `forEach(func)` - 모든 요소에 `func`을 호출함, 결과는 반환되지 않음

#### 4. 배열 변형하기
- `map(func)` – 모든 요소에 `func`을 호출하고, 반환된 결과를 가지고 새로운 배열을 만듦
- `sort(func)` – 배열을 정렬하고 정렬된 배열을 반환함
- `reverse()` – 배열을 뒤집어 반환함
- `split/join` – 문자열을 배열로, 배열을 문자열로 변환함
- `reduce(func, initial)` – 요소를 차례로 돌면서 `func`을 호출함. 반환값은 다음 함수 호출에 전달함. 최종적으로 하나의 값이 도출됨

#### 5. 기타
- `Array.isArray(arr)` - `arr`이 배열인지 여부를 판단함 

















