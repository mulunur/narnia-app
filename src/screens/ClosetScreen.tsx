import * as React from 'react';
import { View,  Image, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { PictureCard } from '../components/PictureCard';
import {HOST_WITH_PORT} from '../../environment.js'
import { AddAndSearchButtonsBar } from '../components/AddAndSearchButtonsBar';


type Picture = {
    id: string;
    title: string;
    category: string;
    color: string;
  };



export function SkapScreen ({route, navigation}) {
    const [listImages, setListImages] = useState([])
    

    useEffect(() => {
      if(route.params?.isFetchImage){
        const {isFetchImage} = route?.params
      }
      fetchData()
    }, [route.params?.isFetchImage])

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

    const picAnItem = (item,index) => {
      if(route.params?.isFetchImage){
        console.log(item)
        navigation.navigate({name: 'NewLookScreen', params: {item: item}, merge: true})
      }
    }

    return (
        <View>
          <AddAndSearchButtonsBar navigation={navigation}/>
            
            <ScrollView contentContainerStyle={styles.scrollViewCards}>
              
              {listImages?.map((item, index) => (
               
                // <PictureCard image={item.rmbg_image} key={item.id} isFetchImage={isFetchImage}/>
                <View style={styles.itemCardContainer} key={index}>
                <TouchableOpacity key={index} style={styles.itemCard} onPress={event => picAnItem(item, index)}>
                  <Image style={styles.itemImage} source={{uri: item.rmbg_image}}/>
                </TouchableOpacity>
              </View>
              ))}
            </ScrollView>
        </View>
    )

    
}