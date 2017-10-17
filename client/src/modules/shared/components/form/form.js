import React from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';

const FormWithStyle = glamorous.form({
  display: 'flex',
});

const Form = props => {
  return (
    <FormWithStyle>
      {props.children}
    </FormWithStyle>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Form;
