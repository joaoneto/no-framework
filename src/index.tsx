import h, { ComponentChildren, Fragment } from './lib/create-element';
import './styles.css';

interface TodoListItemProps {
  id: string;
  description: string;
}

interface TodoListProps {
  children: any;
}

const TodoListItem = ({ id, description }: TodoListItemProps) => <li id={id}>{description}</li>;

const TodoList = ({ children }: any) => <ul>{children}</ul>;

const App = () => {
  // const [todos, { map, rm, add }] = dataAndDOMHandlers([])
  const todos = [
    { id: '1', description: 'todo 1' },
    { id: '2', description: 'todo 2' },
    { id: '3', description: 'todo 3' },
  ];

  const todoList = (
    <TodoList>
      {todos.map(({ id, description }) => (
        <TodoListItem id={id} description={description} />
      ))}
    </TodoList>
  );

  const btnAddTodo = <button type="button">Add todo</button>;
  btnAddTodo.addEventListener('click', () => {
    const todosLength = todos.length + 1;
    todos.push({ id: String(todosLength), description: `todo ${todosLength}` });

    const { id, description } = todos[todos.length - 1];
    todoList.appendChild(<TodoListItem id={id} description={description} />);
  });

  const btnRemoveTodo = h('button', { type: 'button' }, 'Remove todo');
  btnRemoveTodo.addEventListener('click', () => {
    todos.pop();
    todoList.removeChild(todoList.childNodes.item(todoList.childNodes.length - 1));
  });

  return (
    <main>
      Hello!
      {btnAddTodo}
      {btnRemoveTodo}
      {todoList}
    </main>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('root')!.append(<App />);
});
