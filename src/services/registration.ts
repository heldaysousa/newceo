import axios from 'axios';

interface RegistrationData {
  email: string;
  password: string;
  fullName: string;
  businessName: string;
}

export class RegistrationService {
  static async register(data: RegistrationData) {
    try {
      const response = await axios.post('/api/register', {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        businessName: data.businessName
      });

      if (response.data.user) {
        return {
          success: true,
          error: null
        };
      }

      return { success: false, error: 'Erro ao criar conta. Tente novamente.' };
    } catch (err: any) {
      let message = 'Erro ao criar conta. Tente novamente.';

      switch (err.message) {
        case 'User already registered':
          message = 'Este email já está registrado';
          break;
        case 'Password should be at least 6 characters':
          message = 'A senha deve ter pelo menos 6 caracteres';
          break;
        case 'Invalid email':
          message = 'Email inválido';
          break;
        case 'auth/email-already-in-use':
          message = 'Este email já está registrado';
          break;
        default:
          console.error('Registration error:', err);
      }

      return {
        success: false,
        error: message
      };
    }
  }
}
