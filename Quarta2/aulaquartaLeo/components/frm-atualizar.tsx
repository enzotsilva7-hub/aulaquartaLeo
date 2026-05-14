import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState, useEffect } from 'react';
//npm install react-native-toast-message
import { supabase } from '@/lib/supabase';
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams }


export default function atualizar() {

    const [nomeAluno, setNomeAluno] = useState('')
    const [idadeAluno, setIdadeAluno] = useState('')
    const [emailAluno, setEmailAluno] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isFocused) {
            carregadorAlunos();
        }
    }, [isFocused]);


    const { id } = useLocalSearchParams();

    aysn function carregadorAlunos() {
        const { data, error } = await supabase
            .from("tb_aluno")
            .select()
            .eq('id', id)
            .single()

        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Aluno não encontrado.' + error.message,
            }else {
                setNomeAluno(data.nome ? data.nome : '');
                setIdadeAluno(data.idade ?? '');
                setEmailAluno(data.email ?? '');
        })
    }

}
async function validarLogin() {

    setLoading(true)

    const { error } = await supabase
        .from('tb_aluno')
        .insert(
            {
                nomeAluno,
                idadeAluno,
                emailAluno
            }
        )
        .select()

    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Erro!',
            text2: error.message
        })
    } else {
        setLoading(false)
        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Cadastro realizado com sucesso!'
        })
    }

}

return (
    <View style={styles.container}>
        <Text style={styles.Text}> Área Restrita</Text>

        <TextInput
            style={styles.Input}
            placeholder="Informe seu nome"
            value={nomeAluno}
            onChangeText={setNomeAluno}
        />

        <TextInput
            style={styles.Input}
            placeholder="Informe sua idade"
            value={idadeAluno}
            onChangeText={setIdadeAluno}
        />

        <TextInput
            style={styles.Input}
            placeholder="Informe seu e-mail"
            value={emailAluno}
            onChangeText={setEmailAluno}
        />

        <Toast />

        <TouchableOpacity style={styles.Button} onPress={validarLogin} disabled={loading}>
            <Text style={styles.Text}>Atualizar Aluno</Text>
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
    Text: {
        fontSize: 24, color: '#ffffff',
        marginBottom: 20,
    },
    Input: {
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        color: '#000000'
    },
    Button: {
        width: '100%',
        height: 40,
        backgroundColor: '#c2e015',
        alignItems: 'center',
    },
})