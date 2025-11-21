import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ServicoCard from '../components/Card/ServicoCard';

const PetshopDetalhes = ({ usuario, onLogout, onNavigateTo, dados }) => {
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [servicosSelecionados, setServicosSelecionados] = useState([]);

    const empresa = dados.empresa;

    useEffect(() => {
        if (empresa) {
            carregarServicos();
        }
    }, [empresa]);

    const carregarServicos = async () => {
        try {
            const response = await api.get(`/servicos?empresa_id=${empresa.empresa_id}`);
            setServicos(response.data.servicos || []);
        } catch (error) {
            setMensagem('Erro ao carregar serviços');
        } finally {
            setCarregando(false);
        }
    };

    const toggleServico = (servicoId) => {
        setServicosSelecionados(prev => 
            prev.includes(servicoId) 
                ? prev.filter(id => id !== servicoId)
                : [...prev, servicoId]
        );
    };

    const calcularTotal = () => {
        return servicosSelecionados.reduce((total, servicoId) => {
            const servico = servicos.find(s => s.servico_id === servicoId);
            return total + (servico?.portes?.[0]?.preco_porte || 0);
        }, 0);
    };

    const agendar = () => {
        onNavigateTo('agendamento', { 
            empresa_id: empresa.empresa_id,
            servicosSelecionados,
            empresa_nome: empresa.nome
        });
    };

    const getServicosSelecionadosNomes = () => {
        return servicosSelecionados.map(id => {
            const servico = servicos.find(s => s.servico_id === id);
            return servico?.tipo;
        }).filter(Boolean);
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando serviços..." tamanho="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom max-w-4xl">
                    {/* Header do Petshop */}
                    <Card padding="xl" className="gradient-bg text-white mb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                                    🏪
                                </div>
                                <div>
                                    <h1 className="text-3xl font-display font-bold mb-1">
                                        {empresa.nome}
                                    </h1>
                                    <p className="text-white/90">
                                        📞 {empresa.telefone}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <div className="text-2xl font-bold mb-1">
                                    {servicos.length} serviços
                                </div>
                                <div className="text-white/80">
                                    disponíveis
                                </div>
                            </div>
                        </div>
                    </Card>

                    {mensagem && (
                        <div className={`mb-8 p-4 rounded-2xl text-lg font-semibold ${
                            mensagem.includes('Erro') 
                                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                : 'bg-green-50 text-green-700 border-2 border-green-200'
                        }`}>
                            {mensagem}
                        </div>
                    )}

                    {/* Lista de Serviços */}
                    <Card padding="xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display font-bold text-secondary-500">
                                Serviços Disponíveis
                            </h2>
                            <div className="text-lg text-neutral-600">
                                <span className="font-bold text-primary-500">{servicosSelecionados.length}</span> selecionados
                            </div>
                        </div>
                        
                        {servicos.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔧</div>
                                <h3 className="text-xl font-semibold text-secondary-500 mb-2">
                                    Nenhum serviço disponível
                                </h3>
                                <p className="text-neutral-600">
                                    Este petshop ainda não cadastrou serviços no momento
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {servicos.map(servico => (
                                    <ServicoCard
                                        key={servico.servico_id}
                                        servico={servico}
                                        selecionado={servicosSelecionados.includes(servico.servico_id)}
                                        onToggle={toggleServico}
                                    />
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Informações Adicionais */}
                    <Card padding="xl" className="mt-8">
                        <h3 className="text-xl font-display font-bold text-secondary-500 mb-4">
                            💡 Sobre este estabelecimento
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                                        ⏰
                                    </div>
                                    <div>
                                        <div className="font-semibold text-secondary-500">Horário de Funcionamento</div>
                                        <div className="text-neutral-600">Segunda a Sábado: 8h às 18h</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                                        🚗
                                    </div>
                                    <div>
                                        <div className="font-semibold text-secondary-500">Estacionamento</div>
                                        <div className="text-neutral-600">Disponível para clientes</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                                        📍
                                    </div>
                                    <div>
                                        <div className="font-semibold text-secondary-500">Localização</div>
                                        <div className="text-neutral-600">Zona Central - Próximo ao centro</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-500">
                                        ⭐
                                    </div>
                                    <div>
                                        <div className="font-semibold text-secondary-500">Avaliação</div>
                                        <div className="text-neutral-600">4.8/5 (124 avaliações)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Barra Fixa Inferior para Agendamento */}
            {servicosSelecionados.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-2xl z-40">
                    <div className="container-custom max-w-4xl">
                        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary-500">
                                            R$ {calcularTotal().toFixed(2)}
                                        </div>
                                        <div className="text-sm text-neutral-600">
                                            {servicosSelecionados.length} serviço(s) selecionado(s)
                                        </div>
                                    </div>
                                    <div className="hidden sm:block border-l border-neutral-300 h-8"></div>
                                    <div className="hidden sm:block">
                                        <div className="text-sm font-semibold text-secondary-500 mb-1">
                                            Serviços escolhidos:
                                        </div>
                                        <div className="text-xs text-neutral-600 max-w-md truncate">
                                            {getServicosSelecionadosNomes().join(', ')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                onClick={agendar}
                                size="lg"
                                className="whitespace-nowrap"
                            >
                                Agendar Agora →
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default PetshopDetalhes;