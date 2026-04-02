import { supabase } from '@/lib/supabase';
import { AuthError, Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
  
  export default function Login() {
    const router = useRouter(); // Hook correto do expo-router
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
  
    // Função de login
    async function validarLogin(): Promise<void> {
      if (!email || !senha) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Preencha e-mail e senha',
        });
        return;
      }
  
      setLoading(true);
  
      const { error }: { error: AuthError | null } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
  
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro no login',
          text2: error.message,
        });
        setLoading(false);
        return;
      }
  
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Login efetuado!',
      });
  
      setLoading(false);
       // Vai para a tela correta
    }
  
    // Função de cadastro
    async function signUpWithEmail(): Promise<void> {
      if (!email || !senha) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Preencha e-mail e senha',
        });
        return;
      }
  
      setLoading(true);
  
      const { data, error }: { data: { session: Session | null } | null; error: AuthError | null } =
        await supabase.auth.signUp({
          email,
          password: senha,
        });
  
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro no cadastro',
          text2: error.message,
        });
        setLoading(false);
        return;
      }
  
      if (!data?.session) {
        Toast.show({
          type: 'info',
          text1: 'Verificação',
          text2: 'Confira sua caixa de e-mail para confirmar a conta',
        });
      }
  
      setLoading(false);
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Área Restrita</Text>
  
        <TextInput
          style={styles.Input}
          placeholder="Informe seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
  
        <TextInput
          style={styles.Input}
          placeholder="Informe sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
  
        <Toast />
  
        <TouchableOpacity style={styles.Button} onPress={validarLogin} disabled={loading}>
          <Text style={styles.ButtonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.Button, { backgroundColor: '#6c63ff', marginTop: 10 }]}
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <Text style={styles.ButtonText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    Title: {
      fontSize: 24,
      color: '#ffffff',
      marginBottom: 20,
    },
    Input: {
      width: '100%',
      height: 40,
      backgroundColor: '#ffffff',
      marginBottom: 20,
      color: '#000000',
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    Button: {
      width: '100%',
      height: 45,
      backgroundColor: '#c2e015',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    ButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
    },
  });