import React, { useState } from 'react';
import api from '../services/api';
import { salvarUsuario } from '../utils/auth';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';

const Cadastro = ({ onRegisterSuccess, onBackToLogin, onNavigateToHome, onLogout, onNavigateTo }) => {
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

        if (formData.senha.length < 6) {
            setMensagem('A senha deve ter pelo menos 6 caracteres.');
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
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom max-w-2xl">
                    {/* Botão Voltar */}
                    <button 
                        onClick={onNavigateToHome}
                        className="flex items-center space-x-3 text-secondary-600 hover:text-secondary-800 mb-8 transition-all duration-300 group"
                    >
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span className="text-lg font-semibold">Voltar para página inicial</span>
                    </button>

                    {/* Card de Cadastro */}
                    <Card padding="xl">
                        {/* Logo e Título */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-2xl">
                                🐾
                            </div>
                            <h1 className="text-3xl font-display font-black text-secondary-500 mb-2">
                                Criar Minha Conta
                            </h1>
                            <p className="text-neutral-600 text-lg">
                                Junte-se ao PetDay e cuide do seu pet com praticidade
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Nome Completo"
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Seu nome completo"
                                    required
                                />

                                <Input
                                    label="Telefone"
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                    required
                                />
                            </div>

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Senha"
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                />

                                <Input
                                    label="Confirmar Senha"
                                    type="password"
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    placeholder="Digite novamente"
                                    required
                                />
                            </div>

                            <Button 
                                type="submit"
                                disabled={carregando}
                                loading={carregando}
                                className="w-full"
                            >
                                Criar Minha Conta
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-700 text-lg mb-4">
                                Já tem uma conta?
                            </p>
                            <Button 
                                variant="outline"
                                onClick={onBackToLogin}
                                className="w-full"
                            >
                                Fazer Login
                            </Button>
                        </div>

                        {mensagem && (
                            <div className={`mt-6 p-4 rounded-2xl text-lg font-semibold ${
                                mensagem.includes('Erro') 
                                    ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                    : 'bg-green-50 text-green-700 border-2 border-green-200'
                            }`}>
                                {mensagem}
                            </div>
                        )}

                        {/* Benefícios do Cadastro */}
                        <div className="mt-8 pt-8 border-t border-neutral-200">
                            <h3 className="text-lg font-semibold text-secondary-500 mb-4 text-center">
                                🎁 Benefícios de se cadastrar
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-primary-50 rounded-2xl">
                                    <div className="text-primary-500 text-lg mb-1">📅</div>
                                    <div className="text-sm font-medium text-secondary-500">Agendamento Rápido</div>
                                </div>
                                <div className="p-3 bg-primary-50 rounded-2xl">
                                    <div className="text-primary-500 text-lg mb-1">🐕</div>
                                    <div className="text-sm font-medium text-secondary-500">Perfil do Pet</div>
                                </div>
                                <div className="p-3 bg-primary-50 rounded-2xl">
                                    <div className="text-primary-500 text-lg mb-1">⭐</div>
                                    <div className="text-sm font-medium text-secondary-500">Histórico Salvo</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cadastro;