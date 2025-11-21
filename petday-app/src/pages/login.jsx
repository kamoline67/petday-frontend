import React, { useState } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import { salvarUsuario } from '../utils/auth';

const Login = ({ onLoginSuccess, onNavigateToRegister, onNavigateToHome }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem('');

        try {
            const response = await api.post('/auth/login', {
                email,
                senha
            });

            salvarUsuario(response.data.token, response.data.cliente);
            onLoginSuccess(response.data.cliente);

            setMensagem('Login realizado com sucesso!');
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao fazer login.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>Petday - Login</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Senha:</label>
                    <input 
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={carregando}
                    style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Não tem uma conta?</p>
                <button 
                    onClick={onNavigateToRegister}
                    style={styles.botaoSecundario}
                >
                    Criar Conta
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button 
                    onClick={onNavigateToHome}
                    style={{
                        ...styles.botaoSecundario,
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: '1px solid #ddd'
                    }}
                >
                    Voltar para Página Inicial
                </button>
            </div>

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}
        </div>
    );
};

export default Login;