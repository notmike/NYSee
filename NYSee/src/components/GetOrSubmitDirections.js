import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from 'prop-types';

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
        stationPlatforms: [],
        selectedStation: this.props.selectedStation,
        selectedEntrance: this.props.selectedEntrance,
        selectedPlatform: ''
      }
  }

  componentWillMount() {
    // selectedStation = this.props.selectedStation
    // selectedEntrance = this.props.selectedEntrance
    // console.log(selectedStation)                                               // ************ TEST PRINT ************
    // console.log(selectedEntrance)                                              // ************ TEST PRINT ************

    // assign passed in api info regarding station user selected
    // stationData = this.props.stationData
    // console.log(stationData)                                                          // ************ TEST PRINT ************
    // filter stationData[] to only the entrance that the user specified
    // var selectedStationData = stationData.filter(x => x.corner + ' corner of ' + x.east_west_street + ' and ' + x.north_south_street === selectedEntrance)
    // console.log(selectedStationData)                                           // ********* TEST PRINT ************
    // make array of human readable station entrances
      // console.log(selectedStationData.includes('route2'))                         // NEED TO GET AN ARRAY OF ALL THE ROUTES (ROUTE1 - 11) TO POPULATE DROPDOWN WITH
    // var stationPlatforms = selectedStationData.map(x=>x.route1)
    // set state variable of stationEntrances[] to our human readable versions
    // this.setState({stationData: selectedStationData})
    // this.setState({stationPlatforms: stationPlatforms})
    // this.setState({selectedEntrance: selectedEntrance})
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
      <View>
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
  submitButton: {
    top: 25,
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

