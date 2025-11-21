export const styles = {
    app: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },

    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },

    navegacao: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '15px',
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
    },

    botaoNavegacao: {
        padding: '10px 20px',
        border: '1px solid #007bff',
        backgroundColor: 'white',
        color: '#007bff',
        borderRadius: '4px',
        cursor: 'pointer',
    },

    botaoAtivo:  {
        padding: '10px 20px',
        border: '1px solid #007bff',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
    },

    titulo: {
        color: '#333',
        textAlign: 'center',
    },

    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1',
    },

    formLinha: {
        display: 'flex',
        gap: '15px',
        marginBottom: '15px',
    },

    inputGroup: {
        flex: 1,
    },

    input: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px',
    },

    botaoPrimario: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },

    botaoSecundario: {
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },

    botaoDesabilitado: {
        backgroundColor: '#ccc',
        color: '#666',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        width: '100%',
    },

    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },

    cardPet: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '10px',
        borderLeft: '4px solid #007bff',
    },

    nomePet: {
        color: '#007bff',
        margin: '0 0 10px 0',
    },

    listaPets: {
        marginTop: '20px',
    },

    textoCentro: {
        textAlign: 'center',
        color: '#666',
    },

    sucesso: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px',
        borderRadius: '4px',
        margin: '10px 0',
        border: '1px solid #c3e6cb',
    },

    erro: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        borderRadius: '4px',
        margin: '10px 0',
        border: '1px solid #f5c6cb',
    }
}