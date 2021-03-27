import { render, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import TodoPage from './todo-page';

const mockData = [
  {
    name: 'Playing football',
  },
  {
    name: 'Buy some chicken noodles',
  },
];

const server = setupServer(
  rest.get('http://localhost:3800/todos', (_, res, ctx) => {
    return res(ctx.json(mockData));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Todo Page Integration test', () => {
  test('Fetch initial todo list from api', async () => {
    const { getByRole, queryByRole, findByRole } = render(<TodoPage />);
    const loadingIndicator = getByRole('loading-indicator');
    const listGroup = queryByRole('listgroup');

    expect(loadingIndicator).toBeInTheDocument();
    expect(listGroup).not.toBeInTheDocument();

    const newListGroup = await findByRole('listgroup');
    const nullLoadingIndicator = queryByRole('loading-indicator');

    expect(nullLoadingIndicator).not.toBeInTheDocument();
    expect(newListGroup).toBeInTheDocument();
  });

  test('Should add new todo item', async () => {
    const { getByRole } = render(<TodoPage />);
    const newTodoName = 'My new todo';

    await waitFor(() => {
      const addButton = getByRole('button', { name: 'add-button' });

      const todoInput = getByRole('textbox', {
        name: /new-todo/i,
      });

      fireEvent.change(todoInput, {
        target: {
          value: newTodoName,
        },
      });

      fireEvent.click(addButton, 'click');
      const listGroup = getByRole('listgroup');
      const newTodo = getByRole('listitem', { name: newTodoName });

      expect(listGroup).toContainElement(newTodo);
    });
  });

  test('Should delete todo item', async () => {
    const todoToDelete = mockData[0];

    const { getByRole, queryByRole } = render(<TodoPage />);
    await waitFor(() => {
      const deleteButton = getByRole('button', {
        name: `delete-todo-${todoToDelete.name}`,
      });

      fireEvent.click(deleteButton);
    });

    const todoToDeleteNode = queryByRole('listitem', {
      name: todoToDelete.name,
    });

    expect(todoToDeleteNode).not.toBeInTheDocument();
  });
});
