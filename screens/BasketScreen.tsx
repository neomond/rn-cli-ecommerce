import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// type RootStackParamList = {
//   Basket: {basket: string[]};
// };

// type BasketScreenRouteProp = RouteProp<RootStackParamList, 'Basket'>;

// type BasketScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Basket'
// >;

// type Props = {
//   route: BasketScreenRouteProp;
//   navigation: BasketScreenNavigationProp;
// };

const BasketScreen = ({route}: any): any => {
  const {basket} = route.params;

  const [itemQuantities, setItemQuantities] = useState<number[]>(
    Array(basket.length).fill(1),
  ); // initialize all quantities to 1

  const handleIncreaseQuantity = (index: number) => {
    const newQuantities = [...itemQuantities];
    newQuantities[index] += 1;
    setItemQuantities(newQuantities);
  };

  const handleDecreaseQuantity = (index: number) => {
    const newQuantities = [...itemQuantities];
    newQuantities[index] = Math.max(newQuantities[index] - 1, 1); // ensure quantity is at least 1
    setItemQuantities(newQuantities);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <View style={styles.renderedItemsWrapper}>
      <Image
        source={{uri: item.detail?.prodImage}}
        style={{width: 80, height: 105}}
      />
      <View style={styles.itemsRenText}>
        <Text style={styles.itemRenMain}>{item.detail?.brand}</Text>
        <Text style={styles.itemRenPrice}>${item.detail?.price}</Text>
        <View style={styles.quantitiWrapper}>
          <Text style={styles.incrQuantity}>Quantity</Text>

          <View style={styles.incrWrapper}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(index)}>
              <Text style={styles.incr}>-</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.counter}>{itemQuantities[index]}</Text>
          <View style={styles.incrWrapper}>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(index)}>
              <Text style={styles.incr}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Basket</Text>
      </View>
      <View>
        <View style={styles.notif}>
          <Feather name="bell" size={20} />
          <Text style={styles.notifText}>
            Delivery for FREE until the end of the month
          </Text>
        </View>
        <View>
          {basket.length > 0 ? (
            <FlatList
              style={styles.renderedItems}
              data={basket}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Your basket is empty.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 40,
    backgroundColor: '#f2f2f2',
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  notif: {
    paddingHorizontal: 11,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#D3F2FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
    marginBottom: 15,
  },
  notifText: {
    fontWeight: '500',
    fontSize: 12,
  },
  renderedItemsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginBottom: 15,
  },
  renderedItems: {
    // backgroundColor: '#fff',
    flexDirection: 'column',
    // paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16.0,
    elevation: 4,
    marginHorizontal: 40,
  },
  itemsRenText: {
    marginLeft: 15,
    justifyContent: 'center',
    rowGap: 10,
  },
  quantitiWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incrWrapper: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7DCCEC',
    marginHorizontal: 6,
  },
  incr: {
    backgroundColor: '#7DCCEC',
    paddingHorizontal: 5,
    color: '#fff',
    fontSize: 15,
  },
  itemRenMain: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemRenPrice: {
    color: '#5956E9',
    fontWeight: '600',
    fontSize: 17,
  },
  incrQuantity: {
    fontSize: 16,
    fontWeight: '200',
    marginRight: 10,
  },
  counter: {
    fontSize: 15,
    fontWeight: '500',
  },
});
