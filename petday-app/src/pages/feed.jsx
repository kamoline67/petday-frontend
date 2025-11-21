import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';

const Feed = ({ usuario, onLogout, onNavigateTo }) => {
    const [empresas, setEmpresas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
    const [pesquisa, setPesquisa] = useState('');

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
        onNavigateTo('petshop-detail', { empresa });
    };

    const agendarDireto = (servico, empresa) => {
        onNavigateTo('agendamento', { 
            empresa_id: empresa.empresa_id,
            servicosSelecionados: [servico.servico_id],
            empresa_nome: empresa.nome
        });
    };

    const servicosPorEmpresa = empresas.map(empresa => ({
        ...empresa,
        servicos: servicos.filter(servico => servico.empresa_id === empresa.empresa_id)
    })).filter(empresa => empresa.servicos.length > 0);

    const empresasFiltradas = servicosPorEmpresa.filter(empresa => 
        empresa.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        empresa.servicos.some(servico => 
            servico.tipo.toLowerCase().includes(pesquisa.toLowerCase())
        )
    );

    const categorias = [
        { id: 'todos', nome: 'Todos', icone: '🐾' },
        { id: 'banho', nome: 'Banho', icone: '🚿' },
        { id: 'tosa', nome: 'Tosa', icone: '✂️' },
        { id: 'veterinario', nome: 'Veterinário', icone: '🏥' },
        { id: 'vacina', nome: 'Vacina', icone: '💉' }
    ];

    if (carregando) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando petshops..." tamanho="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
            
            <div className="section-padding">
                <div className="container-custom">
                    {/* Hero Section */}
                    <Card className="gradient-bg text-white text-center mb-8">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-display display-sm mb-4">
                                Encontre o melhor para seu <span className="text-secondary-200">pet</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-6">
                                Descubra petshops incríveis e serviços de qualidade perto de você
                            </p>
                            
                            {/* Barra de Pesquisa */}
                            <div className="max-w-md mx-auto">
                                <Input
                                    type="text"
                                    placeholder="🔍 Pesquisar petshops ou serviços..."
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                                />
                            </div>
                        </div>
                    </Card>

                    {mensagem && (
                        <div className={`mb-6 p-4 rounded-2xl text-lg font-semibold ${
                            mensagem.includes('Erro') 
                                ? 'bg-red-50 text-red-700 border-2 border-red-200' 
                                : 'bg-green-50 text-green-700 border-2 border-green-200'
                        }`}>
                            {mensagem}
                        </div>
                    )}

                    {/* Filtros de Categoria */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex space-x-3 pb-4">
                            {categorias.map(categoria => (
                                <button
                                    key={categoria.id}
                                    onClick={() => setCategoriaAtiva(categoria.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold text-lg whitespace-nowrap transition-all duration-300 ${
                                        categoriaAtiva === categoria.id
                                            ? 'bg-primary-500 text-white shadow-lg'
                                            : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-500 border border-neutral-200'
                                    }`}
                                >
                                    <span>{categoria.icone}</span>
                                    <span>{categoria.nome}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lista de Petshops */}
                    <div className="space-y-6">
                        {empresasFiltradas.length === 0 ? (
                            <Card padding="xl" className="text-center">
                                <div className="text-6xl mb-4">🐕</div>
                                <h3 className="text-2xl font-bold text-secondary-500 mb-2">
                                    Nenhum petshop encontrado
                                </h3>
                                <p className="text-neutral-600 text-lg">
                                    {pesquisa ? 'Tente alterar os termos da pesquisa' : 'Não encontramos petshops na sua área no momento'}
                                </p>
                            </Card>
                        ) : (
                            empresasFiltradas.map(empresa => (
                                <Card key={empresa.empresa_id} hover padding="xl">
                                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-start space-x-4 mb-4">
                                                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg">
                                                    🏪
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-display font-bold text-secondary-500 mb-1">
                                                        {empresa.nome}
                                                    </h3>
                                                    <p className="text-neutral-600">
                                                        📞 {empresa.telefone}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-3 mb-4">
                                                {empresa.servicos.slice(0, 4).map(servico => (
                                                    <span
                                                        key={servico.servico_id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            agendarDireto(servico, empresa);
                                                        }}
                                                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl font-semibold cursor-pointer hover:bg-primary-200 transition-all duration-300 border border-primary-200 hover:scale-105"
                                                    >
                                                        {servico.tipo} - R$ {servico.portes?.[0]?.preco_porte || '0.00'}
                                                    </span>
                                                ))}
                                                {empresa.servicos.length > 4 && (
                                                    <span className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-xl font-semibold">
                                                        +{empresa.servicos.length - 4} mais
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col space-y-3">
                                            <Button 
                                                onClick={() => verDetalhesPetshop(empresa)}
                                            >
                                                Ver Detalhes
                                            </Button>
                                            {empresa.servicos.length === 1 && (
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => agendarDireto(empresa.servicos[0], empresa)}
                                                >
                                                    Agendar Direto
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Feed;