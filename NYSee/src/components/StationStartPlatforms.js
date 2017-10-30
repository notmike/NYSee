import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default class StationStartPlatforms extends React.Component {
  super(props){
    this.state = {
      stationStartPlatforms: []
    }
}
  componentWillMount() {
    // assign passed in api info regarding all stations w/in user's radius
    data = this.props.allData
    stationData = this.props.stationData
    // assign passed in user selected station
    selectedStation = this.props.selectedStation
    // make array of human readable station entrances
    var stationEntrances = this.props.stationEntrances
    var stationPlatforms = this.props.allData.map(x=>x.route1)
    var unique = stationPlatforms.filter(onlyUnique);
    this.setState({stationStartPlatforms: unique})

  }

  render() {
    return (
      <View>
      <Image
        style={styles.image}
        source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
      />
      <Text style={styles.text}>Select Start Station Platform</Text>
      <Dropdown
         label='Station Start Platforms'
         data={this.state.stationStartPlatforms.map(x=>({'value': x}))}
         containerStyle={styles.dropdown}
       />
       <Button iconRight primary style={styles.continueButton}>
         <Text style={{fontSize: 20, color: 'white'}}>Continue</Text>
         <Icon name='arrow-forward' />
       </Button>
       <Text style={styles.textBack}>Swipe Right to Go Back to Station Entrances</Text>
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
