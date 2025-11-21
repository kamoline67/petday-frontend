import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { styles } from '../styles/globalstyles';
import Header from '../components/Header';
import petCard from '../components/PetCard';
import Loading from '../components/Loading';

const Pets = ({ usuario, onLogout }) => {
    const [pets, setPets] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregandoPets, setCarregandoPets] = useState(true);
    const [mensagem, setMensagem] = useState('');
    
    const [novoPet, setNovoPet] = useState({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        sexo: 'I',
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

    const adicionarPet = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            const dadosPet = {
                ...novoPet,
                cliente_id: usuario.cliente_id,
                idade: parseInt(novoPet.idade),
                porte_id: parseInt(novoPet.porte_id)
            };

            await api.post('/pets', dadosPet);
            
            setMensagem('Pet cadastrado com sucesso!');
            setNovoPet({ 
                nome: '', especie: '', raca: '', idade: '', 
                sexo: 'M', porte_id: '1' 
            });
            carregarPets();
        } catch (error) {
            setMensagem(error.response?.data?.error || 'Erro ao cadastrar pet');
        } finally {
            setCarregando(false);
        }
    };

    if (carregandoPets) {
        return <Loading mensagem="Carregando seus pets..." />;
    }

    return (
        <div style={styles.container}>
            <Header 
                titulo="Meus Pets" 
                onLogout={onLogout}
            />

            {mensagem && (
                <div style={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>
                    {mensagem}
                </div>
            )}

            <div style={styles.card}>
                <h3>Adicionar Novo Pet</h3>
                <form onSubmit={adicionarPet} style={styles.form}>
                    <div style={styles.formLinha}>
                        <div style={styles.inputGroup}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={novoPet.nome}
                                onChange={(e) => setNovoPet({...novoPet, nome: e.target.value})}
                                style={styles.input}
                                required
                            />
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label>Espécie:</label>
                            <input
                                type="text"
                                value={novoPet.especie}
                                onChange={(e) => setNovoPet({...novoPet, especie: e.target.value})}
                                style={styles.input}
                                placeholder="Cachorro, Gato, etc."
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formLinha}>
                        <div style={styles.inputGroup}>
                            <label>Raça:</label>
                            <input
                                type="text"
                                value={novoPet.raca}
                                onChange={(e) => setNovoPet({...novoPet, raca: e.target.value})}
                                style={styles.input}
                                placeholder="Opcional"
                            />
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label>Idade (anos):</label>
                            <input
                                type="number"
                                value={novoPet.idade}
                                onChange={(e) => setNovoPet({...novoPet, idade: e.target.value})}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formLinha}>
                        <div style={styles.inputGroup}>
                            <label>Sexo:</label>
                            <select
                                value={novoPet.sexo}
                                onChange={(e) => setNovoPet({...novoPet, sexo: e.target.value})}
                                style={styles.input}
                            >
                                <option value="M">Macho</option>
                                <option value="F">Fêmea</option>
                                <option value="I">Indefinido</option>
                            </select>
                        </div>
                        
                        <div style={styles.inputGroup}>
                            <label>Porte:</label>
                            <select
                                value={novoPet.porte_id}
                                onChange={(e) => setNovoPet({...novoPet, porte_id: e.target.value})}
                                style={styles.input}
                                required
                            >
                                <option value="1">Pequeno</option>
                                <option value="2">Médio</option>
                                <option value="3">Grande</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={carregando}
                        style={carregando ? styles.botaoDesabilitado : styles.botaoPrimario}
                    >
                        {carregando ? 'Cadastrando...' : 'Cadastrar Pet'}
                    </button>
                </form>
            </div>

            <div style={styles.listaPets}>
                <h3>Meus Pets Cadastrados</h3>
                
                {pets.length === 0 ? (
                    <p style={styles.textoCentro}>Nenhum pet cadastrado ainda.</p>
                ) : (
                    pets.map(pet => (
                        <petCard key={pet.pet_id} pet={pet} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Pets;