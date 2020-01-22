import React from 'react';

import Modal from '../Modal/Modal';
import Button from '../../FromElements/Button/Button';

const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error} // Not falsey(0, null, undefined, etc...)
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
