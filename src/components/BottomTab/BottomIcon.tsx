import * as React from 'react';
import { View, Image } from "react-native";

export function BottomIcon ({name, size, color}){
    // const [image, setImage] = React.useState(name);
    // setImage(name)
    // не возможно поставить динамическое изображение
    return (
        <Image source={{uri: './img/sweater.png'}}/>
        )
}