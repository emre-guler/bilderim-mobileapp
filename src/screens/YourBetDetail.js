import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';

class YourBetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            BetAmount: 1,
            MaxBP: 1,
            CouponRate: 1
        }
    }
    componentDidMount = () => {
        const id = JSON.stringify(this.props.route.params.CouponID);
        const {navigation} = this.props;
        this.refresh = navigation.addListener('focus', () => {
                const link = this.props.requestUrl + '/viewOldCoupons/details';
                fetch(link, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'UserID': parseInt(this.props.userID),
                        'UserToken': this.props.userToken,
                        'CouponID': parseInt(id)
                    })
                })
                .then((response) => response.json())
                .then((responseJSON) => {
                    if(responseJSON == 'noData') {
                        this.setState({
                            Items: [],
                            MaxBP: 1
                        });
                    }
                    else if(responseJSON == 'tokenError') {
                        Alert.alert('Hata', 'Bir sorun oluştu.');
                    }
                    else {
                        let data = JSON.parse(responseJSON);
                        let dataArray = [];
                        let betAmount = 0;
                        let couponRate = 0;
                        for (let i = 0; i < data.length; i++) {
                            dataArray[i] = JSON.parse(data[i]);
                            betAmount = dataArray[i].BetAmount;
                            couponRate = dataArray[i].CouponRate;
                        }
                        console.log(dataArray);
                        this.setState({
                            Items: dataArray,
                            CouponRate: couponRate.toFixed(2),
                            BetAmount: betAmount
                        });
                    }
                })
                .catch((err) => {
                    Alert.alert("İnternet bağlatınızı kontrol edin.");
                })
        });
    }
    getIcon = (state) => {
        console.log(state);
        if(state == 0) {
            return (
                <Icon type='material' name='close' color='red' size={40} />
            )
        }
        else if(state == 1) {
            return (
                <Icon type='material' name='check' color='green' size={40} />
            )
        }
        else if(state == 2) {
            return (
                <Icon type='font-awesome' name='spinner' color='#F7931A' size={40} />
            )
        }
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
                <ScrollView style={{ flexDirection: 'column', borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
                    {
                        this.state.Items.map(item => 
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 14, color: '#3F3F3F' }}>Tayyip Erdoğan Bıyıklarını Kestirir</Text>
                                    <View style={{padding: 5, backgroundColor: '#09A77E', borderRadius: 5}}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>2.40</Text>
                                    </View>
                                    <View>
                                        {this.getIcon(item.BulletinState)}
                                    </View>
                                </View>

                                <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}>

                                </View>
                            </View>
                        )
                    }
                </ScrollView>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >Toplam Kupon Oranı </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                            <Text style={{ fontSize: 14, color: '#3F3F3F' }}>{this.state.CouponRate}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >Yatırılan BC </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                            <Text style={{ fontSize: 14, color: '#3F3F3F' }}>{this.state.BetAmount}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)'}}></View>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#3F3F3F', margin: 10, letterSpacing: 1}} >Maksimum Kazanılacak BP </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>
                            <Text style={{ fontSize: 14, color: '#F7931A', fontWeight: 'bold' }}>{(this.state.BetAmount * this.state.CouponRate).toFixed(0)} </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(YourBetDetail);