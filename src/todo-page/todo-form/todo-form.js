import {
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Button,
} from 'react-bootstrap';
import useTodoForm from './use-todo-form';

const TodoForm = ({ onSubmit = () => null }) => {
  const { todoValue, onChangeTodoInput } = useTodoForm();

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Row>
          <Col>
            <FormControl
              value={todoValue}
              onChange={onChangeTodoInput}
              name="todo"
              type="text"
              placeholder="New Todo"
              aria-label="new-todo"
            />
          </Col>
          <Button variant="primary" aria-label="add-button" type="submit">
            +
          </Button>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default TodoForm;
