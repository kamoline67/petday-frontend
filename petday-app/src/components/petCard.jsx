import React from 'react';
import { styles } from '../styles/globalstyles';

const PetCard = ({ pet }) => {
    const getSexoTexto = (sexo) => {
        switch(sexo) {
            case 'M': return 'Macho';
            case 'F': return 'Femea';
            case 'I': return 'Indefinido';
            default: return sexo;
        }
    };

    return (
        <div style={styles.cardPet}>
            <h4 style={styles.nomePet}>{pet.nome}</h4>
            <p><strong>Espécie:</strong> {pet.especie}</p>
            <p><strong>Raça:</strong>{pet.raca || 'Não informada'}</p>
            <p><strong>Idade:</strong>{pet.idade} anos</p>
            <p><strong>Sexo:</strong>{getSexoTexto(pet.sexo)}</p>
        </div>
    );
};

export default PetCard;