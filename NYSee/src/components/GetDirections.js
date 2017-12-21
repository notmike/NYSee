import Expo from "expo";
import React from "react";
import { NavigatorIOS } from 'react-native';
import { Button, Icon } from 'native-base';
import { Pedometer, KeepAwake } from "expo";
import { TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, Image } from "react-native";
import PropTypes from 'prop-types';
import styles from '../styles/default.js';

export default class GetDirections extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
  }

  state = {
    isPedometerAvailable: "checking",
    stepObjects: [],
    currentStepCount: 0,
    stepOffset: 0,
    finalPath: {},
    finalPathString: "",
    steps: [],
    directions: []
  }

  componentWillMount() {
    const selectedEntrance = this.props.selectedEntrance.split(' ').join('')
    var finalString = this.props.selectedStation + selectedEntrance + this.props.selectedPlatform + this.props.selectedDirection
    finalString = finalString.split(' ').join('')
    fetch('http://db.nysee.org/path/' + finalString, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => response.json())
    .then(data => ({
        data: data
    }))
    .then(res => {
      var directions = res.data.map(x=>x.direction)
      var steps = res.data.map(x=>x.steps)
      this.setState({directions: directions})
      this.setState({steps: steps})
    })
  }

  componentDidMount() {1
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
          currentStepCount: result.steps,
          stepObjects: result
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.navigationContainer}>
        <Text>{this.state.directions}</Text>
        <Text>{this.state.steps}</Text>
      </View>
    );
  }
}

Expo.registerRootComponent(GetDirections);
