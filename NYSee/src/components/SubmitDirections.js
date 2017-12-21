import Expo from "expo";
import React from "react";
import { NavigatorIOS } from 'react-native';
import { Button, Icon } from 'native-base';
import { Pedometer, KeepAwake } from "expo";
import DirectionValidation from './DirectionValidation.js';
import { Modal, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, Image } from "react-native";
import PropTypes from 'prop-types';
import styles from '../styles/default.js';

export default class SubmitDirections extends React.Component {
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
    modalVisible: true,
    isPedometerAvailable: "checking",
    stepObjects: [],
    currentStepCount: 0,
    stepOffset: 0,
    path: [],
    finalPath: [],
    finalPathString: ""
  }

  componentWillMount() {
    const selectedEntrance = this.props.selectedEntrance.replace(/\s+/g, '');
    const finalString = this.props.selectedStation + selectedEntrance + this.props.selectedPlatform + this.props.selectedDirection
    var finalStringNoSpaces = finalString.replace(/\s+/g, '');
    this.setState({finalPathString: finalStringNoSpaces})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

  _onPressButtonPUT = (path) => {
    fetch('http://db.nysee.org/path/' + this.state.finalPathString, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {path: path}, {totalSteps: 0} )
      }
    )
  }

  _submitDirections = () => {
    this.recordSteps("FINISHED")
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: DirectionValidation,
      title: 'Direction Submission Success!',
      passProps: {index: nextIndex, finalPath: this.state.finalPath}
    });
  }

  recordSteps = (d) => {
    // load Path object (array of segments so far)
    var path = this.state.path;
    if (path.length != 0) {     // if it's not the user's 1st segment
      var previousSegment = path[path.length-1];  // load previous segment into new var
      // assign previous segment corrected num of steps (current pedometer count - steps up to this direction - any offset)
      previousSegment.steps = this.state.currentStepCount;
      path[path.length-1] = previousSegment;
    } else {
        // This is the 1st time this function was called ...
        KeepAwake.activate();   // keep screen on during path recording
        // track erroroneous steps before user clicked first direction
        stepOffset = this.state.currentStepCount;
        this.setState({stepOffset: stepOffset});
        console.log("There's an OFFSET =\t", stepOffset);   // ************** TEST PRINT *************
    }
    // when user clicks finished, make current path the finalPath
    if (d == "FINISHED") {
        this.setState({finalPath : path});
        this._onPressButtonPUT(path);
        KeepAwake.deactivate();   // turn off screen wake since finished recording

    } else {
        // for each direction press, create a new segment and update the path state
        path = path.concat({direction: d, steps: 0});
        this.setState({path});
    }
  }

  render() {
    console.log("Live Path: ", this.state.path)             // ************** TEST PRINT *************
    console.log("Final Path: ", this.state.finalPath)       // ************** TEST PRINT *************

    return (
      <View style={styles.navigationContainer}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.8)'}}>

             <View style={styles.spacer} />

             <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                 <Button iconLeft large rounded danger style={{padding: "7%", alignSelf: 'center', right: 15}} onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                   <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Close</Text>
                   <Icon name='close' />
               </Button>
             </View>

             <View style={{flexDirection: 'column', justifyContent: 'center'}}>
               <Text style={styles.h1_white}>How to Create Directions</Text>
               <View style={styles.spacer} />
               <View style={styles.spacer} />
               <Text style={styles.p_white}>1. Click a direction arrow and then simply walk.</Text>
               <View style={styles.spacer} />
               <Text style={styles.p_white}>2. If you click the wrong arrow button, just tap undo.</Text>
               <View style={styles.spacer} />
               <Text style={styles.p_white}>3. Click "Finished" when youve arrived at your destination.</Text>
             </View>

         </View>
        </Modal>

        <View style={{alignItems: 'center', top: 20, height: 100, width:"100%"}}>
            <TouchableOpacity onPress={() => this.recordSteps("FORWARD")}>
              <Image source={require('../img/arrow_up.png')}/>
            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',  top: 20, width:"100%", height:100}}>
          <TouchableOpacity onPress={() => this.recordSteps("LEFT")}>
            <Image source={require('../img/arrow_left.png')} style={styles.arrow_left} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.recordSteps("RIGHT")}>
            <Image source={require('../img/arrow_right.png')} style={styles.arrow_right} />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', width:"100%", height: 80, top: 35}}>
          <TouchableOpacity onPress={() => this.recordSteps("UNDO")}>
            <Image source={require('../img/undo_arrow.png')} />
        </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', top:50}}>
          <TouchableOpacity onPress={() => this.recordSteps("UPSTAIRS")}>
            <Image source={require('../img/upstairs.png')} style={styles.upstairs_icon} />
          </TouchableOpacity>
          <View style={{width: 100, height: 80}} />
          <TouchableOpacity onPress={() => this.recordSteps("DOWNSTAIRS")}>
            <Image source={require('../img/downstairs.png')} style={styles.downstairs_icon} />
          </TouchableOpacity>
        </View>

        <View style={{top:"10%", alignItems: 'center', padding: "5%", width:"100%"}}>
          <Button block success iconLeft
          onPress={() => this._submitDirections()}>
            <Text style={styles.buttonTextBig}>Finished</Text>
            <Icon name='checkmark-circle' />
          </Button>
        </View>

        <View style={{top: "5%", alignItems: 'center', padding: "5%", width:"100%"}}>
            <Text style={styles.textBack}>
              Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
            </Text>
            <Text style={styles.textBack}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        </View>

      </View>
    );
  }
}

Expo.registerRootComponent(SubmitDirections);
