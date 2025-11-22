import React, { useState } from 'react';
import { estaLogado, getUsuarioAtual } from '../../utils/auth';
import Button from '../UI/Button';
import Logo from '../UI/Logo';

const Header = ({ onLogout, onNavigateTo }) => {
  const usuario = getUsuarioAtual();
  const [MenuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigateTo(page);
    setMenuOpen(false);
  };

  return (
          <header className="relative top-0 left-0 w-full z-50 overflow-visible">
            <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
              <svg viewBox="0 0 1920 430" className="w-full h-full object-cover">
                <path fill="#ff7c1f" d="M0 0h1920v215c-82-6-142 21-276 4-160-20-209-68-355-63-184 7-326 99-565 129C360 332 179 250 0 215V0z"/>
              </svg>
            </div>
            <div 
              className="cursor-pointer group transform transition-all duration-500 hover:scale-105 lg:flex-1"
              onClick={() => onNavigateTo('home')}
            >
              <div className="flex-1 flex justify-center">
                <img 
                  src="/logo.png" 
                  alt="PetDay Logo"
                  className="w-36 md:w-48 drop-shadow-xl"
                />
              </div>
            </div>

              <div className="relative z-20 flex-1 flex items-center space-x-4"> 
                <Button 
                  variant="outline"
                  size="md"
                  onClick={() => handleNavigation('login')} 
                  className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white" 
                >
                  Entrar 
                </Button> 
                <Button 
                  size="md" onClick={() => handleNavigation('cadastro')} 
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Cadastrar
                </Button>
              </div>
      </header>
  );
};

export default Header;
