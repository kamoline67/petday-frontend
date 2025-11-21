import React, { useState, useEffect } from 'react';
import { styles } from './styles/globalstyles';
import { estaLogado, getUsuarioAtual, removerUsuario, salvarUsuario } from './utils/auth';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Pets from './pages/pets';
import Agendamento from './pages/agendamento';
import Pagamento from './pages/pagamento';
import Perfil from './pages/perfil';
import Feed from './pages/feed';
import PetshopDetalhes from './pages/petshop-detalhes';
import Home from './pages/home';

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
        switch (paginaAtual) {
            case 'home':
                return <Home onNavigateToLogin={() => navegarPara('login')} onNavigateToFeed={() => navegarPara('feed')} />;
            case 'login':
                return <Login onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => navegarPara('cadastro')} />;
            case 'cadastro': 
                return <Cadastro onRegisterSuccess={handleRegisterSuccess} onBackToLogin={() => navegarPara('login')} />;
            case 'feed':
                return <Feed usuario={usuario} onLogout={handleLogout} onNavegarPara={navegarPara} />;
            case 'petshop-detalhes':
                return <PetshopDetalhes usuario={usuario} onLogout={handleLogout} dados={dadosNavegacao} onNavegarPara={navegarPara} />;
            case 'agendamento':
                return <Agendamento usuario={usuario} onLogout={handleLogout} dados={dadosNavegacao} onNavegarPara={navegarPara} />;
            case 'pagamento':
                return <Pagamento usuario={usuario} onLogout={handleLogout} onNavegarPara={navegarPara} />;
            case 'perfil':
                return <Perfil usuario={usuario} onLogout={handleLogout} onUsuarioAtualizado={handleUsuarioAtualizado} onNavegarPara={navegarPara} />;
            case 'pets':
                return <Pets usuario={usuario} onLogout={handleLogout} onNavegarPara={navegarPara} />;
            default:
                return <Home onNavigatoToLogin={() => setPaginaAtual('login')} onNavigateToFeed={() => setPaginaAtual('feed')} />;
        }
    };

    const MenuNavegacao = () => (
        <nav style={styles.navegacao}>
            <button
                onClick={() => navegarPara('feed')}
                style={paginaAtual === 'feed' ? styles.botaoAtivo : styles.botaoNavegacao}>
                    Inicio
            </button>
            <button
                onClick={() => navegarPara('pets')}
                style={paginaAtual === 'pets' ? styles.botaoAtivo : styles.botaoNavegacao}>
                    Pets
            </button>
            <button
                onClick={() => navegarPara('agendamento')}
                style={paginaAtual === 'agendamento' ? styles.botaoAtivo : styles.botaoNavegacao}>
                    Meus Agendamentos
            </button>
            <button
                onClick={() => navegarPara('perfil')}
                style={paginaAtual === 'perfil' ? styles.botaoAtivo : styles.botaoNavegacao}>
                    Perfil
            </button>
        </nav>
    );

    if (carregando) {
        return (
            <div style={styles.app}>
                <div style={styles.container}>
                    <div style={styles.textoCentro}>Carregando...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.app}>
            {renderizarPagina()}
        </div>
    );
}

export default App;