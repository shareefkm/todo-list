import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [toDo, setToDo] = useState("");

  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  });
  const doingEdit = (id)=>{
    const editItem = list.find((ele)=>{
      return ele.id === id
    })
    setToDo(editItem.text)
    setList(list.filter((data)=>{
      return (data.id !== id)
    }))
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>
          Whoop, it's:-{" "}
          {new Date().toLocaleString("en-US", { weekday: "long" })} 🌝 ☕{" "}
        </h2>
      </div>
      <div className="input">
        <input
          ref={inputRef}
          value={toDo}
          onChange={(e) => {
            setToDo(e.target.value);
          }}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => {
            if(toDo.trim() !== ''){
              setList(
                [...list, { id: Date.now(), text: toDo, status: false }],
                setToDo("")
              );
            }else{
              alert("please enter somthing")
              setToDo("")
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {list.map((value) => {
          return (
            <div className="todo" key={value.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setList(
                      list.filter((data) => {
                        if (data.id === value.id) {
                          data.status = e.target.checked;
                        }
                        return data;
                      })
                    );
                  }}
                  value={value.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p id={value.status ? "values" : ""}>{value.text}</p>
              </div>
              <div className="right">
                <i onClick={()=>{
                  if(value.status){
                    doingEdit(value.id)
                  }else{
                    alert('Please select');
                  }
                }} className="fas fa-edit"></i>
                <i onClick={()=>{
                  if(value.status){
                    setList(list.filter((data)=>{
                      return(value.id !== data.id)
                    }))
                  }else{
                    alert('Please select');
                  }
                }} className="fas fa-times"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
