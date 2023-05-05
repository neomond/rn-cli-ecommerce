import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const DetailsScreen = ({route}: any) => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const {id} = route.params;

  useEffect(() => {
    axios
      .get('https://64552f94a74f994b335480de.mockapi.io/products/' + id)
      .then(res => {
        setDetail(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(true);
      });
  }, []);
  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* {loading ? (
        <ActivityIndicator size="small" color="#C1C6CF" />
      ) : (
        <Text style={styles.label}> {detail?.description}</Text>
      )} */}
      <View>
        <View style={styles.prodImg}></View>
        <View style={styles.secondaryContainer}>
          <Text style={styles.majorLabel}>2020 Apple iPad Air 10.9"</Text>
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
          <Text style={styles.catchLabel}>Get Apple TV+ free for a year</Text>
          <Text style={styles.catchText}>
            Available when you purchase any new iPhone, iPad, iPod Touch, Mac or
            Apple TV, £4.99/month after free trial.
          </Text>
          <View style={styles.priceField}>
            <Text style={styles.priceFieldLabelLeft}>Price</Text>
            <Text style={styles.priceFieldLabelRight}>$ 579</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnLabel}>Add to basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 25,
    backgroundColor: '#F6F6F9',
  },
  prodImg: {
    backgroundColor: '#F6F6F9',
    height: 450,
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
    backgroundColor: '#fff',
    paddingHorizontal: 25,
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
    marginHorizontal: '20%',
    marginBottom: 50,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#5956E9',
  },
  addBtnLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
