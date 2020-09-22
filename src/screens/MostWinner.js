import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { connect } from 'react-redux';
class MostWinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            refreshing: false,
            load: false
        }
    }
    componentDidMount = () => {
        const link = this.props.requestUrl + '/mostWinner';
        fetch(link, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // There is no param 
            })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            let jsonData = JSON.parse(responseJSON);
            let dataArray = [];
            for (let i = 0; i < jsonData.length; i++) {
                dataArray[i] = JSON.parse(jsonData[i]);
            }
            this.setState({
                userData: dataArray,
                load: !this.state.load
            });
        })
        .catch((err) => {
            Alert.alert("İnternet bağlantınızı kontrol edin.");
        })
    }
    _onRefresh() {
        this.setState({refreshing: true, load: false });
        this.componentDidMount();
        this.setState({refreshing: false, load: true })
    }
    render() {
        if(this.state.load) {
            console.log('Emre Falan filan.');
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
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>En Çok Kazananlar</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    {
                        this.state.userData.map(user =>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginLeft: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)', padding: 15}}>
                                    <View style={{ flexDirection: 'row',  alignItems: 'center'}}>
                                        <Avatar.Image 
                                            source={{ uri: user.Photo}}
                                            size={50}
                                        />
                                        <Text style={{ marginLeft: 10, color: 'rgba(0,0,0,0.7)', fontWeight: 'bold' }}>{user.Fullname}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ marginRight: 10, color: '#f7931a', fontWeight: 'bold' }}>{user.Money}</Text>
                                        <Icon type='font-awesome' name='bitcoin' color='#f7931a' />
                                    </View>
                                </View>
                            </View>
                        )
                    }
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
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>En Çok Kazananlar</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 15, marginLeft: 15 }}>
                <ContentLoader
                    height={100}
                    speed={1}
                    backgroundColor={'#999'}
                    foregroundColor={'#F9F9F9'}
                    viewBox="0 0 380 70"
                >
                    <Circle cx="25" cy="25" r="25" />
                    <Rect x="80" y="25" rx="3" ry="3" width="100%" height="10" />
                </ContentLoader>
                <ContentLoader
                    height={100}
                    speed={1}
                    backgroundColor={'#999'}
                    foregroundColor={'#F9F9F9'}
                    viewBox="0 0 380 70"
                >
                    <Circle cx="25" cy="25" r="25" />
                    <Rect x="80" y="25" rx="3" ry="3" width="100%" height="10" />
                </ContentLoader>
                <ContentLoader
                    height={100}
                    speed={1}
                    backgroundColor={'#999'}
                    foregroundColor={'#F9F9F9'}
                    viewBox="0 0 380 70"
                >
                    <Circle cx="25" cy="25" r="25" />
                    <Rect x="80" y="25" rx="3" ry="3" width="100%" height="10" />
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(MostWinner);
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