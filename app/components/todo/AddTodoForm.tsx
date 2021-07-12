import axios, { AxiosResponse } from 'axios';
import { FormEvent, useCallback, useState } from 'react';
import { Todo } from '../../../lib/prisma';
import { CreateTodoResponse } from '../../../pages/api/addTodo';

type AddTodoFormProps = {
  addTodo: (todo: Todo) => void;
}

export function AddTodoForm(props: AddTodoFormProps) {
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