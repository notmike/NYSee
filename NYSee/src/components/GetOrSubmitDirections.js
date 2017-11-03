import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import PedometerSensor from './PedometerSensor.js';
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
    this._submitDirections = this._submitDirections.bind(this)

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

_submitDirections() {
  let nextIndex = ++this.props.index;
  this.props.navigator.push({
    component: PedometerSensor,
    title: 'Submit Directions',
    passProps: {index: nextIndex, stationData: this.state.stationData, selectedEntrance: this.state.selectedEntrance, selectedPlatform: this.state.selectedPlatform}
  });
}

  render() {
    return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../img/nysee.png')}
        />
        <View style={styles.spacer} />
        <View style={{width: "100%", height: "5%", padding: 10, backgroundColor: 'powderblue'}}>
            <Text style={styles.subtitle}>From: </Text>
        </View>
        <View style={{width: "100%", height: "5%", padding: 10, backgroundColor: 'honeydew'}}>
            <Text style={styles.subtitle}>To: </Text>
        </View>
        <View style={{width: "100%", height: "25%", padding: "13%"}}>
            <Button iconRight success large style={styles.directionsButton} onPress={this._onForward}>
                <Text style={{fontSize: 20, color: 'white'}}> Get Directions   </Text>
                <Icon name='navigate'/>
            </Button>
        </View>
        <View style={{width: "100%", height: "15%", padding: "8%"}}>
            <Button iconRight info style={styles.submitButton} onPress={this._submitDirections}>
                <Text style={{fontSize: 15, color: 'white'}}>Submit Directions</Text>
                <Icon name='share' />
            </Button>
        </View>
        <View style={{width: "100%", height: "15%", padding: "8%"}}>
            <Text style={styles.textBack}>Swipe Right to Go Back</Text>
        </View>
      </View>
    );
  }
}
