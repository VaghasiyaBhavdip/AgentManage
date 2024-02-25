import { View, Text, Modal, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../helper/responsiveSize'
import { Color } from '../styles/styles'
import { FontsFamily } from '../utility/util'

interface MessagePopupProps {
    visible: boolean
    onChange: (val: boolean) => void
}
const MessagePopup: React.FC<MessagePopupProps> = ({ visible, onChange }) => {
    useEffect(() => {
        setTimeout(() => {
            onChange(false)
        }, 1500)
    }, [visible])
    return (
        <Modal visible={visible} transparent>
            <View style={styles.MainView}>
                <View style={styles.CardView}>
                    <Image
                        source={require('../assets/images/check.png')}
                        style={styles.Image}
                    />
                    <Text style={styles.CardTitle}>Managing agent details deleted</Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    CardView: {
        marginTop: moderateScaleVertical(20),
        padding: moderateScale(10),
        width: '90%',
        backgroundColor: Color.PopupBg,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: moderateScale(8)

    },
    CardTitle: {
        fontSize: textScale(16),
        lineHeight: moderateScaleVertical(24),
        color: Color.White,
        fontFamily: FontsFamily.Medium,
        textAlign: 'left',
        paddingLeft: moderateScale(8)
    },
    Image: {
        height: moderateScaleVertical(25),
        width: moderateScale(25),
    }
})

export default MessagePopup