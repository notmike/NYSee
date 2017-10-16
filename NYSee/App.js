import React, {Component} from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { Footer, FooterTab, Button, Icon, Container } from 'native-base';

import Map from './src/components/Map';
import Home from './src/components/Home';
import NearestStations from './src/components/NearestStations';

export default class App extends React.Component {

  _handleNavigationRequestMap() {
    this.refs.nav.push({
      component: Map,
      title: 'Current Location',
    });
  }

  _handleNavigationRequestNearestStations() {
    this.refs.nav.push({
      component: NearestStations,
      title: 'NearestStations',
    });
  }

  render() {
    return (
      <Container>
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Home,
            title: 'NYSee',
          }}
          style={{flex: 1}}
        />
        <Footer style={styles.footer}>
          <FooterTab>
            <Button vertical onPress={() => this._handleNavigationRequestMap()}>
              <Icon active name="navigate" />
              <Text>Map</Text>
            </Button>
            <Button vertical onPress={() => this._handleNavigationRequestNearestStations()}>
              <Icon name="train" />
              <Text>Directions</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
});
