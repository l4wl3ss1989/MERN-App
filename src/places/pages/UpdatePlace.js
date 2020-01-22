import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FromElements/Input/Input';
import Button from '../../shared/components/FromElements/Button/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceForm.scss';

const UpdatePlace = () => {
  const { placeId } = useParams();
  const { userId, token } = useContext(AuthContext);
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    true
  );
  const { inputs, isValid: formIsValid } = formState;

  // state fetch placeById
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const { place } = await sendRequest(`/places/${placeId}`);
        setLoadedPlace(place);
        const { title, description } = place;
        setFormData(
          {
            title: {
              value: title,
              isValid: true
            },
            description: {
              value: description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      const { title, description } = inputs;
      await sendRequest(
        `/places/${placeId}`,
        'patch',
        {
          title: title.value,
          description: description.value
        },
        { Authorization: `Bearer ${token}` }
      );
      history.push(`/${userId}/places`);
    } catch (err) {}
  };

  if (!loadedPlace)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  const { title, description } = loadedPlace;
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
          initialValue={title}
          initialIsValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={description}
          initialIsValid={true}
        />
        <Button type="submit" disabled={!formIsValid}>
          UPDATE PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
