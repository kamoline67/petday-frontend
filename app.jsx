import React, { useState, useEffect } from 'react';
import { styles } from './src/styles/globalstyles';
import { estaLogado, getUsuarioAtual, removerUsuario, salvarUsuario } from './src/utils/auth';
import Login from './src/pages/login';
import Register from './pages/register';
import Pets from './pages/pets';
import Agendamento from './src/pages/agendamento';
import Pagamento from './pages/pagamento';
import Perfil from './src/pages/perfil';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState('pets');

    useEffect(() => {
        if (estaLogado()) {
        setUsuario(getUsuarioAtual());
        }
        setCarregando(false);
    }, []);

    const handleLoginSuccess = (usuarioData) => {
        setUsuario(usuarioData);
        setPaginaAtual('pets');
    };

    const handleRegisterSuccess = (usuarioData) => {
        setUsuario(usuarioData);
        setPaginaAtual('pets');
    };

    const handleLogout = () => {
        removerUsuario();
        setUsuario(null);
        setPaginaAtual('login');
    };

    const handleUsuarioAtualizado = (novosDados) => {
        setUsuario(novosDados);
        const user = getUsuarioAtual();
        salvarUsuario(localStorage.getItem('token'), { ...user, ...novosDados });
    };

    const renderizarPagina = () => {
        switch (paginaAtual) {
        case 'pets':
            return <Pets usuario={usuario} onLogout={handleLogout} />;
        case 'agendamento':
            return <Agendamento usuario={usuario} onLogout={handleLogout} />;
        case 'pagamento':
            return <Pagamento usuario={usuario} onLogout={handleLogout} />;
        case 'perfil':
            return <Perfil usuario={usuario} onLogout={handleLogout} onUsuarioAtualizado={handleUsuarioAtualizado} />;
        default:
            return <Pets usuario={usuario} onLogout={handleLogout} />;
        }
    };

    const MenuNavegacao = () => (
        <nav style={styles.navegacao}>
        <button 
            onClick={() => setPaginaAtual('pets')}
            style={paginaAtual === 'pets' ? styles.botaoAtivo : styles.botaoNavegacao}
        >
            🐾 Pets
        </button>
        <button 
            onClick={() => setPaginaAtual('agendamento')}
            style={paginaAtual === 'agendamento' ? styles.botaoAtivo : styles.botaoNavegacao}
        >
            📅 Agendamentos
        </button>
        <button 
            onClick={() => setPaginaAtual('pagamento')}
            style={paginaAtual === 'pagamento' ? styles.botaoAtivo : styles.botaoNavegacao}
        >
            💳 Pagamentos
        </button>
        <button 
            onClick={() => setPaginaAtual('perfil')}
            style={paginaAtual === 'perfil' ? styles.botaoAtivo : styles.botaoNavegacao}
        >
            👤 Perfil
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
        {usuario ? (
            <>
            <MenuNavegacao />
            {renderizarPagina()}
            </>
        ) : paginaAtual === 'register' ? (
            <Register 
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={() => setPaginaAtual('login')}
            />
        ) : (
            <Login 
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setPaginaAtual('register')}
            />
        )}
        </div>
    );
}

export default App;