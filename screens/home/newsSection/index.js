import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { IS_LARGE_SCREEN } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';
import { shoes } from '../../../data/shoes';
import Banner from '../components/Banner';
import HorizontalCard from './components/HorizontalCard';
import { useNavigation } from '@react-navigation/native';

export default function NewsSection({ selectedBrand }) {
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const landscapeStyle = {
        flex: 160,
        minHeight: 240,
    };

    const item = shoes.find((elem) => elem.brand === selectedBrand).stock.find((elem) => elem.new);

    const navigateToDetails = (id) => {
        navigation.navigate('Details', { id: item.id });
    };

    const navigateToNewsList = () => {
        navigation.navigate('NewsList');
    };
    return (
        <View style={height < 400 ? landscapeStyle : styles.container}>
            <HorizontalCard item={item} onPress={navigateToDetails} />
            <Banner text="Nouveautés" navigate={navigateToNewsList} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 160,
        flexDirection: 'column-reverse',
        minHeight: IS_LARGE_SCREEN ? 320 : 160,
        paddingVertical: spaces.M,
    },
});
