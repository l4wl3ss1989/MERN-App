import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FromElements/Input/Input';
import Button from '../../shared/components/FromElements/Button/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../shared/components/FromElements/ImageUpload/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { StyledDiv, StyledForm } from './Auth.styles';
import './Auth.scss';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      setFromData({ ...inputs, name: undefined, image: undefined }, isLoginModeValid);
    }
    if (beforeEnterToRegisterMode) {
      setFromData(
        { ...inputs, name: { value: '', isValue: false }, image: { value: null, isValid: false } },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      if (isLoginMode) {
        const { email, password } = formState.inputs;
        const { userId, token } = await sendRequest('/users/login', 'post', {
          email: email.value,
          password: password.value
        });
        login(userId, token);
      } else {
        const { name, email, password, image } = formState.inputs;
        const formData = new FormData(); // FormData acceps binary data
        formData.append('email', email.value);
        formData.append('name', name.value);
        formData.append('password', password.value);
        formData.append('image', image.value);
        const { userId, token } = await sendRequest('/users/signup', 'post', formData);
        login(userId, token);
      }
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <StyledForm onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <React.Fragment>
              <Input
                id="name"
                element="input"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <ImageUpload
                id="image"
                center
                errorText="Please enter an image."
                onInput={inputHandler}
              />
            </React.Fragment>
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (min. 6 characters)."
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
    </React.Fragment>
  );
};

export default Auth;
