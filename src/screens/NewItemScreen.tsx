import * as React from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Permissions from 'react-native-permissions';

export function NewItemScreen({navigation}) {
//navigation.navigate('ImagePickScreen')

async function TakeAPicture(){

    const options = {
       mediaType: 'photo',
       saveToPhotos: false
    }
    
    //let isCameraPermitted = Permissions.request('ios.permission.CAMERA')
    // let isStoragePermitted = await requestExternalWritePermission();
    //let {status} = await ImagePicker.getCameraPermissionsAsync(Permissions.PERMISSIONS.IOS.CAMERA)
    ImagePicker.requestCameraPermissionsAsync()
    //ImagePicker.useCameraPermissions()
    let result = await ImagePicker.launchCameraAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images}
    // , response => {
    //     if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //     } else if (response.errorCode) {
    //     console.log('ImagePicker Error: ', response.errorCode);
    //     } else {
    //     console.log('Image taken: ', response.assets);
    //     }
      //}
      );
        console.log(result)
    // launchCamera(options, responce => {

    // })
      
}

    return(
        <View>
            <Button title="Сделать фото" onPress={TakeAPicture}/>
            <Button title="Выбрать из галереи"/>
        </View>
    )
}