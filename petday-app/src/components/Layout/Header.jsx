import React from 'react';
import { estaLogado, getUsuarioAtual } from '../../utils/auth';
import Button from '../UI/Button';
import AnimatedPaw from '../UI/AnimatedPaw';

const Header = ({ onLogout, onNavigateTo, onToggleSidebar, sidebarOpen }) => {
  const usuario = getUsuarioAtual();

  const handleNavigation = (page) => {
    onNavigateTo(page);
  };

  return (
    <header className="relative top-0 left-0 w-full z-50 overflow-visible bg-transparent">

      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <svg 
          viewBox="0 0 1920 430" 
          className="w-full h-48 md:h-56 object-cover"
          preserveAspectRatio="none"
        >
          <path 
            fill="#ff7c1f" 
            d="M0 0h1920v215c-82-6-142 21-276 4-160-20-209-68-355-63-184 7-326 99-565 129C360 332 179 250 0 215V0z"
          />
        </svg>
      </div>


      <div className="relative z-10 container-custom">
        <div className="flex items-center justify-between py-6">
          

          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="group relative p-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
              aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <AnimatedPaw 
                isOpen={sidebarOpen}
                size="xl"
                className="group"
              />
              

              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-2xl transition-all duration-300 -z-10"></div>
            </button>


            <span className="hidden lg:block text-white font-display font-semibold text-lg">
              {sidebarOpen ? 'Fechar' : 'Menu'}
            </span>
          </div>


          <div 
            className="cursor-pointer group transform transition-all duration-500 hover:scale-105 absolute left-1/2 -translate-x-1/2"
            onClick={() => onNavigateTo('home')}
          >
            <img 
              src="/logo.png" 
              alt="PetDay Logo"
              className="w-36 md:w-48 drop-shadow-2xl"
            />
          </div>


          <div className="flex items-center space-x-3">
            {estaLogado() ? (
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold hidden md:block">
                  Olá, {usuario.nome}
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('login')} 
                  className="border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm" 
                >
                  Entrar 
                </Button> 
                <Button 
                  size="sm" 
                  onClick={() => handleNavigation('cadastro')} 
                  className="bg-white text-orange-600 hover:bg-orange-50 backdrop-blur-sm"
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;