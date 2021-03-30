import { useEffect, useState } from 'react';
import TodoForm from './todo-form/todo-form';
import TodoList from './todo-list/todo-list';
import useTodoPage from './use-todo-page';

const TodoPage = () => {
  const {
    onSubmitTodo,
    todoList,
    isFetchingTodoList,
    deleteTodo,
  } = useTodoPage();

  return (
    <div>
      <TodoForm onSubmit={onSubmitTodo} />
      <TodoList
        list={todoList}
        isFetching={isFetchingTodoList}
        onClickDeleteBtn={deleteTodo}
      />
    </div>
  );
};

export default TodoPage;
