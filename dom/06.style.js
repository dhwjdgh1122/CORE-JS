/* -------------------- */
/* DOM Styling          */
/* -------------------- */


/* 클래스를 관리할 수 있게 해주는 DOM 프로퍼티 ------------------------------------ */


const first = getNode('.first');
// - className – 클래스 전체를 문자열 형태로 반환해주는 프로퍼티로 클래스 전체를 관리할 때 유용




console.log( first.className);
// - classList – 클래스 하나를 관리할 수 있게 해주는 메서드로 개별 클래스를 조작할 때 유용



first.classList.add('bye');
first.classList.remove('hello');



console.log();


function addClass(node,className){
  if(typeof node === 'string') node = document.querySelector(node)
  
  if(isArray(className)){
    console.log(className);
    className.forEach( c => node.classList.add(c))
    return;
  }
    
  if(typeof className !== 'string'){
    throw new TypeError('addClass 함수의 두 번째 인수는 문자 타입 이어야 합니다.');
  }
  node.classList.add(className);
}

addClass('.first',['a','b','c'])



function removeClass(node,className){

  if(typeof node === 'string') node = document.querySelector(node)

  if(!className) {
    node.className = ''
    return;
  }
    
  if(typeof className !== 'string'){
    throw new TypeError('removeClass 함수의 두 번째 인수는 문자 타입 이어야 합니다.');
  }

  node.classList.remove(className);
}


removeClass('.first')



/* 스타일 변경 방법 --------------------------------------------------------- */

// - style.cssText - "style" 속성 전체에 대응하므로 스타일 전체에 대한 문자열 저장


first.style.background = 'red';

/* 계산된 스타일 읽기 ------------------------------------------------------- */

// - getComputedStyle(element, [pseudoElement]) `읽기 전용`