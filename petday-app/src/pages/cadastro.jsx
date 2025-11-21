import React, { use, useState } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import { salvarUsuario } from '../utils/auth';

const Cadastro = ({ onRegisterSuccess, onBackToLogin}) => {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem('');

        if (formData.senha !== formData.confirmarSenha) {
            setMensagem('As senhas não coincidem.');
            setCarregando(false);
            return;
        }

        try {
            const { confirmarSenha, ...dadosCadastro } = formData;

            const response = await api.post('/clientes', dadosCadastro);

            setMensagem('Cadastro realizado com sucesso!');

            setTimeout(async () => {
                try {
                    const loginResponse = await api.post('/auth/login', {
                        email: formData.email,
                        senha: formData.senha
                    });

                    salvarUsuario(loginResponse.data.token, loginResponse.data.cliente);
                    onRegisterSuccess(loginResponse.data.cliente);
                } catch (loginError) {
                    onBackToLogin();
                }
            }, 1500);

        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao realizar cadastro.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>Criar Conta</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Telefone:</label>
                    <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="(11) 99999-9999"
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Confirmar Senha:</label>
                    <input 
                        type="password"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={carregando}
                    style={carregando ? styles.botaoDesabilitado: styles.botaoPrimario}>
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
            </form>

            <button
                onClick={onBackToLogin}
                style={styles.botaoSecundario}
            >
                Login
            </button>

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}
        </div>
    );
};

export default Cadastro;