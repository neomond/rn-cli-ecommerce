import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const FavoritesScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const fetchFavoritesFromStorage = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchFavoritesFromStorage();
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <ScrollView>
        {favorites.length > 0 ? (
          favorites.map(id => (
            <View key={id} style={styles.rootMain}>
              <FavoriteItem navigation={navigation} key={id} id={id} />
            </View>
          ))
        ) : (
          <View style={styles.noFavWrapper}>
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const FavoriteItem = ({id, navigation}: {id: string; navigation: any}): any => {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://64554565a74f994b3356cc6f.mockapi.io/products/${id}`,
      );
      setDetail(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (!loading) {
    return (
      <View style={styles.rootContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Details', {id})}>
          <View style={styles.itemsContainer}>
            <Image
              source={{uri: detail?.prodImage}}
              style={styles.favoriteItemImage}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.brandText}>{detail?.brand}</Text>
              <Text style={styles.brandPrice}>From £{detail?.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // return (
  //   <View style={styles.noFavWrapper}>
  //     <View style={styles.imagesFav}>
  //       <Image
  //         style={{width: 48, height: 69}}
  //         source={require('../assets/images/Saly-10.png')}
  //       />
  //       <Image
  //         style={{marginTop: 40, width: 246, height: 352}}
  //         source={require('../assets/images/Sally-4.png')}
  //       />
  //     </View>
  //     <Text style={styles.noFav}>No favorites yet</Text>
  //     <Text style={styles.noFavStart}>
  //       Hit the button down below to Create an order
  //     </Text>
  //     <TouchableOpacity
  //       style={styles.startOrderBtn}
  //       onPress={() => navigation.navigate('Details')}>
  //       <Text style={styles.startOrderBtnText}>Start ordering</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
  rootMain: {
    flexDirection: 'row',
  },
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginHorizontal: 55,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16.0,
    elevation: 4,
  },
  itemsContainer: {
    rowGap: 20,
  },
  noFavWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  favoriteItemImage: {
    width: 125,
    height: 150,
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
  brandText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',

    // width: '85%',
    paddingBottom: 8,
  },
  brandPrice: {
    color: '#5956E9',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Raleway-Bold',
  },
});
