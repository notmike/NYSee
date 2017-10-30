import React from 'react';
import { StyleSheet, Text, View, Image, NavigatorIOS } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import DestinationPlatform from './DestinationPlatform.js';
import PropTypes from 'prop-types';

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
      <View>
      <Image
        style={styles.image}
        source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
      />
      <Text style={styles.text}>Select a Station Entrance</Text>
      <Dropdown
         label='select an entrance'
         data={this.state.stationEntrances.map(x=>({'value': x}))}
         containerStyle={styles.dropdown}
         onChangeText={this._selectedEntrance.bind(this)}
       />
       <Button iconRight primary style={styles.continueButton} onPress={this._onForward}>
         <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
         <Icon name='arrow-forward' />
       </Button>
       <Text style={styles.textBack}>Swipe Right to Go Back to Nearest Stations</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  textBack: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'gray',
      fontWeight: 'bold',
      top: 40,
  },
});
