import * as React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { styles } from './styles';

export function LooksScreen ({navigation}) {
    return (
        <View style={{flex:1}}>
            <Pressable onPress={() => navigation.navigate('NewLookScreen')}>
                <Image style={styles.addItem} source={require("./img/plus.png")}/>
            </Pressable>
            <Text>Looks screen</Text>
            <ScrollView>
              
            </ScrollView>
        </View>
    )
}