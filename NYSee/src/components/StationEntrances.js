import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class NearestStations extends React.Component {
  render() {
    return (
      <View>
      <Image
        style={styles.image}
        source={{uri: 'https://raw.githubusercontent.com/heyconnie/NYSee/master/images/nysee-24bit-400x135.png'}}
      />
      <Text style={styles.text}>Select Station Entrances</Text>
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
  image: {
    width: 380,
    height: 120,
    top: 80,
    alignItems: 'center'
  },
  text: {
      fontSize: 25,
      alignSelf: 'center',
      color: 'black',
      fontWeight: 'bold',
      top: 120,
      fontFamily: 'American Typewriter'
  },
});
