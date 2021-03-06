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
  h1_white: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  p_white: {
    fontSize: 16,
    color: 'white',
    left: 15,
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
    padding: "25%"
  },
  navigateButton: {
    alignSelf: 'center',
    padding: "25%",
  },
  submitButton: {
    alignSelf: 'center',
    padding: "7%"
  },
  destination: {
    alignSelf: 'center',
    padding: "7%",
    backgroundColor: '#007ee5'
  },
  report: {
    alignSelf: 'center',
    padding: "7%",
    backgroundColor: '#af0606'
  },
  buttonTextBig: {
    fontSize: 20,
    color: 'white',
  },
  buttonTextMedium: {
    fontSize: 15,
    color: 'white',
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
  directions: {
    fontSize: 20,
    color: 'gray',
    fontStyle: 'italic',
  },
  subtitleSmall: {
    fontSize: 14,
    color: 'gray',
  },
   upstairs_icon: {
    marginRight: '5%',
  },
  downstairs_icon: {
    marginLeft: '5%',
  },
  navigationContainer: {
    flex: 1,
    top: 80,
    alignItems: 'center',
  },
  arrow_left: {
    marginRight: '5%',
  },
  arrow_right: {
    marginLeft: '5%',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },

});
