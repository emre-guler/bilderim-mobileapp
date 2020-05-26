import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Dimensions, Platfrom ,TouchableOpacity, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
const screenWidth = Math.round(Dimensions.get('window').width);
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [],
            refreshing: false,
            load: false
        }
    }
    componentDidMount = () => {
        let link = this.props.requestUrl + '/homepage'; 
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // there is no parameter
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let json = JSON.parse(responseJSON);
            let dataArray = [];
            for(let i = 0; i < json.length; i++) {
                dataArray[i] = JSON.parse(json[i]);
                let timestamp = Date.parse(dataArray[i].ExpaireAt);
                let date = new Date(timestamp);
                let timeString = date.getDate() +  '/' +( date.getMonth() + 1 ) + '/' + date.getFullYear();
                dataArray[i].ExpaireAt = timeString;
            }
            this.setState({ Items: dataArray, load: !this.state.load });
        })  
        .catch((err) =>{
            Alert.alert("İnternet bağlantınızı kontrol edin.");
        })
    }
    _onRefresh() {
        this.setState({refreshing: true, load: true });
        this.componentDidMount();
        this.setState({refreshing: false, load: false })
    }
    render() {
        if(!this.state.load) {
            return (
                <ScrollView 
                style={{ flex: 1, flexDirection: 'column' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing} 
                        onRefresh={this._onRefresh.bind(this)}
                    /> 
                }
                >  
                    <View style={style.header}>
                        <Icon type='font-awesome' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>bilderim</Text>
                        <Icon type='font-awesome' name='bitcoin' color='#f7931a' onPress={() => this.props.navigation.navigate('Bet', {refresh: true})} />
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#EA418C', padding: 7}}>
                        <Text style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}>Sonlanacak Bahisler</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 5, marginRight: 5, flexDirection: 'column' }}>
                    <ContentLoader
                    viewBox="0 0 400 475"
                    height={475}
                    width={400}
                    speed={1}
                    backgroundColor={'#999'}
                    foregroundColor={'#F9F9F9'}
                    >
                    <Rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
                    <Rect x="0" y="210" rx="5" ry="5" width="100%" height="200" />
                    </ContentLoader>
                    </View>
            </ScrollView>
            )
        }
        else {
            return (
                <ScrollView 
                style={{ flex: 1, flexDirection: 'column' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing} 
                        onRefresh={this._onRefresh.bind(this)}
                    /> 
                }
                >  
                    <View style={style.header}>
                        <Icon type='font-awesome' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                        <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>bilderim</Text>
                        <Icon type='font-awesome' name='bitcoin' color='#f7931a' onPress={() => this.props.navigation.navigate('Bet', {refresh: true})} />
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#EA418C', padding: 7}}>
                        <Text style={{color: 'white', textAlign: 'center', fontStyle: 'italic'}}>Sonlanacak Bahisler</Text>
                    </View>
                    <View 
                        style={style.container} 
                    >
                        {
                            this.state.Items.map(item => 
                                <TouchableOpacity style={style.content} onPress={() => 
                                    {this.props.navigation.navigate('Content', { 
                                        ID: item.ID,
                                        ExpaireAt: item.ExpaireAt,
                                        FirstOptionRate: item.FirstOptionRate,
                                        SecondOptionRate: item.SecondOptionRate,
                                        Photo: item.Photo,
                                        UserCount: item.UserCount,
                                        Explain: item.Explain,
                                        Name: item.Namew
                                    }
                                );}}>
                                    <Image source={{ uri: item.Photo }} style={style.contentPhoto} />
                                    <View style={{ position: 'absolute', right: 0, marginTop: 10, marginRight: 10, width: '100%' }}>
                                        <Text style={style.contentTitle}>{item.Name}</Text>
                                    </View>
                                    <Text style={style.contentPlayer} ><Text style={{ fontSize: 20 }}>{item.UserCount}</Text> KİŞİ OYNADI</Text>
                                    <Text style={style.contentTime}>{item.ExpaireAt}</Text>
                                </TouchableOpacity>    
                            )
                        }
                    </View>
                </ScrollView>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl,
        userID: state.userid
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Home);
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
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        marginBottom: 5
    },
    contentPhoto: {
        width: screenWidth,
        height: 200,
        resizeMode: 'cover'
    },
    contentTitle : {
        position: 'absolute',
        fontSize: 28,
        right: 0,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10,
        textAlign: 'right'
    },
    contentPlayer: {
        position: 'absolute',
        fontSize: 10,
        bottom: 0,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 25,
        marginLeft: 10
    },
    contentTime: {
        position: 'absolute',
        fontSize: 16,
        right: 0,
        bottom: 0,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 25,
        marginRight: 10
    }
});