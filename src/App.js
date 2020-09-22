import React, { Component } from 'react';
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

console.disableYellowBox = true;
let initialState = {};

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