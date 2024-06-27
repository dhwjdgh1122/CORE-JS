/* --------------------- */
/* Type Conversion       */
/* --------------------- */


/* 데이터 → 문자 ----------------------------------------------------------- */

// number
const YEAR = 2024;

console.log(typeof String(YEAR));

// undefined, null

// boolean


/* 데이터 → 숫자 ----------------------------------------------------------- */

// undefined

// null

// boolean/

// string
const numericString = "123";
console.log(typeof Number(numericString)); // "number" 명시적
const numericString1 = "123";
console.log(typeof (+numericString1)); // "number" 암시적

// numeric string


/* 데이터 → 불리언 ---------------------------------------------------------- */

// null, undefined, 0, NaN, ''
// 위에 나열한 것 이외의 것들 