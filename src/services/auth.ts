import axios from 'axios';

export class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      return { user: response.data.user, error: null };
    } catch (err: any) {
      let message = 'Erro ao fazer login. Tente novamente.';

      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      } else if (err.message) {
        switch (err.message) {
          case 'Invalid login credentials':
            message = 'Email ou senha incorretos';
            break;
          case 'Email not confirmed':
            message = 'Por favor, confirme seu email antes de fazer login';
            break;
          case 'Invalid email':
            message = 'Email inválido';
            break;
        }
      }

      return { user: null, error: message };
    }
  }

  static async signOut() {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}
