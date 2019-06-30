import React from 'react';
import { APP_NAME } from '../../utils';

export default function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{APP_NAME}</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
}
