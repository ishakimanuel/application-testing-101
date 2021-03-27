import { Col, ListGroup, Row, Spinner } from 'react-bootstrap';

const TodoList = ({ isFetching, list = [], onClickDeleteBtn = () => null }) => {
  if (isFetching) {
    return (
      <Spinner role="loading-indicator" animation="border" variant="primary" />
    );
  }

  if (!list.length) {
    return <div>Maaf, tidak ada todo list</div>;
  }

  return (
    <ListGroup className="text-dark text-left" role="listgroup">
      {list.map((todo, index) => (
        <ListGroup.Item key={index}>
          <Row className="align-items-center">
            <Col>
              <p role="listitem" aria-label={todo.name}>
                {todo.name}
              </p>
            </Col>
            <Col>
              <button
                type="button"
                aria-label={`delete-todo-${todo.name}`}
                className="close text-danger"
                onClick={() => onClickDeleteBtn(todo.name)}
                style={{ fontSize: '2rem' }}
              >
                &times;
              </button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
