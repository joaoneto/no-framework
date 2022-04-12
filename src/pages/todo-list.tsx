import createStore from '@/lib/create-store';
import List, { ListItem } from '@/components/list';

interface TodoListItemProps {
  id: string;
  description: string;
  completed?: boolean;
}

let lastId = 0;
const getId = () => {
  lastId += 1;
  return lastId.toString();
};

const initialState = {
  todos: [
    { id: getId(), description: 'todo 1' },
    { id: getId(), description: 'todo 2' },
    { id: getId(), description: 'todo 3' },
  ],
};

const store = createStore(initialState);

const addTodo = (description: string) => {
  const todo = { id: getId(), description };
  store.set('todos', [...store.get('todos'), todo]);
};

const removeTodo = (id: string) => {
  store.set(
    'todos',
    store.get('todos').filter((todo: TodoListItemProps) => todo.id !== id),
  );
};

const saveTodo = ({ id, description, completed }: Partial<TodoListItemProps>) => {
  const _todos = store.get('todos');
  const todo = _todos.find((_todo: TodoListItemProps) => _todo.id === id);

  if (todo) {
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
  }

  store.set('todos', _todos);
};

const toggleEdit = (todoItem: Element | null) => {
  const descriptionInut = todoItem?.querySelector('[type="text"]') as HTMLInputElement;
  const handlerSaveTodo = (e: KeyboardEvent | FocusEvent) => {
    if (e instanceof FocusEvent || e.key === 'Enter') {
      descriptionInut.nextElementSibling?.removeAttribute('hidden');
      descriptionInut.setAttribute('hidden', '');
      saveTodo({
        id: todoItem?.id,
        description: descriptionInut.value,
      });
    }
  };

  if (descriptionInut) {
    descriptionInut.nextElementSibling?.setAttribute('hidden', '');
    descriptionInut.removeAttribute('hidden');
    descriptionInut.focus();
    descriptionInut.addEventListener('blur', handlerSaveTodo);
    descriptionInut.addEventListener('keydown', handlerSaveTodo);
  }
};

const TodoListItem = ({ id, description, completed }: TodoListItemProps) => (
  <ListItem id={id} flex-content-between todo-item success={completed}>
    <span style={{ flex: '0 0 30px' }}>
      <input type="checkbox" ev-handler="toggle-complete" checked={completed} />
    </span>
    <span style={{ flex: '0 1 100%' }}>
      <input type="text" value={description} hidden />
      <span>{description}</span>
    </span>
    <span style={{ flex: '1 0 auto' }}>
      <button type="button" ev-handler="toggle-edit">
        edit
      </button>
      <button type="button" ev-handler="remove">
        remove
      </button>
    </span>
  </ListItem>
);

const init = () => {
  const todoList = document.querySelector('[todo-list]');
  const addTodoButton = document.querySelector('[add-todo]');

  addTodoButton?.addEventListener('click', () => {
    addTodo('New todo');
  });

  todoList?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const event = target?.getAttribute('ev-handler');
    const todoItem = target?.closest('[todo-item]');
    const id = todoItem?.getAttribute('id');

    switch (event) {
      case 'toggle-edit':
        toggleEdit(todoItem);
        break;
      case 'remove':
        if (id) {
          removeTodo(id);
        }
        break;
      case 'toggle-complete':
        if (id) {
          saveTodo({
            id,
            completed: (target as HTMLInputElement).checked,
          });
        }
        break;
      default:
        break;
    }
  });
};

const patch = (todoList: Element, todos: TodoListItemProps[]) => {
  const todoListChildren = todoList.children;
  const todoListChildrenIds = Array.from(todoListChildren).map((child) => child.id);
  const todoListChildrenToRemove = todoListChildrenIds.filter(
    (id: string) => !todos.find((todo) => todo.id === id),
  );

  // remove children from todo list
  todoListChildrenToRemove.forEach((id: string) => {
    const child = todoList.querySelector(`[id="${id}"]`);
    if (child) {
      todoList.removeChild(child);
    }
  });

  todos.forEach((todo: TodoListItemProps) => {
    // add children to todo list
    if (!todoListChildrenIds.includes(todo.id)) {
      const todoListItem = <TodoListItem {...todo} />;
      todoList.appendChild(todoListItem);
    } else {
      // update children in todo list
      const child = todoList.querySelector(`[id="${todo.id}"]`);
      if (child) {
        if (child.hasAttribute('success') && !todo.completed) {
          child.removeAttribute('success');
        } else if (!child.hasAttribute('success') && todo.completed) {
          child.setAttribute('success', '');
        }

        const descriptionText = child.querySelector('[type="text"]')
          ?.nextElementSibling as HTMLSpanElement;
        if (descriptionText) {
          descriptionText.textContent = todo.description;
        }
      }
    }
  });
};

const TodoList = () => {
  const todos = store.get('todos');

  setTimeout(init);

  store.subscribe('todos', (_todos: TodoListItemProps[]) => {
    const list = document.querySelector('[todo-list]');
    if (list) patch(list, _todos);
  });

  return (
    <>
      <button type="button" add-todo>
        Add todo
      </button>
      <List todo-list>
        {todos.map((todo: TodoListItemProps) => (
          <TodoListItem {...todo} />
        ))}
      </List>
    </>
  );
};

export default TodoList;
