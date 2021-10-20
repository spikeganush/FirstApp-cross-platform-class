import React, { useState, useEffect } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Item from './components/Item'

import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [data, setData] = useState('')
  const [validInput, setValidInput] = useState(false)
  const [input, setInput] = useState()

  const onTextChange = (value) => {
    // Disable the button if the input text is less than 2 characters
    setValidInput(value.length >= 3)
    setInput(value)
  }

  const addData = () => {
    const id = new Date().getTime().toString()
    const item = { id: id, name: input }
    setData([...data, item])
    setInput(null)
  }

  const deleteData = (id) => {
    let items = [...data]
    let newData = items.filter((item) => {
      if (item.id !== id) {
        return item
      }
    })
    setData(newData)
  }

  const storeData = async () => {
    try {
      const stringified = JSON.stringify(data)
      await AsyncStorage.setItem('listData', stringified)
    } catch (e) {
      consol.log(e)
    }
  }

  const getData = async () => {
    try {
      const stringified = await AsyncStorage.getItem('listData')
      setData(stringified !== null ? JSON.parse(stringified) : [])
    } catch (e) {
      consol.log(e)
    }
  }

  const changeStatus = (id) => {
    let items = [...data]
    items.forEach((item) => {
      if (item.id === id) {
        if (item.status === true) {
          item.status = false
        } else {
          item.status = true
        }
      }
    })
    console.log(items)

    addData(items)
  }

  useEffect(() => {
    if (!data) {
      getData()
    } else {
      storeData()
    }
  }, [data])

  const Renderer = ({ item }) => (
    <Item
      text={item.name}
      delete={deleteData}
      id={item.id}
      status={item.status}
      done={changeStatus}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First flatlist</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={onTextChange}
          placeholder="Min 3 characters"
        />
        <TouchableOpacity
          style={validInput ? styles.button : styles.buttonDisabled}
          disabled={validInput ? false : true}
          onPress={addData}
        >
          <Text style={styles.btnText}>Add to the list</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
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
    backgroundColor: '#8ed1fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#5D67C7',
    borderWidth: 2,
    padding: 5,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    backgroundColor: '#5D67C7',
    borderColor: '#5D67C7',
    borderWidth: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9e9d9d',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnText: {
    color: 'white',
    padding: 10,
  },
})
