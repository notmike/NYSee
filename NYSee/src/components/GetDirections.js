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
    const selectedEntrance = this.props.selectedEntrance.replace(/\s+/g, '');
    var finalString = this.props.selectedStation + selectedEntrance + this.props.selectedPlatform + this.props.selectedDirection
    finalString = finalString.replace(/\s+/g, '');
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
      var directions = res.data.map((x, index) => "Step " + (index+1) + ") Go " + x.direction + ", " + x.steps + " steps \n")
      this.setState({directions: directions})
    })
  }

  componentDidMount() {
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
        <Image
            style={styles.logo}
            source={require('../img/nysee.png')}
        />
        <View style={styles.spacer} />
        <View style={{flexDirection: "row", width: "100%", height: "8%", padding: "2%"}}>
            <View style={{width:"10%", alignItems:'center'}}>
                <Icon name='disc'/>
            </View>
            <View style={{width:"90%"}}>
                <Text style={styles.subtitleSmall}>{selectedStation} @ {selectedEntrance}</Text>
            </View>
        </View>

        <Text style={styles.directions}>
          {this.state.directions}
        </Text>

        <View style={{flexDirection: "row", width: "100%", height: "8%", padding: "2%"}}>
            <View style={{width:"10%", alignItems:'center'}}>
                <Icon name='pin' />
            </View>
            <View style={{width:"90%", top: "1%"}}>
                <Text style={styles.subtitleSmall}>The {selectedPlatform} train  ({selectedDirection})</Text>
            </View>
        </View>
        <View style={{alignItems: 'center', width:"100%"}}>
          <Text style={styles.textBack}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        </View>
        <View style={{width: "100%", height: "12%", padding: "6%"}}>
            <Button iconLeft info style={styles.destination}>
                <Text style={styles.buttonTextBig}>Reached Destination</Text>
                <Icon name='checkbox' />
            </Button>
            <View style={styles.spacer} />
            <Button iconLeft info style={styles.report}>
                <Text style={styles.buttonTextMedium}>Report Directions</Text>
                <Icon name='chatbubbles' />
            </Button>
        </View>
      </View>
    );
  }
}

Expo.registerRootComponent(GetDirections);
