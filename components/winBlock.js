import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { styles } from '../styles'; 

const WinBlock = ({ score, onRestart }) => {
  return (
    <View style={styles.winBlock}>
      <Image source={require('../img/win.jpg')} style={styles.winImg} />
      <View style={styles.winBlockContent}>
        <Text style={styles.winText}>You win {score}</Text>
        <Image source={require('../img/menu/bals.png')} style={styles.balsImg} />
        <Button title="Restart" onPress={onRestart} style={styles.resBtn} />
      </View>
    </View>
  );
};

export default WinBlock;
