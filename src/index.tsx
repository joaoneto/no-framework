import { Link, Route, Router } from './lib/router';
import Home from './pages/home';
import TodoList from './pages/todo-list';
import './styles.css';

const App = () => {
  return (
    <main>
      <Link to="/">Home</Link> | <Link to="/todo-list">Todo List</Link>
      <Router>
        <Route exact path="/" component={() => (<Home />) as HTMLElement} />
        <Route path="/todo-list" component={() => (<TodoList />) as HTMLElement} />
      </Router>
    </main>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('root')!.append((<App />) as HTMLElement);
});
