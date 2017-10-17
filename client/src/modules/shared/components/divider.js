import React from 'react';
import glamorous from 'glamorous';
import {gradients} from 'modules/shared/helpers/colors';

const Container = glamorous.div({
  height: 2,
  width: '100%',
  maxWidth: 300,
  backgroundImage: gradients.divider,
  margin: '1rem auto',
});

const Divider = props => {
  return <Container />;
};

export default Divider;
