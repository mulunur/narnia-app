import * as React from 'react';
import {Canvas, useCanvasRef, Image as ImageSkia, useImage} from '@shopify/react-native-skia'
import {GestureDetector, Gesture} from 'react-native-gesture-handler'
import { Button, View, Image, Animated, Pressable } from 'react-native';
import {useSharedValue, useAnimatedStyle} from 'react-native-reanimated'
import {identity4, multiply4, Matrix4} from 'react-native-redash'
import { HOST_WITH_PORT } from '../../environment.js'

import { styles } from './styles';

export function NewLookScreen({ route, navigation }) {
    
    let lookItemsList = new Array(10);
    let picture = useImage("http://192.168.1.2:8000/media/images_rmbg/bgrm_photo_sqirt.png")

    React.useEffect(() => {
        if(route.params?.itemsListLength){
            lookItemsList.length=route.params.itemsListLength
        }
        
        if(route.params?.item){
            
            const {item} = route.params
            console.log("in new look screen "+ item.rmbg_image)
            // const imageData = await Skia.Data.fromURI(`file://${photo.path}`);
            // lookItemsList.push({ ...photo, image: Skia.MakeImageFromEncoded(imageData) });
            
            lookItemsList.push(item.rmbg_image)
            lookItemsList.reverse()
            console.log(lookItemsList)
        }
        
      }, [route.params?.item])
    
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
            console.log(bytes)
          }
        lookItemsList.length = 0

          

        navigation.navigate({name: 'Образы', merge: true})
    }

    return (
        <View>
            <Pressable onPress={() => navigation.navigate('Bottom Tab Navigator', {screen: "Шкаф", params: {isFetchImage: true}})}>
                <Image style={styles.addItem} source={require("./img/plus.png")}/>
            </Pressable>
            <GestureDetector gesture={Gesture.Race(pan, pinch, rotation)}>
                <Animated.View style={{width: 100, height: 600}}>
                    <Canvas style={{flex: 1}}>
                        {lookItemsList?.map((item, index) => (
                            <ImageSkia key={item.rmbg_image} image={useImage(item)} fit="scaleDown" x={10*index} y={10*index} width={120} height={120}/>
                         ))}
                         {/* <ImageSkia key={1} image={picture} fit="scaleDown" x={0} y={0} width={100} height={100}/> */}
                    </Canvas>
                </Animated.View>
                
            </GestureDetector> 
            <Image source={{uri: "http://192.168.1.2:8000/media/images_rmbg/bgrm_photo_sqirt.png"}} style={{width:100, height: 100}}/>
            <Button title='Сохранить коллаж'
            onPress={() => saveCollague()}/>
        
            
        </View>
    )
}