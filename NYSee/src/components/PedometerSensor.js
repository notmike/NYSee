import Expo from "expo";
import React from "react";
import { Button } from 'native-base';
import { Pedometer } from "expo";
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
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
      <View style={styles.navigationContainer}>
        <View style={{alignItems: 'center', top: 20, height: 100, width:"100%"}}>
            <TouchableOpacity onPress={() => console.log("FORWARD")}>
              <Image source={require('../img/arrow_up.png')}/>
            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',  top: 20, width:"100%", height:100}}>
          <TouchableOpacity onPress={() => console.log("LEFT")}>
            <Image source={require('../img/arrow_left.png')} style={styles.arrow_left} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("RIGHT")}>
            <Image source={require('../img/arrow_right.png')} style={styles.arrow_right} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', width:"100%", height: 100, top: 35}}>
          <TouchableOpacity onPress={() => console.log("BACK")}>
            <Image source={require('../img/arrow_down.png')} />
        </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', top:50}}>
          <TouchableOpacity onPress={() => console.log("UPSTAIRS")}>
            <Image source={require('../img/upstairs.png')} style={styles.upstairs_icon} />
          </TouchableOpacity>
          <View style={{width: 100, height: 80}} />
          <TouchableOpacity onPress={() => console.log("DOWNSTAIRS")}>
            <Image source={require('../img/downstairs.png')} style={styles.downstairs_icon} />
          </TouchableOpacity>
        </View>


        <View style={{top: "10%", alignItems: 'center', padding: "5%", width:"100%"}}>
            <Text style={styles.textBack}>
              Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
            </Text>
            <Text style={styles.textBack}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        </View>

      </View>
    );
  }
}

Expo.registerRootComponent(PedometerSensor);
