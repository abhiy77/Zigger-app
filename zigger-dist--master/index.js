import firebase from 'firebase';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
var config = {
    xxx
};
console.disableYellowBox = true;
firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
