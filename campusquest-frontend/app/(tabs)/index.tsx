// app/(tabs)/index.tsx
// Pantalla de bienvenida con logo institucional, formulario de login
// y manejo de estados de carga y error.

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { login, isAuthenticated } from '../../services/auth.service';

export default function WelcomeScreen() {
  // Estados locales para los campos del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estado de carga: deshabilita el botón mientras espera respuesta del backend
  const [isLoading, setIsLoading] = useState(false);

  // Mensaje de error para mostrar debajo del formulario
  const [error, setError] = useState('');

  // Verificar si ya está autenticado al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        router.replace('/(tabs)/explore');
      }
    };
    checkAuth();
  }, []);

  /**
   * Maneja el envío del formulario de login.
   * Valida campos, llama al servicio y navega si es exitoso.
   */
  const handleLogin = async () => {
    // Validación básica del lado cliente
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError('');       // Limpia errores previos
    setIsLoading(true); // Muestra spinner

    try {
      const result = await login({ username: username.trim(), password });
      
      // Login exitoso: navegar a la pantalla del mapa
      // replace() reemplaza el historial para que el usuario no pueda
      // volver al login con el botón de atrás
      router.replace('/(tabs)/explore');

    } catch (err: any) {
      // Muestra el mensaje de error del backend o uno genérico
      const message = err.response?.data?.message || 'Error de conexión. Verifica tu internet.';
      setError(message);
    } finally {
      setIsLoading(false); // Oculta el spinner siempre, sin importar el resultado
    }
  };

  return (
    // KeyboardAvoidingView evita que el teclado tape los campos de texto
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Sección del Logo ──────────────────────────────── */}
        <View style={styles.logoSection}>
          {/* 
            Reemplaza el source con tu logo real:
            require('../../assets/images/usc-logo.png')
            El logo oficial de la USC debe estar en la carpeta assets/images/
          */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoPlaceholderText}>🎓</Text>
          </View>

          <Text style={styles.universityName}>Universidad{'\n'}Santiago de Cali</Text>
          <Text style={styles.appTitle}>CampusQuest</Text>
          <Text style={styles.appSubtitle}>Gymkhana Institucional · Citadela Pampalinda</Text>
        </View>

        {/* ── Formulario de Login ───────────────────────────── */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Iniciar Sesión</Text>

          {/* Campo: Usuario */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Usuario</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Tu usuario USC"
              placeholderTextColor="#a0a0a0"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError(''); // Limpia error al escribir
              }}
              autoCapitalize="none"     // No capitaliza automáticamente
              autoCorrect={false}        // Sin autocorrección
              keyboardType="default"
              returnKeyType="next"       // El botón Enter mueve al campo de password
            />
          </View>

          {/* Campo: Contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              style={[styles.textInput, error ? styles.inputError : null]}
              placeholder="Tu contraseña"
              placeholderTextColor="#a0a0a0"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry={true}    // Oculta el texto (••••)
              returnKeyType="done"
              onSubmitEditing={handleLogin}  // Permite hacer login con Enter
            />
          </View>

          {/* Mensaje de error */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Botón de Login */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              // Spinner blanco mientras espera respuesta del servidor
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar al Campus</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Footer ───────────────────────────────────────── */}
        <Text style={styles.footer}>
          Facultad de Ingeniería · USC · Cali, Colombia
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
// Paleta de colores basada en la identidad visual de la USC:
// Azul oscuro institucional + verde esmeralda + blanco

const USC_BLUE = '#003087';      // Azul institucional USC
const USC_GREEN = '#00843D';     // Verde corporativo USC
const USC_LIGHT_BLUE = '#E8F0FE'; // Fondo suave azulado

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: USC_BLUE,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  // ── Logo Section ──
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoPlaceholderText: {
    fontSize: 48,
  },
  universityName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'center',
  },

  // ── Form Card ──
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    // Sombra en iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    // Sombra en Android
    elevation: 8,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: USC_BLUE,
    marginBottom: 24,
    textAlign: 'center',
  },

  // ── Inputs ──
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#DDE3F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a2e',
    backgroundColor: USC_LIGHT_BLUE,
  },
  inputError: {
    borderColor: '#E53935',  // Rojo para indicar error
    backgroundColor: '#FFF5F5',
  },

  // ── Error Box ──
  errorBox: {
    backgroundColor: '#FFF3F3',
    borderLeftWidth: 3,
    borderLeftColor: '#E53935',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: '#C62828',
    fontSize: 13,
    fontWeight: '500',
  },

  // ── Login Button ──
  loginButton: {
    backgroundColor: USC_GREEN,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: USC_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Footer ──
  footer: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 24,
  },
});
