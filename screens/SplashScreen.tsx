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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.label}>Find your Gadget</Text>
        </View>
        <Image
          source={require('../assets/images/splashImg.png')}
          style={{marginTop: -10}}
        />
        <Image
          source={require('../assets/images/blur.png')}
          style={{position: 'absolute', bottom: 20}}
        />
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
    alignItems: 'center',
  },
  label: {
    fontSize: 65,
    color: '#FFFFFF',
    paddingTop: 75,
    fontWeight: '700',
    letterSpacing: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: '8%',
    marginTop: 30,
  },
  labelBtn: {
    color: '#5956E9',
    fontSize: 20,
    fontWeight: '600',
  },
});
