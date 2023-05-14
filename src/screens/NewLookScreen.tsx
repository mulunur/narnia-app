import * as React from 'react';
import {Canvas, useCanvasRef} from '@shopify/react-native-skia'
import {GestureDetector, Gesture} from 'react-native-gesture-handler'
import { Button, View, Image, Animated, Pressable } from 'react-native';
import {useSharedValue, useAnimatedStyle} from 'react-native-reanimated'
import {identity4, multiply4, Matrix4} from 'react-native-redash'
import * as ImagePicker from 'expo-image-picker';
import Permissions from 'react-native-permissions';
import { HOST_WITH_PORT } from '../../environment.js'
import axios from 'axios';
import { styles } from './styles';

export function NewLookScreen({ navigation }) {
    
    const matrix = useSharedValue(identity4)
    const pan = Gesture.Pan().onChange(e => {
        matrix.value = multiply4(matrix.value, Matrix4.translate(e.changeX, e.changeY, 0))
    });
    const pinch = Gesture.Pinch().onChange(e => {
        matrix.value = multiply4(matrix.value, Matrix4.scale(e.scaleChange, e.scaleChange, 1))
    });;
    const rotation = Gesture.Rotation().onChange(e => {
        matrix.value = multiply4(matrix.value, Matrix4.rotateZ(e.rotationChange))
    });

    const style = useAnimatedStyle(() => ({
        transform: [{matrix: matrix.value as unknown as number[]}],
    }))


    const ref = useCanvasRef();

    const saveCollague = async() => {
        let image = ref.current?.makeImageSnapshot()
        if (image) {
            // you can use image in an <Image> component
            // Or save to file using encodeToBytes -> Uint8Array
            const bytes = image.encodeToBytes();
          }
    }

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('ClosetScreen')}>
                <Image style={styles.addItem} source={require("./img/plus.png")}/>
            </Pressable>
            <GestureDetector gesture={Gesture.Race(pan, pinch, rotation)}>
                <Animated.View style={style}>
                    <Canvas>
                        
                    </Canvas>
                </Animated.View>
                
            </GestureDetector>
            <Button title='Сохранить коллаж'
            onPress={() => saveCollague()}/>
        
            
        </View>
    )
}