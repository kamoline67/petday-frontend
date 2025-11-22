import React from 'react';

const AnimatedPaw = ({ isOpen = false, className = '', size = 'md' }) => {

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    xxl: 'w-32 h-32'
  };

  return (
    <div className={`relative ${className}`} style={{ zIndex: 1001 }}>

      <div className={`
        relative transition-all duration-500 ease-in-out
        ${sizes[size]}
        ${isOpen ? 'translate-x-[100px] scale-110' : 'translate-x-0 scale-100'}
        group-hover:scale-125
      `}>
        
        <img 
          src="/paw.png"
          alt="Menu"
          className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300 paw-image"
          onError={(e) => {
            console.error('Imagem da patinha não encontrada: /paw.png');
            e.target.style.display = 'none';
          }}
        />

        {/* Efeito de glow quando aberto */}
        <div className={`
          absolute inset-0 rounded-full bg-orange-300 opacity-0
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-30 scale-125' : 'opacity-0 scale-100'}
          -z-10 blur-md
        `}></div>
      </div>

      {/* Linha que aparece durante a animação */}
      <div className={`
        absolute top-1/2 left-1/2 w-0 h-1 bg-orange-400 rounded-full
        transition-all duration-500 ease-in-out
        ${isOpen ? 'w-20 opacity-100' : 'w-0 opacity-0'}
        transform -translate-y-1/2 -translate-x-1/2 shadow-lg
      `}></div>

      {/* Efeito de ping quando aberto */}
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