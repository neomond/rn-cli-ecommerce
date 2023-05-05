import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.label}>Profile</Text>
      <View style={styles.itemWrapper}>
        <View style={styles.profileImg}>
          <Image source={require('../assets/images/profilePic.png')} />
        </View>
        <Text style={styles.profName}>Rosina Doe</Text>
        <View style={styles.contprof}>
          <View>
            <Ionicons name="md-location-outline" size={26} />
          </View>
          <View style={styles.textAddress}>
            <Text>Address: 43 Oxford Road</Text>
            <Text>M13 4GR</Text>
            <Text>Manchester, UK</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
  },
  contprof: {
    flexDirection: 'row',
    columnGap: 18,
  },
  label: {
    marginTop: 30,
    marginBottom: 40,
    fontSize: 18,
    fontWeight: '700',
  },
  profileImg: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#eca43d',
    marginBottom: 10,
  },
  profName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 25,
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 15,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 22,
    },
    shadowOpacity: 0.18,
    shadowRadius: 26.0,

    elevation: 24,
  },
  textAddress: {
    width: '60%',
    paddingBottom: 10,
  },
});
