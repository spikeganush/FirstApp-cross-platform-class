import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Constants from 'expo-constants'

const Item = (props) => {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  )
}

export default function App() {
  const AppData = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Pineapple' },
    { id: '3', name: 'Tomato' },
    { id: '4', name: 'Banana' },
    { id: '5', name: 'Blueberry' },
  ]

  const Renderer = ({ item }) => <Item text={item.name} />
  return (
    <View style={styles.container}>
      <Text>First flatlist</Text>
      <FlatList
        data={AppData}
        renderItem={Renderer}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
