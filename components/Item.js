import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Item = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.text}</Text>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => props.delete(props.id)}
      >
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'lightblue',
    width: 380,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    backgroundColor: 'red',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
