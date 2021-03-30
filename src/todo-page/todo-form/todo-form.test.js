import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from './todo-form';

const renderTodoForm = (props = {}) => {
  const utils = render(<TodoForm {...props} />);
  const todoInput = screen.getByRole('textbox', {
    name: 'new-todo',
  });
  const addTodoButton = screen.getByRole('button', {
    name: 'add-button',
  });

  return {
    ...utils,
    todoInput,
    addTodoButton,
  };
};

describe('Todo Form', () => {
  describe('Todo Input', () => {
    test('Render todo input', () => {
      const { todoInput } = renderTodoForm();

      expect(todoInput).toBeInTheDocument();
      expect(todoInput).toHaveValue('');
      expect(todoInput).toHaveAttribute('type', 'text');
    });

    test('Should Update todo input value', () => {
      const { todoInput } = renderTodoForm();
      const newTodo = 'My new todo';

      fireEvent.change(todoInput, {
        target: {
          value: newTodo,
        },
      });

      expect(todoInput).toHaveValue(newTodo);
    });
  });

  describe('Add Button', () => {
    test('Should render add button with type submit', () => {
      const { addTodoButton } = renderTodoForm();
      expect(addTodoButton).toBeInTheDocument();
      expect(addTodoButton).toHaveAttribute('type', 'submit');
    });

    test('Click button add todo should call onSubmit function props', () => {
      const { addTodoButton, rerender } = renderTodoForm();
      const onSubmit = jest.fn((e) => e.preventDefault());

      rerender(<TodoForm onSubmit={onSubmit} />);
      fireEvent.click(addTodoButton);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
