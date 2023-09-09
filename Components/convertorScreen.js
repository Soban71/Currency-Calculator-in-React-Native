import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';
import axios from 'axios';

export default function CurrencyConverterScreen() {
  const [amount, setAmount] = useState('0');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [isBaseDropdownVisible, setBaseDropdownVisible] = useState(false);
  const [isTargetDropdownVisible, setTargetDropdownVisible] = useState(false);

  const currencyOptions = [
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'Japanese Yen (JPY)', value: 'JPY' },
    { label: 'British Pound (GBP)', value: 'GBP' },
    { label: 'Australian Dollar (AUD)', value: 'AUD' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD' },
    { label: 'Swiss Franc (CHF)', value: 'CHF' },
    { label: 'US Dollar (USD)', value: 'USD' },
    { label: 'Indian Rupee (INR)', value: 'INR' },
    { label: 'Chinese Yuan (CNY)', value: 'CNY' },
    { label: 'South Korean Won (KRW)', value: 'KRW' },
    { label: 'Mexican Peso (MXN)', value: 'MXN' },
    { label: 'Brazilian Real (BRL)', value: 'BRL' },
    { label: 'Singapore Dollar (SGD)', value: 'SGD' },
    { label: 'Hong Kong Dollar (HKD)', value: 'HKD' },
    { label: 'New Zealand Dollar (NZD)', value: 'NZD' },
    { label: 'Swedish Krona (SEK)', value: 'SEK' },
    { label: 'Norwegian Krone (NOK)', value: 'NOK' },
    { label: 'Danish Krone (DKK)', value: 'DKK' },
    { label: 'Russian Ruble (RUB)', value: 'RUB' },
    { label: 'South African Rand (ZAR)', value: 'ZAR' },
    { label: 'Turkish lira (TRY)', value: 'TRY' },
    { label: 'Indonesian rupiah (IDR)', value: 'IDR' },
    { label: 'Thai baht (THB)', value: 'THB' },
    { label: 'Philippine peso (PHP)', value: 'PHP' },
    { label: 'Malaysian ringgit (MYR)', value: 'MYR' },
    { label: 'Vietnamese dong (VND)', value: 'VND' },
    { label: 'Israeli new shekel (ILS)', value: 'ILS' },
    { label: 'Hungarian forint (HUF)', value: 'HUF' },
    { label: 'Polish zloty (PLN)', value: 'PLN' },
    { label: 'Czech Republic koruna (CZK)', value: 'CZK' },
    { label: 'Romanian leu (RON)', value: 'RON' },
    { label: 'Bulgarian lev (BGN)', value: 'BGN' },
    { label: 'Croatian kuna (HRK)', value: 'HRK' },
    { label: 'Serbian dinar (RSD)', value: 'RSD' },
    { label: 'Slovak koruna (SKK)', value: 'SKK' },
    { label: 'Slovenian euro (EUR)', value: 'EUR' },
    { label: 'Pakistani rupee (PKR)', value: 'PKR' },
  ];

  const baseDropdownRef = useRef(null);
  const targetDropdownRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://v6.exchangerate-api.com/v6/5f369cf9dc754b2d5f02da1f/latest/${baseCurrency}`)
      .then((response) => {
        if (response.data && response.data.conversion_rates) {
          const rate = response.data.conversion_rates[targetCurrency];
          setExchangeRate(rate.toString());
        } else {
          console.error('Invalid response format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [baseCurrency, targetCurrency]);

  const convertCurrency = () => {
    const result = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(result);
  };

  const handleBaseCurrencyChange = (value) => {
    setBaseCurrency(value);
    setBaseDropdownVisible(false);
  };

  const handleTargetCurrencyChange = (value) => {
    setTargetCurrency(value);
    setTargetDropdownVisible(false);
  };

  const renderBaseDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleBaseCurrencyChange(item.value)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderTargetDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleTargetCurrencyChange(item.value)}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>

    
  );

  return (
    <View style={styles.container}>

<Image
        source={require('../assets/convert.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="black"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setBaseDropdownVisible(!isBaseDropdownVisible);
          if (baseDropdownRef.current) {
            baseDropdownRef.current.scrollToIndex({ animated: true, index: 0 });
          }
        }}
      >
      <Text style={{fontSize:18,opacity:0.9,color:'black'}}>Select Base Currency</Text>
        <Text style={styles.dropdownButtonText}>
          {baseCurrency} ▼
        </Text>
      </TouchableOpacity>

      {isBaseDropdownVisible && (
        <FlatList
          ref={baseDropdownRef}
          data={currencyOptions}
          renderItem={renderBaseDropdownItem}
          keyExtractor={(item) => item.value}
          style={styles.dropdownList}
        />
      )}

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => {
          setTargetDropdownVisible(!isTargetDropdownVisible);
          if (targetDropdownRef.current) {
            targetDropdownRef.current.scrollToIndex({ animated: true, index: 0 });
          }
        }}
      >
         <Text style={{fontSize:18,opacity:0.9,color:'black'}}>Select Target Currency</Text>
        <Text style={styles.dropdownButtonText}>
          {targetCurrency} ▼
        </Text>
      </TouchableOpacity>

      {isTargetDropdownVisible && (
        <FlatList
          ref={targetDropdownRef}
          data={currencyOptions}
          renderItem={renderTargetDropdownItem}
          keyExtractor={(item) => item.value}
          style={styles.dropdownList}
        />
      )}

      

      <TouchableOpacity style={styles.buttonContainer} onPress={convertCurrency}>
        <Text style={styles.button}>Convert</Text>
      </TouchableOpacity>

      {convertedAmount && (
  <Text style={styles.resultText}>
    {amount} {baseCurrency} is {convertedAmount} {targetCurrency}
  </Text>
)}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#053B50', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 40,
    borderRadius: 100,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    opacity: 0.8
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    backgroundColor: 'white',
    padding:20,
    width: '70%',
    textAlign: 'center',
    opacity: 0.8,
    borderRadius: 20
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#176B87',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.7,
   // marginTop
  },
  dropdownButton: {
    marginTop: 20,
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8
   // justifyContent:''
  },
  dropdownButtonText: {
    marginTop:6,
    fontSize: 17,
    color: 'black',
    opacity: 0.9,
  },
  dropdownList: {
    width: '100%',
    maxHeight: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:5
  },
  dropdownItem: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //marginTop: 5;

  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});
