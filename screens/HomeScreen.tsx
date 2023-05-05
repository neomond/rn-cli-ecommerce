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
import React, {useEffect, useState} from 'react';
import Products from '../components/Products';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios';

export interface Product {
  id: string;
  categories: string;
  brand: string;
  serie: string;
  price: number;
  prodImage: string;
  prodDetails: string;
}

const HomeScreenScreen = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://6453917be9ac46cedf28fd8d.mockapi.io/products')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  const handleSearch = (text: any) => {
    const filtered = data.filter(item =>
      item.brand.toLowerCase().includes(text.toLowerCase()),
    );
    console.log(filteredData);
    setFilteredData(filtered);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.searchIcon}>
        <Ionicons name="search-outline" size={26} color="#200E32" />
      </View>

      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={handleSearch}
      />
      <View style={styles.viewLabel}>
        <Text style={styles.label}>Order online collect in store</Text>
      </View>
      <ScrollView horizontal={true} style={styles.categories}>
        <Text style={[styles.categoryLabel, {color: '#5956E9'}]}>Wearable</Text>
        <Text style={styles.categoryLabel}>Laptops</Text>
        <Text style={styles.categoryLabel}>Phones</Text>
        <Text style={styles.categoryLabel}>Drones</Text>
      </ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={filteredData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}: {item: Product}) => <Products item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreenScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  input: {
    paddingHorizontal: 55,
    paddingVertical: 15,
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
    marginBottom: 0,
  },
  searchIcon: {
    position: 'absolute',
    top: 112,
    left: 40,
  },
});

// const data: Item[] = [
//   {id: 1, name: 'apple', serie: 'Series 6 . Red', price: 359},
//   {id: 2, name: 'apple', serie: 'Series 6 . Red', price: 359},
//   {id: 3, name: 'apple', serie: 'Series 6 . Red', price: 359},
// ];
{
  /* <Pressable onPress={() => navigation.goBack()}>
        <Text>Get started</Text>
      </Pressable> */
}
