import React from 'react';
import { StyleSheet, Text, View, Image, NavigatorIOS } from 'react-native';
import { Button, Icon } from 'native-base';
import styles from '../styles/default.js';
import PropTypes from 'prop-types';
import Home from '../components/SelectStation';

export default class DirectionValidation extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired,
  }

  state = {
    finalPath: []
  };

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
     finalPath = this.props.finalPath
  }

  _handleNavigationRequestHome() {
    this.props.navigator.push({
      component: Home,
      title: 'Select a Station',
    });    
  }

  render() {
    return (
      <View style={styles.container}>
         <Image
             style={styles.logo}
             source={require('../img/nysee.png')}
         />
         <View style={styles.spacer} />
         <Text style={styles.text}>Thanks For Your Submission!</Text>
         <View style={styles.spacer} />
         <View style={styles.spacer} />
         <Button iconLeft primary large style={styles.continueButton} onPress={() => this._handleNavigationRequestHome()}>
           <Text style={{fontSize: 20, color: 'white'}}>Go To HomePage</Text>
           <Icon name='arrow-forward' />
         </Button>

      </View>
    );
  }
}
