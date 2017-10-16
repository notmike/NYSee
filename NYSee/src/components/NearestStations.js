import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NearestStations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>THIS TAB WILL BE FOR SOMETHING...WIP</Text>
        <Text>....................</Text>
        <Text>Footer Will Also Change As We Go!</Text>
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
