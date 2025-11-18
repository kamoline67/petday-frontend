export const salvarUsuario = (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
};

export const removerUsuario = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
};

export const estaLogado = () => {
     return !!localStorage.getItem('token');
};

export const getUsuarioAtual = () => {
     const user = localStorage.getItem('user');
     return user ? JSON.parse(user) : null;
};

export const getToken = () => {
     return localStorage.getItem('token');
};