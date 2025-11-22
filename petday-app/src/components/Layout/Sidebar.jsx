import React from 'react';
import { estaLogado, getUsuarioAtual } from '../../utils/auth';
import Logo from '../UI/Logo';
import AnimatedPaw from '../UI/AnimatedPaw';

const Sidebar = ({ isOpen, onClose, onNavigateTo, onLogout }) => {
  const usuario = getUsuarioAtual();

  const menuItems = [
    { id: 'feed', label: 'Início', icon: '🏠', color: 'text-orange-500' },
    { id: 'pets', label: 'Meus Pets', icon: '🐕', color: 'text-orange-500' },
    { id: 'agendamento', label: 'Agendamentos', icon: '📅', color: 'text-orange-500' },
    { id: 'pagamento', label: 'Pagamentos', icon: '💳', color: 'text-orange-500' },
    { id: 'perfil', label: 'Meu Perfil', icon: '👤', color: 'text-orange-500' },
  ];

  const handleNavigation = (page) => {
    onNavigateTo(page);
    onClose();
  };

  return (
    <>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:bg-opacity-0 lg:pointer-events-none"
          onClick={onClose}
        />
      )}


        <div className={`
            w-80 bg-white shadow-2xl border-r border-orange-200
            flex flex-col h-full
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
        `}>
        

        <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">

              <div className="flex items-center space-x-4">
                
                <AnimatedPaw 
                  isOpen={isOpen}
                  size="md"
                  className="w-10 h-10"
                />
                
                <div 
                  className="cursor-pointer group transform transition-all duration-500 hover:scale-105"
                  onClick={() => handleNavigation('home')}
                >
                  <Logo size="md" />
                </div>
              </div>

            </div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-orange-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>


        <div className="flex-1 overflow-y-auto">
          {estaLogado() ? (
            <>

              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 text-lg font-bold shadow-lg">
                    {usuario.nome?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-lg truncate">
                      {usuario.nome}
                    </h3>
                    <p className="text-orange-100 text-sm truncate">
                      {usuario.email}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full flex items-center space-x-4 p-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all duration-200 group border-2 border-transparent hover:border-orange-200"
                  >
                    <span className={`text-2xl ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </span>
                    <span className="font-display font-semibold text-lg">
                      {item.label}
                    </span>
                    <span className="ml-auto text-orange-300 group-hover:text-orange-500 transition-colors duration-200">
                      →
                    </span>
                  </button>
                ))}
              </nav>


              <div className="p-4 border-t border-orange-100 mt-auto">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-4 p-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group border-2 border-transparent hover:border-red-200"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    🚪
                  </span>
                  <span className="font-display font-semibold text-lg">
                    Sair
                  </span>
                </button>
              </div>
            </>
          ) : (

            <div className="p-6 space-y-4">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 text-2xl mb-4 mx-auto shadow-lg">
                  👤
                </div>
                <h3 className="text-gray-900 font-display font-semibold text-lg mb-2">
                  Acesse sua conta
                </h3>
                <p className="text-gray-600 text-sm">
                  Faça login para acessar todos os recursos
                </p>
              </div>

              <button
                onClick={() => handleNavigation('login')}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-display font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Entrar
              </button>
              
              <button
                onClick={() => handleNavigation('cadastro')}
                className="w-full border-2 border-orange-500 text-orange-500 py-4 rounded-2xl font-display font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-105"
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>


        <div className="p-4 border-t border-orange-100 bg-orange-50">
          <div className="text-center text-orange-600 text-sm">
            <p className="font-display font-semibold">PetDay v1.0</p>
            <p className="text-orange-400 text-xs mt-1">Cuidando com amor ❤️</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;