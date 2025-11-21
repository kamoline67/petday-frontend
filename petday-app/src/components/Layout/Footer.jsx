import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary-500 text-white py-16">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🐾</span>
              </div>
              <div>
                <h2 className="text-3xl font-display font-black">PetDay</h2>
                <p className="text-primary-300 font-semibold">Cuidando com amor</p>
              </div>
            </div>
            <p className="text-neutral-200 text-lg max-w-md leading-relaxed">
              Conectamos você aos melhores serviços para seu pet. Agendamento rápido, 
              seguro e com profissionais qualificados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Navegação</h3>
            <div className="space-y-3">
              {['Sobre', 'Serviços', 'Blog', 'Contato', 'FAQ'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="block text-neutral-300 hover:text-white transition-colors duration-300 text-lg"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>


          <div>
            <h3 className="text-xl font-bold mb-6">Contato</h3>
            <div className="space-y-3 text-neutral-300 text-lg">
              <p>petdaytec@gmail.com</p>
              <p>(44) 99105-0016</p>
              <p>Maringá, PR</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-400 mt-12 pt-8 text-center">
          <p className="text-neutral-300">
            &copy; 2025 PetDay. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;