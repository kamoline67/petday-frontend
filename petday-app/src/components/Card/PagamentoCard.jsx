import React from 'react';
import Card from '../UI/Card';

const PagamentoCard = ({ pagamento, className = '' }) => {
  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleString('pt-BR');
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const getStatusColor = (status) => {
    const cores = {
      'Pago': 'bg-green-100 text-green-700 border-green-200',
      'Pendente': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Cancelado': 'bg-red-100 text-red-700 border-red-200'
    };
    return cores[status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
  };

  const getFormaPagamentoIcon = (forma) => {
    const icones = {
      'Pix': '📱',
      'Cartão': '💳',
      'Dinheiro': '💵',
      'Boleto': '📄'
    };
    return icones[forma] || '💰';
  };

  return (
    <Card hover className={className}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-xl">
              {getFormaPagamentoIcon(pagamento.forma_pagamento)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary-500">
                {formatarData(pagamento.createdAt)}
              </h3>
              <p className="text-primary-500 font-semibold">
                {pagamento.forma_pagamento}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Agendamento:</span>
              <p className="font-semibold text-secondary-700">
                {pagamento.agendamento ? formatarData(pagamento.agendamento.data_hora) : 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-neutral-600">Valor:</span>
              <p className="font-semibold text-secondary-700 text-lg">
                {formatarMoeda(pagamento.valor)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(pagamento.status)}`}>
            {pagamento.status}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PagamentoCard;