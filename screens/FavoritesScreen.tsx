import Svg from 'react-native-svg';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from './HomeScreen';
import AvatarImg from '../assets/images/ava1.svg';

const FavoritesScreen: React.FC = ({navigation}: any): any => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getFavoriteProducts = async () => {
      const jsonValue = await AsyncStorage.getItem('@favorite_products');
      if (jsonValue !== null) {
        setFavoriteProducts(JSON.parse(jsonValue));
      }
    };
    getFavoriteProducts();
  }, []);

  const handleRemoveFavorite = async (productId: string) => {
    const updatedFavorites = favoriteProducts.filter(
      product => product.id !== productId,
    );
    await AsyncStorage.setItem(
      '@favorite_products',
      JSON.stringify(updatedFavorites),
    );
    setFavoriteProducts(updatedFavorites);
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() => handleRemoveFavorite(item.id)}
      style={{flexDirection: 'row', marginVertical: 8}}>
      <Image source={{uri: item.prodImage}} style={{width: 80, height: 80}} />
      <View style={{marginLeft: 16}}>
        <Text style={{fontWeight: 'bold'}}>{item.brand}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 8}}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={favoriteProducts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={(): any => (
          <View style={styles.noFavWrapper}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Basket</Text>
            </View>
            <View style={styles.imagesFav}>
              <Image
                style={{width: 48, height: 69}}
                source={require('../assets/images/Saly-10.png')}
              />
              <Image
                style={{marginTop: 40, width: 246, height: 352}}
                source={require('../assets/images/Sally-4.png')}
              />
            </View>
            <Text style={styles.noFav}>No favorites yet</Text>
            <Text style={styles.noFavStart}>
              Hit the button down below to Create an order
            </Text>
            <TouchableOpacity
              style={styles.startOrderBtn}
              onPress={() => navigation.navigate('Details')}>
              <Text style={styles.startOrderBtnText}>Start ordering</Text>
            </TouchableOpacity>
            {/* <AvatarImg /> */}
          </View>
        )}
      />

      {/* <View style={styles.tabBar} /> */}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  // tabBar: {
  //   height: 200,
  //   paddingTop: 110,
  //   backgroundColor: '#fff',
  // },
  noFavWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  noFav: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',
  },
  noFavStart: {
    paddingHorizontal: '25%',
    fontSize: 17,
    fontWeight: '300',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Raleway-Bold',
  },
  startOrderBtn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#58C0EA',
    borderRadius: 10,
    marginTop: 30,
  },
  startOrderBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Raleway-Bold',
  },
  imagesFav: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 50,
    columnGap: 10,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',
  },
});
