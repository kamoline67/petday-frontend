import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/header';
import Loading from '../components/loading';

const Feed = ({ usuario, onLogout, onNavegarPara }) => {
    const [empresas, setEmpresas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [empresasResponse, servicosResponse] = await Promise.all([
                api.get('/empresas'),
                api.get('/servicos')
            ]);

            setEmpresas(empresasResponse.data.empresas || []);
            setServicos(servicosResponse.data.servicos || []);
        } catch (error) {
            setMensagem('Erro ao carregar dados');
        } finally {
            setCarregando(false);
        }
    };

    const verDetalhesPetshop = (empresa) => {
        onNavegarPara('petshop-detail', { empresa });
    };

    const agendarDireto = (servico, empresa) => {
        onNavegarPara('agendamento', { 
            empresa_id: empresa.empresa_id,
            servicosSelecionados: [servico.servico_id],
            servicoInicial: servico
        });
    };

    const servicosPorEmpresa = empresas.map(empresa => ({
        ...empresa,
        servicos: servicos.filter(servico => servico.empresa_id === empresa.empresa_id)
    })).filter(empresa => empresa.servicos.length > 0);

    const categorias = ['todos', 'banho', 'tosa', 'vacina'];

    if (carregando) {
        return <Loading mensagem="Carregando petshops..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo="Encontre o melhor para seu pet" 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            <div style={{
                ...styles.card,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <h2>Bem-vindo, {usuario?.nome}! 🎉</h2>
                <p>Encontre os melhores serviços para seu pet</p>
            </div>

            <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '10px', padding: '10px 0' }}>
                    {categorias.map(categoria => (
                        <button
                            key={categoria}
                            onClick={() => setCategoriaAtiva(categoria)}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '25px',
                                backgroundColor: categoriaAtiva === categoria ? '#007bff' : '#f8f9fa',
                                color: categoriaAtiva === categoria ? 'white' : '#333',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {categoria === 'todos' ? 'Todos' :
                             categoria === 'banho' ? 'Banho' :
                             categoria === 'tosa' ? 'Tosa' :
                             categoria === 'vacina' ? 'Vacina' : categoria}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {servicosPorEmpresa.length === 0 ? (
                    <div style={styles.card}>
                        <p style={styles.textoCentro}>Nenhum petshop encontrado na sua área.</p>
                    </div>
                ) : (
                    servicosPorEmpresa.map(empresa => (
                        <div key={empresa.empresa_id} style={{
                            ...styles.card,
                            marginBottom: '20px',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ color: '#333', marginBottom: '10px' }}>{empresa.nome}</h3>
                                    <p style={{ color: '#666', marginBottom: '15px' }}>
                                        <span style={{ marginRight: '15px' }}> {empresa.telefone}</span>
                                    </p>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
                                        {empresa.servicos.slice(0, 3).map(servico => (
                                            <span
                                                key={servico.servico_id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    agendarDireto(servico, empresa);
                                                }}
                                                style={{
                                                    padding: '5px 12px',
                                                    backgroundColor: '#e3f2fd',
                                                    color: '#1976d2',
                                                    borderRadius: '15px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    border: '1px solid #bbdefb'
                                                }}
                                            >
                                                {servico.tipo} - R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                                            </span>
                                        ))}
                                        {empresa.servicos.length > 3 && (
                                            <span style={{
                                                padding: '5px 12px',
                                                backgroundColor: '#f5f5f5',
                                                color: '#666',
                                                borderRadius: '15px',
                                                fontSize: '14px'
                                            }}>
                                                +{empresa.servicos.length - 3} mais
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => verDetalhesPetshop(empresa)}
                                    style={{
                                        ...styles.botaoPrimario,
                                        width: 'auto',
                                        padding: '8px 16px',
                                        fontSize: '14px'
                                    }}
                                >
                                    Ver Serviços
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;