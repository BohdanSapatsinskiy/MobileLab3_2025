import React, { useState, useRef } from 'react';
import { View, Image } from 'react-native';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  FlingGestureHandler,
  PanGestureHandler,
  LongPressGestureHandler,
  TapGestureHandler,
  Directions,
} from 'react-native-gesture-handler';

const ClickButton = ({ onTap, onDoubleTap, onLongPress, onPan, onFling, onPinch }) => {
  const [imageSource, setImageSource] = useState(require('../img/idle.png'));
  const [activeGesture, setActiveGesture] = useState(null);
  const [isPanActivated, setIsPanActivated] = useState(false);
  const [panTimeout, setPanTimeout] = useState(null);

  const panRef = useRef();
  const flingRightRef = useRef();
  const flingLeftRef = useRef();
  const doubleTapRef = useRef();
  const longPressRef = useRef();

  const updateActiveGesture = (gesture, image) => {
    if (activeGesture !== gesture) {
      setActiveGesture(gesture);
      setImageSource(image);
    }
  };

  const handleSingleTap = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture('tap', require('../img/oneClick.png'));
      onTap();
    }
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture('doubleTap', require('../img/doubleClick.png'));
      onDoubleTap();
    }
  };

  const handleLongPress = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture('longPress', require('../img/3seconds.png'));
      onLongPress();
    }
  };

  const handlePanGesture = (event) => {
    const { state} = event.nativeEvent;

    if (state === 4) {
      setIsPanActivated(false);
      if (panTimeout) {
        clearTimeout(panTimeout);
        setPanTimeout(null);
      }
    }

    if (state === 2 && !isPanActivated) {

        if (!panTimeout) {
            setIsPanActivated(true);
            updateActiveGesture('pan', require('../img/move.png'));
            onPan();
        }
      }
    
  };

  const handleFlingRight = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture('fling', require('../img/swipeRight.png'));
      onFling();
    }
  };

  const handleFlingLeft = (event) => {
    if (event.nativeEvent.state === 4) {
      updateActiveGesture('fling', require('../img/swipeLeft.png'));
      onFling();
    }
  };

  const handlePinch = (event) => {
    updateActiveGesture('pinch', require('../img/sizing.png'));
    onPinch();
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler onGestureEvent={handlePinch}>
        <FlingGestureHandler
          ref={flingRightRef}
          direction={Directions.RIGHT}
          onHandlerStateChange={handleFlingRight}
          simultaneousHandlers={[panRef]} 
        >
          <FlingGestureHandler
            ref={flingLeftRef}
            direction={Directions.LEFT}
            onHandlerStateChange={handleFlingLeft}
            simultaneousHandlers={[panRef]} 
          >
            <PanGestureHandler
              ref={panRef}
              onGestureEvent={handlePanGesture}
              onHandlerStateChange={handlePanGesture}
              minDist={240}
              simultaneousHandlers={[flingRightRef, flingLeftRef]}
            >
              <LongPressGestureHandler
                ref={longPressRef}
                onHandlerStateChange={handleLongPress}
                minDurationMs={3000}
                waitFor={[doubleTapRef]}
              >
                <TapGestureHandler
                  onHandlerStateChange={handleSingleTap}
                  numberOfTaps={1}
                  waitFor={[doubleTapRef]}
                >
                  <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={handleDoubleTap} numberOfTaps={2}>
                    <View style={{ padding: 20, backgroundColor: 'skyblue', borderRadius: 10 }}>
                      <Image source={imageSource} style={{ width: 160, height: 160 }} />
                    </View>
                  </TapGestureHandler>
                </TapGestureHandler>
              </LongPressGestureHandler>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ClickButton;
