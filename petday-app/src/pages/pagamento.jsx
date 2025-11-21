import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Modal from '../components/UI/Modal';
import PagamentoCard from '../components/Card/PagamentoCard';

const Pagamento = ({ usuario, onLogout, onNavigateTo }) => {
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    
    const [pagamentos, setPagamentos] = useState([]);
    const [agendamentosPendentes, setAgendamentosPendentes] = useState([]);
    
    const [novoPagamento, setNovoPagamento] = useState({
        agendamento_id: '',
        forma_pagamento: 'Pix',
        valor: ''
    });

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [pagamentosResponse, agendamentosResponse] = await Promise.all([
                api.get('/pagamentos'),
                api.get(`/agendamentos/cliente/${usuario.cliente_id}`)
            ]);

            setPagamentos(pagamentosResponse.data.pagamentos || []);
            
            // Filtrar agendamentos finalizados sem pagamento
            const agendamentosFinalizados = (agendamentosResponse.data.agendamento || [])
                .filter(ag => ag.status === 'Finalizado');
            
            setAgendamentosPendentes(agendamentosFinalizados);
            
        } catch (error) {
            setMensagem('Erro ao carregar dados');
        } finally {
            setCarregandoDados(false);
        }
    };

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setNovoPagamento({
            agendamento_id: '',
            forma_pagamento: 'Pix',
            valor: ''
        });
    };

    const criarPagamento = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            if (!novoPagamento.agendamento_id || !novoPagamento.valor) {
                setMensagem('Preencha todos os campos obrigatórios');
                return;
            }

            await api.post('/pagamentos', novoPagamento);
            
            setMensagem('Pagamento registrado com sucesso!');
            fecharModal();
            carregarDados();
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao registrar pagamento');
        } finally {
            setCarregando(false);
        }
    };

    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleString('pt-BR');
    };

    if (carregandoDados) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando dados de pagamento..." tamanho="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom">
                    {/* Header da Página */}
                    <div className="text-center mb-12">
                        <h1 className="text-display display-sm text-secondary-500 mb-4">
                            Meus <span className="text-primary-500">Pagamentos</span>
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Acompanhe e gerencie todos os seus pagamentos de forma simples e organizada
                        </p>
                    </div>

                    {mensagem && (
                        <div className={`mb-8 p-4 rounded-2xl text-lg font-semibold ${
                            mensagem.includes('Erro') 
                                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                : 'bg-green-50 text-green-700 border-2 border-green-200'
                        }`}>
                            {mensagem}
                        </div>
                    )}

                    {/* Card de Ação Rápida */}
                    {agendamentosPendentes.length > 0 && (
                        <Card padding="xl" className="gradient-bg text-white mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        Agendamentos Aguardando Pagamento
                                    </h3>
                                    <p className="text-white/90">
                                        Você tem {agendamentosPendentes.length} agendamento(s) finalizado(s) para registrar o pagamento
                                    </p>
                                </div>
                                <Button 
                                    onClick={abrirModal}
                                    className="bg-white text-primary-500 hover:bg-neutral-100 mt-4 md:mt-0"
                                >
                                    + Registrar Pagamento
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Lista de Pagamentos */}
                    <Card padding="xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display font-bold text-secondary-500">
                                Histórico de Pagamentos
                            </h2>
                            <div className="text-lg text-neutral-600">
                                Total: <span className="font-bold text-primary-500">{pagamentos.length}</span>
                            </div>
                        </div>
                        
                        {pagamentos.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💳</div>
                                <h3 className="text-xl font-semibold text-secondary-500 mb-2">
                                    Nenhum pagamento encontrado
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    {agendamentosPendentes.length > 0 
                                        ? 'Registre seu primeiro pagamento para agendamentos finalizados'
                                        : 'Seus pagamentos aparecerão aqui após o registro'
                                    }
                                </p>
                                {agendamentosPendentes.length > 0 && (
                                    <Button onClick={abrirModal}>
                                        Registrar Primeiro Pagamento
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pagamentos.map(pagamento => (
                                    <PagamentoCard
                                        key={pagamento.pagamento_id}
                                        pagamento={pagamento}
                                    />
                                ))}
                            </div>
                        )}
                    </Card>

                    {/* Estatísticas */}
                    {pagamentos.length > 0 && (
                        <Card padding="xl" className="mt-8">
                            <h3 className="text-xl font-display font-bold text-secondary-500 mb-6 text-center">
                                Resumo Financeiro
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-primary-500 mb-1">
                                        {pagamentos.length}
                                    </div>
                                    <div className="text-neutral-600">Total de Pagamentos</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-500 mb-1">
                                        {pagamentos.filter(p => p.status === 'Pago').length}
                                    </div>
                                    <div className="text-neutral-600">Pagamentos Confirmados</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-500 mb-1">
                                        {pagamentos.filter(p => p.status === 'Pendente').length}
                                    </div>
                                    <div className="text-neutral-600">Pagamentos Pendentes</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-secondary-500 mb-1">
                                        R$ {pagamentos
                                            .filter(p => p.status === 'Pago')
                                            .reduce((total, p) => total + parseFloat(p.valor), 0)
                                            .toFixed(2)}
                                    </div>
                                    <div className="text-neutral-600">Valor Total Pago</div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Modal de Registro de Pagamento */}
            <Modal
                isOpen={modalAberto}
                onClose={fecharModal}
                title="Registrar Novo Pagamento"
                size="md"
            >
                <form onSubmit={criarPagamento} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                            Agendamento
                        </label>
                        <select
                            value={novoPagamento.agendamento_id}
                            onChange={(e) => setNovoPagamento({...novoPagamento, agendamento_id: e.target.value})}
                            className="input-primary"
                            required
                        >
                            <option value="">Selecione um agendamento</option>
                            {agendamentosPendentes.map(agendamento => (
                                <option key={agendamento.agendamento_id} value={agendamento.agendamento_id}>
                                    {formatarData(agendamento.data_hora)} - {agendamento.pet?.nome} 
                                    ({agendamento.servicos?.map(s => s.tipo).join(', ')})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                Forma de Pagamento
                            </label>
                            <select
                                value={novoPagamento.forma_pagamento}
                                onChange={(e) => setNovoPagamento({...novoPagamento, forma_pagamento: e.target.value})}
                                className="input-primary"
                                required
                            >
                                <option value="Pix">📱 Pix</option>
                                <option value="Cartão">💳 Cartão</option>
                                <option value="Dinheiro">💵 Dinheiro</option>
                                <option value="Boleto">📄 Boleto</option>
                            </select>
                        </div>

                        <Input
                            label="Valor (R$)"
                            type="number"
                            step="0.01"
                            value={novoPagamento.valor}
                            onChange={(e) => setNovoPagamento({...novoPagamento, valor: e.target.value})}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button 
                            type="submit" 
                            disabled={carregando}
                            loading={carregando}
                            className="flex-1"
                        >
                            Registrar Pagamento
                        </Button>
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={fecharModal}
                            disabled={carregando}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Modal>

            <Footer />
        </div>
    );
};

export default Pagamento;