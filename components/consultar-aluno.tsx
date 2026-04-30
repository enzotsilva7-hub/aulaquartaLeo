import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<any[]>([]);
    const isFocused = useIsFocused();

    async function carregadorAlunos() {
        const { data, error } = await supabase
            .from("tb_aluno")
            .select("*");

        setAlunos(data || []);
    }

    useEffect(() => {
        if (isFocused) {
            carregadorAlunos();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text> Consultar Alunos</Text>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.idade}</Text>

                    </View>
                )}
            />
        </View>
    );

    const styles = StyleSheet.create({
        
    })
}