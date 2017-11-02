'use strict'
import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
      fontSize: 25,
      alignSelf: 'center',
      color: 'black',
      fontWeight: 'bold',
      top: 120,
  },
  image: {
    width: 380,
    height: 120,
    top: 90,
    alignItems: 'center'
  },
  dropdown: {
    top: 80,
    width: "80%",
    margin: "10%"
  },
  continueButton: {
    top: 40,
    width: "60%",
    margin: "20%",
    padding: "5%"
  },
  submitButton: {
    top: 25,
    width: "60%",
    margin: "20%",
    padding: "5%"
  },
  textBack: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'gray',
      fontWeight: 'bold',
      top: 40,
  },

});
