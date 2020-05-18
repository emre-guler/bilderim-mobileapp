import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Icon, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            refreshing: false
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
            let json = JSON.parse(responseJSON);
            let dataArray = [];
            for (let i = 0; i < json.length; i++) {
                dataArray[i] = JSON.parse(json[i]);
            }
            this.setState({
                Items: dataArray
            });
        })
        .catch((err) => {
            Alert.alert('İnternet bağlantınızı kontrol ediniz.');
        })
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.componentDidMount();
        this.setState({refreshing: false})
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
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Market</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    {
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
                    }
                </View>
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