import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, NavigatorIOS} from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import MapView from 'react-native-maps';
import StationEntrances from './StationEntrances';
import PropTypes from 'prop-types';

const {WIDTH, HEIGHT} = Dimensions.get('window')
const SCREEN_HEIGHT = HEIGHT
const SCREEN_WIDTH = WIDTH
const ASPECT_RATIO = WIDTH / HEIGHT
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421
const RADIUS = 5000                               // current default is 1000 meter radius around user's coordinates

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default class Home extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: NearestStations,
          title: 'NYSee',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    )
  }
}

class NearestStations extends React.Component {
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
     <View>
     <Image
       style={styles.image}
       source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
     />
     <Text style={styles.text}>Select a Station</Text>
     <Dropdown
        label='Stations Nearby'
        data={this.state.stationData.map(x=>({'value': x}))}
        containerStyle={styles.dropdown}
        onChangeText={this._selectedStation.bind(this)}
      />
      <Button iconRight primary style={styles.continueButton} onPress={this._onForward}>
        <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
        <Icon name='arrow-forward' />
      </Button>

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
      fontSize: 35,
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
  }
});
