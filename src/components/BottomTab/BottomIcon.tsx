import * as React from 'react';
import { View, Image } from "react-native";

export function BottomIcon ({name, size, color}){
    const [image, setImage] = React.useState(require('./img/closet.png'));
    // setImage(name)
    // не возможно поставить динамическое изображение
    React.useEffect(() => {
        if (name=== "Шкаф") {
            setImage(require('./img/sweater.png'))
        }
        if (name=== "Образы") {
            setImage(require('./img/clothes.png'))
        }
    }, [])
    return (
        // <Image source={{uri: './img/sweater.png'}}/>
        <Image style={{width:25, height:25}} source={image}/>
        )
}