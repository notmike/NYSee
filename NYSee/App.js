import React, {Component} from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import { Footer, FooterTab, Button, Icon, Container } from 'native-base';

import Map from './src/components/Map';
import Home from './src/components/SelectStation';
import styles from './src/styles/default.js';

export default class App extends React.Component {

  _handleNavigationRequestMap() {
    this.refs.nav.push({
      component: Map,
      title: 'Current Location',
    });
  }

  _handleNavigationRequestNearestStations() {
    this.refs.nav.push({
      component: SelectStation,
      title: 'Select Station',
    });
  }

  render() {
    return (
      <Container>
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Home,
            title: 'Select a Station',
          }}
          style={{flex: 1}}
        />
        <Footer style={styles.footer}>
          <FooterTab>
            <Button vertical onPress={() => this._handleNavigationRequestMap()}>
              <Icon active name="navigate" />
              <Text>Map</Text>
            </Button>
            <Button vertical active>
              <Icon active name="train" onPress={() => this._handleNavigationRequestNearestStations()}/>
              <Text>Directions</Text>
            </Button>
            <Button vertical>
              <Icon active name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
