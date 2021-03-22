import './App.css';
import { Container } from 'react-bootstrap';
import TodoPage from './todo-list/todo-page';

function App() {
  return (
    <div className="App pt-5">
      <Container>
        <TodoPage />
      </Container>
    </div>
  );
}

export default App;
