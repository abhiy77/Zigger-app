import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';
import userList from './userList';


const MainNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Main: {screen: MainScreen},
    List: {screen: userList},

});

const App = createAppContainer(MainNavigator);

export default App;
