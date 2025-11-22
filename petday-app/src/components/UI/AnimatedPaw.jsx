import React from 'react';

const AnimatedPaw = ({ isOpen = false, className = '', size = 'md' }) => {

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-30 h-20'
  };

  return (
    <div className={`relative ${className}`}>

      <div className={`
        relative transition-all duration-500 ease-in-out
        ${sizes[size]}
        ${isOpen ? 'rotate-90 translate-x-2' : 'rotate-0'}
        group-hover:scale-110
      `}>
        

        <img 
          src="/paw.png"
          alt="Menu"
          className="w-full h-full object-contain drop-shadow-lg transition-all duration-300"
          onError={(e) => {

            console.error('Imagem da patinha não encontrada: /paw.png');
            e.target.style.display = 'none';
          }}
        />

        <div className={`
          absolute inset-0 rounded-full bg-orange-300 opacity-0
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-20 scale-110' : 'opacity-0 scale-100'}
          -z-10
        `}></div>
      </div>


      <div className={`
        absolute top-1/2 left-10 w-6 h-0.5 bg-orange-400 rounded-full
        transition-all duration-500 ease-in-out
        ${isOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
        transform -translate-y-1/2
      `}></div>

      <div className={`
        absolute inset-0 rounded-full bg-orange-200 opacity-0
        animate-ping transition-opacity duration-1000
        ${isOpen ? 'opacity-20' : 'opacity-0'}
        -z-20
      `}></div>
    </div>
  );
};

export default AnimatedPaw;