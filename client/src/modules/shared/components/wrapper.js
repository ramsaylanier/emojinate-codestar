import React from 'react';
import {PropTypes} from 'prop-types';
import glamorous from 'glamorous';

const WrapperWithStyle = glamorous.div({
  width: '95%',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const Wrapper = ({children}) => {
  return (
    <WrapperWithStyle>
      {children}
    </WrapperWithStyle>
  );
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Wrapper;
