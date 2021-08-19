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

// const images = [
//   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
//   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
//   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
//   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
//   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
// ]

// const product = {
//   title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
//   description: [
//     'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
//     'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
//   ],
//   price: '29.99£',
//   images: [
//     'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
//     'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
//     'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
//     'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
//     'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
//   ],
// }

const DOT_SIZE = 8
const DOT_SPACING = 8
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current // равна реакции использования ref новое анимированное значение и мы начнем с 0 получим текущее. Мне нравится реагировать чтобы отслеживать все поэтому всякий раз когда этот компонент будет повторно отображаться прокрутка х не будет изменяться чтобы значение сохранялось в течени жизненного цикла компонента и с этот scrollx scrolly который у нас есть мы можем определить onscrollmethod и применить к плоскому списку но сначала давайте превратим этот плоский список в анимированный плоский список (заменим ниже FlatList на Animted.FlatList) и передадим метод onscroll будет анимированным событием мы получим из смещения содержимого собственного события У и назначим его прокрутке У и в нашем случае мы будем использовать собственный драйвер ничего не д. измениться прямо сейчас. [{nativeEvent:{contentOffset:{y: scrollY}}}], {useNativeDriver: true}
  // когда этот свиток д. произойти мы фактически собираемся изменить прокрутить у и мы можем интерполировать его мы можем играть вокруг с анимацией на основе этого значения.

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList // назначим стиль для view высота будет высотой элемента переполнение скрыто
          //FlatList будет содержать изображения
          data={Product.images}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT} // привязка к интервалу где на самом деле делать снимки с каким интервлом будет высотой предмета
          decelerationRate="fast" // изменить скокрость замедления на быструю
          showsVerticalScrollIndicator={false} // выключим вертикальный индикатор
          bounces={false} // избавимся от элемента отскока
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
