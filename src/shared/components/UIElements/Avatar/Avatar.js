import React from 'react';

import './Avatar.scss';

const Avatar = ({ className, style, image, alt, width }) => (
  <div className={`avatar ${className}`} style={style}>
    <img src={image} alt={alt} style={{ width: width, height: width }} />
  </div>
);

export default Avatar;
