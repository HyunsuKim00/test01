import {useState, useEffect} from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (event) => {setTodo(event.target.value)};
  const onSubmit = (event) => { 
    
    event.preventDefault(); /*기본 이벤트 동작을 막기 위한 메서드.*/
    /*form이 submit되면 기본적으로 페이지가 re-load됨.*/
    /*form을 submit해도 페이지가 새로고침되지 않게 하기 위한 함수*/

    if (todo==="") {
      return; /*todo가 비어있으면 함수 종료*/
    }

    setTodos((currentArray) => [todo, ...currentArray]);
    /*현재 상태의 todos를 가져와서 todo와 합치는 것것*/
    /*array의 요소를 합쳐서 하나의 array로 만드는 방법: [...arr1, ...arr2]*/
    /*개별 요소와 array를 합치는 방법: [a1,a2, ...arr1]*/
    
    setTodo("");
    /*todo를 다시 비어있는 값으로 세팅*/
  }
  useEffect(()=>{
    console.log(todos);
  },[todos])
  
 
  /*HTML 구성 파트트*/
  return (
  <div>
    <h1>My To Dos({todos.length})</h1>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={todo} type="text" placeholder="Write your to do..."/>
      <button>Add To Do</button>
    </form>
    <hr/>
    <ul>
      {todos.map((item,index) => (<li key={index}>{item}</li>))}
    </ul>
  </div>)
}
/*map을 통해서 array 안에 있는 각각의 요소에 접근하고 변환하여 새 배열을 만들 수 있음.
todos 내의 요소들을 <li>요소로 변환하도록 설정함.
실제로 보면 요소들이 하나하나 추가되는 것 같지만, 실제로는 todos가 업데이트될 때마다 새로운 todos를 기준으로 동작*/

/*React에서는 리스트를 렌더링할 때 각 항목을 고유하게 식별할 수 있는 key속성이 필요함.
map의 파라미터 index는 map이 array를 순환할 때 각 요소의 순서를 의미.
이를 활용하여 <li>에 순서대로 key 속성을 부여여*/

export default App; 