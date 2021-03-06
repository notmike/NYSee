import React from 'react';
import { StyleSheet, Text, View, Image, NavigatorIOS } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import DestinationPlatform from './DestinationPlatform.js';
import PropTypes from 'prop-types';
import styles from '../styles/default.js';

export default class StationEntrances extends React.Component {
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
        stationEntrances: [],
        selectedStation: '',
        selectedEntrance : ''
      }
  }

  componentWillMount() {
    // assign passed in api info regarding all stations w/in user's radius
    data = this.props.allData
    // assign passed in user selected station
    selectedStation = this.props.selectedStation
    // filter data[] to only the station user specified
    var selectedStationData = data.filter(x => x.station_name === selectedStation)
    // make array of human readable station entrances
    var stationEntrances = selectedStationData.map(x=>x.corner + ' corner of ' + x.east_west_street + ' and ' + x.north_south_street)
    // set state variable of stationEntrances[] to our human readable versions
    this.setState({stationData: selectedStationData})
    this.setState({stationEntrances: stationEntrances})
    this.setState({selectedStation: selectedStation})
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: DestinationPlatform,
      title: 'Select Destination Platform',
      passProps: {index: nextIndex, stationData: this.state.stationData, selectedStation: this.state.selectedStation, selectedEntrance: this.state.selectedEntrance}
    });
}

_selectedEntrance(entrance) {
      this.setState({selectedEntrance: entrance});
  }

  render() {
    return (
      <View style={styles.container}>
         <Image
             style={styles.logo}
             source={require('../img/nysee.png')}
         />
         <View style={styles.spacer} />
         <Text style={styles.text}>Select a Station Entrance</Text>
          <Dropdown
             label='Select an Entrance'
             data={this.state.stationEntrances.map(x=>({'value': x}))}
             containerStyle={styles.dropdown}
             onChangeText={this._selectedEntrance.bind(this)}
           />
           <Button iconLeft primary large style={styles.continueButton} onPress={this._onForward}>
             <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
             <Icon name='arrow-forward' />
           </Button>
           <View style={styles.spacer} />
           <Text style={styles.textBack}>Swipe Right to Go Back</Text>
      </View>
    );
  }
}
