import { supabase } from '@/lib/supabase';
import { AuthError, Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
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
    const [nomeAluno, setNomeAluno] = useState<string>('');
    const [idadeAluno, setIdadeAluno] = useState<string>('');
    const [emailAluno, setEmailAluno] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Função para login
    async function validarLogin(): Promise<void> {
        if (!emailAluno || !senha) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha e-mail e senha',
            });
            return;
        }

        setLoading(true);

        const { error }: { error: AuthError | null } = await supabase.auth.signInWithPassword({
            email: emailAluno,
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
        router.replace('/(tabs)');
    }

    // Função para cadastro
    async function signUpWithEmail(): Promise<void> {
        if (!nomeAluno || !idadeAluno || !emailAluno || !senha) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos',
            });
            return;
        }

        setLoading(true);

        // Cria usuário no Supabase Auth
        const { data, error: authError }: { data: { session: Session | null }, error: AuthError | null } =
            await supabase.auth.signUp({
                email: emailAluno,
                password: senha,
            });

        if (authError) {
            Toast.show({
                type: 'error',
                text1: 'Erro no cadastro',
                text2: authError.message,
            });
            setLoading(false);
            return;
        }

        // Salva dados adicionais na tabela tb_aluno
        const { error: dbError } = await supabase.from('tb_aluno').insert([
            {
                nome: nomeAluno,
                idade: idadeAluno,
                email: emailAluno,
            },
        ]);

        if (dbError) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar dados',
                text2: dbError.message,
            });
            setLoading(false);
            return;
        }

        Toast.show({
            type: 'success',
            text1: 'Cadastro realizado',
            text2: 'Confira seu e-mail para confirmar a conta',
        });

        setLoading(false);
        setNomeAluno('');
        setIdadeAluno('');
        setEmailAluno('');
        setSenha('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Área Restrita</Text>

            <TextInput
                style={styles.Input}
                placeholder="Nome"
                value={nomeAluno}
                onChangeText={setNomeAluno}
            />

            <TextInput
                style={styles.Input}
                placeholder="Idade"
                value={idadeAluno}
                onChangeText={setIdadeAluno}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.Input}
                placeholder="E-mail"
                value={emailAluno}
                onChangeText={setEmailAluno}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.Input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Toast />

            <TouchableOpacity
                style={styles.Button}
                onPress={validarLogin}
                disabled={loading}
            >
                <Text style={styles.ButtonText}>
                    {loading ? 'Carregando...' : 'Entrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.Button, { backgroundColor: '#6c63ff', marginTop: 10 }]}
                onPress={signUpWithEmail}
                disabled={loading}
            >
                <Text style={styles.ButtonText}>
                    {loading ? 'Carregando...' : 'Cadastrar'}
                </Text>
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
        marginBottom: 10,
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
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});