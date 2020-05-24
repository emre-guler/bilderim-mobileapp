import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
//import { AdMobBanner } from 'react-native-admob';
const screenWidth = Math.round(Dimensions.get('window').width);
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemData: []
        }
    }
    changeLocation = () => {
        this.props.navigation.navigate('Home');
    }
    LoggedView = (FirstOptionRate, SecondOptionRate, itemID) => {
        return (
            <View style={{ flexDirection: 'row', width: (screenWidth - 20), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#FF', marginTop: 10, padding: 15 }}>
                <TouchableOpacity onPress={() => this.addBet(true, itemID)} style={{ backgroundColor: '#09a77e', paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 5, marginRight: 15 }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>EVET ({FirstOptionRate})</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addBet(false, itemID)} style={{ backgroundColor: 'red', paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>HAYIR ({SecondOptionRate})</Text>
                </TouchableOpacity>
            </View>
        )
    }
    UnLoggedView = () => {
        return (
            <View style={{ flexDirection: 'row', width: (screenWidth - 20), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#FF', marginTop: 10, padding: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')} style={{ backgroundColor: '#09a77e', paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, borderRadius: 5, marginRight: 15 }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Oranlar için Giriş Yapmalısın</Text>
                </TouchableOpacity>
            </View>
        )
    }
    addBet = (betTo, itemID) => {
        const link = this.props.requestUrl + '/addbet';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userid),
                'BulletinID': parseInt(itemID),
                'UserToken': this.props.usertoken,
                'BetTo': betTo
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == "success") {
                
            }
            else if(responseJSON == 'limitSizeORsameBet') {
                Alert.alert('Kuponunuzda zaten mevcut ya da 8 maçtan fazla eklemeye çalıştınız.');
            }
            else if(responseJSON == 'saveControlProblme') {
                Alert.alert('İnternet bağlantınızı kontrol edin.');
            }
            else if(responseJSON = 'tokenError') {
                Alert.alert('Bir sorun oluştu.');
            }
        })
        .catch((err) => {
            Alert.alert("İnternet bağlatınızı kontrol edin.");
        })
    }
    render() {
        let itemData = [this.props.route.params];
        return (
            <ScrollView style={{ backgroundColor: '#EFEFEF' }}>
                <View style={style.header}>
                    <Icon type='font-awesome-5' name='chevron-left' color='#f7931a' onPress={() => this.changeLocation()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>bilderim</Text>
                    <Icon type='font-awesome' name='bitcoin' color='#f7931a' onPress={() => this.props.navigation.navigate('Bet') } />
                </View>
                <View style={{ width: '100%', backgroundColor: '#EA418C', padding: 7}}>
                    <Text style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}>TAHMİNİNİ YAP</Text>
                </View>
                {
                    itemData.map(item => 
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <View style={{ width: (screenWidth - 20), height: 200, alignSelf: 'center', marginTop: 20 }}>
                                    <Image 
                                        source={{ uri : item.Photo}}
                                        style={{ width: screenWidth, height: 200, resizeMode: 'cover' }}
                                    />
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: (screenWidth - 20), alignSelf: 'center', padding: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                                        <TouchableOpacity style={{ borderWidth: 2, borderColor: '#f7931a', padding: 5 }}>
                                            <Text style={{ color: '#f7931a', letterSpacing: 1, fontWeight: 'bold' }}>İNTERNET</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '70%' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'right' }}>{item.Name}</Text>
                                        </View> 
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, padding: 5 }}>
                                        <View style={{ }}>
                                            <Text style={{ color: '#f7931a', fontWeight: 'bold', fontSize: 18 }}>
                                                {item.UserCount} {""}
                                                <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 14 }}>
                                                    kişi oynadı
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={{ }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'right', color: 'rgba(0,0,0,0.6)', letterSpacing: 2 }}>
                                                {item.ExpaireAt}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', backgroundColor: '#EA418C', padding: 7}}>
                                {
                                    /*
                                        <AdMobBanner
                                    adSize="fullBanner"
                                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                                    testDevices={[AdMobBanner.simulatorId]}
                                    onAdFailedToLoad={error => console.error(error)}
                                />
                                    */
                                }
                            </View>
                            <View>
                                <View style={{ width: (screenWidth - 20), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#FFF', marginTop: 10, borderRadius: 2, padding: 15 }}>
                                    <Text style={{ fontSize: 16, letterSpacing: 1, color: 'rgba(0,0,0,0.7)' }}>
                                        {item.Explain}    
                                    </Text>
                                </View>
                            </View>
                            <View>
                                {
                                    this.props.userid == '' ? this.UnLoggedView() : this.LoggedView(item.FirstOptionRate, item.SecondOptionRate, item.ID)
                                }
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl,
        userid: state.userid,
        usertoken: state.usertoken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
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