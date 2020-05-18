import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, HelperText, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FullName: this.props.fullname,
            UserName: this.props.username,
            PhoneNumber: this.props.phonenumber,
            Address: this.props.address,
            FullnameWarn: false,
            UsernameWarn: false,
            PhonenumberWarn: false,
            AddressWarn: false,
            PhotoUploadLoading: false,
            DataUploadLoading: false
        }
    }
    updateData = () => {
        this.setState({
            DataUploadLoading: true
        });
        let link = this.props.requestUrl + '/profiledataupdate';
        fetch(link, {
            method: 'POST', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.userToken,
                'UserName': this.state.UserName,
                'PhoneNumber': this.state.PhoneNumber,
                'Address': this.state.Address,
                'FullName': this.state.FullName
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == 'success') {
                Alert.alert("Güvenlik gerekçesi yüzünden tekrar login olmanız gerekli.");
                this.setState({
                    UsernameWarn: false,
                    PhonenumberWarn: false,
                    FullName: false,
                    AddressWarn: false,
                    DataUploadLoading: false
                });
                this.props.updateSearchResult();
                this.props.navigation.navigate('LogIn');
            }
            else if(responseJSON == 'saveControlProblem') {
                Alert.alert("İnternet bağlantınızı kontrol edin.");
                this.setState({
                    DataUploadLoading: false
                })
            }
            else if(responseJSON = 'alreadyExist') {
                this.setState({
                    UsernameWarn: true,
                    PhonenumberWarn: true,
                    DataUploadLoading: false
                });
            }
            else if(responseJSON == 'tokenError') {
                Alert.alert("Bir sorun oluştu.");
                this.setState({
                    DataUploadLoading: false
                })
            }
        })
        .catch((err) => {
            Alert.alert("İnternet bağlantınızı kontrol edin.");
        })
    }
    updatePhoto = () => {
        this.setState({
            PhotoUploadLoading: true
        });
        const options = {
            title: 'Fotoğraf Yükle',
            cancelButtonTitle: 'İptal',
            takePhotoButtonTitle: 'Kameradan fotoğraf çek...',
            chooseFromLibraryButtonTitle: 'Galeriden fotoğraf seç...',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }; 
        ImagePicker.showImagePicker(options, (response) => {
            if(response.error) {
                Alert.alert('Bir sorun oluştu: ', response.error);
            }
            else {
                const newPhoto = "data:image/jpg;base64," + response.data;
                const link = this.props.requestUrl + '/photoupdate';
                fetch(link, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'UserID': parseInt(this.props.userID),
                        'UserToken': this.props.userToken,
                        'Photo': newPhoto
                    })
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    if(responseJSON == 'success') {
                        Alert.alert("Fotoğrafınız başarılı bir şekilde güncellendi.");
                        this.setState({
                            PhotoUploadLoading: false
                        });
                        this.props.updatePhoto(newPhoto);
                    }
                    else if(responseJSON == 'saveControlProblem') {
                        Alert.alert("İnternet bağlantınızı kontrol ediniz.");
                        this.setState({
                            PhotoUploadLoading: false
                        });
                    }
                })
            }
        });

    }
    render() {
        return (
            <ScrollView>
                <View style={style.header}>
                    <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Profil</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '90%' }}>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Adınız ve Soyadınız'
                                mode='outlined'
                                placeholder='Adınızı ve Soyadınızı girin'
                                value={this.state.FullName}
                                onChangeText={(newValue) => this.setState({ FullName: newValue })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={this.state.FullnameWarn}>
                                İsim ve soyisim boş geçilemez ve özel karakter içeremez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Kullanıcı Adı'
                                mode='outlined'
                                value={this.state.UserName}
                                placeholder='Kullanıcı adınızı girin'
                                onChangeText={(newValue) => this.setState({ UserName: newValue })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={this.state.UsernameWarn}>
                                Kullanıcı adı mevcut veya boş geçilemez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Telefon Numarası'
                                mode='outlined'
                                value={this.state.PhoneNumber}
                                placeholder='Telefon numaranızı girin'
                                onChangeText={(newValue) => this.setState({ PhoneNumber: newValue })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={this.state.PhonenumberWarn}>
                                Telefon Numarası boş geçilemez ve sadece rakam içerebilir!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Adres'
                                mode='outlined'
                                value={this.state.Address}
                                placeholder='Adresinizi girin'
                                onChangeText={(newValue) => this.setState({ Address: newValue })}
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={this.state.AddressWarn}>
                                Bilderim Coin ile aldığınız hediyelerin kargolanması için gerekli!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 30}}>
                            <Button mode="contained" onPress={() => this.updatePhoto()} color='#f7931a' loading={this.state.PhotoUploadLoading} labelStyle={{ color: "white" }} mode='contained'>
                                Profil Fotoğrafını Güncelle
                            </Button>
                        </View>
                        <View style={{ marginBottom: 30}}>
                            <Button mode="contained" onPress={() => this.updateData()} color='#09a77e' loading={this.state.DataUploadLoading} labelStyle={{ color: "white" }} mode='contained'>
                                Bilgilerini Güncelle
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
        requestUrl: state.requestUrl,
        userID: state.userid,
        userToken: state.usertoken,
        fullname: state.fullname,
        username: state.username,
        address: state.Address,
        phonenumber: state.PhoneNumber
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        resetRedux: () => dispatch({
            type: 'resetRedux'
        }),
        updatePhoto: (photoUri) => dispatch({
            type: 'updatePhoto',
            payload: {
                photo: photoUri
            }
        })
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
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