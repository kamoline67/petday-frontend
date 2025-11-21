import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/header';
import Loading from '../components/loading';

const PetshopDetalhes = ({ usuario, onLogout, onNavegarPara, dados }) => {
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
        onNavegarPara('agendamento', { 
            empresa_id: empresa.empresa_id,
            servicosSelecionados,
            empresa_nome: empresa.nome
        });
    };

    if (carregando) {
        return <Loading mensagem="Carregando serviços..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo={empresa.nome} 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            <div style={styles.card}>
                <h2>{empresa.nome}</h2>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    {empresa.telefone}
                </p>
            </div>

            <div style={styles.card}>
                <h3 style={{ marginBottom: '20px' }}>Serviços Disponíveis</h3>
                
                {servicos.length === 0 ? (
                    <p style={styles.textoCentro}>Nenhum serviço disponível.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {servicos.map(servico => (
                            <div
                                key={servico.servico_id}
                                onClick={() => toggleServico(servico.servico_id)}
                                style={{
                                    padding: '15px',
                                    border: `2px solid ${servicosSelecionados.includes(servico.servico_id) ? '#007bff' : '#e0e0e0'}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: servicosSelecionados.includes(servico.servico_id) ? '#f0f8ff' : 'white',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                                            {servico.tipo}
                                        </h4>
                                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                                            {servico.descricao}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: '#007bff', fontSize: '18px' }}>
                                            R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                                        </div>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            color: servicosSelecionados.includes(servico.servico_id) ? '#007bff' : '#666',
                                            marginTop: '5px'
                                        }}>
                                            {servicosSelecionados.includes(servico.servico_id) ? '✓ Selecionado' : 'Clique para selecionar'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {servicosSelecionados.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    padding: '15px 20px',
                    borderTop: '1px solid #e0e0e0',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ 
                        maxWidth: '800px', 
                        margin: '0 auto',
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                R$ {calcularTotal().toFixed(2)}
                            </div>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                                {servicosSelecionados.length} serviço(s) selecionado(s)
                            </div>
                        </div>
                        <button 
                            onClick={agendar}
                            style={{
                                ...styles.botaoPrimario,
                                width: 'auto',
                                padding: '12px 30px',
                                fontSize: '16px'
                            }}
                        >
                            Agendar Agora →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetshopDetalhes;