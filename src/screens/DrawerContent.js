import React, { useEffect, useState, Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { Drawer, Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
class DrawerContent extends Component {
    constructor(props) {
        super(props);
    }
    triggerAd = () => {
        Alert.alert('Çok Yakında!', 'Bu özellik çok yakın zamanda sizlerle olacak.');
    }
    LoggedView = () => {
        return (
            <View>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='user' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Profil'
                    onPress={() => {this.props.navigation.navigate('Profile')}}
                /> 
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='bitcoin' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Kuponların'
                    onPress={() => {this.props.navigation.navigate('YourBets')}}
                /> 
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='plus' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Bültene İddia Ekle'
                    onPress={() => {this.props.navigation.navigate('NewBet')}}
                /> 
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='ad' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Reklam İzle BC Kazan'
                    onPress={() => {this.triggerAd()}}
                /> 
            </View>
        )
    }
    UnLoggedView = () => {
        return (
            <View>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='user-plus' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Üye ol'
                    onPress={() => {this.props.navigation.navigate('SignUp')}}
                /> 
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon type='font-awesome-5' name='sign-in-alt' color='rgba(0,0,0,0.3)'  /> 
                    )}
                    label='Giriş Yap'
                    onPress={() => {this.props.navigation.navigate('LogIn')}}
                /> 
            </View>
        )
    }
    logout = () => {
        this.props.resetRedux();
        let keys = SyncStorage.getAllKeys();
        for (let i = 0; i < keys.length; i++) {
            SyncStorage.remove(keys[i]);
        }
        this.props.navigation.navigate('Home');
    }
    logOutContainer = () => {
        if(this.props.userID != '') {
            return (
                <Drawer.Section style={style.bottomDrawerSection}>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon type='font-awesome-5' name='sign-out-alt' color='#E83431'  /> 
                        )}
                        onPress={() => this.logout()}
                        label='Çıkış Yap'
                        labelStyle={{color: '#E83431'}}
                    /> 
                </Drawer.Section>
            )
        }
    }
    getMoney = () => {
        return (
            <View style={style.section}>
                <Paragraph style={{color: '#f7931a', fontWeight: 'bold', fontSize: 16}}>{this.props.money}</Paragraph> 
                <Icon type='font-awesome' name='bitcoin' color='#f7931a' size={18} style={{marginLeft: 10}} />
            </View>
        )
    }
    getNames = () => {
        return (
            <View style={{flexDirection:'row', marginTop: 15}}>
                <Avatar.Image 
                    source={{uri: this.props.userphoto}}
                    size={50}
                />
                <View style={{flexDirection:'column', marginLeft: 15}}>
                    <Title style={style.title}>{this.props.fullname}</Title>
                    <Caption style={style.caption}>@{this.props.userName}</Caption>
                </View>
            </View>
        )
    }
    getDefaultNames = () => {
        return (
            <View style={{flexDirection:'row', marginTop: 15}}>
            <Avatar.Image 
                source={{ uri: this.props.userphoto }}
                size={50}
            />
            <View style={{flexDirection:'column', marginLeft: 15}}>
                <Title style={style.title}>Misafir Kullanıcı</Title>
                <Caption style={style.caption}></Caption>
            </View>
        </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {... this.props}>
                    <View style={style.drawerContent}>
                        <View style={style.userInfoSection}>
                                {
                                    this.props.userID == '' ? this.getDefaultNames() : this.getNames()
                                }
                            <View style={style.row}>
                                {
                                    this.props.userID == '' ? null : this.getMoney()
                                }
                            </View>
                            <Drawer.Section style={style.drawerSection}>
                                <DrawerItem
                                    icon={({color, size}) => (
                                        <Icon type='font-awesome-5' name='list' color='rgba(0,0,0,0.3)' /> 
                                    )}
                                    label='Anasayfa'
                                    onPress={() => {this.props.navigation.navigate('Home')}}
                                /> 
                                {
                                    this.props.userID == '' ? this.UnLoggedView() : this.LoggedView()
                                }
                                
                                <DrawerItem
                                    icon={({color, size}) => (
                                        <Icon type='font-awesome-5' name='shopping-cart' color='rgba(0,0,0,0.3)'  /> 
                                    )}
                                    label='Market'
                                    onPress={() => {this.props.navigation.navigate('Shop')}}
                                /> 
                                <DrawerItem
                                    icon={({color, size}) => (
                                        <Icon type='font-awesome-5' name='trophy' color='rgba(0,0,0,0.3)'  /> 
                                    )}
                                    label='En Çok Kazananlar'
                                    onPress={() => {this.props.navigation.navigate('MostWinner')}}
                                /> 
                                <DrawerItem
                                    icon={({color, size}) => (
                                        <Icon type='font-awesome-5' name='cog' color='rgba(0,0,0,0.3)' /> 
                                    )}
                                    label='Ayarlar'
                                    onPress={() => {this.props.navigation.navigate('Settings');}}
                                /> 
                                <DrawerItem
                                    icon={({color, size}) => (
                                        <Icon type='font-awesome-5' name='ticket-alt' color='rgba(0,0,0,0.3)'  /> 
                                    )}
                                    label='Destek'
                                    onPress={() => {Alert.alert('Öneri & Sorun & Bug','Bir sorununuz mu var ya da öneriniz? Ya da bug keşfettiniz? (Oyun içi ödüller kazanbilirsiniz.) Bizimle iletişime geçin: ticket@bilderimapp.com', [{text: 'TAMAM'}])}}
                                /> 
                            </Drawer.Section>
                        </View>
                    </View>
                </DrawerContentScrollView>
                    {
                        this.logOutContainer()
                    }
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        requestUrl: state.requestUrl,
        userID: state.userid,
        userToken: state.usertoken,
        userName: state.username,
        fullname: state.fullname,
        userphoto: state.userphoto,
        money: state.money
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        resetRedux: () => dispatch({
            type: 'resetRedux'
        })
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
const style = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      }
});