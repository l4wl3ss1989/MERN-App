import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FromElements/Input/Input';
import Button from '../../shared/components/FromElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { StyledDiv, StyledForm } from './Auth.styles';
import './Auth.scss';

const Auth = () => {
  // initial state
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log('[SUBMIT AUTH]', formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <StyledForm onSubmit={authSubmitHandler}>
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password (min. 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </StyledForm>
    </Card>
  );
};

export default Auth;
