import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import WrapperView from '../component/WrapperView';
import { moderateScale, moderateScaleVertical, textScale, width } from '../helper/responsiveSize';
import { FontsFamily } from '../utility/util';
import CustomButton from '../component/CustomButton';
import { Color, CommonStyle } from '../styles/styles';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getItemValue, removeItem } from '../helper/helperFuncations';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setUserData } from '../redux/action/UserDataAction';
import DeleteCard from '../component/DeleteCard';
import MessagePopup from '../component/MessagePopup';

interface List {
    CompanyName: string,
    PersonName: string,
    MobileNumber: string,
    LandlineNo: string,
    LicenseNo: string
    PrimaryEmail: string,
    SecondaryEmail: string
}
type ManageByAgentProps = {
    navigation: NativeStackNavigationProp<any>;
};
const ManageByAgent: React.FC<ManageByAgentProps> = ({ navigation }) => {
    const userData = useSelector((state: any) => state.UserData.data);

    const [AgentDetails, setAgentDetails] = useState<List[] | null>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [DeleteSuccessfully, setDeleteSuccessfully] = useState<boolean>(false)

    useEffect(() => {
        const newAgent: List = userData

        if (newAgent)
            setAgentDetails([userData]);
    }, [userData])
    useEffect(() => {
        (async () => {
            const userDataInfo = await getItemValue('UserData')

            if (userDataInfo && !userData) {
                setUserData(userDataInfo)
            }
        })()
    }, [])
    const exitApp = () => {
        BackHandler.exitApp();
    };
    const renderItem = ({ item, index }: { item: List, index: number }) => {
        return (
            <View style={styles.CardView}>
                <View style={styles.CardHeaderView}>
                    <View style={styles.RowDirection}>
                        <View style={{ width: '10%' }}>
                            <Image
                                source={require('../assets/images/Person.png')}
                                style={styles.Contact}
                            />
                        </View>
                        <View style={styles.CardDetailView}>
                            <View style={[styles.RowDirection, { flex: 1 }]}>
                                <View style={{ width: '88%' }}>
                                    <Text style={styles.CardTitle}>{item?.CompanyName}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('AddManageAgent')
                                }}>
                                    <Text style={[styles.UnderLineText, { color: Color.EnableBtn }]}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.CardDetailText}>{item?.PersonName}</Text>
                            <Text style={[styles.CardDetailText, { marginTop: moderateScaleVertical(5) }]}>{item?.MobileNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={CommonStyle.HorizontalLineCard} />
                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() => {
                        setVisible(true)

                    }}>
                    <Text style={[styles.UnderLineText, { color: Color.Red }]}>Delete Agent</Text>
                </TouchableOpacity>
            </View>)
    }

    return (
        <WrapperView>
            <View style={styles.MainView}>
                <DeleteCard
                    visible={visible}
                    onChange={(value) => {
                        setVisible(false)
                        if (value == '2') {
                            setAgentDetails([])
                            setUserData(undefined)
                            removeItem('UserData')
                            setDeleteSuccessfully(true)
                        }
                    }
                    }
                />
                <MessagePopup
                    visible={DeleteSuccessfully}
                    onChange={(val) => {
                        setDeleteSuccessfully(val)
                    }}
                />
                <View style={styles.CloseVeiw}>
                    <Pressable
                        onPress={() => { exitApp() }}>
                        <Image
                            source={require('../assets/images/close.png')}
                            style={styles.CloseButton}
                        />
                    </Pressable>
                </View>
                <View style={styles.TitleView}>
                    <Text style={styles.TitleText}>Managed by Agent</Text>
                </View>
                <View style={styles.FooterView}>
                    {AgentDetails?.length == 0 ? <>
                        <View style={styles.ManStandUpView}>
                            <Image
                                source={require('../assets/images/ManStandUp.png')}
                                style={styles.ManStandUp}
                            />
                        </View>
                        <View style={CommonStyle.HorizontalLine} />
                        <CustomButton
                            ButtonTitle='Add Managing Agent'
                            Disable={false}
                            Onpress={() => {
                                navigation.navigate('AddManageAgent')
                            }}
                        />
                    </> :
                        <View style={{ width: '100%' }}>
                            <FlatList
                                data={AgentDetails}
                                renderItem={renderItem}
                                keyExtractor={(item: any, index: any) => index}
                            /></View>}
                </View>

            </View>
        </WrapperView>
    );
};
const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        padding: moderateScale(18),
        backgroundColor: Color.Background
    },
    CloseVeiw: {
        flex: .5,
        alignItems: 'flex-end',
        justifyContent: 'center',

    },
    TitleView: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    FooterView: {
        flex: 6,
        alignItems: 'center',
    },
    CloseButton: {
        height: moderateScaleVertical(25),
        width: moderateScale(25)
    },
    TitleText: {
        fontSize: textScale(32),
        lineHeight: moderateScaleVertical(36),
        color: Color.Black,
        fontFamily: FontsFamily.Medium
    },
    ManStandUpView: {
        flex: 1,
        justifyContent: 'center'
    },
    ManStandUp: {
        height: moderateScaleVertical(262),
        width: moderateScale(181),
    },
    CardView: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Color.White,
        borderRadius: moderateScale(12),
        shadowOpacity: 0.4,
        shadowRadius: moderateScale(30),
        shadowOffset: { width: moderateScale(10), height: moderateScaleVertical(2) },
        elevation: 5,
        padding: moderateScale(16),
        margin: moderateScale(16),
        marginTop: 0

    },
    CardHeaderView: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    Contact: {
        height: moderateScaleVertical(25),
        width: moderateScale(25)
    },
    CardDetailView: {
        marginLeft: moderateScale(5),
        flex: 1,
    },
    CardTitle: {
        fontSize: textScale(18),
        fontFamily: FontsFamily.SemiBold,
        color: Color.Black,
        lineHeight: moderateScaleVertical(20),
        // alignSelf: 'center'
    },
    UnderLineText: {
        fontSize: textScale(16),
        fontFamily: FontsFamily.SemiBold,
        textDecorationLine: 'underline',
    },
    RowDirection: {
        flexDirection: 'row'
    },
    CardDetailText: {
        fontSize: textScale(16),
        lineHeight: moderateScaleVertical(20),
        fontFamily: FontsFamily.Medium,
        color: Color.Black
    }
});

export default ManageByAgent;
