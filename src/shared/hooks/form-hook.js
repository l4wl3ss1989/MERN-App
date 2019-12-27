import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  const { inputs } = state;
  const { type, value, inputId, isValid } = action;
  switch (type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const input in inputs) {
        const isUndefinedInput = !inputs[input];
        const isUpdatedInput = input === inputId;
        // If we have one input with false validity the current validity will remain  false.
        if (isUndefinedInput) {
          continue;
        }
        if (isUpdatedInput) {
          formIsValid = formIsValid && isValid;
        } else {
          // Input current validity
          formIsValid = formIsValid && inputs[input].isValid;
        }
      }
      return { ...state, inputs: { ...state.inputs, [inputId]: { value, isValid } }, isValid: formIsValid };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  // https://reactjs.org/docs/hooks-reference.html#usereducer =/= Redux
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  // https://reactjs.org/docs/hooks-reference.html#usecallback
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  // Set formData after fetch
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
