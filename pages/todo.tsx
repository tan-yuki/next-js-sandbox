import prisma from '../lib/prisma';
import { GetServerSideProps } from 'next';
import React, {FormEvent, useCallback, useState} from 'react';
import { Todo } from '../app/models/todo/Todo';
import { AddTodoForm } from '../app/components/todo/AddTodoForm';
import { TodoList } from '../app/components/todo/TodoList';

type TodoPageProps = {
  todoList: Todo[]
}

export const getServerSideProps: GetServerSideProps<TodoPageProps> = async () => {
  const todoList = await prisma.todo.findMany()

  return {
    props: { todoList }
  }
}

export default function TodoPage(props: TodoPageProps) {
  const { todoList: initialTodoList } = props;
  const [todoList, setTodoList] = useState<Todo[]>(initialTodoList);

  const addTodo = useCallback((todo) => {
    setTodoList((todoList) => [...todoList, todo]);
  }, [todoList]);

  const deleteTodo = useCallback((id) => {
    setTodoList((todoList) => {
      return todoList.filter((todo) => todo.id !== id)
    });
  }, [todoList]);

  return <>
    <AddTodoForm addTodo={addTodo} />
    <TodoList todoList={todoList} deleteTodo={deleteTodo}/>
  </>;
}
