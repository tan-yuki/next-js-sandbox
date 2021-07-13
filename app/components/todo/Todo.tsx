import { Todo as TodoModel } from '../../models/todo/Todo';
import { useCallback } from 'react';
import axios from 'axios';

type TodoProps = {
  todo: TodoModel
  deleteTodo: (id: number) => void
}

export function Todo(props: TodoProps) {
  const { todo, deleteTodo } = props
  const { id } = todo

  const handleDelete = useCallback(async () => {
    await axios.post(`/api/deleteTodo`, { id })
    deleteTodo(id)
  }, [id]);

  return <li>
    <span>{todo.text}</span>
    <span>{' '}</span>
    <button onClick={handleDelete}>Delete</button>
  </li>
}
