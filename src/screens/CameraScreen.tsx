import * as React from 'react';
import {Camera, CameraType} from 'expo-camera';
import {launchCamera} from 'react-native-image-picker';
import { Button, TouchableOpacity, View, Text } from 'react-native';
import Permissions from 'react-native-permissions';


export function CameraScreen({navigation}) {


    
    const [type, setType] = React.useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();



    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

    function TakeAPicture(){
        launchCamera({mediaType:'photo'}, response => {
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
            } else {
            console.log('Image taken: ', response.assets);
            }
          });
          
    }

    return(
        <View>
            <Camera type={type}>
                <View>
                    <TouchableOpacity onPress={TakeAPicture}>
                        <Text>flip camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}