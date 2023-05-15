import React from "react";
import { View,  Image, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../screens/styles';

export function AddAndSearchButtonsBar({navigation}) {
    return (
        <View style={{height: 50, width: '100%', flexDirection:'row', justifyContent:'space-between'}}>
            <Pressable onPress={() => navigation.navigate('NewItemScreen')} style={styles.search}>
                <Image style={{width:30, height:30}} source={require("./img/loupe.png")}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('NewItemScreen')} style={styles.addItem}>
                <Image style={{width:30, height:30}} source={require("./img/plus.png")}/>
            </Pressable>
        </View>
    )
}