import React from 'react';

const Input = ({ 
    label, 
    error,
    helperText,
    className = '',
    ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-lg font-semibold text-secondary-500">
          {label}
        </label>
      )}
      <input
        className={`input-primary ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''} ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-neutral-600'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;