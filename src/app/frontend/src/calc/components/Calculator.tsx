import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

// Define types for buttons and state
type ButtonValue = string;

interface Meme {
  image: string;
  sound: string;
}

export default function App() {
  const [display, setDisplay] = useState<string>('0');
  const [result, setResult] = useState<number | null>(null);
  const [meme, setMeme] = useState<Meme | null>(null);

  // Button values for the calculator
  const buttons: ButtonValue[][] = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C'],
  ];

  // Handle button presses
  const handlePress = (value: ButtonValue): void => {
    if (value === 'C') {
      setDisplay('0');
      setResult(null);
      setMeme(null);
    } else if (value === '=') {
      calculateResult();
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value));
    }
  };

  // Calculate result by making a request to the backend
  const calculateResult = async (): Promise<void> => {
    try {
      const response = await axios.get('http://localhost:3000/calculate', {
        params: { expression: display },
      });

      const { result, lastDigit } = response.data;
      setResult(result);

      // Fetch the meme based on the last digit
      const memeResponse = await axios.get('http://localhost:3000/meme', {
        params: { digit: lastDigit },
      });

      setMeme(memeResponse.data);
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Area */}
      <View style={styles.display}>
        <Text style={styles.displayText}>{result !== null ? result : display}</Text>
      </View>

      {/* Calculator Buttons */}
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button: ButtonValue) => (
            <TouchableOpacity
              key={button}
              style={styles.button}
              onPress={() => handlePress(button)}
            >
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Display Meme if available */}
      {meme && (
        <>
          <Image source={{ uri: `http://localhost:3000${meme.image}` }} style={styles.memeImage} />
        </>
      )}
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  display: {
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: '#fff',
    fontSize: 48,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    padding: 20,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  memeImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});