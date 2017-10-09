import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';

export default class NearestStations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stationData: ""
    }
  }
  render() {
    fetch('https://data.ny.gov/resource/hvwh-qtfg.json?$where=within_circle(entrance_location%2C40.824261%2C-73.945537%2C150)')
    .then(response =>
        response.json()
        .then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        // this.setState({stationData: res.data});
        for(var i in res.data){
          var key = i;
          var val = res.data[i];
          for(var j in val){
            var sub_key = j;
            if(sub_key == "station_name"){
              this.setState({stationData: String(val[j])});
            }
          }
        }
    }))
    return (
      <View style={styles.container}>
        <Text>NEAREST STATIONS WIP</Text>
        <Text>....................</Text>
        <Text>{this.state.stationData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
