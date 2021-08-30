import React,{useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import {useNavigation}from '@react-navigation/native';

import Axios from 'axios';


const Home = () => {

    const [products, setProducts] = useState([]);
  
    const route = useRoute();
  
    useEffect(() => {
      Axios.get("http://10.0.2.2:3000/products").then((res) => {
        setProducts(res.data)
      }).catch((erro) => alert("Erro ao requisitar produtos: " + erro))
    }, [route.params?.res])
  
    const navigation = useNavigation();
  
  
    return (
      <View>
  
        <View style={styles.viewCadastro}>
  
          <Text style={{ fontSize: 20 }}>Cadastro de Produtos</Text>
  
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.buttonCadastro}>Cadastrar</Text>
          </TouchableOpacity>
  
        </View>
  
        <FlatList
          style={{ padding: 20 }}
          keyExtractor={(item, index) => item.id.toString()}
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Editar', { product: item })} 
              style={styles.buttonEditar }>           
               
  
              <Image
                source={{ uri: item.img ? item.img : null }}
                style={styles.imagem} />
  
              <View  style={styles.viewTitulo}>
                <Text style={styles.textTitulo}>Produto:  
                    <Text style={styles.itemTitulo}> {item.titulo}</Text>
                </Text>

                <Text style={styles.textModelo}>Modelo: 
                </Text>

                <Text style={styles.textBold}>Categoria: 
                <Text style={styles.itemCategoria}> {item.categoria}</Text>
                </Text>

                <Text style={styles.textBold}>Quantidade: 
                    <Text style={styles.itemQuantidade}> {item.quantidade}</Text>
                </Text>
              </View>
  
            </TouchableOpacity>
  
          )} />
      </View>
    );
  }



    const styles = StyleSheet.create({
        viewCadastro: {
            flexDirection: 'row', 
            alignItems: "center", 
            justifyContent: 'space-around'
         },

        buttonCadastro: { 
            fontSize: 15, 
            color: "blue" 
        },
        buttonEditar : {
         flexDirection: "row", 
         backgroundColor: '#ACAC87', 
         marginBottom: 5, 
         borderRadius: 20 
        },

        imagem:{ 
            width: 100, 
            height: 100, 
            margin: 10, 
            borderRadius: 7 },

        viewTitulo: {
            paddingHorizontal: 10,
            flex: 0.8
        },
        textTitulo: {
            fontWeight: 'bold',
             textAlign: 'justify'
        },
        itemTitulo: {
            textAlign: 'justify',
            fontWeight: '100'
        },
        textModelo: {
         height: 40,
         justifyContent: 'center',
         marginVertical: 10,
     
        },
        itemCategoria: {
            textAlign: 'justify', 
            fontWeight: '100'
        },
        textBold:{
           fontWeight: 'bold'
        },
        itemQuantidade: {
            textAlign: 'justify', 
            fontWeight: 'bold',
            color:'#AF0000'}
      })
     
  
  export default Home;

  