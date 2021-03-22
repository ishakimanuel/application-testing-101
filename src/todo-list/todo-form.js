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
              placeholder="Add new todo"
            />
          </Col>
          <Button variant="primary" type="submit">
            +
          </Button>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default TodoForm;
