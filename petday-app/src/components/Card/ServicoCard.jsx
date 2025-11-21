import React from 'react';
import Card from '../UI/Card';

const ServicoCard = ({ servico, selecionado, onToggle, className = '' }) => {
  return (
    <Card 
      hover 
      className={`cursor-pointer transition-all duration-300 ${
        selecionado 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-neutral-300 hover:border-primary-300'
      } ${className}`}
      onClick={() => onToggle(servico.servico_id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-secondary-500 mb-2">
            {servico.tipo}
          </h3>
          <p className="text-neutral-600 leading-relaxed mb-3">
            {servico.descricao}
          </p>
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <span>⏱️ {servico.duracao_min}min</span>
            <span>•</span>
            <span className={servico.ativo ? 'text-green-500' : 'text-red-500'}>
              {servico.ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <div className="text-2xl font-bold text-primary-500 mb-2">
            R$ {servico.portes?.[0]?.preco_porte || '0.00'}
          </div>
          <div className={`text-sm font-semibold ${
            selecionado ? 'text-primary-600' : 'text-neutral-500'
          }`}>
            {selecionado ? '✓ Selecionado' : 'Clique para selecionar'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServicoCard;