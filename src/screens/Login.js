import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Systrace } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PhoneNumber: '',
            Password: '',
            warn: false
        }
    }
    login = () => {
        const link = this.props.requestUrl + '/login';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'PhoneNumber': this.state.PhoneNumber,
                'Password': this.state.Password
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == 'wrongEntry') {
                this.setState({
                    warn: true
                })
            }
            else {
                this.saveDatas(responseJSON);
                this.setState({
                    warn: false
                });
                this.props.navigation.navigate('Home');
            }
        })
    }
    saveDatas = (data) => {
        // Düzenlenmeli.
        data = JSON.parse(data);
        this.props.updateAllData(data);
        /*
        SyncStorage.set('userid', data.ID);
        SyncStorage.set('usertoken', data.Token);
        SyncStorage.set('username', data.Username);
        SyncStorage.set('fullname', data.Fullname);
        SyncStorage.set('userphoto', data.Photo);
        SyncStorage.set('phonenumber', data.PhoneNumber);
        SyncStorage.set('money', data.Money);
        SyncStorage.set('address', data.Address);
        */
    }
    render() {
        return (
            <ScrollView>
                <View style={style.header}>
                    <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Giriş Yap</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '90%' }}>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Telefon No'
                                mode='outlined'
                                value={this.state.PhoneNumber}
                                onChangeText={(newValue) => this.setState({ PhoneNumber: newValue })}
                                placeholder='Telefon No'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Şifre'
                                mode='outlined'
                                value={this.state.Password}
                                onChangeText={(newValue) => this.setState({ Password: newValue  })}
                                placeholder='********'
                                secureTextEntry={true}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={this.state.warn}>
                                (Kullanıcı Adı & Tel. No) veya şifre hatalı.
                            </HelperText>
                        </View>
                        <View>
                            <Button mode="contained" onPress={() => this.login()} color='#09a77e' loading={false} labelStyle={{ color: "white" }} mode='contained'>
                                Giriş Yap
                            </Button>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('SignUp')} color='#f7931a' loading={false} labelStyle={{ color: "white" }} mode='contained' onPress={() => this.props.navigation.navigate('SignUp')} >
                                Üye Ol
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
        updateAllData: (data) => dispatch({
            type: 'updateAllData',
            payload: {
                data: data
            }
        })
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Login);
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