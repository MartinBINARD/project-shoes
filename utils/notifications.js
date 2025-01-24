import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (finalStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return null;
        }
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        try {
            const response = await Notifications.getExpoPushTokenAsync({ projectId });
            return response.data;
        } catch (error) {
            alert(error);
        }
    }
};

export const useNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState();
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    }, []);

    useEffect(() => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Ma première notification',
                body: 'Ceci est un message dans le body',
                data: {
                    key: 'value',
                },
            },
            trigger: {
                seconds: 3,
            },
        });
    }, []);
    return {
        expoPushToken,
    };
};
