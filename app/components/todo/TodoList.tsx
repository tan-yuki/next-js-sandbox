import { Todo } from '../../models/todo/Todo';

type TodoListProps = {
  todoList: Todo[];
}

export function TodoList(props: TodoListProps) {
  const { todoList } = props; 

  if (todoList.length < 1) {
    return null;
  }

  return <ul>
    {todoList.map((todo) => {
      return <li key={todo.id}>{todo.text}</li>
    })}
  </ul>;
}
