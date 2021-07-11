import prisma from '../lib/prisma';
import { GetServerSideProps } from 'next';
import {FormEvent, useCallback, useState} from 'react';
import axios, { AxiosResponse } from 'axios';
import { CreateTodoResponse } from './api/addTodo';

type Todo = {
  id: number
  text: string
}

type TodoPageProps = {
  todoList: Todo[]
}

type AddTodoFormProps = {
  addTodo: (todo: Todo) => void;
}

type TodoListProps = {
  todoList: Todo[];
}

export const getServerSideProps: GetServerSideProps<TodoPageProps> = async () => {
  const todoList = await prisma.todo.findMany()

  return {
    props: { todoList }
  }
}

function TodoList(props: TodoListProps) {
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

function AddTodoForm(props: AddTodoFormProps) {
  const { addTodo } = props;
  const [text, setText] = useState<string>('');

  const handleChangeInputTodo = useCallback((e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }, []);

  const handleSubmitAddingTodo = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`/api/addTodo`, {
      text
    }).then((res: AxiosResponse<CreateTodoResponse>) => {
      const { data } = res;

      addTodo({
        id: data.id,
        text,
      });
    })

  }, [text, addTodo]);

  return <form onSubmit={handleSubmitAddingTodo}>
    TODO: <input onChange={handleChangeInputTodo}  type="text" name="todo" />
  </form>;
}

export default function TodoPage(props: TodoPageProps) {
  const { todoList: initialTodoList } = props;
  const [todoList, setTodoList] = useState<Todo[]>(initialTodoList);

  const addTodo = useCallback((todo) => {
    setTodoList([...todoList, todo]);
  }, [todoList]);

  return <>
    <AddTodoForm addTodo={addTodo} />
    <TodoList todoList={todoList} />
  </>;
}
