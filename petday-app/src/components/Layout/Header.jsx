import React from 'react';
import { estaLogado, getUsuarioAtual } from '../../utils/auth';
import Button from '../UI/Button';

const Header = ({ onLogout, onNavigateTo }) => {
  const usuario = getUsuarioAtual();

  return (
    <header className="bg-white shadow-2xl border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-6">
          <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => onNavigateTo('home')}
          >
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">🐾</span>
            </div>
            <div>
              <h1 className="text-3xl font-display font-black text-secondary-500">PetDay</h1>
              <p className="text-primary-500 font-semibold text-sm -mt-1">Cuidando com amor</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {estaLogado() ? (
              <>
                <button 
                  onClick={() => onNavigateTo('feed')}
                  className="text-secondary-500 font-semibold text-lg hover:text-primary-500 transition-colors duration-300"
                >
                  Início
                </button>
                <button 
                  onClick={() => onNavigateTo('pets')}
                  className="text-secondary-500 font-semibold text-lg hover:text-primary-500 transition-colors duration-300"
                >
                  Meus Pets
                </button>
                <button 
                  onClick={() => onNavigateTo('agendamento')}
                  className="text-secondary-500 font-semibold text-lg hover:text-primary-500 transition-colors duration-300"
                >
                  Agendamentos
                </button>
                <div className="flex items-center space-x-4">
                  <span className="text-secondary-700 font-medium">Olá, {usuario.nome}!</span>
                  <Button 
                    variant="outline" 
                    size="md"
                    onClick={onLogout}
                  >
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={() => onNavigateTo('login')}
                >
                  Entrar
                </Button>
                <Button 
                  size="md"
                  onClick={() => onNavigateTo('cadastro')}
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;