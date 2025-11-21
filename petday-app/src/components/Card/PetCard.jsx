import React from 'react';
import Card from '../UI/Card';

const PetCard = ({ pet, onEdit, onDelete, className = '' }) => {
  const getSexoTexto = (sexo) => {
    switch(sexo) {
      case 'M': return 'Macho';
      case 'F': return 'Fêmea';
      case 'I': return 'Indefinido';
      default: return sexo;
    }
  };

  return (
    <Card hover className={className}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-500">
              {pet.especie === 'Cachorro' ? '🐕' : pet.especie === 'Gato' ? '🐈' : '🐾'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary-500">{pet.nome}</h3>
              <p className="text-primary-500 font-semibold">{pet.especie}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-neutral-600">Raça:</span>
              <p className="font-semibold text-secondary-700">{pet.raca || 'Não informada'}</p>
            </div>
            <div>
              <span className="text-neutral-600">Idade:</span>
              <p className="font-semibold text-secondary-700">{pet.idade} anos</p>
            </div>
            <div>
              <span className="text-neutral-600">Sexo:</span>
              <p className="font-semibold text-secondary-700">{getSexoTexto(pet.sexo)}</p>
            </div>
            <div>
              <span className="text-neutral-600">Porte:</span>
              <p className="font-semibold text-secondary-700">{pet.porte?.descricao}</p>
            </div>
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex space-x-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(pet)}
                className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(pet)}
                className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PetCard;