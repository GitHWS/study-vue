// 각 태그(button, input, ul)에 접근하기 위해 변수 선언
const buttonEl = document.querySelector('button');
const inputEl = document.querySelector('input');
const listEl = document.querySelector('ul');

// 목표를 ul에 추가하기 위한 함수
function addGoal() {
  const enteredValue = inputEl.value;
  const listItemEl = document.createElement('li');
  listItemEl.textContent = enteredValue;
  listEl.appendChild(listItemEl);

  // input의 값을 초기화
  inputEl.value = '';
}

// Button에 대한 클릭 이벤트
buttonEl.addEventListener('click', addGoal);

// ul에 엑세스하여 새로운 항목을 추가
