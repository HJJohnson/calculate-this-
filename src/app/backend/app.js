import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['C']
];

export default function App() {
  const [display, setDisplay] = useState('0');
  const [lastDigit, setLastDigit] = useState(null);
  const [result, setResult] = useState(null);

  // Function to handle button presses
  const handlePress = (value) => {
    if (value === 'C') {
      setDisplay('0');
      setResult(null);
      setLastDigit(null);
    } else if (value === '=') {
      calculateResult();
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value));
    }
  };

  // Function to calculate the result
  const calculateResult = () => {
    try {
      const calcResult = eval(display); // Use eval to compute the math expression
      setResult(calcResult);
      const lastNum = calcResult.toString().slice(-1); // Get the last digit of the result
      setLastDigit(lastNum);
      playMeme(lastNum); // Play meme based on the last digit
    } catch (error) {
      setDisplay('Error');
    }
  };

  // Function to play the corresponding meme based on last digit
  const playMeme = async (digit) => {
    let soundObject = new Audio.Sound();

    // Define sound for each digit
    switch (digit) {
      case '0':
        await soundObject.loadAsync(require('./assets/sound/black.mp3'));
        break;
      case '1':
        await soundObject.loadAsync(require('./assets/sound/fuck.mp3'));
        break;
      case '2':
        await soundObject.loadAsync(require('./assets/sound/monkey.mp3'));
        break;
      case '3':
        await soundObject.loadAsync(require('./assets/sound/rickroll.mp3'));
        break;
      case '4':
        await soundObject.loadAsync(require('./assets/sound/tit.mp3'));
        break;
      case '5':
        await soundObject.loadAsync(require('./assets/sound/black.mp3'));
        break;
      case '6':
        await soundObject.loadAsync(require('./assets/sound/fuck.mp3'));
        break;
      case '7':
        await soundObject.loadAsync(require('./assets/sound/monkey.mp3'));
        break;
      case '8':
        await soundObject.loadAsync(require('./assets/sound/rickroll.mp3'));
        break;
      case '9':
        await soundObject.loadAsync(require('./assets/sound/tit.mp3'));
        break;
      default:
        await soundObject.loadAsync(require('./assets/sounds/default.mp3'));
        break;
    }

    await soundObject.playAsync();
  };

  // Function to get the meme image based on the last digit
  const getMemeImage = (digit) => {
    switch (digit) {
      case '0':
        return require('./assets/image/meme05.png');
      case '1':
        return require('./assets/image/meme16.jpeg');
      case '2':
        return require('./assets/image/meme27.jpeg');
      case '3':
        return require('./assets/image/meme38.webp');
      case '4':
        return require('./assets/image/meme49.jpeg');
      case '5':
        return require('./assets/image/meme05.png');
      case '6':
        return require('./assets/image/meme16.jpeg');
      case '7':
        return require('./assets/image/meme27.jpeg');
      case '8':
        return require('./assets/image/meme38.webp');
      case '9':
        return require('./assets/image/meme49.jpeg');
      default:
        return require('./assets/image/default.jpeg');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{result !== null ? result : display}</Text>
      </View>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
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
      {lastDigit !== null && (
        <Image
          source={getMemeImage(lastDigit)} // Load corresponding image based on last digit
          style={styles.memeImage}
        />
      )}
    </View>
  );
}

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
  }
});