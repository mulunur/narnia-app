import * as React from 'react';
import { Button, View, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HOST_WITH_PORT } from '../../environment.js'
import {manipulateAsync} from 'expo-image-manipulator'



export function NewItemScreen({ navigation }) {
    //navigation.navigate('ImagePickScreen')
    const [image, setImage] = React.useState(null)
    const [category, setCategory] = React.useState(null)
    const [color, setColor] = React.useState(null)

    const reduceImage = async(rawImage) => {
        const reduceResult = await manipulateAsync(
            rawImage.uri, [{resize: {height: rawImage.height/4, width:rawImage.width/4}}], {compress: 0.5, base64: true}
        )
        return reduceResult
    }

    async function TakeAPicture() {

        ImagePicker.requestCameraPermissionsAsync()
    
        ImagePicker.PermissionStatus.GRANTED
        let result = await ImagePicker. launchCameraAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            base64:true, 
            quality: 0.5,
            
        }
        );

        
        //sendImage(result.assets[0])
        sendImage(await reduceImage(result.assets[0]))
    }

    const sendImage = async (image) => {
        console.log(image)
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
        <View style={{ flex: 1, margin:30}}>
            <Button title="Сделать фото" onPress={TakeAPicture} />
            <Button title="Выбрать из галереи" />
            {image && <View>

            <Image style={{ 
                width: '70%', 
                height: 370,
                alignSelf: 'center',
                backgroundColor: 'white',
                resizeMode: 'contain'
                }} source={{uri: image}} />
             <TextInput value={category} style={{alignSelf: 'center', fontSize:20}} onChangeText={setCategory}/>
             <TextInput value={color} style={{alignSelf: 'center', fontSize:20}} onChangeText={setColor} />
             <Button title="Сохранить" onPress={saveUserResult}/>
            </View>}
            
        </View>
    )

}