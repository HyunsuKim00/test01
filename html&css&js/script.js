const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
/*querySelector( )
1.클래스로 접근 가능 -> document.querySelector('.classname');
2. id로 접근 가능 -> document.querySelector('#id');
3. 태그 이름으로 접근 가능 -> document.querySelector('div');
4. 복합 선택 -> document.querySelector('.classname p');
 */

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
}) /*register-btn 버튼을 클릭했을 때, 다음 함수 실행.
    해당 함수는 container의 class에 active를 추가.
    - 변수 container의 기존 class: container
    - 변수 container의 변경된 class: container active
    그렇게 class가 추가되면 새로운 css를 적용받을 수 있음. */

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})
/* () => {} 화살표 함수
    - (): 파라미터
    - {}: 함수 블록

    기존 함수에 비해서 간결하게 작성할 수 있음.
    - 기존 함수: function add(a,b) {return a+b;}
    - 화살표 함수: const add(a,b) => a+b;
*/