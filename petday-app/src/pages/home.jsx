import React from 'react';
import { estaLogado, getUsuarioAtual } from '../utils/auth';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Home = ({ onNavigateToLogin, onNavigateToFeed, onLogout, onNavigateTo }) => {
  const usuario = getUsuarioAtual();

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom section-padding relative">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-display display-lg mb-8 animate-fade-in">
              Cuidamos do seu
              <span className="block text-secondary-200 drop-shadow-2xl">
                melhor amigo
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Agendamento online para banho, tosa, vacina e muito mais. 
              <span className="block font-semibold">Rápido, seguro e com amor.</span>
            </p>
            {!estaLogado() ? (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="xl"
                  onClick={onNavigateToLogin}
                  className="bg-white text-primary-500 hover:bg-neutral-100"
                >
                  Começar Agora 🚀
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-primary-500"
                >
                  Conhecer Mais
                </Button>
              </div>
            ) : (
              <Button 
                size="xl"
                onClick={onNavigateToFeed}
                className="bg-white text-primary-500 hover:bg-neutral-100"
              >
                Acessar Meu App 🐾
              </Button>
            )}
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-display display-md text-secondary-500 mb-6">
              Por que o <span className="text-primary-500">PetDay</span>?
            </h2>
            <p className="text-2xl text-neutral-700 max-w-3xl mx-auto">
              Tudo que seu pet precisa, com a praticidade que você merece
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                icon: '🚿',
                title: 'Banho & Tosa Premium',
                description: 'Serviços de higiene e beleza com produtos de qualidade e profissionais especializados',
              },
              {
                icon: '⏰',
                title: 'Agendamento Inteligente',
                description: 'Agende em poucos cliques, escolha o melhor horário e receba lembretes automáticos',
              },
              {
                icon: '📍',
                title: 'Petshops Verificados',
                description: 'Estabelecimentos avaliados e certificados, garantindo a melhor experiência para seu pet',
              },
            ].map((feature, index) => (
              <Card key={index} hover padding="xl" className="text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary-500 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-secondary-500 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '2.5k+', label: 'Pets Atendidos' },
              { number: '50+', label: 'Petshops Parceiros' },
              { number: '4.9', label: 'Avaliação Média' },
              { number: '24/7', label: 'Suporte' },
            ].map((stat, index) => (
              <div key={index} className="animate-scale-in">
                <div className="text-4xl md:text-5xl font-display font-black text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-neutral-300 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!estaLogado() && (
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <Card padding="xl" className="max-w-4xl mx-auto gradient-bg text-white">
              <h2 className="text-display display-sm mb-6">
                Pronto para transformar
                <span className="block">o cuidado do seu pet?</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de tutores que já descobriram a forma mais fácil 
                e segura de cuidar de seus animais de estimação
              </p>
              <Button 
                size="xl"
                onClick={onNavigateToLogin}
                className="bg-white text-primary-500 hover:bg-neutral-100"
              >
                Criar Minha Conta Gratuita
              </Button>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;