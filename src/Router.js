import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import SettingScreen from './screens/SettingScreen';
import AddUserScreen from './screens/AddUser';



export const UserStack = StackNavigator({
    UserScreen: {
        screen: UserScreen,
        navigationOptions: {
            header: ({ navigate }) => ({
                title: 'USER-INFO',
                right: (
                    <Icon
                        name='settings'
                        iconStyle={{ marginRight: 10 }}
                        onPress={() => navigate('SettingScreen')}
                    />
                ),
                left: null,
            })
        }
    },
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: {
            header: ({ navigate }) => ({
                title: 'SETTING',
                left: (
                    <Icon
                        name='navigate-before'
                        iconStyle={{ marginLeft: 10 }}
                        onPress={() => navigate('UserScreen')}
                    />
                ),
            })
        }
    }
});

export const LoginStack = StackNavigator({
    LoginScreen: {
        screen: LoginScreen,
    },
    UserStack: {
        screen: UserStack,
    },
    AddStack: {
        screen: AddStack,
    },
},
    {
        headerMode: 'none',
    }
);

export const AddStack =StackNavigator({
    AddScreen:{
        screen: AddUserScreen,
        navigationOptions: {
            header: ({ navigate }) => ({
                title: 'Sign UP',
                right: (
                    <Text style={{color:'gray'}} onPress={() => navigate('LoginScreen')}>
                        Cancle
                    </Text>
                ),
                left: null,
            })
        }
    }
});
