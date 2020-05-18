import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { connect } from 'react-redux';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fullname: '',
            Username: '',
            PhoneNumber: '',
            Password: ''
        }
    }
    signup = () => {
        const link = this.props.requestUrl + '/register';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'PhoneNumber': this.state.PhoneNumber,
                'Password': this.state.Password,
                'Username': this.state.Username,
                'Fullname': this.state.Fullname
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == 'success') {
                this.props.navigation.navigate('LogIn');
            }
            else if(responseJSON == 'saveControlProblem') {
                Alert.alert('Hata', 'İnternet bağlantınızı kontrol edin.');
            }
            else if(responseJSON == 'alreadyExist') {

            }
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={style.header}>
                    <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Üye Ol</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '90%' }}>
                    <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Ad Soyad'
                                mode='outlined'
                                placeholder='Adınızı Soyadınızı giriniz'
                                value={this.state.Fullname}
                                onChangeText={(newValue) => this.setState({ Fullname: newValue  })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Kullanıcı Adı'
                                mode='outlined'
                                placeholder='Kullanıcı adınızı giriniz'
                                value={this.state.Username}
                                onChangeText={(newValue) => this.setState({ Username: newValue  })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Kullanıcı Adınız eşsiz olmalı.
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Telefon Numarası'
                                mode='outlined'
                                value={this.state.PhoneNumber}
                                placeholder='Telefon Numaranızı giriniz'
                                onChangeText={(newValue) => this.setState({ PhoneNumber: newValue })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Telefon numarası eşsiz olmalı.
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 20}}>
                            <TextInput 
                                label='Şifre'
                                mode='outlined'
                                value={this.state.Password}
                                placeholder='********'
                                onChangeText={(newValue) => this.setState({ Password: newValue })}
                                secureTextEntry={true}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                        </View>
                        <View>
                            <Button mode="contained" onPress={() => this.signup()} color='#09a77e' loading={false} labelStyle={{ color: "white" }} mode='contained'>
                                Üye Ol
                            </Button>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Button mode="contained" onPress={() => {}} color='#f7931a' loading={false} labelStyle={{ color: "white" }} mode='contained' onPress={() => this.props.navigation.navigate('LogIn')} >
                                Giriş Yap
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
const style = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15
    }
});