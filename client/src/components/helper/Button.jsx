import React from 'react';

function Button({ children, onClick, type = 'button', className = '', disabled = false, ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-custom ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button; 