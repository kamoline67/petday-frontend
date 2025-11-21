import React, { useState } from 'react';
import api from '../services/api';
import { salvarUsuario } from '../utils/auth';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const Login = ({ onLoginSuccess, onNavigateToRegister, onNavigateToHome, onLogout, onNavigateTo }) => {
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
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom max-w-md mx-auto">
                    {/* Botão Voltar */}
                    <button 
                        onClick={onNavigateToHome}
                        className="flex items-center space-x-3 text-secondary-600 hover:text-secondary-800 mb-8 transition-all duration-300 group"
                    >
                        <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span className="text-lg font-semibold">Voltar para página inicial</span>
                    </button>

                    {/* Card de Login */}
                    <Card padding="xl" className="text-center">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-2xl">
                                🐾
                            </div>
                            <h1 className="text-3xl font-display font-black text-secondary-500 mb-2">
                                Bem-vindo de volta!
                            </h1>
                            <p className="text-neutral-700 text-lg">
                                Entre na sua conta PetDay
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                            />

                            <Input
                                label="Senha"
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Sua senha"
                                required
                            />

                            <Button 
                                type="submit" 
                                disabled={carregando} 
                                loading={carregando}
                                className="w-full"
                            >
                                Entrar na minha conta
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-700 text-lg mb-4">Não tem uma conta?</p>
                            <Button 
                                variant="outline"
                                onClick={onNavigateToRegister}
                                className="w-full"
                            >
                                Criar conta gratuita
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
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;