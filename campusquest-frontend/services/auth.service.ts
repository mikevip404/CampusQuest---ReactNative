// services/auth.service.ts
// Funciones que encapsulan las llamadas HTTP relacionadas con autenticación.

import api from './api';
import * as SecureStore from 'expo-secure-store';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    username: string;
    team_id: string;
    role: string;
  };
}

/**
 * Envía credenciales al backend, guarda el token de forma segura
 * y devuelve los datos del usuario.
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  
  // Guarda el token en almacenamiento seguro del dispositivo
  await SecureStore.setItemAsync('campusquest_token', response.data.token);
  
  return response.data;
};

/**
 * Elimina el token guardado y cierra la sesión local.
 */
export const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync('campusquest_token');
};

/**
 * Verifica si hay una sesión activa buscando el token guardado.
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await SecureStore.getItemAsync('campusquest_token');
  return !!token;
};
