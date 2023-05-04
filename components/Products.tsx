import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Item} from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: Item;
}
const Products = ({item}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.prodWrapper}>
      <TouchableOpacity
        style={styles.prodCont}
        onPress={() => navigation.navigate('Details', {name: item.name})}>
        <View style={styles.imgWrapper}></View>
        <View style={styles.prodComponent}>
          <Text style={styles.toplabel}>{item.name}</Text>
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
    paddingVertical: 50,
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
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodComponent: {
    alignItems: 'center',
    paddingTop: 130,
    paddingBottom: 50,
  },
  imgWrapper: {
    position: 'absolute',
    top: -30,
    borderRadius: 60,
    backgroundColor: '#FADFE0',
    width: 120,
    height: 120,
  },
  toplabel: {
    fontSize: 22,
    color: '#000',
    paddingBottom: 5,
  },
  middlelabel: {
    fontSize: 16,
    color: '#868686',
    paddingBottom: 15,
  },
  bottomlabel: {
    color: '#5956E9',
    fontSize: 16,
    fontWeight: '700',
  },
});
