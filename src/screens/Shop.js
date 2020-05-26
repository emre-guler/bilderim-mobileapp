import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { InterstitialAd } from '@react-native-firebase/admob';
import { AdEventType } from '@react-native-firebase/admob';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            refreshing: false,
            noData: false,
            load: false
        }
    } 
    buyGiftAlert = (id) => {
        Alert.alert(
            "Adres Bilgisi",
            "Sistemde kayıtlı olan adrese gönderilecek. Onaylıyor musunuz?",
            [
              {
                text: "İptal",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Onayla", onPress: () => this.buyGift(id) }
            ],
            { cancelable: false }
        );
    }
    buyGift = (id) => {
        if(this.props.userID != '') {
            const link = this.props.requestUrl + '/buyitem';
            fetch(link, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'UserID': parseInt(this.props.userID),
                    'UserToken': this.props.userToken,
                    'ProductID': parseInt(id)
                })
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if(responseJSON == 'success') {
                    Alert.alert('Alım başarıyla gerçekleşti!', 'Profilinizden adres ve iletişim bilgilerinizin doğru olduğundan emin olunuz.');
                }
                else if(responseJSON == 'saveControlProblem') {
                    Alert.alert('İnternet bağlantınızı kontrol ediniz.');
                }
                else if(responseJSON == 'insufficientfund') {
                    Alert.alert('Yetersiz bakiye.');
                }
                else if(responseJSON == 'tokenError') {
                    Alert.alert('Bir sorun oluştu.');
                }
            }) 
            .catch((err) => {
                Alert.alert('İnternet bağlantınızı kontrol ediniz.');
            })
        }
        else {
            Alert.alert('Hata','Satın almak için giriş yapmalısın.');
        }
    }
    componentDidMount = () => {
        const {navigation} = this.props;
        this.refresh = navigation.addListener('focus', () => {
            const adUnitId = "ca-app-pub-1789463245506375/2141896388";
            const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
                requestNonPersonalizedAdsOnly: true,
            });
            interstitial.load();
            interstitial.onAdEvent((type) => {
                if (type === AdEventType.LOADED) {
                  interstitial.show();
                }
            }); 
            interstitial.load();
            const link = this.props.requestUrl + '/marketlist';
            fetch(link, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // there is no param
                })
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if(responseJSON == 'noData') {
                    this.setState({
                        noData: !this.state.noData,
                        load: !this.state.load
                    })
                }
                let json = JSON.parse(responseJSON);
                let dataArray = [];
                for (let i = 0; i < json.length; i++) {
                    dataArray[i] = JSON.parse(json[i]);
                }
                this.setState({
                    Items: dataArray,
                    load: !this.state.load
                });
            })
            .catch((err) => {
                Alert.alert('İnternet bağlantınızı kontrol ediniz.');
            })
        })
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.componentDidMount();
        this.setState({refreshing: false})
    }
    getShopItems = () => {
        if(!this.state.noData) {
            return (
                    this.state.Items.map(item => 
                        <View style={{ marginBottom: 20 }}>
                            <Card
                                title={item.ProductName}
                                image={{ uri: item.Photo }}
                                imageStyle={{ height: undefined, aspectRatio: 1  }}
                                containerStyle={{ backgroundColor: 'rgb(0,0,0,0)' }}
                            >
                                <Text style={{marginBottom: 10}}>
                                    {item.Explain + ' ' + 'Son ' + item.Stock + ' ürün.'}
                                </Text>
                                <Button
                                    icon={<Icon type='font-awesome' name='bitcoin' color='#ffffff' size={20} />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#f7931a' }}
                                    title={" " + item.Price}
                                    onPress={() => this.buyGiftAlert(item.ID)}
                                />
                            </Card>
                        </View>        
                    )
            )
        }
        else {
            return (
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <LottieView 
                        source={require('../../assets/files/6510-sad-animation.json')} 
                        autoPlay 
                        loop
                        size
                        style={{ width: '50%'}}
                    />
                    <Text  style={{ marginTop: 20, color: 'rgba(0,0,0,0.3)' }}>Şuan hiç ürün yok. Daha sonra yine gel. </Text>
                </View>
            )
        }
    }
    render() {
        if(this.state.load) {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing} 
                            onRefresh={this._onRefresh.bind(this)}
                        /> 
                    }
                >
                    <View style={style.header}>
                        <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Market</Text>
                        <Text></Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 10 }}>
                        {this.getShopItems()}
                    </View>
                </ScrollView>
            )
        }
        else {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing} 
                            onRefresh={this._onRefresh.bind(this)}
                        /> 
                    }
                >
                    <View style={style.header}>
                        <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Market</Text>
                        <Text></Text>
                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <ContentLoader
                    viewBox="0 0 400 475"
                    height={475}
                    width={400}
                    speed={1}
                    backgroundColor={'#999'}
                    foregroundColor={'#F9F9F9'}
                >
                    <Rect x="0" y="210" rx="5" ry="5" width="400" height="25" />
                    <Rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
                </ContentLoader>
                    </View>
                </ScrollView>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl,
        userID: state.userid,
        userToken: state.usertoken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
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