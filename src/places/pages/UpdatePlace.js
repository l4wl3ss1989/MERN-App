import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FromElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FromElements/Button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { PLACES_LIST } from '../../dummy/dummy';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.scss';

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  // initial state
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
  const identifiedPlace = PLACES_LIST.find(place => place.id === placeId);

  // state after fetch
  useEffect(() => {
    if (identifiedPlace) {
      const { title, description } = identifiedPlace;
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
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(inputs);
  };

  if (!identifiedPlace)
    return (
      <div className="center">
        <Card>
          <h2>Could NOT find any place!</h2>
        </Card>
      </div>
    );

  if (isLoading)
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title"
        onInput={inputHandler}
        initialValue={inputs.title.value}
        initialIsValid={inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={inputs.description.value}
        initialIsValid={inputs.description.isValid}
      />
      <Button type="submit" disabled={!formIsValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
