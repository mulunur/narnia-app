import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    addItem: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    search: {
        width: 40,
        height: 40,
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 23
    },

    itemCardContainer: {
       //marginHorizontal: 25,
        width: '50%',
        flexDirection: 'row',
        borderRadius: 10,
        
    },

    itemCard: {
        //marginHorizontal: 25,
        alignSelf : "center",
        justifyContent: 'center',
        alignItems: 'center',
        //width: 130,
        height: 200,
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        padding: 5,
        borderRadius: 15,
    },

    itemImage: {
        width: '100%' ,height: 100, 
        flex: 1,
        resizeMode: 'contain'
    },

    scrollViewCards: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})


