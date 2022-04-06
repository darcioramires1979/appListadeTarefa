import React, {useState, useEffect} from "react";



import { 
    View, 
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';


export default function Home(){

    //Criando os states 
    let [lista, setLista] = useState('');
    let [saudacao, setSaudacao] = useState('');
    
    let [minhalista, setMinhalista] = useState([
        
        
    ]);

    useEffect(()=>{
       // alert('Executou o UseEffect ');

        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setSaudacao("Bom dia");
        } else if (currentHour >= 12 && currentHour < 18) {
            setSaudacao("Boa tarde");
        } else{
            setSaudacao("Boa noite");
        }

    
    },[]);

    //Criando a função que adiciona um novo filme
    function adicionalista(){
       if(lista.trim() != ''){
        const dados = {
            id: String(new Date().getTime()),
            nome: lista,
          };
     
          //alert("clicou");
      
          setMinhalista((oldState) => [... oldState, dados]);
          setLista('');
       }
       else{
           alert('Digite uma tarefa')
       }
     
     }

     function deletarlista(index){

        console.log('id lista:' + index);
       
        let novalista = [...minhalista];

         novalista = novalista.filter((item, i)=>{
           if(item.id != index ) {
            return true;
           }
           else{
               return false;
           }

           
        });

       setMinhalista(novalista);
    }
    
 

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Tarefas, {saudacao}</Text>
            <Text style={styles.subTitulo}>Minha lista de tarefas</Text>

            <TextInput 
                value={lista}
                
                returnKeyType="search" 
                style={styles.campo} 
                onChangeText={setLista} 
                placeholder="Digite uma tarefa"/>

            <TouchableOpacity style={styles.botao}  onPress={adicionalista}>
                <Text style={styles.textoBotao}></Text>
                <Ionicons name="add-circle" size={50} color="white" />
                
            </TouchableOpacity>

            <Text style={styles.titulobaixo}>Minha Tarefas</Text>

            <FlatList
                data={minhalista}
                keyExtractor={(item) => item.id}
                renderItem={(({item}) => 
                    <View style={styles.botaolista}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={styles.textoBotaolista}>{item.nome}</Text>
                            <TouchableOpacity onPress={()=>deletarlista(item.id)}>
                            <AntDesign name= "delete"  size={20} color="white" />
                            <FontAwesome name="edit" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
          
            />

        </View>
    );
}

const styles = StyleSheet.create({
    
  container:{
      flex:1,
      paddingTop: 80,
      backgroundColor: '#0e0e14',
      paddingVertical:70,
      paddingHorizontal:20,
      
      
  },

  titulo:{
    color: '#fff',
    fontSize:24,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10
  },
  titulobaixo:{
    color: '#fff',
    fontSize:12,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10
  },

  subTitulo:{
    color: '#fff',
    fontSize:15,
  },

  campo:{
    backgroundColor: '#fff',
    color: '#000000',
    fontSize:18,
    marginTop:30,
    borderRadius:70,
    padding:15
  },

  botao:{
  
    padding: 15,
    borderRadius: 70,
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20
  },

  textoBotao:{
    color: '#4161BF',
    fontSize:17,
    fontWeight: 'bold'
  },

  botaolista:{
    backgroundColor: '#1F1E25',
    padding:15,
    marginBottom: 10
  },

  textoBotaolista:{
    color: '#FFF',
    fontSize:22,
    fontWeight: 'bold',
    
    
  }

});
