import React from 'react';

function Input({ label, error, className = '', ...rest }) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input className="input-custom" {...rest} />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
}

export default Input; 