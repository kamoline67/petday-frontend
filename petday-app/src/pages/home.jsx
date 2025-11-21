import React from 'react';
import { styles } from '../styles/globalstyles';
import { estaLogado, getUsuarioAtual } from '../utils/auth';

const Home = ({ onNavigateToLogin, onNavigateToFeed }) => {
    const usuario = getUsuarioAtual();

    return (
        <div style={styles.app}>
            <header style={{
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2rem' }}>🐾</span>
                        <h1 style={{ 
                            margin: 0, 
                            color: '#007bff',
                            fontSize: '1.8rem',
                            fontWeight: 'bold'
                        }}>
                            PetDay
                        </h1>
                    </div>
                    
                    <nav>
                        {estaLogado() ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ color: '#666' }}>Olá, {usuario.nome}!</span>
                                <button 
                                    onClick={onNavigateToFeed}
                                    style={{
                                        ...styles.botaoPrimario,
                                        padding: '10px 20px',
                                        width: 'auto'
                                    }}
                                >
                                    Acessar App
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={onNavigateToLogin}
                                style={{
                                    ...styles.botaoPrimario,
                                    padding: '10px 20px',
                                    width: 'auto'
                                }}
                            >
                                Entrar
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '100px 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ 
                        fontSize: '3.5rem', 
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        Cuide do seu pet com amor e praticidade
                    </h1>
                    <p style={{ 
                        fontSize: '1.3rem', 
                        marginBottom: '2rem',
                        opacity: 0.9
                    }}>
                        Agende banho, tosa, vacina e muito mais para seu melhor amigo
                    </p>
                    {!estaLogado() && (
                        <button 
                            onClick={onNavigateToLogin}
                            style={{
                                ...styles.botaoPrimario,
                                backgroundColor: 'white',
                                color: '#667eea',
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                width: 'auto',
                                fontWeight: 'bold'
                            }}
                        >
                            Entrar
                        </button>
                    )}
                </div>
            </section>

            <section style={{ padding: '80px 2rem', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem',
                        fontSize: '2.5rem',
                        color: '#333'
                    }}>
                        Por que escolher o PetDay?
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {[
                            {
                                icon: '🚿',
                                title: 'Banho & Tosa',
                                description: 'Agende serviços de higiene e beleza para seu pet com profissionais especializados'
                            },
                            {
                                icon: '⏰',
                                title: 'Agendamento Fácil',
                                description: 'Agende serviços em poucos cliques, no horário que preferir'
                            },
                            {
                                icon: '📍',
                                title: 'Encontre Perto de Você',
                                description: 'Descubra os melhores petshops na sua região'
                            },
                        ].map((feature, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '2rem',
                                borderRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ 
                                    marginBottom: '1rem',
                                    color: '#333',
                                    fontSize: '1.3rem'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ 
                                    color: '#666',
                                    lineHeight: '1.6'
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '80px 2rem', backgroundColor: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem',
                        fontSize: '2.5rem',
                        color: '#333'
                    }}>
                        Como funciona
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {[
                            { step: '1', title: 'Crie sua conta', description: 'Cadastre-se em menos de 2 minutos' },
                            { step: '2', title: 'Encontre serviços', description: 'Busque por petshops e serviços na sua área' },
                            { step: '3', title: 'Agende', description: 'Escolha data, horário e serviços desejados' },
                            { step: '4', title: 'Aproveite', description: 'Deixe seu pet nas mãos de profissionais' }
                        ].map((step, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '2rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    margin: '0 auto 1rem'
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ 
                                    marginBottom: '1rem',
                                    color: '#333'
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: '#666' }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '80px 2rem', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ 
                        textAlign: 'center', 
                        marginBottom: '3rem',
                        fontSize: '2.5rem',
                        color: '#333'
                    }}>
                        Nossa Equipe
                    </h2>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {[
                            {
                                name: 'Kamoline Redivo',
                                role: 'Desenvolvedora',
                                bio: 'Responsável pelo frontend e backend do Petday.',
                                avatar: '👩‍💻'
                            },
                            {
                                name: 'Marco Antônio',
                                role: 'Marketing',
                                bio: 'Cuida da comunicação do projeto Petday.',
                                avatar: '👨‍💻'
                            },
                            {
                                name: 'Nathan Vitor',
                                role: 'Lider do Projeto',
                                bio: 'Lider do projeto Petday',
                                avatar: '👩‍🎨'
                            },
                            {
                                name: 'João Vitor Mariano',
                                role: 'Desenvolvedor',
                                bio: 'Responsável pela criação do site Petday.',
                                avatar: '👨‍💼'
                            },
                            {
                                name: 'João Paulo Oto',
                                role: 'Desenvolvedor',
                                bio: 'Responsável pela criação do site Petday.',
                                avatar: '👨‍💼'
                            },
                            {
                                name: 'Leonardo Paz Gaieski',
                                role: 'Desenvolvedor',
                                bio: 'Responsável pela criação do site Petday.',
                                avatar: '👨‍💼'
                            }
                            
                        ].map((member, index) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                padding: '2rem',
                                borderRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <div style={{ 
                                    fontSize: '4rem',
                                    marginBottom: '1rem'
                                }}>
                                    {member.avatar}
                                </div>
                                <h3 style={{ 
                                    marginBottom: '0.5rem',
                                    color: '#333',
                                    fontSize: '1.3rem'
                                }}>
                                    {member.name}
                                </h3>
                                <p style={{ 
                                    color: '#007bff',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem'
                                }}>
                                    {member.role}
                                </p>
                                <p style={{ 
                                    color: '#666',
                                    lineHeight: '1.6'
                                }}>
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!estaLogado() && (
                <section style={{
                    padding: '80px 2rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ 
                            fontSize: '2.5rem',
                            marginBottom: '1rem'
                        }}>
                            Pronto para começar?
                        </h2>
                        <p style={{ 
                            fontSize: '1.2rem',
                            marginBottom: '2rem',
                            opacity: 0.9
                        }}>
                            Junte-se a centenas de tutores que já cuidam de seus pets com o PetDay
                        </p>
                        <button 
                            onClick={onNavigateToLogin}
                            style={{
                                ...styles.botaoPrimario,
                                backgroundColor: 'white',
                                color: '#007bff',
                                padding: '15px 40px',
                                fontSize: '1.1rem',
                                width: 'auto',
                                fontWeight: 'bold'
                            }}
                        >
                            Criar Minha Conta
                        </button>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer style={{
                backgroundColor: '#333',
                color: 'white',
                padding: '3rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '1rem'
                    }}>
                        <span style={{ fontSize: '2rem' }}>🐾</span>
                        <h3 style={{ margin: 0 }}>PetDay</h3>
                    </div>
                    <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                        Cuidando do seu pet com tecnologia e amor
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '2rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <a href="#sobre" style={{ color: 'white', textDecoration: 'none' }}>Sobre</a>
                        <a href="#servicos" style={{ color: 'white', textDecoration: 'none' }}>Serviços</a>
                        <a href="#equipe" style={{ color: 'white', textDecoration: 'none' }}>Equipe</a>
                        <a href="#contato" style={{ color: 'white', textDecoration: 'none' }}>Contato</a>
                    </div>
                    <p style={{ opacity: 0.6 }}>
                        &copy; 2024 PetDay. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;