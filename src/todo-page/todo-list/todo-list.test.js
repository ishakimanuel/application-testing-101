import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './todo-list';

const mockData = [
  {
    name: 'Learn typscript',
  },
  {
    name: 'Learn recoil.js',
  },
  {
    name: 'Learn rx.js',
  },
];

describe('Todo List', () => {
  describe('Loading Indicator', () => {
    test('Should render loading indicator', () => {
      render(<TodoList isFetching={true} />);

      const loadingIndicator = screen.getByRole('loading-indicator');
      expect(loadingIndicator).toBeInTheDocument();
    });

    test('Should remove loading indicator', () => {
      render(<TodoList isFetching={false} />);

      const loadingIndicator = screen.queryByRole('loading-indicator');

      expect(loadingIndicator).not.toBeInTheDocument();
    });
  });

  describe('TodoList', () => {
    test('Should not render initial todo list', async () => {
      render(<TodoList />);
      const listGroup = screen.queryByRole('listgroup');
      expect(listGroup).not.toBeInTheDocument();
    });

    test('Should render todo list', async () => {
      render(<TodoList list={mockData} />);
      const listGroup = screen.getByRole('listgroup');
      const todoList = screen
        .getAllByRole('listitem')
        .map((li) => li.textContent);
      const mockDataName = mockData.map((mock) => mock.name);
      expect(listGroup).toBeInTheDocument();
      expect(todoList).toHaveLength(mockData.length);
      expect(todoList).toEqual(mockDataName);
    });

    test('Should render todolist with updated list', async () => {
      const { rerender } = render(<TodoList list={mockData} />);
      const newTodo = { name: 'My new todo' };
      const newMockData = [...mockData, newTodo];

      rerender(<TodoList list={newMockData} />);
      const updatedTodoList = screen.getByRole('listgroup');
      const newTodoElement = screen.getByRole('listitem', {
        name: newTodo.name,
      });

      expect(updatedTodoList).toContainElement(newTodoElement);
    });

    test('Should delete todo item from list', async () => {
      const todoToDelete = mockData[0];
      let newMockData = [...mockData];

      const onClickDeleteBtn = jest.fn((name) => {
        newMockData = mockData.filter((todo) => todo.name !== name);
      });

      const { rerender } = render(
        <TodoList list={newMockData} onClickDeleteBtn={onClickDeleteBtn} />
      );

      const deleteButton = screen.getByRole('button', {
        name: `delete-todo-${todoToDelete.name}`,
      });

      fireEvent.click(deleteButton);

      rerender(<TodoList list={newMockData} />);

      const todoToDeleteNode = screen.queryByRole('listitem', {
        name: todoToDelete.name,
      });

      expect(onClickDeleteBtn).toHaveBeenCalledTimes(1);
      expect(onClickDeleteBtn).toHaveBeenCalledWith(todoToDelete.name);
      expect(todoToDeleteNode).not.toBeInTheDocument();
    });
  });
});
