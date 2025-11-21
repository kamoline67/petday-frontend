import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/Header';
import Loading from '../components/Loading';

const Perfil = ({ usuario, onLogout, onUsuarioAtualizado }) => {
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [mensagem, setMensagem] = useState('');
    
    const [dadosPerfil, setDadosPerfil] = useState({
        nome: '',
        telefone: '',
        email: ''
    });
    
    const [endereco, setEndereco] = useState({
        cidade: '',
        rua: '',
        numero: '',
        bairro: '',
        complemento: '',
        estado: '',
        cep: ''
    });

    const [editandoPerfil, setEditandoPerfil] = useState(false);
    const [editandoEndereco, setEditandoEndereco] = useState(false);

    useEffect(() => {
        carregarPerfil();
    }, []);

    const carregarPerfil = async () => {
        try {
            const response = await api.get('/auth/perfil');
            const { cliente, endereco: enderecoCliente } = response.data;
            
            setDadosPerfil({
                nome: cliente.nome || '',
                telefone: cliente.telefone || '',
                email: cliente.email || ''
            });

            if (enderecoCliente) {
                setEndereco(enderecoCliente);
            }
            
        } catch (error) {
            setMensagem('Erro ao carregar perfil');
        } finally {
            setCarregandoDados(false);
        }
    };

    const atualizarPerfil = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            await api.put('/auth/perfil', dadosPerfil);
            
            setMensagem('Perfil atualizado com sucesso!');
            setEditandoPerfil(false);
            
            if (onUsuarioAtualizado) {
                onUsuarioAtualizado({ ...usuario, ...dadosPerfil });
            }
            
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao atualizar perfil');
        } finally {
            setCarregando(false);
        }
    };

    const salvarEndereco = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            await api.put(`/enderecos/cliente/${usuario.cliente_id}`, endereco);
            
            setMensagem('Endereço atualizado com sucesso!');
            setEditandoEndereco(false);
            
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao atualizar endereço');
        } finally {
            setCarregando(false);
        }
    };

    if (carregandoDados) {
        return <Loading mensagem="Carregando perfil..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo="Meu Perfil" 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Informações Pessoais</h3>
                    <button 
                        onClick={() => setEditandoPerfil(!editandoPerfil)}
                        style={styles.botaoSecundario}
                    >
                        {editandoPerfil ? 'Cancelar' : 'Editar'}
                    </button>
                </div>

                {editandoPerfil ? (
                    <form onSubmit={atualizarPerfil}>
                        <div style={styles.formLinha}>
                            <div style={styles.inputGroup}>
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    value={dadosPerfil.nome}
                                    onChange={(e) => setDadosPerfil({...dadosPerfil, nome: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Telefone:</label>
                                <input
                                    type="tel"
                                    value={dadosPerfil.telefone}
                                    onChange={(e) => setDadosPerfil({...dadosPerfil, telefone: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={dadosPerfil.email}
                                style={{...styles.input, backgroundColor: '#f8f9fa'}}
                                disabled
                            />
                            <small style={{ color: '#666' }}>Email não pode ser alterado</small>
                        </div>

                        <button 
                            type="submit" 
                            disabled={carregando}
                            style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}
                        >
                            {carregando ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Nome:</strong> {dadosPerfil.nome}</p>
                        <p><strong>Telefone:</strong> {dadosPerfil.telefone}</p>
                        <p><strong>Email:</strong> {dadosPerfil.email}</p>
                    </div>
                )}
            </div>

            <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3>Endereço</h3>
                    <button 
                        onClick={() => setEditandoEndereco(!editandoEndereco)}
                        style={styles.botaoSecundario}
                    >
                        {editandoEndereco ? 'Cancelar' : endereco.cep ? 'Editar' : 'Adicionar'}
                    </button>
                </div>

                {editandoEndereco ? (
                    <form onSubmit={salvarEndereco}>
                        <div style={styles.formLinha}>
                            <div style={styles.inputGroup}>
                                <label>CEP:</label>
                                <input
                                    type="text"
                                    value={endereco.cep}
                                    onChange={(e) => setEndereco({...endereco, cep: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Estado:</label>
                                <input
                                    type="text"
                                    value={endereco.estado}
                                    onChange={(e) => setEndereco({...endereco, estado: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Cidade:</label>
                            <input
                                type="text"
                                value={endereco.cidade}
                                onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formLinha}>
                            <div style={styles.inputGroup}>
                                <label>Rua:</label>
                                <input
                                    type="text"
                                    value={endereco.rua}
                                    onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Número:</label>
                                <input
                                    type="text"
                                    value={endereco.numero}
                                    onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.formLinha}>
                            <div style={styles.inputGroup}>
                                <label>Bairro:</label>
                                <input
                                    type="text"
                                    value={endereco.bairro}
                                    onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
                                    style={styles.input}
                                    required
                                />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Complemento:</label>
                                <input
                                    type="text"
                                    value={endereco.complemento}
                                    onChange={(e) => setEndereco({...endereco, complemento: e.target.value})}
                                    style={styles.input}
                                    placeholder="Opcional"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={carregando}
                            style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}
                        >
                            {carregando ? 'Salvando...' : 'Salvar Endereço'}
                        </button>
                    </form>
                ) : (
                    endereco.cep ? (
                        <div>
                            <p><strong>CEP:</strong> {endereco.cep}</p>
                            <p><strong>Endereço:</strong> {endereco.rua}, {endereco.numero}</p>
                            <p><strong>Bairro:</strong> {endereco.bairro}</p>
                            <p><strong>Cidade:</strong> {endereco.cidade} - {endereco.estado}</p>
                            {endereco.complemento && <p><strong>Complemento:</strong> {endereco.complemento}</p>}
                        </div>
                    ) : (
                        <p style={styles.textoCentro}>Nenhum endereço cadastrado.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Perfil;