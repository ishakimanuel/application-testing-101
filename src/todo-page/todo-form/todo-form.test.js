import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from './todo-form';

const renderTodoForm = (props = {}) => {
  const utils = render(<TodoForm {...props} />);
  const todoInput = screen.getByRole('textbox', {
    name: /new-todo/i,
  });
  const addTodoButton = screen.getByRole('button', {
    name: /add-button/i,
  });

  return {
    ...utils,
    todoInput,
    addTodoButton,
  };
};

describe('Todo Form', () => {
  const { addTodoButton, todoInput } = renderTodoForm();

  describe('Todo Input', () => {
    test('Render todo input with type text', () => {
      expect(todoInput).toHaveAttribute('type', 'text');
    });

    test('Todo input must have no initial value', () => {
      expect(todoInput).toHaveValue('');
    });

    test('Update todo input value', () => {
      const newTodo = 'Todo terbaru';
      fireEvent.change(todoInput, {
        target: {
          value: newTodo,
        },
      });
      expect(todoInput).toHaveValue(newTodo);
    });
  });

  describe('Add Button', () => {
    test('Render Add Button with type submit', () => {
      expect(addTodoButton).toHaveAttribute('type', 'submit');
    });
    test('Click button should call onSubmit function props', () => {
      const { addTodoButton, rerender } = renderTodoForm();
      const onSubmit = jest.fn((e) => e.preventDefault());

      rerender(<TodoForm onSubmit={onSubmit} />);
      fireEvent.click(addTodoButton);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
