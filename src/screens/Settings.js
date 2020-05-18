import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Switch } from 'react-native-paper';

class Settings extends Component {
    state = {
        switchState: false
    }
    render() {
        return (
            <ScrollView>
                 <View style={style.header}>
                    <Icon type='font-awesome-5' name='bars' color='#f7931a' onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={{fontFamily: 'AGENTORANGE', fontSize: 24, letterSpacing: 2, fontWeight: 'bold', color: '#4d4d4d'}}>Ayarlar</Text>
                    <Text></Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)', padding: 15}}>
                        <Text style={{ fontSize: 18  }}>
                            Gece Modu
                        </Text>
                        <Switch value={this.state.switchState} onValueChange={() => this.setState({ switchState: !this.state.switchState })}  color='#f7931a' />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default Settings;
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