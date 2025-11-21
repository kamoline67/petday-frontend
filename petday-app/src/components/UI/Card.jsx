import React from 'react';

const Card = ({ 
    children, 
    hover = false,
    padding = 'lg',
    className = '',
    ...props 
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };
    
    const classes = `
        ${hover ? 'card-hover' : 'card'}
        ${paddingClasses[padding]}
        ${className}
    `.trim();
    
    return (
        <div className={classes} {...props}>
        {children}
        </div>
    );
};

export default Card;