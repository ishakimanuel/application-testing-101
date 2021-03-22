import { useEffect, useState } from 'react';
import axios from 'axios';

const host = 'http://localhost:3800';

const useTodoList = (newTodo) => {
  const [todoList, setTodoList] = useState(null);
  const [isFetchingTodoList, setIsFetchingTodoList] = useState(false);

  useEffect(() => {
    initTodoList();
  }, []);

  useEffect(() => {
    newTodo && addNewTodo(newTodo);
  }, [newTodo]);

  const initTodoList = () => {
    setIsFetchingTodoList(true);
    axios.get(host + '/todos').then((res) => {
      setTodoList(res.data);
      setIsFetchingTodoList(false);
    });
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
