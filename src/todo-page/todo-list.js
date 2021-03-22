import { ListGroup, Spinner } from 'react-bootstrap';
import useTodoList from './use-todo-list';

const TodoList = ({ newTodo }) => {
  const { todoList, isFetchingTodoList, deleteTodo } = useTodoList(newTodo);

  if (isFetchingTodoList) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (!todoList) {
    return (
      <ListGroup className="text-dark text-left">
        <ListGroup.Item>Todo List tidak ada</ListGroup.Item>
      </ListGroup>
    );
  }

  return (
    <ListGroup className="text-dark text-left">
      {todoList.map((todo, index) => (
        <ListGroup.Item key={index}>
          {todo.name}{' '}
          <button
            type="button"
            className="close text-danger"
            onClick={() => deleteTodo(todo.name)}
            style={{ fontSize: '2rem' }}
          >
            &times;
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
