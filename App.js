import React from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import {
  Image,
  FlatList,
  Text,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native'
import { Product } from './src/Data'
import { Cart } from './src/components/Cart'

const { width, height } = Dimensions.get('screen')

const ITEM_WIDTH = width
const ITEM_HEIGHT = height * 0.75
const DOT_SIZE = 8
const DOT_SPACING = 8
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current 
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList          
          data={Product.images}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT} 
          decelerationRate="fast" 
          showsVerticalScrollIndicator={false} 
          bounces={false} 
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            )
          }}
        />
        <View style={styles.pagination}>
          {Product.images.map((_, index) => {
            return <View key={index} style={[styles.dot]} />
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        initialSnapIndex={0}
        snapPoints={[height - ITEM_HEIGHT, height]}
      >
        <BottomSheetScrollView
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ padding: 20 }}
        >
          <Cart />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: '#333',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
})
