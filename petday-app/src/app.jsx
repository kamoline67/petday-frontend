import React, { useState, useEffect } from 'react';
import { estaLogado, getUsuarioAtual, removerUsuario, salvarUsuario } from './utils/auth';

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

    useEffect(() => {

        if (estaLogado()) {
            setUsuario(getUsuarioAtual());
        }
        setCarregando(false);
    }, []);

    const handleLoginSuccess = (usuarioData) => {
        setUsuario(usuarioData);
        setPaginaAtual('feed');
    };

    const handleRegisterSuccess = (usuarioData) => {
        setUsuario(usuarioData);
        setPaginaAtual('feed');
    };

    const handleLogout = () => {
        removerUsuario();
        setUsuario(null);
        setPaginaAtual('home');
        setDadosNavegacao({});
    };

    const handleUsuarioAtualizado = (novosDados) => {
        const usuarioAtualizado = { ...usuario, ...novosDados };
        setUsuario(usuarioAtualizado);
        salvarUsuario(localStorage.getItem('token'), usuarioAtualizado);
    };

    const navegarPara = (pagina, dados = {}) => {
        setPaginaAtual(pagina);
        setDadosNavegacao(dados);
    };

    const renderizarPagina = () => {
        const propsComuns = {
            onLogout: handleLogout,
            onNavigateTo: navegarPara,
        };

        switch (paginaAtual) {
            case 'home':
                return <Home
                    onLogout={handleLogout}
                    onNavigateTo={navegarPara} 
                    onNavigateToLogin={() => navegarPara('login')} 
                    onNavigateToFeed={() => navegarPara('feed')}
                    {...propsComuns}
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
                    usuario={usuario} 
                    dados={dadosNavegacao}
                    {...propsComuns}
                />;
                
            case 'petshop-detalhes':
                return <PetshopDetalhes 
                    usuario={usuario} 
                    dados={dadosNavegacao}
                    {...propsComuns}
                />;
                
            case 'agendamento':
                return <Agendamento 
                    usuario={usuario} 
                    dados={dadosNavegacao}
                    {...propsComuns}
                />;
                
            case 'pagamento':
                return <Pagamento 
                    usuario={usuario} 
                    {...propsComuns}
                />;
                
            case 'perfil':
                return <Perfil 
                    usuario={usuario} 
                    onUsuarioAtualizado={handleUsuarioAtualizado}
                    {...propsComuns}
                />;
                
            case 'pets':
                return <Pets 
                    usuario={usuario} 
                    {...propsComuns}
                />;
                
            default:
                return <Home 
                    onNavigateToLogin={() => navegarPara('login')} 
                    onNavigateToFeed={() => navegarPara('feed')}
                    {...propsComuns}
                />;
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-2xl text-white mb-4 mx-auto animate-pulse">
                        🐾
                    </div>
                    <p className="text-secondary-500 text-lg font-semibold">Carregando PetDay...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            {renderizarPagina()}
        </div>
    );
}

export default App;