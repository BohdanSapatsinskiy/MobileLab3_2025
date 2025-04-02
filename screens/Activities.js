import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { useScore } from '../components/scoreContext';

const Activities = () => {
  const { score, actions } = useScore(); 

  if (!score || !actions) {
    return (
      <View style={styles.mainBlock}>
        <Text style={styles.tittle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainBlock}>
      <Text style={styles.tittle}>Activities</Text>
      <Text style={styles.ScoreElem}>Your score: {score}</Text>

      <View style={styles.scoreBlock}>
        <Text style={styles.noteElemSmall}>Одиничний клік: {actions.singleClick} Х 1бал</Text>
        <Text style={styles.noteElemSmall}>Подвійний клік: {actions.doubleClick} Х 2бали</Text>
        <Text style={styles.noteElemSmall}>Утримувати: {actions.longPress} Х 5балів</Text>
        <Text style={styles.noteElemSmall}>Перетягування: {actions.drag} Х 4бали</Text>
        <Text style={styles.noteElemSmall}>Свайп: {actions.swipe} Х ?балів</Text>
        <Text style={styles.noteElemSmall}>Маштабування: {actions.pinch} Х 3балів</Text>
      </View>
    </View>
  );
};

export default Activities;



