import React from 'react';
import glamorous from 'glamorous';

const Button = glamorous.button({
  height: '25px',
  width: '25px',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
});

const IconButton = props => {
  return (
    <Button onClick={props.onClick}>
      {props.icon}
    </Button>
  );
};

export default IconButton;
