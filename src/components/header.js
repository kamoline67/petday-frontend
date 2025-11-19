import React from 'react';
import { styles } from '../styles/globalstyles';
import { getUsuarioAtual, removerUsuario } from '../utils/auth';

const Header = ({ titulo, onLogout }) => {
    const usuario = getUsuarioAtual();

    return (
        <div style={styles.header}>
        <h1 style={styles.titulo}>{titulo}</h1>
        
        {usuario && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#666' }}>
                Olá, {usuario.nome}!
            </span>
            <button 
                onClick={onLogout}
                style={styles.botaoSecundario}
            >
                Sair
            </button>
            </div>
        )}
        </div>
    );
};

export default Header;