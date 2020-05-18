import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

class Bet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            Money: '',
            CouponRate: 1,
            refreshing: false,
            betAmount: '',
            winAmount: 0
        }
    }
    componentDidMount = () => {
        const {navigation} = this.props;
        this.refresh = navigation.addListener('focus', () => {
            if(this.props.userID != '') {
                const link = this.props.requestUrl + '/viewBet';
                fetch(link, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'UserID': parseInt(this.props.userID),
                        'UserToken': this.props.UserToken
                    })
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    let json = JSON.parse(responseJSON);
                    if(json.ResponseNote == 'noData') {
                        this.setState({
                            Items: [],
                            CouponRate: 1,
                            Money: json.Money
                        });
                    }
                    else {
                        let data = JSON.parse(responseJSON);
                        let dataArray = [];
                        let couponRate = 1;
                        for (let i = 0; i < data.length; i++) {
                            dataArray[i] = JSON.parse(data[i]);
                            couponRate = couponRate * dataArray[i].Rate;
                        }
                        let money = JSON.parse(dataArray[0].UserMoney);
                        this.setState({
                            Items: dataArray,
                            Money: money,
                            CouponRate: couponRate.toFixed(2)
                        });
                    }
                })
                .catch((err) => {
                    Alert.alert("İnternet bağlatınızı kontrol edin.");
                })
            }
        });
    }
    removeBulletin = (id) => {
        const link = this.props.requestUrl + '/removeBet';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.UserToken,
                'BulletinID': id
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == "success") {
                let counter = 0;
                let arrayData = this.state.Items;
                arrayData.forEach(element => {
                    if(element.ID == id) {
                        arrayData.splice(counter, 1);
                    } 
                    counter++; 
                });
                this.setState({
                    Items: arrayData
                });
            }
            else if(responseJSON == 'saveControlProblem') {
                Alert.alert('İnternet bağlantınızı kontrol edin.');
            }
            else if(responseJSON == 'tokenError') {
                Alert.alert('Bir sorun oluştu.');
            }
        })
        .catch((err) => {
            Alert.alert("İnternet bağlatınızı kontrol edin.");
        })
    }
    clearBets = () => {
        const link = this.props.requestUrl + '/clearBets';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.UserToken
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == "success") {
                this.setState({
                    Items: []
                });
            }
            else if(responseJSON == 'saveControlProblem') {
                Alert.alert('İnternet bağlantınızı kontrol edin.');
            }
            else if(responseJSON == 'tokenError') {
                Alert.alert('Bir sorun oluştu.');
            }
        })
        .catch((err) => {
            Alert.alert("İnternet bağlatınızı kontrol edin.");
        })
    }
    submitBet = () => {
        const link = this.props.requestUrl + '/submitBet';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.UserToken,
                'BetAmount': parseInt(this.state.betAmount)
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == 'success') {
                
            }
            else if(responseJSON == 'saveControlProblem') {
                Alert.alert('İnternet bağlantınızı kontrol edin.');
            }
            else if(responseJSON == 'insufficientfund') {
                Alert.alert('Yetersiz bakiye.');
            }
            else if(responseJSON == 'basketNull') {
                Alert.alert('Kuponunuza bahis ekleyin.');
            }
            else if(responseJSON == 'tokenError') {
                Alert.alert('Bir sorun oluştu.');
            }
        })
    }
    refreshPage = () => {
        const link = this.props.requestUrl + '/viewBet';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.UserToken
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let json = JSON.parse(responseJSON);
            if(json.ResponseNote == 'noData') {
                this.setState({
                    Items: [],
                    Component: 1,
                    Money: json.Money 
                });
            }
            else {
                let data = JSON.parse(responseJSON);
                let dataArray = [];
                let couponRate = 1;
                for (let i = 0; i < data.length; i++) {
                    dataArray[i] = JSON.parse(data[i]);
                    couponRate = couponRate * dataArray[i].Rate;
                }
                let money = JSON.parse(dataArray[0].UserMoney);
                this.setState({
                    Items: dataArray,
                    Money: money,
                    CouponRate: couponRate.toFixed(2)
                });
            }
        })
        .catch((err) => {
            Alert.alert("İnternet bağlatınızı kontrol edin.");
        })
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.refreshPage();
        this.setState({refreshing: false})
    }
    betAmountChange = (newValue) => {
        newValue = newValue.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
        if(newValue >= 1 && newValue <= 1000 || newValue == '')
        {
            this.setState({
                betAmount: newValue,
                winAmount: (newValue * this.state.CouponRate).toFixed(0)
            });
        }
    }
    UnLoggedView = () => {
        return (
            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <LottieView 
                    source={require('../../assets/files/6510-sad-animation.json')} 
                    autoPlay 
                    loop
                    size
                    style={{ width: '50%'}}
                 />
                <Text  style={{ marginTop: 20, color: 'rgba(0,0,0,0.3)' }}>Giriş Yapmalısın</Text>
            </View>
        )
    }
    LoggedView = () => {
        return (
            <View style={{ flex: 1, flexDirection: 'column'}} >
                <ScrollView 
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing} 
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    style={{ flexDirection: 'column', borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}
                >
                    {
                        this.state.Items.map(item => 
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 14, color: '#3F3F3F', width: '40%' }}>{item.Name}</Text>
                                    <View style={{padding: 5, backgroundColor: '#09A77E', borderRadius: 5}}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>{item.Rate}</Text>
                                    </View>
                                    <View>
                                        <Icon type='material' name='close' color='red' size={40} onPress={() => this.removeBulletin(item.ID)} />
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}>

                                </View>
                            </View>
                        )
                    }
                </ScrollView>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >BİLDERİM COIN BAKIYE </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                            <Text style={{ color: '#F7931A', fontWeight: 'bold', fontSize: 14 }}>{this.state.Money} </Text>
                            <Icon type='font-awesome' name='bitcoin' color='#f7931a' size={20} />
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >TOPLAM KUPON ORANI </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                                <Text style={{ fontSize: 14, color: '#3F3F3F' }}>{this.state.CouponRate} </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >Yatırılan BC </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                                <TextInput keyboardType='numeric' value={this.state.betAmount} onChangeText={this.betAmountChange} placeholder='1 - 1000' style={{ fontSize: 12, fontWeight: 'bold', width: 70, height: 30, borderWidth: 1.5, borderColor: '#f7931a', borderRadius: 5, padding: 5}} />
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >KAZANILAN BP </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                                <Text style={{ fontSize: 14, color: '#F7931A', fontWeight: 'bold' }}>{this.state.winAmount} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.clearBets()} style={{ backgroundColor:  'red', width: '50%', padding: 10 }}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Sil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.submitBet()} style={{ backgroundColor: '#09a77e', width: '50%', padding: 10}}>
                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Onayla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}> 
                <Header 
                    leftComponent={<Icon type='material' name='close' color='#f7931a' onPress={() => this.props.navigation.goBack() } />}
                    centerComponent={<Icon type='font-awesome' name='bitcoin' color='#f7931a' size={40} />}
                    backgroundColor='#f2f2f2'
                    containerStyle={{ paddingTop: 0 }}
                />
                <View style={{ width: '100%', backgroundColor: '#EA418C', padding: 7}}>
                    <Text style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}>Kuponun</Text>
                </View>
                {
                    this.props.userID == '' ? this.UnLoggedView() : this.LoggedView()
                }
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl,
        userID: state.userid,
        UserToken: state.usertoken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Bet);