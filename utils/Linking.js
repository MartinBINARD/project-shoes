import * as Linking from 'expo-linking';

const prefixes = [Linking.createURL('/'), 'project-shoes://'];

const config = {
    screens: {
        Details: 'details/:id',
        MainCart: 'cart',
        Drawer: {
            screens: {
                BottomTabs: {
                    screens: {
                        Notifications: 'notifications',
                    },
                },
            },
        },
    },
};

export const linkingConfig = {
    prefixes,
    config,
};
