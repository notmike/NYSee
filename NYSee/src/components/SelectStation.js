import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, NavigatorIOS} from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import MapView from 'react-native-maps';
import StationEntrances from './StationEntrances';
import PropTypes from 'prop-types';
import styles from '../styles/default.js';

const {WIDTH, HEIGHT} = Dimensions.get('window')
const SCREEN_HEIGHT = HEIGHT
const SCREEN_WIDTH = WIDTH
const ASPECT_RATIO = WIDTH / HEIGHT
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421
const RADIUS = 1000                               // current default is 1000 meter radius around user's coordinates

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default class SelectStation extends React.Component {
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
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      stationData: [],
      allData: [],
      selectedStation : ''
    }
  }

  watchID: ?number = null

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      fetch('https://data.ny.gov/resource/hvwh-qtfg.json?$where=within_circle(entrance_location%2C'+ lat + '%2C'+ long + '%2C' + RADIUS +')')

      .then(response => response.json())
      .then(data => ({
          data: data
      }))
      .then(res => {
          // IS SOMETHING SUPPOSED TO GO HERE?**********************************
      })

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      fetch('https://data.ny.gov/resource/hvwh-qtfg.json?$where=within_circle(entrance_location%2C'+ lat + '%2C'+ long +'%2C' + RADIUS +')')
      .then(response => response.json())
      .then(data => ({
          data: data
      }))
      .then(res => {
        var stationNames = res.data.map(x=>x.station_name)
        var unique = stationNames.filter(onlyUnique);
        this.setState({stationData: unique})
        this.setState({allData: res.data})
      })
      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATTITUDE_DELTA
      }
      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion })
    })

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: StationEntrances,
      title: 'Select Start Entrance',
      passProps: {index: nextIndex, stationData: this.state.stationData, allData: this.state.allData, selectedStation: this.state.selectedStation}
    });
  }

  _selectedStation(station) {
      this.setState({selectedStation: station});
  }

  render() {
    return (
     <View style={styles.container}>
         <Image
           style={styles.logo}
           source={require('../img/nysee.png')}
         />
         <View style={styles.spacer} />
         <Text style={styles.text}>Select a Station</Text>
         <Dropdown
            label='Stations Nearby'
            data={this.state.stationData.map(x=>({'value': x}))}
            containerStyle={styles.dropdown}
            onChangeText={this._selectedStation.bind(this)}
          />
          <View style={{width: "100%", height: "15%", padding: "8%"}}>
             <Button iconLeft primary large style={styles.continueButton} onPress={this._onForward}>
                <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
                <Icon name='arrow-forward' />
             </Button>
          </View>
     </View>
    );
  }
}
