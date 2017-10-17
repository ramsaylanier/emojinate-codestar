import React from 'react';
import {PropTypes} from 'prop-types';

const Icon = ({height = 24, width = 24, fill = '#fff', children}) => {
  return (
    <svg fill={fill} height={height} viewBox="0 0 24 24" width={width}>
      {children}
    </svg>
  );
};

Icon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  fill: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Icon;
