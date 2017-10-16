import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import MapView from 'react-native-maps';

const {WIDTH, HEIGHT} = Dimensions.get('window')
const SCREEN_HEIGHT = HEIGHT
const SCREEN_WIDTH = WIDTH
const ASPECT_RATIO = WIDTH / HEIGHT
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default class Home extends React.Component {
  constructor(props) {
    super(props)

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
      stationData: []
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

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

  render() {

    fetch('https://data.ny.gov/resource/hvwh-qtfg.json?$where=within_circle(entrance_location%2C'+ this.state.initialPosition.latitude + '%2C'+ this.state.initialPosition.longitude+'%2C2640)')
    .then(response =>
        response.json()
        .then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        this.setState({stationData: res.data});
    }))

    return (
     <View>
     <Image
       style={styles.image}
       source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
     />
     <Text style={styles.text}>Select Station</Text>
     <Dropdown
        label='Stations Within Your Area'
        data={this.state.stationData}
        containerStyle={styles.dropdown}
      />
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
      fontFamily: 'American Typewriter'
  },
  image: {
    width: 380,
    height: 120,
    top: 80,
    alignItems: 'center'
  },
  dropdown: {
    top: 80,
    fontFamily: 'American Typewriter',
    width: "80%",
    margin: "10%"
  }
});
