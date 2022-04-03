import Nav, { NavItem } from './components/nav';
import { Route, Router } from './lib/router';
import Home from './pages/home';
import TodoList from './pages/todo-list';
import './styles.css';

const App = () => {
  return (
    <main>
      <Nav>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/todo-list">Todo List</NavItem>
      </Nav>
      <Router>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/todo-list" component={() => <TodoList />} />
      </Router>
    </main>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('root')!.append((<App />) as HTMLElement);
});
