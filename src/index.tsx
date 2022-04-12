import Nav, { NavItem } from './components/nav';
import { Route, Router } from './lib/router';
import Home from './pages/home';
import TodoList from './pages/todo-list';
import './styles.css';

const App = (): HTMLElement => {
  const selectTheme: HTMLSelectElement = (
    <select>
      <option value="">default</option>
      <option value="light" selected={window.matchMedia('(prefers-color-scheme: light)').matches}>
        light
      </option>
      <option value="dark" selected={window.matchMedia('(prefers-color-scheme: dark)').matches}>
        dark
      </option>
    </select>
  );

  selectTheme.addEventListener('change', (e: any) => {
    const theme = e.target.value || '';
    document.body.removeAttribute('theme-light');
    document.body.removeAttribute('theme-dark');
    if (theme) {
      document.body.setAttribute(`theme-${theme}`, '');
    }
  });

  return (
    <>
      <header sticky>
        <Nav>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/todo-list">Todo List</NavItem>
          <NavItem>Theme: {selectTheme}</NavItem>
        </Nav>
      </header>
      <main>
        <Router>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/todo-list" component={() => <TodoList />} />
        </Router>
      </main>
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('theme-dark', '');
  }
  document.getElementById('root')!.replaceWith(<App />);
});
