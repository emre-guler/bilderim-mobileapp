import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'; 
import LottieView from 'lottie-react-native';

class YourBets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Coupons: [],
            noData: false
        }
    }
    componentDidMount = () => {
        const link = this.props.requestUrl + '/viewOldCoupons';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'UserID': parseInt(this.props.userID),
                'UserToken': this.props.userToken
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if(responseJSON == 'noData') {
                this.setState({
                    noData: !this.state.noData
                });
            }
            else if(responseJSON == 'tokenError') {
                Alert.alert('Hata', 'Bir sorun olutşu.');
            }
            else {
                let json = JSON.parse(responseJSON);
                let dataArray = [];
                for (let i = 0; i < json.length; i++) {
                    dataArray[i] = JSON.parse(json[i]);
                }
                this.setState({
                    Coupons: dataArray
                })
            }
        })
        .catch((err) => {
            Alert.alert('Hata', 'İnternet bağlantınızı kontrol edin.');
        })
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.componentDidMount();
        this.setState({refreshing: false})
    }
    getCoupoonState(state) {
        if(state == 2) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon type='font-awesome-5' name='circle' color='#F7931A' size={12} solid={true} style={{ marginRight: 5 }} /> 
                    <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}>Bekleniyor</Text>
                </View>
            )
        } 
        else if(state == 1) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon type='font-awesome-5' name='circle' color='#09a77e' size={12} solid={true} style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}>Kazandı</Text>
                </View>
            )
        }
        else if(state == 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon type='font-awesome-5' name='circle' color='red' size={12} solid={true} style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)' }}>Kaybetti</Text>
                </View>
            )
        }
    }
    navigateToDetail = (id) => {
        this.props.navigation.navigate('YourBetDetail', { CouponID: id });
    }
    getmainContent = () => {
        if(!this.state.noData) {
            return (
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    {
                        this.state.Coupons.map(coupon => 
                                <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, width: '100%', borderColor: 'rgba(0, 0, 0, 0.3)' }} onPress={() => this.navigateToDetail(coupon.ID)}>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{coupon.CouponRate} Oranlı Kuponunuz <Text style={{ fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.6)' }}>({coupon.BetUnit} Bahis)</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 20, justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{coupon.BetAmount} {" "}</Text>
                                            <Icon type='font-awesome' name='bitcoin' color='#F7931A' size={20} />
                                        </View>
                                            {this.getCoupoonState(coupon.CouponState)}
                                    </View>
                                </TouchableOpacity>
                            )
                    }
                </View>
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
                    <Text  style={{ marginTop: 20, color: 'rgba(0,0,0,0.3)' }}>Hiç Kuponun Yok </Text>
                </View>
            )
        }
    }
    render() {
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
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Kuponların</Text>
                    <Text></Text>
                </View>
                {this.getmainContent()}
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(YourBets);
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