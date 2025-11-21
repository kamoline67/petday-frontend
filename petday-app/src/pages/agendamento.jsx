import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/header';
import Loading from '../components/loading';

const Agendamento = ({ usuario, onLogout, onNavegarPara, dados }) => {
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

    useEffect(() => {
        carregarDados();
        carregarAgendamentos();
    }, []);

    useEffect(() => {
        if (novoAgendamento.empresa_id) {
            carregarServicos(novoAgendamento.empresa_id);
        }
    }, [novoAgendamento.empresa_id]);

    const carregarDados = async () => {
        try {
            const [petsResponse, empresasResponse] = await Promise.all([
                api.get('/pets'),
                api.get('/empresas')
            ]);

            setPets(petsResponse.data.pets || []);
            setEmpresas(empresasResponse.data.empresas || []);

            if(novoAgendamento.empresa_id) {
                await carregarServicos(novoAgendamento.empresa_id);
            }
        } catch (error) {
            setMensagem('Erro ao carregar dados');
        } finally {
            setCarregandoDados(false);
        }
    };

    const carregarServicos = async (empresaId) => {
        try {
            const servicosResponse = await api.get(`/servicos/empresa/${empresaId}`);
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
                empresa_id: dados?.empresa_id || '',
                pet_id: '',
                data_hora: '',
                transporte: false,
                servicos: dados?.servicosSelecionados ? dados.servicosSelecionados.map(id => ({ servico_id: id })) : []
            });
            
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
        switch (status) {
            case 'Agendado': return '#007bff';
            case 'Confirmado': return '#28a745';
            case 'Em Andamento': return '#ffc107';
            case 'Finalizado': return '#6c757d';
            case 'Cancelado': return '#dc3545';
            default: return '#6c757d';
        }
    };

    if (carregandoDados) {
        return <Loading mensagem="Carregando dados..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo="Agendamentos" 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            {dados?.empresa_id && (
                <div style={styles.alerta}>
                    <div style={styles.card}>
                        <h3>Resumo do Pedido</h3>
                        <p><strong>Petshop:</strong> {dados.empresa_nome}</p>
                        <p><strong>Serviços selecionados:</strong> {
                            servicos
                                .filter(s => dados.servicosSelecionados?.includes(s.servico_id))
                                .map(s => s.tipo)
                                .join(', ')
                        }</p>
                    </div>
                </div>
            )}

            <div style={styles.card}>
                <h3>Preencha os dados do agendamento</h3>
                <form onSubmit={criarAgendamento}>
                    <div style={styles.formLinha}>
                        <div style={styles.inputGroup}>
                            <label>Pet:</label>
                            <select
                                value={novoAgendamento.pet_id}
                                onChange={(e) => setNovoAgendamento({...novoAgendamento, pet_id: e.target.value})}
                                style={styles.input}
                                required
                            >
                                <option value="">Selecione um pet</option>
                                {pets.map(pet => (
                                    <option key={pet.pet_id} value={pet.pet_id}>
                                        {pet.nome} ({pet.especie})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Empresa:</label>
                            <select
                                value={novoAgendamento.empresa_id}
                                onChange={(e) => {
                                    setNovoAgendamento({
                                        ...novoAgendamento, 
                                        empresa_id: e.target.value,
                                        servicos: []
                                    });
                                }}
                                style={styles.input}
                                required
                            >
                                <option value="">Selecione uma empresa</option>
                                {empresas.map(empresa => (
                                    <option key={empresa.empresa_id} value={empresa.empresa_id}>
                                        {empresa.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.formLinha}>
                        <div style={styles.inputGroup}>
                            <label>Data e Hora:</label>
                            <input
                                type="datetime-local"
                                value={novoAgendamento.data_hora}
                                onChange={(e) => setNovoAgendamento({...novoAgendamento, data_hora: e.target.value})}
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={novoAgendamento.transporte}
                                    onChange={(e) => setNovoAgendamento({...novoAgendamento, transporte: e.target.checked})}
                                />
                                Transporte inclusivo
                            </label>
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Serviços:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
                            {servicos.map(servico => (
                                <label key={servico.servico_id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        checked={novoAgendamento.servicos.some(s => s.servico_id === servico.servico_id)}
                                        onChange={(e) => handleServicoChange(servico.servico_id, e.target.checked)}
                                    />
                                    {servico.tipo} - R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={carregando}
                        style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}
                    >
                        {carregando ? 'Agendando...' : 'Agendar'}
                    </button>
                </form>
            </div>

            <div style={styles.card}>
                <h3>Meus Agendamentos</h3>
                
                {agendamentos.length === 0 ? (
                    <p style={styles.textoCentro}>Nenhum agendamento encontrado.</p>
                ) : (
                    agendamentos.map(agendamento => (
                        <div key={agendamento.agendamento_id} style={{
                            ...styles.cardPet,
                            borderLeft: `4px solid ${getStatusColor(agendamento.status)}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={styles.nomePet}>
                                        {formatarData(agendamento.data_hora)}
                                    </h4>
                                    <p><strong>Pet:</strong> {agendamento.pet?.nome}</p>
                                    <p><strong>Status:</strong> 
                                        <span style={{ color: getStatusColor(agendamento.status), marginLeft: '5px' }}>
                                            {agendamento.status}
                                        </span>
                                    </p>
                                    <p><strong>Serviços:</strong> 
                                        {agendamento.servicos?.map(s => s.tipo).join(', ')}
                                    </p>
                                    <p><strong>Endereço:</strong> {agendamento.endereco_atendimento}</p>
                                </div>
                                
                                {agendamento.status === 'Agendado' && (
                                    <button 
                                        onClick={() => cancelarAgendamento(agendamento.agendamento_id)}
                                        style={{
                                            ...styles.botaoSecundario,
                                            backgroundColor: '#dc3545'
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Agendamento;