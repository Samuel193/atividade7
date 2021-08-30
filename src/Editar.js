import Axios from 'axios';
import React, {useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput, Button } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {useNavigation, useRoute} from '@react-navigation/native';


const Editar = () => {


    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [modelo, setModelo] = useState();
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [img, setImg] = useState('');
    const [id, setId] = useState('');

    const navigation = useNavigation();
    const route = useRoute();


    useEffect(() => {

        const product = route.params.product;

        setTitulo(product.titulo);
        setCategoria(product.categoria);
        setModelo(product.modelo);
        setQuantidade(product.quantidade.toString());
        setPreco(product.preco);
        setImg(product.img);
        setId(product.id)
    })


    const saveProduct =()=>{

        if( titulo.trim() === ""){
            alert("Titulo deve ser preenchido")
        }else {
                Axios.patch('http://10.0.2.2:3000/products/'+id, {
                titulo,
                categoria,
                modelo,
                quantidade,
                preco,
                img
            
            }).then((res) => {
                alert("Salvo com Sucesso")
                navigation.navigate('Home', {res})
            }).cath(() => 
                alert("Erro ao Salvar")
            )
        }
    }
      
    const deleteProduct = () =>{
       
            Axios.delete('http://10.0.2.2:3000/products/'+id,).then((res) => {      
                alert("Deletado com Sucesso")
                navigation.navigate('Home', {res})
            }).cath(() => 
                alert("Erro ao Deletar")
            )
        
    }
        

     useEffect(() => { }, []);


    return (
    <View style={styles.titulo} >
         <Image source={{ uri: img ? img : null }} 
            style={styles.tituloImagem } />

        <TouchableOpacity onPress={()=> ImagePicker.showImagePicker({}, (res) => setImg(res.uri))}>
            <Text>Carregar imagem</Text>
         </TouchableOpacity>
              
        <TextInput
            value={titulo}
            onChangeText={(txt) => setTitulo(txt)}
            placeholder = "Titulo"
            style={styles.textInputTitulo}
            placeholderTextColor="5a5a5a"
        />
           
        <TextInput value= {categoria} onChangeText={(txt) => setCategoria} placeholder="Categoria" />
        <TextInput value= {modelo} onChangeText={(txt) => setModelo} placeholder="Modelo" />
        <TextInput value= {quantidade} onChangeText={(txt) => setQuantidade} placeholder="Quantidade" />
        <TextInput value= {preco} onChangeText={(txt) => setPreco} placeholder="Modelo" />

        <Button title="Cadastrar" onPress={saveProduct} />
        <Button title="Excluir" onPress={deleteProduct} />
    </View>
    )    
}
const styles = StyleSheet.create({
    titulo:{ 
        padding:20, 
        alignItems: "center"
    
    },
    tituloImagem:{ 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderColor: '#545454', 
        borderWidth: 1 
        },
    textInputTitulo:{
        fontSize: 16, 
        marginTop: 10, 
        borderWidth: 1, 
        width: '100%', 
        height: 50, 
        borderRadius: 10, 
        padding: 10
    }
})
export default Editar;