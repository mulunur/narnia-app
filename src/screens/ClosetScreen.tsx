import * as React from 'react';
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { PictureCard } from '../components/PictureCard';
import {HOST_WITH_PORT} from '../../environment.js'
import axios from 'axios';


type Picture = {
    id: string;
    title: string;
    category: string;
    color: string;
  };



export function SkapScreen ({navigation}) {
    const [listImages, setListImages] = useState([])

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async() => {
      const response = await fetch(`${HOST_WITH_PORT}/api/items/`)
      const data = await response.json()
      setListImages(data)
      listImages.map((item) => {console.log(item.rmbg_image)})
    }

    const getPictureFromApiAsync = async () => {
        try {
          const response = await fetch(
            "http://192.168.1.3/clothes/1",
          );
          const json = await response.json();
          return json.picture;
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View style={{flex:1}}>
            <Pressable onPress={() => navigation.navigate('NewItemScreen')}>
                <Image style={styles.addItem} source={require("./img/plus.png")}/>
            </Pressable>
            <ScrollView>
              {/* <Image style={{height: 100, width: 100}} source={{uri: listImages[0]?.rmbg_image}}/> */}
              {listImages?.map((item) => (
                // <Text key={item.rmbg_image}>{item.rmbg_image}</Text>
                <PictureCard image={item.rmbg_image} key={item.id}/>
              ))}
            </ScrollView>
            <Text>Scap screen</Text>
        </View>
    )

    
}