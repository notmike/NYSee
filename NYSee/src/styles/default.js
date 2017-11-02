'use strict'
import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({

  container: {
    top: 80,
      padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  spacer: {
    width: "100%",
    height: "5%"
  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    resizeMode: 'cover',
  },
  dropdown: {
    width: "80%",
    margin: "10%",
  },
  continueButton: {
    alignSelf: 'center',
    width: "60%",
    padding: "5%"
  },
  directionsButton: {
    alignSelf: 'center',
    width: "90%",
    padding: "5%",
  },
  submitButton: {
    alignSelf: 'center',
    width: "60%",
    padding: "5%"
  },
  textBack: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'gray',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },

});
