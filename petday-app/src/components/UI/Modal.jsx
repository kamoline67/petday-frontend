import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className={`bg-white rounded-3xl shadow-2xl w-full ${sizes[size]} animate-scale-in`}>
            <div className="flex justify-between items-center p-6 border-b border-neutral-200">
            <h2 className="text-2xl font-display font-bold text-secondary-500">{title}</h2>
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
            >
                ✕
            </button>
            </div>
            <div className="p-6">
            {children}
            </div>
        </div>
        </div>
    );
};

export default Modal;