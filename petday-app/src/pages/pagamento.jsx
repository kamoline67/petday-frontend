import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/header';
import Loading from '../components/loading';

const Pagamento = ({ usuario, onLogout }) => {
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [mensagem, setMensagem] = useState('');
    
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
            
            const agendamentosFinalizados = (agendamentosResponse.data.agendamento || [])
                .filter(ag => ag.status === 'Finalizado');
            
            setAgendamentosPendentes(agendamentosFinalizados);
            
        } catch (error) {
            setMensagem('Erro ao carregar dados');
        } finally {
            setCarregandoDados(false);
        }
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
            setNovoPagamento({
                agendamento_id: '',
                forma_pagamento: 'Pix',
                valor: ''
            });
            
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

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const getStatusColor = (status) => {
        return status === 'Pago' ? '#28a745' : '#dc3545';
    };

    if (carregandoDados) {
        return <Loading mensagem="Carregando dados de pagamento..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo="Pagamentos" 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            {agendamentosPendentes.length > 0 && (
                <div style={styles.card}>
                    <h3>Registrar Pagamento</h3>
                    <form onSubmit={criarPagamento}>
                        <div style={styles.formLinha}>
                            <div style={styles.inputGroup}>
                                <label>Agendamento:</label>
                                <select
                                    value={novoPagamento.agendamento_id}
                                    onChange={(e) => setNovoPagamento({...novoPagamento, agendamento_id: e.target.value})}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Selecione um agendamento</option>
                                    {agendamentosPendentes.map(agendamento => (
                                        <option key={agendamento.agendamento_id} value={agendamento.agendamento_id}>
                                            {formatarData(agendamento.data_hora)} - {agendamento.pet?.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Forma de Pagamento:</label>
                                <select
                                    value={novoPagamento.forma_pagamento}
                                    onChange={(e) => setNovoPagamento({...novoPagamento, forma_pagamento: e.target.value})}
                                    style={styles.input}
                                    required
                                >
                                    <option value="Pix">Pix</option>
                                    <option value="Cartão">Cartão</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Boleto">Boleto</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Valor:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={novoPagamento.valor}
                                onChange={(e) => setNovoPagamento({...novoPagamento, valor: e.target.value})}
                                style={styles.input}
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={carregando}
                            style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}
                        >
                            {carregando ? 'Registrando...' : 'Registrar Pagamento'}
                        </button>
                    </form>
                </div>
            )}

            <div style={styles.card}>
                <h3>Histórico de Pagamentos</h3>
                
                {pagamentos.length === 0 ? (
                    <p style={styles.textoCentro}>Nenhum pagamento encontrado.</p>
                ) : (
                    pagamentos.map(pagamento => (
                        <div key={pagamento.pagamento_id} style={{
                            ...styles.cardPet,
                            borderLeft: `4px solid ${getStatusColor(pagamento.status)}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={styles.nomePet}>
                                        {formatarData(pagamento.createdAt)}
                                    </h4>
                                    <p><strong>Agendamento:</strong> {formatarData(pagamento.agendamento?.data_hora)}</p>
                                    <p><strong>Valor:</strong> {formatarMoeda(pagamento.valor)}</p>
                                    <p><strong>Forma de Pagamento:</strong> {pagamento.forma_pagamento}</p>
                                    <p><strong>Status:</strong> 
                                        <span style={{ color: getStatusColor(pagamento.status), marginLeft: '5px' }}>
                                            {pagamento.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Pagamento;