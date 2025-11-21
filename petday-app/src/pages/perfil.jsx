import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';

const Perfil = ({ usuario, onLogout, onNavigateTo, onUsuarioAtualizado }) => {
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
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando perfil..." tamanho="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom max-w-4xl">
                    {/* Header do Perfil */}
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center text-3xl text-white mx-auto mb-4 shadow-2xl">
                            👤
                        </div>
                        <h1 className="text-display display-sm text-secondary-500 mb-2">
                            Meu <span className="text-primary-500">Perfil</span>
                        </h1>
                        <p className="text-xl text-neutral-600">
                            Gerencie suas informações pessoais e preferências
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Informações Pessoais */}
                        <Card padding="xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-display font-bold text-secondary-500">
                                    Informações Pessoais
                                </h2>
                                <Button 
                                    variant="outline"
                                    size="md"
                                    onClick={() => setEditandoPerfil(!editandoPerfil)}
                                >
                                    {editandoPerfil ? 'Cancelar' : 'Editar'}
                                </Button>
                            </div>

                            {editandoPerfil ? (
                                <form onSubmit={atualizarPerfil} className="space-y-6">
                                    <Input
                                        label="Nome Completo"
                                        type="text"
                                        value={dadosPerfil.nome}
                                        onChange={(e) => setDadosPerfil({...dadosPerfil, nome: e.target.value})}
                                        required
                                    />

                                    <Input
                                        label="Telefone"
                                        type="tel"
                                        value={dadosPerfil.telefone}
                                        onChange={(e) => setDadosPerfil({...dadosPerfil, telefone: e.target.value})}
                                        placeholder="(11) 99999-9999"
                                        required
                                    />

                                    <div>
                                        <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={dadosPerfil.email}
                                            className="input-primary bg-neutral-100 cursor-not-allowed"
                                            disabled
                                        />
                                        <p className="text-sm text-neutral-500 mt-1">
                                            Email não pode ser alterado
                                        </p>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={carregando}
                                        loading={carregando}
                                        className="w-full"
                                    >
                                        Salvar Alterações
                                    </Button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-neutral-50 rounded-2xl">
                                        <div className="text-sm text-neutral-500">Nome Completo</div>
                                        <div className="text-lg font-semibold text-secondary-500">{dadosPerfil.nome}</div>
                                    </div>
                                    <div className="p-4 bg-neutral-50 rounded-2xl">
                                        <div className="text-sm text-neutral-500">Telefone</div>
                                        <div className="text-lg font-semibold text-secondary-500">{dadosPerfil.telefone}</div>
                                    </div>
                                    <div className="p-4 bg-neutral-50 rounded-2xl">
                                        <div className="text-sm text-neutral-500">Email</div>
                                        <div className="text-lg font-semibold text-secondary-500">{dadosPerfil.email}</div>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Endereço */}
                        <Card padding="xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-display font-bold text-secondary-500">
                                    Endereço
                                </h2>
                                <Button 
                                    variant="outline"
                                    size="md"
                                    onClick={() => setEditandoEndereco(!editandoEndereco)}
                                >
                                    {editandoEndereco ? 'Cancelar' : endereco.cep ? 'Editar' : 'Adicionar'}
                                </Button>
                            </div>

                            {editandoEndereco ? (
                                <form onSubmit={salvarEndereco} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="CEP"
                                            type="text"
                                            value={endereco.cep}
                                            onChange={(e) => setEndereco({...endereco, cep: e.target.value})}
                                            required
                                        />

                                        <Input
                                            label="Estado"
                                            type="text"
                                            value={endereco.estado}
                                            onChange={(e) => setEndereco({...endereco, estado: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Cidade"
                                        type="text"
                                        value={endereco.cidade}
                                        onChange={(e) => setEndereco({...endereco, cidade: e.target.value})}
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Rua"
                                            type="text"
                                            value={endereco.rua}
                                            onChange={(e) => setEndereco({...endereco, rua: e.target.value})}
                                            required
                                        />

                                        <Input
                                            label="Número"
                                            type="text"
                                            value={endereco.numero}
                                            onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Bairro"
                                            type="text"
                                            value={endereco.bairro}
                                            onChange={(e) => setEndereco({...endereco, bairro: e.target.value})}
                                            required
                                        />

                                        <Input
                                            label="Complemento"
                                            type="text"
                                            value={endereco.complemento}
                                            onChange={(e) => setEndereco({...endereco, complemento: e.target.value})}
                                            placeholder="Opcional"
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={carregando}
                                        loading={carregando}
                                        className="w-full"
                                    >
                                        Salvar Endereço
                                    </Button>
                                </form>
                            ) : (
                                endereco.cep ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-neutral-50 rounded-2xl">
                                            <div className="text-sm text-neutral-500">CEP</div>
                                            <div className="text-lg font-semibold text-secondary-500">{endereco.cep}</div>
                                        </div>
                                        <div className="p-4 bg-neutral-50 rounded-2xl">
                                            <div className="text-sm text-neutral-500">Endereço</div>
                                            <div className="text-lg font-semibold text-secondary-500">
                                                {endereco.rua}, {endereco.numero}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-neutral-50 rounded-2xl">
                                            <div className="text-sm text-neutral-500">Bairro</div>
                                            <div className="text-lg font-semibold text-secondary-500">{endereco.bairro}</div>
                                        </div>
                                        <div className="p-4 bg-neutral-50 rounded-2xl">
                                            <div className="text-sm text-neutral-500">Cidade/Estado</div>
                                            <div className="text-lg font-semibold text-secondary-500">
                                                {endereco.cidade} - {endereco.estado}
                                            </div>
                                        </div>
                                        {endereco.complemento && (
                                            <div className="p-4 bg-neutral-50 rounded-2xl">
                                                <div className="text-sm text-neutral-500">Complemento</div>
                                                <div className="text-lg font-semibold text-secondary-500">{endereco.complemento}</div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">🏠</div>
                                        <h3 className="text-xl font-semibold text-secondary-500 mb-2">
                                            Nenhum endereço cadastrado
                                        </h3>
                                        <p className="text-neutral-600 mb-4">
                                            Adicione seu endereço para facilitar os agendamentos
                                        </p>
                                        <Button 
                                            onClick={() => setEditandoEndereco(true)}
                                        >
                                            Adicionar Endereço
                                        </Button>
                                    </div>
                                )
                            )}
                        </Card>
                    </div>

                    {/* Estatísticas */}
                    <Card padding="xl" className="mt-8 gradient-bg text-white">
                        <h2 className="text-2xl font-display font-bold mb-6">Minha Atividade</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold mb-1">0</div>
                                <div className="text-primary-200">Pets Cadastrados</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">0</div>
                                <div className="text-primary-200">Agendamentos</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">0</div>
                                <div className="text-primary-200">Favoritos</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-1">0</div>
                                <div className="text-primary-200">Avaliações</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Perfil;