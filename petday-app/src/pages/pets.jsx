import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Loading from '../components/UI/Loading';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Modal from '../components/UI/Modal';
import PetCard from '../components/Card/PetCard';

const Pets = ({ usuario, onLogout, onNavigateTo }) => {
    const [pets, setPets] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregandoPets, setCarregandoPets] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [petEditando, setPetEditando] = useState(null);
    
    const [formPet, setFormPet] = useState({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        sexo: 'M',
        porte_id: '1'
    });

    useEffect(() => {
        carregarPets();
    }, []);

    const carregarPets = async () => {
        try {
            const response = await api.get('/pets');
            setPets(response.data.pets || []);
        } catch (error) {
            setMensagem('Erro ao carregar pets');
        } finally {
            setCarregandoPets(false);
        }
    };

    const abrirModal = (pet = null) => {
        if (pet) {
            setPetEditando(pet);
            setFormPet({
                nome: pet.nome,
                especie: pet.especie,
                raca: pet.raca || '',
                idade: pet.idade.toString(),
                sexo: pet.sexo,
                porte_id: pet.porte_id.toString()
            });
        } else {
            setPetEditando(null);
            setFormPet({
                nome: '',
                especie: '',
                raca: '',
                idade: '',
                sexo: 'M',
                porte_id: '1'
            });
        }
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setPetEditando(null);
    };

    const salvarPet = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            const dadosPet = {
                ...formPet,
                cliente_id: usuario.cliente_id,
                idade: parseInt(formPet.idade),
                porte_id: parseInt(formPet.porte_id)
            };

            if (petEditando) {
                await api.put(`/pets/${petEditando.pet_id}`, dadosPet);
                setMensagem('Pet atualizado com sucesso!');
            } else {
                await api.post('/pets', dadosPet);
                setMensagem('Pet cadastrado com sucesso!');
            }
            
            fecharModal();
            carregarPets();
        } catch (error) {
            setMensagem(error.response?.data?.error || `Erro ao ${petEditando ? 'atualizar' : 'cadastrar'} pet`);
        } finally {
            setCarregando(false);
        }
    };

    const excluirPet = async (pet) => {
        if (!window.confirm(`Tem certeza que deseja excluir ${pet.nome}?`)) return;

        try {
            await api.delete(`/pets/${pet.pet_id}`);
            setMensagem('Pet excluído com sucesso!');
            carregarPets();
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao excluir pet');
        }
    };

    if (carregandoPets) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <Header onLogout={onLogout} onNavigateTo={onNavigateTo} />
                <Loading mensagem="Carregando seus pets..." tamanho="lg" />
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
                            Meus <span className="text-primary-500">Pets</span>
                        </h1>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Gerencie todas as informações dos seus animais de estimação em um só lugar
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
                    <Card padding="xl" className="gradient-bg text-white mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {pets.length > 0 ? `Você tem ${pets.length} pet(s) cadastrado(s)` : 'Cadastre seu primeiro pet!'}
                                </h3>
                                <p className="text-white/90">
                                    Mantenha as informações dos seus pets sempre atualizadas
                                </p>
                            </div>
                            <Button 
                                onClick={() => abrirModal()}
                                className="bg-white text-primary-500 hover:bg-neutral-100 mt-4 md:mt-0"
                            >
                                + Adicionar Novo Pet
                            </Button>
                        </div>
                    </Card>

                    {/* Lista de Pets */}
                    <div>
                        {pets.length === 0 ? (
                            <Card padding="xl" className="text-center">
                                <div className="text-6xl mb-4">🐾</div>
                                <h3 className="text-2xl font-bold text-secondary-500 mb-4">
                                    Nenhum pet cadastrado
                                </h3>
                                <p className="text-neutral-600 text-lg mb-6">
                                    Comece cadastrando seu primeiro animal de estimação para agendar serviços
                                </p>
                                <Button 
                                    onClick={() => abrirModal()}
                                    size="lg"
                                >
                                    Cadastrar Meu Primeiro Pet
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {pets.map(pet => (
                                    <PetCard
                                        key={pet.pet_id}
                                        pet={pet}
                                        onEdit={() => abrirModal(pet)}
                                        onDelete={() => excluirPet(pet)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Adicionar/Editar Pet */}
            <Modal
                isOpen={modalAberto}
                onClose={fecharModal}
                title={petEditando ? `Editar ${petEditando.nome}` : 'Adicionar Novo Pet'}
                size="md"
            >
                <form onSubmit={salvarPet} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Nome do Pet"
                            type="text"
                            value={formPet.nome}
                            onChange={(e) => setFormPet({...formPet, nome: e.target.value})}
                            placeholder="Ex: Rex, Luna, Thor..."
                            required
                        />
                        
                        <Input
                            label="Espécie"
                            type="text"
                            value={formPet.especie}
                            onChange={(e) => setFormPet({...formPet, especie: e.target.value})}
                            placeholder="Cachorro, Gato, etc."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Raça"
                            type="text"
                            value={formPet.raca}
                            onChange={(e) => setFormPet({...formPet, raca: e.target.value})}
                            placeholder="Opcional"
                        />
                        
                        <Input
                            label="Idade (anos)"
                            type="number"
                            value={formPet.idade}
                            onChange={(e) => setFormPet({...formPet, idade: e.target.value})}
                            min="0"
                            max="30"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                Sexo
                            </label>
                            <select
                                value={formPet.sexo}
                                onChange={(e) => setFormPet({...formPet, sexo: e.target.value})}
                                className="input-primary"
                            >
                                <option value="M">Macho</option>
                                <option value="F">Fêmea</option>
                                <option value="I">Indefinido</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-lg font-semibold text-secondary-500 mb-2">
                                Porte
                            </label>
                            <select
                                value={formPet.porte_id}
                                onChange={(e) => setFormPet({...formPet, porte_id: e.target.value})}
                                className="input-primary"
                                required
                            >
                                <option value="1">Pequeno</option>
                                <option value="2">Médio</option>
                                <option value="3">Grande</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <Button 
                            type="submit" 
                            disabled={carregando}
                            loading={carregando}
                            className="flex-1"
                        >
                            {petEditando ? 'Atualizar Pet' : 'Cadastrar Pet'}
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

export default Pets;