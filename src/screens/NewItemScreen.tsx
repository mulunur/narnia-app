import * as React from 'react';
import { Button, View, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Permissions from 'react-native-permissions';
import { HOST_WITH_PORT } from '../../environment.js'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob'

export function NewItemScreen({ navigation }) {
    //navigation.navigate('ImagePickScreen')
    const [image, setImage] = React.useState(null)
    const [category, setCategory] = React.useState(null)
    const [color, setColor] = React.useState(null)

    async function TakeAPicture() {

        ImagePicker.requestCameraPermissionsAsync()
    
        ImagePicker.PermissionStatus.GRANTED
        let result = await ImagePicker. launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, base64:true}
        );
        
        sendImage(result.assets[0])
    }

    const sendImage = async (image) => {
        try {

            let formData = new FormData()
            formData.append('image', image.base64)
            formData.append('category', 'test')
            formData.append('color', 'test')
            formData.append('id', '3')

            const response = await fetch(`${HOST_WITH_PORT}/api/items/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            }
            )
            const data = await response.json()
            console.log("RESPONSE FROM POST" + JSON.stringify(data))
            console.log(data.id)

            getImage(data.id)
            setImage(data.rmbg_image)
            setCategory(data.category)
            setColor(data.color)

        }catch(e){
            console.log(e)
        }
    }

    const getImage = async(id) => {
        try {
            const response = await fetch(`${HOST_WITH_PORT}/api/items/${id}`, {
                method: 'GET'
            })
            console.log(JSON.stringify(response))
            //let image = await response.blob()
            //console.log(URL.createObjectURL(image))
            //setImage(URL.createObjectURL(image) )
        } catch (e) {
            console.log(e)
        }
    }

    const saveUserResult = async() => {
        navigation.goBack(null)
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title="Сделать фото" onPress={TakeAPicture} />
            <Button title="Выбрать из галереи" />
            {image && <Image style={{ 
                width: 270, 
                height: 320,
                alignSelf: 'center'
                }} source={{uri: image}} />}
            {category && <TextInput value={category} style={{alignSelf: 'center', fontSize:20}}/>}
            {color && <TextInput value={color} style={{alignSelf: 'center', fontSize:20}}/>}
            {image && <Button title="Сохранить" onPress={saveUserResult}/>}
        </View>
    )

}