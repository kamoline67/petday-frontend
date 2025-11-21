import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';

const Agendamento = ({ usuario, onLogout, onNavigateTo, dados }) => {
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [mensagem, setMensagem] = useState('');
    
    const [pets, setPets] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    
    const [novoAgendamento, setNovoAgendamento] = useState({
        empresa_id: dados?.empresa_id || '',
        pet_id: '',
        data_hora: '',
        transporte: false,
        servicos: dados?.servicosSelecionados ? dados.servicosSelecionados.map(id => ({ servico_id: id })) : []
    });

    const [agendamentos, setAgendamentos] = useState([]);
    const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

    useEffect(() => {
        carregarDados();
        carregarAgendamentos();
    }, []);

    useEffect(() => {
        if (novoAgendamento.empresa_id) {
            carregarServicos(novoAgendamento.empresa_id);
            const empresa = empresas.find(e => e.empresa_id == novoAgendamento.empresa_id);
            setEmpresaSelecionada(empresa);
        }
    }, [novoAgendamento.empresa_id, empresas]);

    const carregarDados = async () => {
        try {
            const [petsResponse, empresasResponse] = await Promise.all([
                api.get('/pets'),
                api.get('/empresas')
            ]);

            setPets(petsResponse.data.pets || []);
            setEmpresas(empresasResponse.data.empresas || []);

            if (dados?.empresa_id) {
                setNovoAgendamento(prev => ({
                    ...prev,
                    empresa_id: dados.empresa_id,
                    servicos: dados.servicosSelecionados.map(id => ({ servico_id: id }))
                }));
                await carregarServicos(dados.empresa_id);
            }
        } catch (error) {
            setMensagem('Erro ao carregar dados');
        } finally {
            setCarregandoDados(false);
        }
    };

    const carregarServicos = async (empresaId) => {
        try {
            const servicosResponse = await api.get(`/servicos?empresa_id=${empresaId}`);
            setServicos(servicosResponse.data.servicos || []);
        } catch (error) {
            setServicos([]);
            setMensagem('Erro ao carregar serviços da empresa');
        }
    };

    const carregarAgendamentos = async () => {
        try {
            const response = await api.get(`/agendamentos/cliente/${usuario.cliente_id}`);
            setAgendamentos(response.data.agendamento || []);
        } catch (error) {
            setMensagem('Erro ao carregar agendamentos');
        }
    };

    const handleServicoChange = (servicoId, checked) => {
        if (checked) {
            setNovoAgendamento({
                ...novoAgendamento,
                servicos: [...novoAgendamento.servicos, { servico_id: servicoId }]
            });
        } else {
            setNovoAgendamento({
                ...novoAgendamento,
                servicos: novoAgendamento.servicos.filter(s => s.servico_id !== servicoId)
            });
        }
    };

    const calcularTotal = () => {
        return novoAgendamento.servicos.reduce((total, item) => {
            const servico = servicos.find(s => s.servico_id === item.servico_id);
            return total + (servico?.portes?.[0]?.preco_porte || 0);
        }, 0);
    };

    const criarAgendamento = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            if (!novoAgendamento.empresa_id || !novoAgendamento.pet_id || !novoAgendamento.data_hora) {
                setMensagem('Preencha todos os campos obrigatórios');
                return;
            }

            if (novoAgendamento.servicos.length === 0) {
                setMensagem('Selecione pelo menos um serviço');
                return;
            }

            const dadosAgendamento = {
                ...novoAgendamento,
                cliente_id: usuario.cliente_id
            };

            await api.post(`/agendamentos/${novoAgendamento.empresa_id}`, dadosAgendamento);
            
            setMensagem('Agendamento criado com sucesso!');
            setNovoAgendamento({
                empresa_id: '',
                pet_id: '',
                data_hora: '',
                transporte: false,
                servicos: []
            });
            setEmpresaSelecionada(null);
            
            carregarAgendamentos();
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao criar agendamento');
        } finally {
            setCarregando(false);
        }
    };

    const cancelarAgendamento = async (agendamentoId) => {
        if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) return;

        try {
            await api.put(`/agendamentos/${agendamentoId}`, { status: 'Cancelado' });
            setMensagem('Agendamento cancelado com sucesso!');
            carregarAgendamentos();
        } catch (error) {
            setMensagem('Erro ao cancelar agendamento');
        }
    };

    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleString('pt-BR');
    };

    const getStatusColor = (status) => {
        const cores = {
            'Agendado': 'bg-blue-100 text-blue-700 border-blue-200',
            'Confirmado': 'bg-green-100 text-green-700 border-green-200',
            'Em Andamento': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Finalizado': 'bg-neutral-100 text-neutral-700 border-neutral-200',
            'Cancelado': 'bg-red-100 text-red-700 border-red-200'
        };
        return cores[status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
    };

    if (carregandoDados) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando dados..." tamanho="lg" />
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
                            Meus <span className="text-primary-500">Agendamentos</span>
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Agende serviços para seus pets de forma rápida e organizada
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

                    {/* Card de Novo Agendamento */}
                    <Card padding="xl" className="mb-8">
                        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6">
                            {dados?.empresa_nome ? `Agendar em ${dados.empresa_nome}` : 'Novo Agendamento'}
                        </h2>
                        
                        <form onSubmit={criarAgendamento} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Seleção de Pet e Empresa */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                            Selecione o Pet
                                        </label>
                                        <select
                                            value={novoAgendamento.pet_id}
                                            onChange={(e) => setNovoAgendamento({...novoAgendamento, pet_id: e.target.value})}
                                            className="input-primary"
                                            required
                                        >
                                            <option value="">Escolha um pet</option>
                                            {pets.map(pet => (
                                                <option key={pet.pet_id} value={pet.pet_id}>
                                                    {pet.nome} ({pet.especie}) - {pet.porte?.descricao}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                            Selecione o Petshop
                                        </label>
                                        <select
                                            value={novoAgendamento.empresa_id}
                                            onChange={(e) => {
                                                setNovoAgendamento({
                                                    ...novoAgendamento, 
                                                    empresa_id: e.target.value,
                                                    servicos: []
                                                });
                                            }}
                                            className="input-primary"
                                            required
                                        >
                                            <option value="">Escolha um petshop</option>
                                            {empresas.map(empresa => (
                                                <option key={empresa.empresa_id} value={empresa.empresa_id}>
                                                    {empresa.nome} - {empresa.telefone}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <Input
                                        label="Data e Horário"
                                        type="datetime-local"
                                        value={novoAgendamento.data_hora}
                                        onChange={(e) => setNovoAgendamento({...novoAgendamento, data_hora: e.target.value})}
                                        required
                                    />

                                    <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-2xl">
                                        <input
                                            type="checkbox"
                                            id="transporte"
                                            checked={novoAgendamento.transporte}
                                            onChange={(e) => setNovoAgendamento({...novoAgendamento, transporte: e.target.checked})}
                                            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-300"
                                        />
                                        <label htmlFor="transporte" className="text-lg font-semibold text-secondary-500 cursor-pointer">
                                            🚗 Necessita transporte?
                                        </label>
                                    </div>
                                </div>

                                {/* Seleção de Serviços */}
                                <div>
                                    <label className="block text-lg font-semibold text-secondary-500 mb-4">
                                        Serviços Disponíveis
                                    </label>
                                    
                                    {empresaSelecionada ? (
                                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                            {servicos.map(servico => (
                                                <label 
                                                    key={servico.servico_id}
                                                    className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                                                        novoAgendamento.servicos.some(s => s.servico_id === servico.servico_id)
                                                            ? 'border-primary-500 bg-primary-50'
                                                            : 'border-neutral-300 hover:border-primary-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={novoAgendamento.servicos.some(s => s.servico_id === servico.servico_id)}
                                                            onChange={(e) => handleServicoChange(servico.servico_id, e.target.checked)}
                                                            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-300"
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-secondary-500">
                                                                {servico.tipo}
                                                            </div>
                                                            <div className="text-sm text-neutral-600">
                                                                {servico.descricao}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-primary-500 font-bold text-lg">
                                                        R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center p-8 bg-neutral-50 rounded-2xl">
                                            <div className="text-4xl mb-2">🏪</div>
                                            <p className="text-neutral-600">
                                                Selecione um petshop para ver os serviços disponíveis
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Resumo e Ação */}
                            {novoAgendamento.servicos.length > 0 && (
                                <Card className="bg-primary-50 border-primary-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-semibold text-secondary-500">
                                                Total: <span className="text-primary-500 text-xl">R$ {calcularTotal().toFixed(2)}</span>
                                            </div>
                                            <div className="text-neutral-600">
                                                {novoAgendamento.servicos.length} serviço(s) selecionado(s)
                                            </div>
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={carregando}
                                            loading={carregando}
                                        >
                                            Confirmar Agendamento
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </form>
                    </Card>

                    {/* Histórico de Agendamentos */}
                    <Card padding="xl">
                        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6">
                            Meus Agendamentos
                        </h2>
                        
                        {agendamentos.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold text-secondary-500 mb-2">
                                    Nenhum agendamento encontrado
                                </h3>
                                <p className="text-neutral-600">
                                    Você ainda não fez nenhum agendamento. Que tal agendar o primeiro?
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {agendamentos.map(agendamento => (
                                    <Card key={agendamento.agendamento_id} hover padding="lg">
                                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="text-xl font-bold text-secondary-500 mb-1">
                                                            {formatarData(agendamento.data_hora)}
                                                        </h4>
                                                        <p className="text-neutral-600">
                                                            {agendamento.pet?.nome} • {agendamento.endereco_atendimento}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(agendamento.status)}`}>
                                                        {agendamento.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {agendamento.servicos?.map((servico, index) => (
                                                        <span 
                                                            key={index}
                                                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                                                        >
                                                            {servico.tipo}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {agendamento.status === 'Agendado' && (
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => cancelarAgendamento(agendamento.agendamento_id)}
                                                    className="bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Agendamento;