import React from 'react';
import Icon from '../icon';

const ProfileIcon = props => {
  return (
    <Icon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

export default ProfileIcon;