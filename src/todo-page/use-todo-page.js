import { useEffect, useState } from 'react';
import axios from 'axios';
const host = 'http://localhost:3800';

const useTodoPage = () => {
  const [todoList, setTodoList] = useState([]);

  const [isFetchingTodoList, setIsFetchingTodoList] = useState(false);

  useEffect(() => {
    const req = initTodoList();

    return () => req;
  }, []);

  const initTodoList = async () => {
    setIsFetchingTodoList(true);
    const data = await axios.get(host + '/todos');
    setTodoList(data.data);
    setIsFetchingTodoList(false);
  };

  const deleteTodo = (todoName) => {
    setTodoList((prev) => {
      const newTodoList = [...prev];
      return newTodoList.filter((todo) => todo.name !== todoName);
    });
  };

  const onSubmitTodo = (e) => {
    e.preventDefault();
    const { todo } = e.target.elements;
    if (!todo.value) return;
    addNewTodo({ name: todo.value });
  };

  const addNewTodo = (newTodo) => {
    setTodoList((prev) => {
      const newTodoList = [...prev, newTodo];
      return newTodoList;
    });
  };
  return {
    todoList,
    isFetchingTodoList,
    deleteTodo,
    onSubmitTodo,
  };
};

export default useTodoPage;
