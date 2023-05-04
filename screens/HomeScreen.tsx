import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Products from '../components/Products';

export interface Item {
  id: number;
  name: string;
  serie: string;
  price: number;
}

const data: Item[] = [
  {id: 1, name: 'apple', serie: 'Series 6 . Red', price: 359},
  {id: 2, name: 'apple', serie: 'Series 6 . Red', price: 359},
  {id: 3, name: 'apple', serie: 'Series 6 . Red', price: 359},
];

const HomeScreenScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <Pressable onPress={() => navigation.goBack()}>
        <Text>Get started</Text>
      </Pressable> */}
      <TextInput placeholder="Search" style={styles.input} />
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Order online collect in store</Text>
      </View>
      <ScrollView horizontal={true} style={styles.categories}>
        <Text style={[styles.categoryLabel, {color: '#5956E9'}]}>Wearable</Text>
        <Text style={styles.categoryLabel}>Laptops</Text>
        <Text style={styles.categoryLabel}>Phones</Text>
        <Text style={styles.categoryLabel}>Drones</Text>
      </ScrollView>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: {item: Item}) => <Products item={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreenScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  input: {
    paddingHorizontal: 45,
    paddingVertical: 20,
    borderColor: '#C9C9C9',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 30,
    fontSize: 18,
    color: '#868686',
    fontWeight: '600',
    marginHorizontal: 20,
  },
  viewLabel: {
    width: '70%',
    marginBottom: 50,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 1,
  },
  categoryLabel: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#9A9A9D',
    marginLeft: 20,
  },
  categories: {
    marginBottom: 40,
  },
});
