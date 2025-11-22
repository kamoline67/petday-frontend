import React, { useState } from 'react';

const Logo = ({ 
  variant = 'default', 
  size = 'md', 
  className = '',
  onClick 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const getLogoSource = () => {
    if (imageError) {
      return null; // Não tenta carregar novamente se deu erro
    }
    
    switch (variant) {
      case 'white':
        return '/logo-white.png';
      case 'icon':
        return '/logo-icon.png';
      default:
        return '/logo.png';
    }
  };

  const handleImageError = () => {
    console.error(`Logo não encontrada: ${getLogoSource()}`);
    setImageError(true);
  };

  const logoSource = getLogoSource();

  return (
    <div 
      className={`flex items-center justify-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {logoSource ? (
        <img 
          src={logoSource} 
          alt="PetDay Logo" 
          className={`${sizes[size]} object-contain`}
          onError={handleImageError}
        />
      ) : (
        // Fallback visual se a logo não carregar
        <div className={`${sizes[size]} bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xs`}>
          PD
        </div>
      )}
    </div>
  );
};

export default Logo;