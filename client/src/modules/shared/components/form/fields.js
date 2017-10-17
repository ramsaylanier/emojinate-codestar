import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';
import colors, {gradients} from 'modules/shared/helpers/colors';

const FieldWithStyle = glamorous.div(
  {
    position: 'relative',
    display: 'flex',
  },
  ({width}) => ({
    width: width,
  }),
);

const SubmitStyles = {
  borderWidth: 0,
  backgroundColor: 'transparent',
  backgroundImage: gradients.button,
  padding: '.75rem 3rem',
  fontSize: '1.1rem',
  color: 'white',
};

const TextStyles = {
  borderWidth: 2,
  backgroundColor: 'transparent',
  padding: '.5rem',
  color: colors[4].string(),
  '&:focus': {
    backgroundColor: colors[4].string(),
    color: 'white',
  },
};

const InputWithStyle = glamorous.input(
  {
    width: '100%',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    borderStyle: 'solid',
    borderImage: gradients.divider,
    borderImageSlice: 1,
  },
  ({type}) => {
    return type === 'submit' ? SubmitStyles : TextStyles;
  },
);

const TextAreaWithStyle = glamorous.textArea(
  {
    width: '100%',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    borderStyle: 'solid',
    borderImage: gradients.divider,
    borderImageSlice: 1,
  },
  ({type}) => {
    return type === 'submit' ? SubmitStyles : TextStyles;
  },
);

class Field extends Component {
  render() {
    const {
      type,
      width,
      text,
      placeholder,
      value,
      onChange,
      required,
    } = this.props;

    return (
      <FieldWithStyle width={width}>
        <InputWithStyle
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value || ''}
          required={required}>
          {text}
        </InputWithStyle>
      </FieldWithStyle>
    );
  }
}

Field.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

const TextArea = props => {
  const {width, height, value = '', onChange, required} = props;
  return (
    <FieldWithStyle width={width}>
      <TextAreaWithStyle
        height={height}
        width={width}
        onChange={onChange}
        value={value}
        required={required}
      />
    </FieldWithStyle>
  );
};

TextArea.propTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

const FieldControlWithStyle = glamorous.div({
  display: 'flex',
  '&:not(:first-of-type)': {
    marginTop: '1rem',
  },
});

const FieldControl = props => {
  return (
    <FieldControlWithStyle>
      {props.children}
    </FieldControlWithStyle>
  );
};

FieldControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export {Field, TextArea, FieldControl};
