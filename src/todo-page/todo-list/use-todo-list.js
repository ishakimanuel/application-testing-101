import { useEffect, useState } from 'react';
import axios from 'axios';

const host = 'http://localhost:3800';

const useTodoList = (newTodo) => {
  const [todoList, setTodoList] = useState([]);
  const [isFetchingTodoList, setIsFetchingTodoList] = useState(false);

  useEffect(() => {
    const req = initTodoList();

    return () => req;
  }, []);

  useEffect(() => {
    newTodo && addNewTodo(newTodo);
  }, [newTodo]);

  const initTodoList = async () => {
    setIsFetchingTodoList(true);
    const data = await axios.get(host + '/todos');
    setTodoList(data.data);
    setIsFetchingTodoList(false);
  };

  const addNewTodo = (newTodo) => {
    setTodoList((prev) => {
      const newTodoList = [...prev, newTodo];
      return newTodoList;
    });
  };

  const deleteTodo = (todoName) => {
    setTodoList((prev) => {
      const newTodoList = [...prev];
      return newTodoList.filter((todo) => todo.name !== todoName);
    });
  };

  return {
    todoList,
    isFetchingTodoList,
    deleteTodo,
  };
};

export default useTodoList;
