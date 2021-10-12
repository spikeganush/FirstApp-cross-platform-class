import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Item = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
})
