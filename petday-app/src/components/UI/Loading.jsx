import React from 'react';

const Loading = ({ mensagem = "Carregando...", tamanho = "md" }) => {
  const tamanhos = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className={`${tamanhos[tamanho]} border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin`}></div>
      <p className="text-secondary-600 font-semibold text-lg">{mensagem}</p>
    </div>
  );
};

export default Loading;