import React from "react";
import Logo from "../UI/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-32 pb-16 overflow-hidden">

      {/* ONDA PRETA — topo do footer */}
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[180px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#000000"
            d="M0,160L48,149.3C96,139,192,117,288,138.7C384,160,480,224,576,218.7C672,213,768,139,864,138.7C960,139,1056,213,1152,250.7C1248,288,1344,288,1392,288L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* CONTEÚDO */}
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" className="mb-6" />
            <p className="text-dark-300 text-lg max-w-md leading-relaxed font-sans">
              Conectamos você aos melhores serviços para seu pet. Agendamento rápido, 
              seguro e com profissionais qualificados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white font-display">
              Navegação
            </h3>
            <div className="space-y-3">
              {["Sobre", "Serviços", "Blog", "Contato", "FAQ"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-dark-300 hover:text-primary-400 transition-colors duration-300 text-lg font-sans"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white font-display">
              Contato
            </h3>
            <div className="space-y-3 text-dark-300 text-lg font-sans">
              <p>📧 petdaytec@gmail.com</p>
              <p>📱 (44) 99105-0016</p>
              <p>📍 Maringá, PR</p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="border-t border-dark-700 mt-12 pt-8 text-center">
          <p className="text-dark-400 font-sans">
            &copy; 2025 PetDay. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
