import { useState } from 'react';
import TodoForm from './todo-form';
import TodoList from './todo-list';

const TodoPage = () => {
  const [newTodo, setNewTodo] = useState(null);
  const onSubmitTodo = (e) => {
    e.preventDefault();
    const { todo } = e.target.elements;
    if (!todo.value) return;
    setNewTodo({ name: todo.value });
  };
  return (
    <div>
      <TodoForm onSubmit={onSubmitTodo} />
      <TodoList newTodo={newTodo} />
    </div>
  );
};

export default TodoPage;
