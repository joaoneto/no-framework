import '@/lib/create-element';

interface TodoListItemProps {
  id: string;
  description: string;
}

const TodoListItem = ({ id, description }: TodoListItemProps) => <li id={id}>{description}</li>;

const TodoList = () => {
  // const [todos, { map, rm, add }] = dataAndDOMHandlers([])
  const todos = [
    { id: '1', description: 'todo 1' },
    { id: '2', description: 'todo 2' },
    { id: '3', description: 'todo 3' },
  ];

  const todoList = (
    <ul>
      {todos.map(({ id, description }) => (
        <TodoListItem id={id} description={description} />
      ))}
    </ul>
  );

  const btnAddTodo = <button type="button">Add todo</button>;
  btnAddTodo.addEventListener('click', () => {
    const todosLength = todos.length + 1;
    todos.push({ id: String(todosLength), description: `todo ${todosLength}` });

    const { id, description } = todos[todos.length - 1];
    todoList.appendChild(<TodoListItem id={id} description={description} />);
  });

  const btnRemoveTodo = <button type="button">Remove todo</button>;
  btnRemoveTodo.addEventListener('click', () => {
    todos.pop();
    todoList.removeChild(todoList.childNodes.item(todoList.childNodes.length - 1));
  });

  return (
    <>
      {btnAddTodo}
      {btnRemoveTodo}
      {todoList}
    </>
  );
};

export default TodoList;
