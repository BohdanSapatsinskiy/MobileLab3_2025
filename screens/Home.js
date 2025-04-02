import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import ClickButton from '../components/clickButton';
import WinBlock from '../components/winBlock';
import { useScore } from '../components/scoreContext';

const Home = () => {
  const { score, incrementScore, incrementAction, resetScore } = useScore();

  const handleTap = () => {
    incrementAction('singleClick');
    incrementScore(1);
  };

  const handleDoubleTap = () => {
    incrementAction('doubleClick');
    incrementScore(2);
  };

  const handleLongPress = () => {
    incrementAction('longPress');
    incrementScore(5);
  };

  const handlePan = () => {
    incrementAction('drag');
    incrementScore(4);
  };

  const handleFling = () => {
    incrementAction('swipe');
    incrementScore(2);
  };

  const handlePinch = () => {
    incrementAction('pinch');
    incrementScore(3);
  };

  const handleRestart = () => {
    resetScore()
  };

  return (
    <View style={styles.mainBlock}>
      <Text style={styles.tittle}>Clicker</Text>
      <Text style={styles.ScoreElem}>Your score: {score}</Text>

      <ClickButton
        onTap={handleTap}
        onDoubleTap={handleDoubleTap}
        onLongPress={handleLongPress}
        onPan={handlePan}
        onFling={handleFling}
        onPinch={handlePinch}
      />

      {score >= 100 && <WinBlock score={score} onRestart={handleRestart} />}
    </View>
  );
};

export default Home;


