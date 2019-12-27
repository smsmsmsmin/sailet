import {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';

export interface ScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface ScreenConfig {
  navigation: NavigationScreenConfig<any, any>;
}
