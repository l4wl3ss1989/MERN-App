import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../util/validators';
import './Input.scss';

const inputReducer = (state, action) => {
  const { type, val, validators } = action;
  switch (type) {
    case 'CHANGE':
      return { ...state, value: val, isValid: validate(val, validators) };
    case 'TOUCH':
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  element,
  type,
  initialValue,
  initialIsValid,
  onInput,
  errorText,
  validators,
  placeHolder,
  rows
}) => {
  // https://reactjs.org/docs/hooks-reference.html#usereducer =/= Redux
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialIsValid || false,
    isTouched: false
  });
  const { value, isValid, isTouched } = inputState;
  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({ type: 'CHANGE', val: event.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const selectedElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeHolder}
        onChange={changeHandler}
        value={value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea id={id} rows={rows || 3} onChange={changeHandler} onBlur={touchHandler} value={value} />
    );

  const isInvalidAndTouched = !isValid && isTouched;

  return (
    <div className={`form-control ${isInvalidAndTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {selectedElement}
      {isInvalidAndTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
