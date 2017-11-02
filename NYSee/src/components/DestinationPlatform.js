import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import GetOrSubmitDirections from './GetOrSubmitDirections.js';
import styles from '../styles/default.js';

export default class DestinationPlatforms extends React.Component {

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
        stationPlatforms: [],
        selectedStation: this.props.selectedStation,
        selectedEntrance: this.props.selectedEntrance,
        selectedPlatform: ''
      }
  }

  componentWillMount() {
    selectedEntrance = this.props.selectedEntrance
    // assign passed in api info regarding station user selected (multiple entrance arrays for selected station)
    stationData = this.props.stationData
    // create array (of objects) that only contains the entrance the user specified in the previous screen (should only be 1 record)
    var selectedStationData = stationData.filter(x => x.corner + ' corner of ' + x.east_west_street + ' and ' + x.north_south_street === selectedEntrance)
    // save the first (and only) entrance object in a new var
    var firstObject = selectedStationData[0]
    // put each subway line in an array for the dropdown (save all values of any key containing "route" in a new array)
    var routes = Object.keys(firstObject).filter(x=>x.includes("route")).map(x=>firstObject[x])
    // set stationData to be the data of just 1 entrance
    this.setState({stationData: selectedStationData})
    // set stationPlatforms to be the array of subway lines accessible from user's entrance
    this.setState({stationPlatforms: routes})
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: GetOrSubmitDirections,
      title: 'Get or Submit Directions?',
      passProps: {index: nextIndex, stationData: this.state.stationData, selectedStation: this.state.selectedStation,  selectedEntrance: this.state.selectedEntrance, selectedPlatform: this.state.selectedPlatform}
    });
}

_selectedPlatform(platform) {
      this.setState({selectedPlatform: platform});
  }

render() {
    return (
      <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
      />
      <Text style={styles.text}>Select Destination Platform</Text>
      <Dropdown
         label='Subway Platforms at this Station'
         data={this.state.stationPlatforms.map(x=>({'value': x}))}
         containerStyle={styles.dropdown}
         onChangeText={this._selectedPlatform.bind(this)}
       />
       <Button iconRight primary style={styles.continueButton} onPress={this._onForward}>
         <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
         <Icon name='arrow-forward' />
       </Button>
       <Text style={styles.textBack}>Swipe Right to Go Back to Station Entrances</Text>
      </View>
    );
  }
}
