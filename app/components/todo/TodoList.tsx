import { Todo as TodoModel } from '../../models/todo/Todo';
import { Todo } from './Todo';

type TodoListProps = {
  todoList: TodoModel[];
  deleteTodo: (id: number) => void
}

export function TodoList(props: TodoListProps) {
  const { todoList, deleteTodo } = props; 

  if (todoList.length < 1) {
    return null;
  }

  return <ul>
    {todoList.map((todo) => {
      return <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
      ></Todo>
    })}
  </ul>;
}
