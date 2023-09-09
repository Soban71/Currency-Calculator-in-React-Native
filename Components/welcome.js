import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {

    const navigation = useNavigation();

  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={require('../assets/convert.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to currency Convertor</Text>
      <Text style={styles.subtitle}>Convert your currency here!</Text>
      <View style={styles.buttonContainer}>
 <Button title='Get Started' onPress={() => navigation.navigate('ConvertorScreen')} color="#016A70" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#053B50',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
    opacity: 0.7,
  },

  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
    opacity: 0.7,
  },

  buttonContainer: {
    marginTop: 40,
    width: 300,
    height: 60,
    backgroundColor: '#016A70',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
});
