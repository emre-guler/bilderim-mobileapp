import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { HelperText, TextInput, Button, Checkbox } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

class NewBet extends Component {
    constructor(props) {
        super(props);
        let currentDate = new Date(Date.now());
        this.state = {
            title: '',
            subject: '',
            Explain: '',
            FirstOptionRate: 1.1,
            SecondOptionRate: 1.1,
            Day: 1,
            Photo: '',
            PhotoUploadingState: false,
            DataSendingState: false,
        }
    }
    selectPhoto = () => {
        this.setState({
            PhotoUploadingState: true
        });
        const options = {
            title: 'Fotoğraf Yükle',
            cancelButtonTitle: 'İptal',
            takePhotoButtonTitle: 'Kameradan fotoğraf çek...',
            chooseFromLibraryButtonTitle: 'Galeriden fotoğraf seç...',
            storageOptions: {
                skipBackup: true,
                path: 'image'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if(response.error) {
                Alert.alert('Bir sorun oluştu', response.error)
            }
            else {
                const newPhoto = 'data:image/jpg;base64,' + response.data;
                this.setState({
                   Photo: newPhoto,
                   PhotoUploadingState: false 
                });
            }
        })
    }
    sendData = () => {
        this.setState({
            DataSendingState: true
        });
        if
        (
            this.state.title != '' || 
            this.state.subject != '' ||
            this.state.Explain != '' ||
            (this.state.FirstOptionRate != '' && this.state.FirstOptionRate > 1) ||
            (this.state.SecondOptionRate != '' && this.state.SecondOptionRate > 1) ||
            (this.state.Day > 0 && this.state.Day != '' ) ||
            this.state.Photo != '' 
        ) {
            const link = this.props.requestUrl + '/addBulletin';
            const foRate = this.state.FirstOptionRate.replace(/[- #*;,<>\{\}\[\]\\\/]/gi, '');
            const soRate = this.state.SecondOptionRate.replace(/[- #*;,<>\{\}\[\]\\\/]/gi, '');
            fetch(link, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'CreatorUser': parseInt(this.props.userID),
                    'UserToken': this.props.userToken,
                    'ExpaireAt': parseInt(this.state.Day),
                    'FirstOptionRate': parseFloat(foRate),
                    'SecondOptionRate': parseFloat(soRate),
                    'Title': this.state.title,
                    'Photo': this.state.Photo,
                    Explain: this.state.Explain
                })
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if(responseJSON == 'success') {
                    Alert.alert('Başarılı', 'Başarılı şekilde oluşuturldu. Yönetim ekibimiz en kısa zamanda ilgilenip kuralları uygun ise onay verecektir.');
                }
                else if(responseJSON == 'saveControlProblem') {
                    Alert.alert('Hata', 'İnternet bağlantınızı kontrol edin.');
                }
                else if(responseJSON == 'tokenError') {
                    Alert.alert('Hata', 'Bir sorun oluştu.');
                }
            })
            .catch((err) => {
                Alert.alert('Hata', 'İnternet bağlantınızı kontrol edin.');
            })
            this.setState({
                title: '',
                subject: '',
                Explain: '',
                FirstOptionRate: 1.1,
                SecondOptionRate: 1.1,
                Day: 1,
                Photo: '',
                PhotoUploadingState: false,
                DataSendingState: false
            })
        }
        else {
            Alert.alert('Hata', 'Alanları doğru şekilde doldurun.')
            this.setState({
                DataSendingState: false
            })
        }
    }
    render() {
        return (
            <ScrollView>
                 <View style={style.header}>
                    <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Yeni Ekle</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: '90%' }}>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Başlık'
                                mode='outlined'
                                value={this.state.title}
                                onChangeText={(newValue) => this.setState({ title: newValue }) }
                                placeholder='Başlığını girin'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Başlık boş geçilemez ve özel karakter içeremez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Konu'
                                mode='outlined'
                                value={this.state.subject}
                                onChangeText={(newValue) => this.setState({ subject: newValue })}
                                placeholder='Konuyu yazın'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Konu boş geçilemez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Açıklama'
                                mode='outlined'
                                value={this.state.Explain}
                                onChangeText={(newValue) => this.setState({ Explain: newValue })}
                                placeholder='Açıklamayı yazın'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                                style={{ height: 75 }}
                            />
                            <HelperText type='error' visible={true}>
                                Açıklama boş geçilemez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Evet Oranı'
                                mode='outlined'
                                value={this.state.FirstOptionRate}
                                onChangeText={(newValue) => this.setState({ FirstOptionRate: newValue })}
                                keyboardType='numeric'
                                placeholder='Evet seçeneği için oranı belirleyin (1.10 - 9.90)'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Oran kısmı boş geçilemez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10}}>
                            <TextInput 
                                label='Hayır Oranı'
                                mode='outlined'
                                value={this.state.SecondOptionRate}
                                onChangeText={(newValue) => this.setState({ SecondOptionRate: newValue })}
                                keyboardType='numeric'
                                placeholder='Hayır seçeneği için oranı belirleyin (1.10 - 9.90)'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                Oran kısmı boş geçilemez!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <TextInput 
                                label='Gün'
                                mode='outlined'
                                value={this.state.Day}
                                onChangeText={(newValue) => this.setState({ Day: newValue })}
                                keyboardType='numeric'
                                placeholder='İddia ne zaman sonlanacak (1 Gün - 120 Gün)'
                                theme={{ colors: { primary: '#f7931a' ,underlineColor:'transparent',}}}
                            />
                            <HelperText type='error' visible={true}>
                                1 ile 120 gün arasında olmalıdır!
                            </HelperText>
                        </View>
                        <View style={{ marginBottom: 20}}>
                            <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}>Fotoğraf Yükle{"\n"}</Text>
                            <Button icon={({color, size}) => ( <Icon type='font-awesome-5' name='camera' color='white' size={17} /> )} mode="contained" onPress={() => this.selectPhoto()} color='#F7931A' loading={this.state.PhotoUploadingState} labelStyle={{ color: "white" }} mode='contained'>
                                Yükle
                            </Button>
                        </View> 
                        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox  status='checked' disabled={true} onPress={() => { this.setState({ checked: !this.state.checked })}} color='#F9731A' />
                            <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}>İddia oluşturma şartlarını okudum kabul ediyorum.</Text>
                        </View>
                        <View style={{ marginBottom: 30}}>
                            <Button mode="contained" onPress={() => this.sendData()} color='#09a77e' loading={this.state.DataSendingState} labelStyle={{ color: "white" }} mode='contained'>
                                Gönder
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(NewBet);
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