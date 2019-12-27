import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FromElements/Input/Input';
import Button from '../../shared/components/FromElements/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { StyledDiv, StyledForm } from './Auth.styles';
import './Auth.scss';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // initial state
  const [formState, inputHandler, setFromData] = useForm(
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

  const switchModeHandler = () => {
    const { inputs } = formState;
    const beforeEnterToLoginMode = !isLoginMode;
    const beforeEnterToRegisterMode = isLoginMode;
    if (beforeEnterToLoginMode) {
      const isLoginModeValid = inputs.email.isValid && inputs.password.isValid;
      setFromData({ ...inputs, name: undefined }, isLoginModeValid);
    }
    if (beforeEnterToRegisterMode) {
      setFromData({ ...inputs, name: { value: '', isValue: false } }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log('[SUBMIT AUTH]', formState.inputs);
    login();
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <StyledForm onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
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
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </StyledForm>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
