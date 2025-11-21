import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'lg',
    disabled = false,
    loading = false,
    className = '',
    ...props 
}) => {
  const baseClasses = 'rounded-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-4';
  
  const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        ghost: 'text-primary-500 hover:bg-primary-50 px-6 py-3 rounded-xl font-semibold',
  };
  
  const sizes = {
        sm: 'px-4 py-2 text-base rounded-xl',
        md: 'px-6 py-3 text-lg rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-2xl',
        xl: 'px-10 py-5 text-xl rounded-2xl',
  };
  
  const classes = `
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed transform-none' : 'hover:scale-105'}
        ${className}
  `.trim();
  
  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Carregando...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;