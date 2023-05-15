import * as React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { styles } from '../screens/styles'

export function PictureCard({image, isFetchImage}){
    return (
        <View style={styles.itemCardContainer}>
                <TouchableOpacity style={styles.itemCard} onPress={() => console.log("item")}>
                  <Image style={{width: 100,height: 100 }} source={{uri: image}}/>
                  <Text>there will be an image</Text>
                </TouchableOpacity>
              </View>
    )
}