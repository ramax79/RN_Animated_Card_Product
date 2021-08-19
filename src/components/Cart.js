import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Product } from '../Data'

export const Cart = () => {
  return (
    <View>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 16,
          textTransform: 'uppercase',
        }}
      >
        {Product.title}
      </Text>
      <Text style={{ fontSize: 16 }}>{Product.price}</Text>
      <View style={{ marginVertical: 20 }}>
        {Product.description.map((text, index) => {
          return (
            <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
              {text}
            </Text>
          )
        })}
      </View>
      <View style={{ marginVertical: 20 }}>
        {Product.description.map((text, index) => {
          return (
            <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
              {text}
            </Text>
          )
        })}
      </View>
      <View style={{ marginVertical: 20 }}>
        {Product.description.map((text, index) => {
          return (
            <Text key={index} style={{ marginBottom: 10, lineHeight: 22 }}>
              {text}
            </Text>
          )
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({})
