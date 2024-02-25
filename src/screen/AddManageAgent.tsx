import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import WrapperView from '../component/WrapperView';
import { moderateScale, moderateScaleVertical, textScale } from '../helper/responsiveSize';
import { FontsFamily } from '../utility/util';
import MyTextInput from '../component/MyTextInput';
import ValidationCheck, { ValidationCheckFun, ValidationStyle } from '../helper/ValidationCheck';
import { Color, CommonStyle } from '../styles/styles';
import CustomButton from '../component/CustomButton';
import { UserData } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setUserData } from '../redux/action/UserDataAction';
import { useSelector } from 'react-redux';
import { setItemValue } from '../helper/helperFuncations';

type AddManageAgentProps = {
  navigation: NativeStackNavigationProp<any>;
};
const AddManageAgent: React.FC<AddManageAgentProps> = ({ navigation }) => {
  const userData = useSelector((state: any) => state.UserData.data);
  const [Disable, setDisable] = useState(true)
  const [data, setData] = useState({
    CompanyName: '',
    PersonName: '',
    MobileNumber: '',
    LandlineNo: '',
    LicenseNo: '',
    PrimaryEmail: '',
    SecondaryEmail: ''
  })
  const [valid, setValid] = useState({
    CompanyName: undefined,
    PersonName: undefined,
    MobileNumber: undefined,
    LandlineNo: undefined,
    LicenseNo: undefined,
    PrimaryEmail: undefined,
    SecondaryEmail: undefined
  })
  const handler = (v: any, i: string) => {
    setData(e => ({ ...e, [i]: v }));

  };
  const validhandler = (v: any, i: string) => {
    setValid(e => ({ ...e, [i]: v }));
  };
  useEffect(() => {
    if (userData?.CompanyName) {
      setData(userData)
    }
  }, userData)
  const user: UserData = data;
  useEffect(() => {
    let CompanyName = ValidationCheckFun(ValidationCheck.NameWithSpace, data.CompanyName)
    let PersonName = ValidationCheckFun(ValidationCheck.NameWithSpace, data.PersonName)
    let MobileNumber = ValidationCheckFun(ValidationCheck.MobileNumber, data.MobileNumber)
    let LandlineNo = ValidationCheckFun(ValidationCheck.MobileNumber, data.LandlineNo)
    let LicenseNo = ValidationCheckFun(ValidationCheck.License, data.LicenseNo)
    let PrimaryEmail = ValidationCheckFun(ValidationCheck.Email, data.PrimaryEmail)
    let SecondaryEmail = ValidationCheckFun(ValidationCheck.Email, data.SecondaryEmail)

    if (CompanyName && PersonName && MobileNumber && LandlineNo && LicenseNo && PrimaryEmail && SecondaryEmail) {
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  }, [data.CompanyName, data.PersonName, data.MobileNumber, data.LandlineNo, data.LicenseNo, data.PrimaryEmail, data.SecondaryEmail])
  const CheckAndContinue = () => {
    let CompanyName = ValidationCheckFun(ValidationCheck.NameWithSpace, data.CompanyName)
    let PersonName = ValidationCheckFun(ValidationCheck.NameWithSpace, data.PersonName)
    let MobileNumber = ValidationCheckFun(ValidationCheck.MobileNumber, data.MobileNumber)
    let LandlineNo = ValidationCheckFun(ValidationCheck.MobileNumber, data.LandlineNo)
    let LicenseNo = ValidationCheckFun(ValidationCheck.License, data.LicenseNo)
    let PrimaryEmail = ValidationCheckFun(ValidationCheck.Email, data.PrimaryEmail)
    let SecondaryEmail = ValidationCheckFun(ValidationCheck.Email, data.SecondaryEmail)

    if (CompanyName && PersonName && MobileNumber && LandlineNo && LicenseNo && PrimaryEmail && SecondaryEmail) {
      setUserData(data)
      setItemValue('UserData', data)
      navigation.navigate('ManageByAgent')
    }
    else {
      CompanyName
        ? validhandler(true, 'CompanyName')
        : validhandler(false, 'CompanyName')
      PersonName
        ? validhandler(true, 'PersonName')
        : validhandler(false, 'PersonName')
      MobileNumber
        ? validhandler(true, 'MobileNumber')
        : validhandler(false, 'MobileNumber')
      LandlineNo
        ? validhandler(true, 'LandlineNo')
        : validhandler(false, 'LandlineNo')
      LicenseNo
        ? validhandler(true, 'LicenseNo')
        : validhandler(false, 'LicenseNo')
      PrimaryEmail
        ? validhandler(true, 'PrimaryEmail')
        : validhandler(false, 'PrimaryEmail')
      SecondaryEmail
        ? validhandler(true, 'SecondaryEmail')
        : validhandler(false, 'SecondaryEmail')
    }
  }
  return (
    <WrapperView>
      <View style={styles.MainView}>
        <View style={styles.CloseVeiw}>
          <Pressable
            onPress={() => {
              navigation.navigate('ManageByAgent')
            }}>
            <Text style={styles.CancleButton}>Cancel</Text>
          </Pressable>
        </View>
        <View style={styles.TitleView}>
          <Text style={styles.TitleText}>Add Managing Agent</Text>
        </View>
        <View style={styles.FooterView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <MyTextInput
                editable={true}
                title='Name of the Company'
                value={data.CompanyName}
                attrName="CompanyName"
                error={
                  valid.CompanyName == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.NameWithSpace, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'default'}
                maxLength={100}
              />
              {
                valid.CompanyName == false && <Text style={ValidationStyle.ErrorText}>Enter valid Name of the Company</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='Name of Contact Person'
                value={data.PersonName}
                attrName="PersonName"
                error={
                  valid.PersonName == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.NameWithSpace, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'default'}
                maxLength={1000}
              />
              {
                valid.PersonName == false && <Text style={ValidationStyle.ErrorText}>Enter valid Name of Contact Person</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='Mobile Number'
                value={data.MobileNumber}
                attrName="MobileNumber"
                error={
                  valid.MobileNumber == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.MobileNumber, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'numeric'}
                maxLength={10}
              />
              {
                valid.MobileNumber == false && <Text style={ValidationStyle.ErrorText}>Enter valid Mobile Number</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='Landline No'
                value={data.LandlineNo}
                attrName="LandlineNo"
                error={
                  valid.LandlineNo == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.MobileNumber, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'numeric'}
                maxLength={10}
              />
              {
                valid.LandlineNo == false && <Text style={ValidationStyle.ErrorText}>Enter valid Landline No</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='License No'
                value={data.LicenseNo}
                attrName="LicenseNo"
                error={
                  valid.LicenseNo == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.License, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={true}
                keyboardType={'default'}
                maxLength={10}
              />
              {
                valid.LicenseNo == false && <Text style={ValidationStyle.ErrorText}>Enter valid License No</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='Primary Email Address'
                value={data.PrimaryEmail}
                attrName="PrimaryEmail"
                error={
                  valid.PrimaryEmail == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.Email, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'default'}
                maxLength={100}
              />
              {
                valid.PrimaryEmail == false && <Text style={ValidationStyle.ErrorText}>Enter valid Primary Email Address</Text>
              }
            </View>
            <View>
              <MyTextInput
                editable={true}
                title='Secondary Email Address'
                value={data.SecondaryEmail}
                attrName="SecondaryEmail"
                error={
                  valid.SecondaryEmail == false && ValidationStyle.ValidationTextBoxView
                }
                onChageText={(val, attr) => {
                  handler(val, attr)
                  validhandler(true, attr)
                }}
                onChageValidation={(val, attr) => {
                  ValidationCheckFun(ValidationCheck.Email, val) == true
                    ? validhandler(true, attr)
                    : validhandler(false, attr)
                }}
                RemoveText=''
                autocapitalize={false}
                keyboardType={'default'}
                maxLength={100}
              />
              {
                valid.SecondaryEmail == false && <Text style={ValidationStyle.ErrorText}>Enter valid Secondary Email Address</Text>
              }
            </View>
            <View style={CommonStyle.HorizontalLine} />
            <CustomButton
              ButtonTitle='Submit'
              Disable={Disable}
              Onpress={() => {
                CheckAndContinue()
              }}
            />
          </ScrollView>
        </View>

      </View>
    </WrapperView>
  );
}
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    padding: moderateScale(18),
    backgroundColor: Color.Background
  },
  CloseVeiw: {
    flex: .5,
    alignItems: 'flex-start',
    justifyContent: 'center',

  },
  TitleView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },
  FooterView: {
    flex: 6,
    // alignItems:'center',
    // justifyContent:'center',
  },
  CancleButton: {
    fontSize: textScale(16),
    lineHeight: moderateScaleVertical(24),
    fontFamily: FontsFamily.SemiBold,
    color: Color.Black
  },
  TitleText: {
    fontSize: textScale(32),
    lineHeight: moderateScaleVertical(36),
    color: Color.Black,
    fontFamily: FontsFamily.Medium
  },
})
export default AddManageAgent