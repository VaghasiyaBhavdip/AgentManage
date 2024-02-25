import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical, textScale } from '../helper/responsiveSize'
import { Color } from '../styles/styles'
import { FontsFamily } from '../utility/util'

interface DeleteCardProps {
    visible: boolean
    onChange: (value: string) => void
}
const DeleteCard: React.FC<DeleteCardProps> = ({ visible, onChange = (val: string) => { } }) => {
    return (
        <Modal visible={visible} transparent animationType='slide'>
            <View style={styles.MainView}>
                <View style={styles.CardView}>
                    <Text style={styles.CardTitle}>Delete managing agent</Text>
                    <Text style={styles.CardDescription}>Are you sure you want to delete managing agent details?</Text>
                    <View style={styles.RowDirection}>
                        <TouchableOpacity
                            style={[styles.BtnView, { backgroundColor: Color.EnableBtn }]}
                            onPress={() => { onChange('1') }}>
                            <Text style={[styles.BtnText, { color: Color.White }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.BtnView, { backgroundColor: Color.Sky }]}
                            onPress={() => { onChange('2') }}>
                            <Text style={[styles.BtnText, { color: Color.Black }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CardView: {
        padding: moderateScale(12),
        width: '85%',
        backgroundColor: Color.White,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: moderateScale(10)

    },
    CardTitle: {
        fontSize: textScale(18),
        lineHeight: moderateScaleVertical(24),
        color: Color.Black,
        fontFamily: FontsFamily.SemiBold,
        textAlign: 'center'
    },
    CardDescription: {
        marginTop: moderateScaleVertical(10),
        fontSize: textScale(16),
        lineHeight: moderateScaleVertical(24),
        color: Color.Black,
        fontFamily: FontsFamily.Medium,
        textAlign: 'center'
    },
    RowDirection: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    BtnView: {
        marginTop: moderateScaleVertical(20),
        width: '48%',
        borderRadius: moderateScale(30),
        paddingVertical: moderateScaleVertical(15)
    },
    BtnText: {
        fontSize: textScale(16),
        lineHeight: moderateScaleVertical(24),
        fontFamily: FontsFamily.SemiBold,
        textAlign: 'center'
    }
})
export default DeleteCard