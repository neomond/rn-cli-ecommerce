import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DetailsScreenProps {
  route: {params: {id: string}};
  navigation: any;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({route, navigation}) => {
  const [basket, setBasket] = useState<any[]>([]);
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const {id} = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get<any>(
          `https://64554565a74f994b3356cc6f.mockapi.io/products/${id}`,
        );
        setDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchDetailsFromStorage = async () => {
      try {
        const storedDetail = await AsyncStorage.getItem(`product_${id}`);
        if (storedDetail) {
          setDetail(JSON.parse(storedDetail));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchDetailsFromStorage();
  }, [id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesJson = await AsyncStorage.getItem('favorites');
        const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
        setIsFavorite(favorites.includes(id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, [id]);

  const handleAddToBasket = async () => {
    setBasket(prevBasket => [...prevBasket, id]);
    try {
      await AsyncStorage.setItem(`product_${id}`, JSON.stringify(detail));
      navigation.navigate('Basket', {basket: [...basket, {id, detail}]});
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      favorites.push(id);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      const updatedFavorites = favorites.filter(
        (favoriteId: string) => favoriteId !== id,
      );
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
          }>
          {isFavorite ? (
            <MaterialCommunityIcons name="heart" size={26} color="red" />
          ) : (
            <MaterialCommunityIcons
              name="heart-outline"
              size={26}
              color="black"
            />
          )}
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="#C1C6CF" />
      ) : (
        <ScrollView>
          <View style={styles.prodImg}>
            <Image
              source={{uri: detail?.prodImage}}
              style={styles.prodImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.secondaryContainer}>
            <Text style={styles.majorLabel}>{detail?.brand}</Text>
            <Text style={styles.minorLabel}>Colors</Text>
            <View style={styles.prodDetTypes}>
              <View style={styles.prodDetType}>
                <View
                  style={[
                    styles.prodColor,
                    {backgroundColor: '#7485C1', borderColor: '#7485C1'},
                  ]}
                />
                <Text style={styles.prodColorLabel}>Sky Blue</Text>
              </View>
              <View style={styles.prodDetType}>
                <View
                  style={[
                    styles.prodColor,
                    {backgroundColor: '#C9A19C', borderColor: '#C9A19C'},
                  ]}
                />
                <Text style={styles.prodColorLabel}>Sky Blue</Text>
              </View>
              <View style={styles.prodDetType}>
                <View
                  style={[
                    styles.prodColor,
                    {backgroundColor: '#A1C89B', borderColor: '#A1C89B'},
                  ]}
                />
                <Text style={styles.prodColorLabel}>Sky Blue</Text>
              </View>
            </View>
            <Text style={styles.catchLabel}>{detail?.specialOffer}</Text>
            <Text style={styles.catchText}>
              Available when you purchase any new iPhone, iPad, iPod Touch, Mac
              or Apple TV, £4.99/month after free trial.
            </Text>
            <View style={styles.priceField}>
              <Text style={styles.priceFieldLabelLeft}>Price</Text>
              <Text style={styles.priceFieldLabelRight}>$ {detail?.price}</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddToBasket}>
              <Text style={styles.addBtnLabel}>Add to basket</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 25,
    backgroundColor: '#F6F6F9',
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prodImg: {
    backgroundColor: '#F6F6F9',
    height: 400,
    width: 450,
  },
  majorLabel: {
    fontSize: 28,
    paddingTop: 20,
    paddingBottom: 8,
    fontWeight: '600',
  },
  minorLabel: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 8,
  },
  label: {
    fontSize: 18,
    color: '#575D82',
  },
  secondaryContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    height: 450,
  },
  prodColor: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
  prodColorLabel: {
    fontSize: 14,
    fontWeight: '600',
    paddingRight: 8,
  },
  catchLabel: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 15,
    paddingBottom: 8,
  },
  catchText: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 1,
    lineHeight: 22,
  },
  prodDetType: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    borderRadius: 10,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 115,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  prodDetTypes: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  priceField: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceFieldLabelLeft: {
    fontSize: 18,
    fontWeight: '300',
  },
  priceFieldLabelRight: {
    color: '#5956E9',
    fontSize: 22,
    fontWeight: '700',
  },
  addBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: '10%',
    marginBottom: 30,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#5956E9',
  },
  addBtnLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  prodImage: {
    height: 400,
    width: 450,
    resizeMode: 'contain',
  },
});
