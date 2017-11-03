import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/default.js';

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
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

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
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
      <View style={styles.container}>
      <Icon name="arrow-up" size={120} color="#0084ff" onPress={() => console.log("UP")} />
        <View style={{flexDirection: 'row', top: -20}}>
          <Icon name="arrow-left" size={120} color="#0084ff" style={{marginRight: '18%'}} onPress={() => console.log("LEFT")} />
          <Icon name="arrow-right" size={120} color="#0084ff" style={{marginLeft: '18%'}} onPress={() => console.log("RIGHT")}/>
        </View>
          <Icon name="arrow-down" size={120} color="#0084ff" style={{top: -30}} onPress={() => console.log("DOWN")}/>
        <View style={{flexDirection: 'row'}}>
          <Image
              source={require('../img/stairs_up.png')}
              style={{marginRight: '18%'}}
          />
          <Image
              source={require('../img/stairs_down.png')}
              style={{marginLeft: '18%'}}
          />
        </View>
        <Text style={styles.textBack}>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
          <Text style={styles.textBack}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

Expo.registerRootComponent(PedometerSensor);
