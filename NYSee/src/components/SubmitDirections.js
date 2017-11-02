import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, NavigatorIOS } from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import styles from '../styles/default.js';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class SubmitDirections extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
      this.state = {
        directions: []
      }
  }

  render(){
    return(
      <View style={styles.container}>
        <Icon name="arrow-up" size={130} color="#0084ff" onPress={() => console.log("UP")} />
        <View style={{flexDirection: 'row', top: -10}}>
          <Icon name="arrow-left" size={130} color="#0084ff" style={{marginRight: '20%'}} onPress={() => console.log("LEFT")} />
          <Icon name="arrow-right" size={130} color="#0084ff" style={{marginLeft: '20%'}} onPress={() => console.log("RIGHT")}/>
        </View>
        <Icon name="arrow-down" size={130} color="#0084ff" style={{top: -20}} onPress={() => console.log("DOWN")}/>
        <View style={{flexDirection: 'row'}}>
          <Icon name="level-up" size={100} color="#000" style={{marginRight: '20%'}} onPress={() => console.log("UPSTAIRS")}/>
          <Icon name="level-down" size={100} color="#000" style={{marginLeft: '20%'}} onPress={() => console.log("DOWNSTAIRS")}/>
        </View>
      </View>

    );
  }
}
