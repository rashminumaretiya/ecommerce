import React, { useEffect, useState } from "react";
import CustomButton from "../../shared/CustomButton";

const About = () => {
  const [todo, setTodo] = useState({});
  const [todoArr, setTodoArr] = useState([]);
  const [editTodo, setEditTodo] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [update, setUpdate] = useState("");

  const handleTodo = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:3000/todos");
        const data = await res.json();
        setTodoArr(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getTodos();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    todoArr.push({ id: Date.now(), ...todo });
    setTodoArr(todoArr);
    setTodo({});
    // localStorage.setItem("todoList", JSON.stringify(todoArr));
  };

  const deleteTodo = (id) => {
    let filterArr = todoArr.filter((todoId) => todoId.id !== id);
    setTodoArr(filterArr);
    localStorage.setItem("todoList", JSON.stringify(filterArr));
  };

  const handleEditTodo = (id, todo) => {
    setEditTodoId(id);
    setEditTodo(!editTodo);
    setUpdate(todo);
  };

  const updateTodo = (e) => {
    setUpdate(e.target.value);
  };

  const handleUpdateTodo = (id) => {
    let filterArr = todoArr.findIndex((todoId) => todoId.id === id);
    let updateArr = {
      todo: update,
      id: id,
    };
    if (filterArr !== -1) {
      todoArr[filterArr] = {
        ...updateArr,
      };
    }
    // localStorage.setItem("todoList", JSON.stringify(todoArr));
    setEditTodo(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <form>
            <div className="input-group">
              <input
                type="text"
                name="todo"
                value={todo?.todo || ""}
                onChange={handleTodo}
                className="form-control"
              />
              <CustomButton onClick={handleClick}>Add Todo</CustomButton>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>Todo's</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoArr.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <input
                        value={editTodoId === data.id ? update : data.title}
                        readOnly={
                          editTodoId === data.id && editTodo ? false : true
                        }
                        className="form-control"
                        onChange={(e) => updateTodo(e)}
                      />
                    </td>
                    <td>
                      {editTodoId === data.id && editTodo ? (
                        <CustomButton
                          className="w-100"
                          id={data.id}
                          onClick={() => handleUpdateTodo(data.id)}
                        >
                          Update
                        </CustomButton>
                      ) : (
                        <>
                          <CustomButton
                            id={data.id}
                            variant="danger"
                            onClick={() => deleteTodo(data.id)}
                            className="me-2"
                          >
                            Delete
                          </CustomButton>
                          <CustomButton
                            id={data.id}
                            onClick={() => handleEditTodo(data.id, data.todo)}
                          >
                            Edit
                          </CustomButton>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default About;
