import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Text style={styles.label}>Find your Gadget</Text>
        <Image source={{uri: '/splashing.png'}} style={styles.tinyLogo} />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.labelBtn}>Get started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#5956E9',
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 65,
    color: '#FFFFFF',
    paddingTop: 75,
    fontWeight: '700',
    letterSpacing: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  button: {
    width: 300,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelBtn: {
    color: '#5956E9',
    fontSize: 20,
    fontWeight: '600',
  },
});
