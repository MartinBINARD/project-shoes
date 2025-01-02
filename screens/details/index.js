import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import { shoes } from "../../data/shoes";
import { addShoesToCart } from "../../store/slices/cartSlices";
import CustomButton from "../../ui-components/buttons/CustomButton";
import DetailsDescription from "./components/DetailsDescription";
import DetailsImage from "./components/DetailsImage";
import Gallery from "./components/Gallery";
import Sizes from "./components/Sizes";

export default function Details({ route, navigation }) {
  const dispatch = useDispatch();
  const data = shoes
    .find(shoe => shoe.stock.find(item => item.id === route.params.id))
    .stock.find(item => item.id === route.params.id);
  
  const brand = shoes
    .find(shoe => shoe.stock.find(item => item.id === route.params.id))
    .brand;
  
  const images = data.items.map(item => item.image);
  const [selectedImage, setSelectedImage] = useState(data.items[0].image);
  const [selectedSize, setSelectedSize] = useState();
  const [sizes, setSizes] = useState(data.items[0].sizes);

  const addToCart = () => {
    dispatch(addShoesToCart({
      id: data.id + Date.now(),
      name: brand.charAt(0).toUpperCase + brand.slice(1) + " " + data.name,
      image: selectedImage,
      size: selectedSize,
      price: data.price,
      quantity: 1,
    }))
  }

  useEffect(() => {
    setSizes(data.items.find(item => item.image === selectedImage).sizes);
    setSelectedSize(data.items.find(item => item.image === selectedImage).sizes[0]);
  }, [selectedImage]);

  useEffect(() => {
    navigation.setOptions({ title: data.gender === 'm' ? 'Shoes Homme' : 'Shoes Femme' })
  }, [route.params.id])

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DetailsImage source={selectedImage} />
          <DetailsDescription 
            name={data.name} 
            price={data.price} 
            description={data.description}
            id={route.params.id}
          />
          <Gallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <Sizes
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <View style={styles.btnContainer}>
            <CustomButton text="Ajouter au panier" onPress={addToCart}  />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT
  },
  container: {
    position: "relative",
    bottom: Platform.select({ android: 80, ios: 100 }),
  },
  btnContainer: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 400,
    marginVertical: spaces.XL
  }
})