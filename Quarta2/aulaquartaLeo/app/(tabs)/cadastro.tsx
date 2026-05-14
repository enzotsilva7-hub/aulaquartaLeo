import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';

export default function Login(){
    return(
        <View style={styles.container}>
            <Text style={styles.Text}> Área Restrita</Text>
            <TextInput style={styles.Input} />
            <TextInput style={styles.Input}/>
            <TouchableOpacity style={styles.Button}>
                <Text style={styles.Text}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    Text:{
        fontSize: 24, color: '#ffffff',
        marginBottom:20,
    },
    Input:{
        width: '100%',
        height: 40,
        backgroundColor: '#ffffff',
        marginBottom:20,
    },
    Button:{
        width: '100%',
        height: 40,
        backgroundColor: '#c2e015',
        alignItems: 'center',
    },
})