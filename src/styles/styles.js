import { StyleSheet } from "react-native"
import { moderateScaleVertical, width } from "../helper/responsiveSize"

export const Color={
    White:'#FFFFFF',
    Border:'black',
    Black:'#000000',
    PopupBg:'#1A1A1A',
    Blue:'blue',
    Gray:'gray',
    DisableBtn:'#A0A0A0',
    EnableBtn:'#0F0059',
    Red:'#D11A1A',
    Sky:'#1AFFEE',
    Background:'#F2F2F6'
}

export const CommonStyle=StyleSheet.create({
    HorizontalLine:{
        backgroundColor:Color.Gray,
        width:'100%',
        height:.8,
        marginVertical:moderateScaleVertical(35)
    },
    HorizontalLineCard:{
        backgroundColor:Color.Gray,
        width:'100%',
        height:.5,
        marginVertical:moderateScaleVertical(10)
    }
})