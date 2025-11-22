import React, { useState, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { estaLogado, getUsuarioAtual, removerUsuario, salvarUsuario } from './utils/auth';

import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Feed from './pages/feed';
import Pets from './pages/pets';
import Agendamento from './pages/agendamento';
import Perfil from './pages/perfil';
import Pagamento from './pages/pagamento';
import PetshopDetalhes from './pages/petshop-detalhes';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState('home');
    const [dadosNavegacao, setDadosNavegacao] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        console.log('App - Verificando autenticação...');
        if (estaLogado()) {
            const user = getUsuarioAtual();
            console.log('Usuário logado:', user);
            setUsuario(user);
        } else {
            console.log('Nenhum usuário logado');
        }
        setCarregando(false);
    }, []);

    const handleLoginSuccess = (usuarioData) => {
        console.log('Login realizado com sucesso:', usuarioData);
        setUsuario(usuarioData);
        setPaginaAtual('feed');
        setSidebarOpen(false);
    };

    const handleRegisterSuccess = (usuarioData) => {
        console.log('Cadastro realizado com sucesso:', usuarioData);
        setUsuario(usuarioData);
        setPaginaAtual('feed');
        setSidebarOpen(false);
    };

    const handleLogout = () => {
        console.log('Usuário deslogado');
        removerUsuario();
        setUsuario(null);
        setPaginaAtual('home');
        setSidebarOpen(false);
    };

    const handleUsuarioAtualizado = (novosDados) => {
        const usuarioAtualizado = { ...usuario, ...novosDados };
        setUsuario(usuarioAtualizado);
        salvarUsuario(localStorage.getItem('token'), usuarioAtualizado);
    };

    const navegarPara = (pagina, dados = {}) => {
        console.log('Navegando para:', pagina, dados);
        setPaginaAtual(pagina);
        setDadosNavegacao(dados);
        setSidebarOpen(false);
    };

    const toggleSidebar = () => {
        console.log('Toggle sidebar - Estado atual:', sidebarOpen);
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        console.log('Fechando sidebar');
        setSidebarOpen(false);
    };

    const renderizarPagina = () => {
        console.log('Renderizando página:', paginaAtual);

        const propsComuns = {
            usuario,
            onLogout: handleLogout,
            onNavigateTo: navegarPara,
        };

        switch (paginaAtual) {
            case 'home':
                return <Home 
                    {...propsComuns}
                    onNavigateToLogin={() => navegarPara('login')} 
                    onNavigateToFeed={() => navegarPara('feed')}
                />;
                
            case 'login':
                return <Login 
                    onLoginSuccess={handleLoginSuccess} 
                    onNavigateToRegister={() => navegarPara('cadastro')}
                    onNavigateToHome={() => navegarPara('home')}
                    {...propsComuns}
                />;
                
            case 'cadastro': 
                return <Cadastro 
                    onRegisterSuccess={handleRegisterSuccess} 
                    onBackToLogin={() => navegarPara('login')}
                    onNavigateToHome={() => navegarPara('home')}
                    {...propsComuns}
                />;
                
            case 'feed':
                return <Feed 
                    {...propsComuns}
                    dados={dadosNavegacao}
                />;
                
            case 'petshop-detalhes':
                return <PetshopDetalhes 
                    {...propsComuns}
                    dados={dadosNavegacao}
                />;
                
            case 'agendamento':
                return <Agendamento 
                    {...propsComuns}
                    dados={dadosNavegacao}
                />;
                
            case 'pagamento':
                return <Pagamento 
                    {...propsComuns}
                />;
                
            case 'perfil':
                return <Perfil 
                    {...propsComuns}
                    onUsuarioAtualizado={handleUsuarioAtualizado}
                />;
                
            case 'pets':
                return <Pets 
                    {...propsComuns}
                />;
                
            default:
                return <Home 
                    {...propsComuns}
                    onNavigateToLogin={() => navegarPara('login')} 
                    onNavigateToFeed={() => navegarPara('feed')}
                />;
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto animate-pulse">
                        🐾
                    </div>
                    <p className="text-dark-700 text-lg font-semibold">Carregando PetDay...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="App min-h-screen bg-neutral-50 flex">
            {/* Sidebar */}
            <div className={`
                ${sidebarOpen ? 'sidebar-mobile open' : 'sidebar-mobile'}
                lg:sidebar-desktop
            `}>
                <Sidebar 
                    isOpen={sidebarOpen}
                    onClose={closeSidebar}
                    onNavigateTo={navegarPara}
                    onLogout={handleLogout}
                />
            </div>

            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* SimpleBar ENVOLVENDO TUDO (incluindo header) */}
            <SimpleBar 
                className="flex-1 custom-scrollbar"
                style={{ 
                    height: '100vh',
                    position: 'relative'
                }}
                autoHide={false}
            >
                <div className="flex top-0 z-1000 bg-white">
                    <Header 
                        sidebarOpen={sidebarOpen}
                        onToggleSidebar={toggleSidebar}
                        onLogout={handleLogout}
                        onNavigateTo={navegarPara}
                    />
                </div>
                
                {/* Conteúdo principal */}
                <main className="bg-white min-h-full">
                    {renderizarPagina()}
                </main>
            </SimpleBar>
        </div>
    );
}

export default App;