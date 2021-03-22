import { useState } from 'react';

const useTodoForm = () => {
  const [todoValue, setTodoValue] = useState('');

  const onChangeTodoInput = (e) => setTodoValue(e.target.value);

  return {
    todoValue,
    onChangeTodoInput,
  };
};

export default useTodoForm;
