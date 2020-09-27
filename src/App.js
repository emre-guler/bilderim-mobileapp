import React, { Component } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import Home from './screens/Home';
import Bet from './screens/Bet';
import Content from './screens/Content';
import Settings from './screens/Settings';
import MostWinner from './screens/MostWinner';
import NewBet from './screens/NewBet';
import YourBets from './screens/YourBets';
import Shop from './screens/Shop';
import YourBetDetail from './screens/YourBetDetail';
import Profile from './screens/Profile';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'

LogBox.ignoreAllLogs();
let requestUrl = "https://4494e9c23b48.ngrok.io";
let initialState = {
        requestUrl : requestUrl,
        userid: "",
        usertoken: "",
        username: "",
        fullname: "",
        userphoto: "",
        money: "",
        PhoneNumber: "",
        Address: ""
    }

const reducer = (state = initialState, action) => {
    if(action.type == 'resetRedux')
    {
        return {
	        requestUrl : requestUrl,
            userid: '',
            usertoken: '',
            username: '',
            fullname: '',
            userphoto: "",
            money: '',
            PhoneNumber: '',
            Address: ''
        }
    }
    else if(action.type == 'updatePhoto') {
        return {
	        requestUrl : requestUrl,
            userid: state.userid,
            usertoken: state.usertoken,
            username: state.username,
            fullname: state.fullname,
            userphoto: action.payload.photo,
            money: state.money,
            PhoneNumber: state.PhoneNumber,
            Address: state.Address
        }
    }
    else if(action.type == 'updateAllData') {
        return {
	        requestUrl : requestUrl,
            userid: action.payload.data.ID,
            usertoken: action.payload.data.Token,
            username: action.payload.data.Username,
            fullname: action.payload.data.Fullname,
            userphoto: action.payload.data.Photo,
            money: action.payload.data.Money,
            PhoneNumber: action.payload.data.PhoneNumber,
            Address: action.payload.data.Address
        }
    }
    else if(action.type == 'updateMoney') {
        return {
            requestUrl: requestUrl,
            userid: state.userid,
            usertoken: state.usertoken,
            username: state.username,
            fullname: state.fullname,
            userphoto: state.userphoto,
            money: action.payload.money,
            PhoneNumber: state.PhoneNumber,
            Address: state.Address
        }
    }
    return state;
}


const store = createStore(reducer);
class App extends Component {
    componentDidMount = () => {
        SplashScreen.hide();
    }
    render() {
        return (
            <Provider store={store} >
                <Navigation />
            </Provider>
        )
    }
}
const Drawer = createDrawerNavigator();
class Navigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
                    <Drawer.Screen name='Home' component={Home} />
                    <Drawer.Screen name='Bet' component={Bet} options={{ swipeEnabled: false }} />
                    <Drawer.Screen name='Content' component={Content} options={{ swipeEnabled: false }} />
                    <Drawer.Screen name='Settings' component={Settings} /> 
                    <Drawer.Screen name='MostWinner' component={MostWinner} /> 
                    <Drawer.Screen name='DrawerContent' component={DrawerContent} options={{ swipeEnabled: false }} /> 
                    <Drawer.Screen name='NewBet' component={NewBet} />
                    <Drawer.Screen name='YourBets' component={YourBets} />
                    <Drawer.Screen name='Shop' component={Shop} />
                    <Drawer.Screen name='YourBetDetail' component={YourBetDetail} options={{ swipeEnabled: false }} />
                    <Drawer.Screen name='Profile' component={Profile} />
                    <Drawer.Screen name='LogIn' component={Login} />
                    <Drawer.Screen name='SignUp' component={SignUp} />
                 </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
export default App;