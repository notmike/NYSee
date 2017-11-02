import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
styles = require('../styles/default.js');

export default class GetOrSubmitDirections extends React.Component {

  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this._onForward = this._onForward.bind(this)

      this.state = {
        stationData: [],
        selectedStation: this.props.selectedStation,
        selectedEntrance: this.props.selectedEntrance,
        selectedPlatform: ''
      }
  }

  componentWillMount() {
    selectedPlatform = this.props.selectedPlatform

    console.log("***** GetOrSubmitDirections.js *****\n") // ********* TEST PRINT ************ 
    console.log("stationData =\t", stationData) // ********* TEST PRINT ************ 
    console.log("selectedStation =\t", selectedStation) // ********* TEST PRINT ************ 
    console.log("selectedEntrance =\t", selectedEntrance) // ********* TEST PRINT ************ 
    console.log("selectedPlatform =\t", selectedPlatform) // ********* TEST PRINT ************ 

    }

  _onForward() {
    // let nextIndex = ++this.props.index;
    // this.props.navigator.push({
    //   component: GetOrSubmitDirections,
    //   title: 'Get or Submit Directions?',
    //   passProps: {index: nextIndex, stationData: this.state.stationData, selectedEntrance: this.state.selectedEntrance, selectedPlatform: this.state.selectedPlatform}
    // });
}

  render() {
    return (
      <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
      />
      <Text style={styles.text}>Getting or Submitting Directions?</Text>
      
      <Text style={styles.textBack}>From: </Text>
      <Text style={styles.textBack}>To: </Text>

      <Button iconRight primary style={styles.continueButton} onPress={this._onForward}>
          <Text style={{fontSize: 20, color: 'white'}}>Get Directions</Text>
         <Icon name='arrow-forward' />
      </Button>
      <Button iconRight primary style={styles.submitButton} onPress={this._onForward}>
          <Text style={{fontSize: 15, color: 'white'}}>Submit Directions</Text>
         <Icon name='arrow-forward' />
      </Button>
      <Text style={styles.textBack}>Swipe Right to Go Back to Platforms</Text>
      </View>
    );
  }
}
