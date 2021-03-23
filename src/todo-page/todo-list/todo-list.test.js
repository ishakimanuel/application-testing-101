import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TodoList from './todo-list';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockData = [
  {
    name: 'Main bola',
  },
  {
    name: 'Main basket',
  },
  {
    name: 'Main kelereng',
  },
];

const server = setupServer(
  rest.get('http://localhost:3800/todos', (req, res, ctx) => {
    return res(ctx.json(mockData));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Todo List', () => {
  describe('Loading Indicator', () => {
    test('Should render loading indicator', async () => {
      render(<TodoList />);

      const loadingIndicator = screen.getByRole('loading-indicator');
      expect(loadingIndicator).toBeInTheDocument();
    });

    test('Should remove loading indicator', async () => {
      render(<TodoList />);

      const loadingIndicator = screen.queryByRole('loading-indicator');

      await waitFor(() => {
        expect(loadingIndicator).not.toBeInTheDocument();
      });
    });
  });

  describe('TodoList', () => {
    test('Should not render initial todo list', async () => {
      render(<TodoList />);

      const listGroup = screen.queryByRole('listgroup');
      expect(listGroup).not.toBeInTheDocument();
    });

    test('Should render initial todo list', async () => {
      render(<TodoList />);

      await waitFor(() => {
        const listGroup = screen.getByRole('listgroup');
        const todoList = screen
          .getAllByRole('listitem')
          .map((li) => li.textContent);
        const mockDataName = mockData.map((mock) => mock.name);

        expect(listGroup).toBeInTheDocument();
        expect(todoList).toHaveLength(mockData.length);
        expect(todoList).toEqual(mockDataName);
      });
    });

    test('Should render todolist with new todo from props', async () => {
      const { rerender } = render(<TodoList />);
      const newTodo = { name: 'Main ketapel' };

      await waitFor(() => screen.findAllByRole('listitem'));

      rerender(<TodoList newTodo={newTodo} />);

      const updatedTodoList = await screen.findAllByRole('listitem');
      const updatedTodoListName = updatedTodoList.map(
        (todo) => todo.textContent
      );

      expect(updatedTodoListName).toContain(newTodo.name);
    });

    test('Can delete todo item from list', async () => {
      const todoToDelete = mockData[0];
      render(<TodoList />);

      const deleteButton = await screen.findByRole('button', {
        name: `delete-todo-${todoToDelete.name}`,
      });

      fireEvent.click(deleteButton);

      const todoToDeleteNode = screen.queryByRole('listitem', {
        name: todoToDelete.name,
      });

      expect(todoToDeleteNode).not.toBeInTheDocument();
    });
  });
});
