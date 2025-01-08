import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import ListSection from './listSection';
import NewsSection from './newsSection';
import SearchSection from './searchSection';

export default function HomeScreen({ navigation }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('nike');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
                <SearchSection
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                />
                <ListSection selectedBrand={selectedBrand} inputValue={inputValue} navigation={navigation} />
                <NewsSection selectedBrand={selectedBrand} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LIGHT,
        justifyContent: 'space-between',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
});
