/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

Feather.loadFont()
MaterialIcons.loadFont()

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
