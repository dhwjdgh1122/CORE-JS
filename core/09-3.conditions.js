function weekend() {
  // 0부터 6까지의 랜덤 숫자 생성 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const day = Math.floor(Math.random() * 7);

  // 생성된 랜덤 숫자를 요일로 사용하여 주말 여부 확인
  if (day === 0 || day === 6) {
      console.log("주말입니다");
  } else {
      console.log("평일입니다");
  }

  // 요일을 텍스트로 출력
  if (day === 0) {
      console.log("일요일");
  } else if (day === 1) {
      console.log("월요일");
  } else if (day === 2) {
      console.log("화요일");
  } else if (day === 3) {
      console.log("수요일");
  } else if (day === 4) {
      console.log("목요일");
  } else if (day === 5) {
      console.log("금요일");
  } else if (day === 6) {
      console.log("토요일");
  }
}

// 함수 호출
weekend();
