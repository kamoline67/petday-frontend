import React from 'react';
import { styles } from '../styles/globalstyles';

const Loading = ({ mensagem = "Carregando..." }) => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666'
        }}>
            {mensagem}
        </div>
    );
};

export default Loading;