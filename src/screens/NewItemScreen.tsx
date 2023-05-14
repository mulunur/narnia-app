import * as React from 'react';
import { Button, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Permissions from 'react-native-permissions';
import { HOST_WITH_PORT } from '../../environment.js'
import axios from 'axios';

export function NewItemScreen({ navigation }) {
    //navigation.navigate('ImagePickScreen')
    const [image, setImage] = React.useState(null)

    async function TakeAPicture() {

        const options = {
            mediaType: 'photo',
            saveToPhotos: false
        }

        ImagePicker.requestCameraPermissionsAsync()
    
        let result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images }
        );
        console.log(result.assets[0])
        //setImage(result.assets[0].uri)
        

        // const data = {
        //     category: "",
        //     color: "",
        //     image,
        //     rmbg_image: null
        // }
        // if (image) {
        //     console.log("DATA SENDIND" + image)
        //     const responce = await fetch(`${HOST_WITH_PORT}/api/items/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })

        //     const res = await responce.json()

        //     console.log(res)
        // }

        sendImage(result.assets[0])
    }

    const sendImage = async (image) => {
        try {
            let formData = {
                category: "",
                color: "",
                image: image,
            }

            let formData1 = new FormData()
            formData1.append('image', image, "image_test.jpg")
           
            formData1.append('category', 'test')
            formData1.append('color', 'test')
            formData1.append('id', '3')
            //formData1.append('rmbg_image', null)

            const responce = await fetch(`${HOST_WITH_PORT}/api/items/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData1
            })
            const data = await responce.json()
            console.log("RESPONCE FROM POST" + JSON.stringify(data))

            //console.log("next post")

            // axios.post(`${HOST_WITH_PORT}/api/items/`, formData1, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }).then(res => {
            //     //console.log(res.data)
            // }).catch(err => console.log(err))

            //console.log("SEND WITH POST" + JSON.stringify(formData1))
            
            //const {id} = data.id
            //getImage(id)
            

        }catch(e){
            console.log(e)
        }
    }

    const getImage = async(id) => {
        try {
            const responce = await fetch(`${HOST_WITH_PORT}/api/items/${id}`, {
                method: 'GET'
            })
            let image = await responce.blob()
            setImage(URL.createObjectURL(image) )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title="Сделать фото" onPress={TakeAPicture} />
            <Button title="Выбрать из галереи" />
            {image && <Image style={{ width: 60, height: 60 }} source={image} />}
        </View>
    )
}