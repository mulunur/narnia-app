import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';


type Picture = {
    id: string;
    title: string;
    category: string;
    color: string;
  };



export function SkapScreen ({navigation}) {
    

    function PostPicture(){
        console.log("take a picture")
        fetch("http://192.168.1.3/clothes/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue',
            }),
        })
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
        <View >
            <Pressable onPress={() => navigation.navigate('NewItemScreen')}>
                <Image style={styles.addItem} source={require("./img/plus.png")}/>
            </Pressable>
            <Text>Scap screen</Text>
        </View>
    )

    
}