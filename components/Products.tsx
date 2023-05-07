import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// import Profile from '../assets/images/profile.svg';

const Products = ({item}: any): any => {
  const navigation = useNavigation();
  const goToDetail = (id: number): any => {
    navigation.navigate('Details', {id: id});
  };
  return (
    <View style={styles.prodWrapper}>
      <TouchableOpacity
        style={styles.prodCont}
        onPress={() => goToDetail(item.id)}>
        <View style={styles.imgWrapper}>
          <Image
            source={{uri: item.prodImage}}
            style={styles.prodImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.prodComponent}>
          <Text style={styles.toplabel}>{item.brand}</Text>
          <Text style={styles.middlelabel}>{item.serie}</Text>
          <Text style={styles.bottomlabel}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  prodWrapper: {
    paddingLeft: 20,
    paddingVertical: 70,
    fontFamily: 'Raleway-Bold',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16.0,
    elevation: 4,
  },
  prodCont: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodComponent: {
    alignItems: 'center',
    paddingTop: 130,
    paddingBottom: 30,
  },
  imgWrapper: {
    position: 'absolute',
    top: -40,
    borderRadius: 200,
    backgroundColor: '#e3e3e3',
    width: 160,
    height: 160,
  },
  toplabel: {
    fontSize: 22,
    color: '#000',
    paddingBottom: 8,
    fontWeight: '600',
    fontFamily: 'Raleway-Bold',
  },
  middlelabel: {
    fontSize: 16,
    color: '#868686',
    paddingBottom: 15,
    fontWeight: '500',
    fontFamily: 'Raleway-Bold',
  },
  bottomlabel: {
    color: '#5956E9',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Raleway-Bold',
  },
  prodImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 200,
  },
});
