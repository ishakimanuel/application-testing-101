import { ListGroup, Spinner } from 'react-bootstrap';
import useTodoList from './use-todo-list';

const TodoList = ({ newTodo }) => {
  const { todoList, isFetchingTodoList, deleteTodo } = useTodoList(newTodo);

  if (isFetchingTodoList || !todoList.length) {
    return (
      <Spinner role="loading-indicator" animation="border" variant="primary" />
    );
  }

  return (
    <ListGroup className="text-dark text-left" role="listgroup">
      {todoList.map((todo, index) => (
        <ListGroup.Item key={index}>
          <p role="listitem">{todo.name}</p>
          <button
            type="button"
            aria-label={`delete-todo-${index}`}
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
