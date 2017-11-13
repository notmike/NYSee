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
        selectedPlatform: '',
        selectedDirection: ''
      }
  }

  componentWillMount() {
    stationData = this.props.stationData
    selectedPlatform = this.props.selectedPlatform
    selectedDirection = this.props.selectedDirection

    console.log("***** GetOrSubmitDirections.js *****\n") // ********* TEST PRINT ************
    console.log("stationData =\t", stationData) // ********* TEST PRINT ************
    console.log("selectedStation =\t", selectedStation) // ********* TEST PRINT ************
    console.log("selectedEntrance =\t", selectedEntrance) // ********* TEST PRINT ************
    console.log("selectedPlatform =\t", selectedPlatform) // ********* TEST PRINT ************
    console.log("selectedDirection =\t", selectedDirection) // ********* TEST PRINT ************

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


        <View style={{flexDirection: "row", width: "100%", height: "8%", padding: "2%"}}>
            <View style={{width:"10%", alignItems:'center'}}>
                <Icon name='disc'/>
            </View>
            <View style={{width:"90%"}}>
                <Text style={styles.subtitleSmall}>{selectedStation} @ {selectedEntrance}</Text>
            </View>
        </View>

        <View style={{flexDirection: "row", width: "100%", height: "8%", padding: "2%"}}>
            <View style={{width:"10%", alignItems:'center'}}>
                <Icon name='pin' />
            </View>
            <View style={{width:"90%", top: "1%"}}>
                <Text style={styles.subtitleSmall}>The {selectedPlatform} train  ({selectedDirection})</Text>
            </View>
        </View>


        <View style={{width: "100%", height: "20%", padding: "12%"}}>
            <Button iconLeft success large style={styles.navigateButton} onPress={this._onForward}>
                <Text style={styles.buttonTextBig}>Navigate</Text>
                <Icon name='navigate'/>
            </Button>
        </View>
        <View style={{width: "100%", height: "12%", padding: "6%"}}>
            <Button iconLeft info style={styles.submitButton} onPress={this._submitDirections}>
                <Text style={styles.buttonTextMedium}>Submit Directions</Text>
                <Icon name='share' />
            </Button>
        </View>
        <View style={{width: "100%", height: "15%", padding: "5%"}}>
            <Text style={styles.textBack}>Swipe Right to Go Back</Text>
        </View>
      </View>
    );
  }
}
