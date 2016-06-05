import React,{ Component } from 'react';
import {
  PickerIOS,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import Locator from './locator';
import API from '../utils/api';

const PickerItemIOS = PickerIOS.Item;

const FLOORS = [1,2,3];

export default class Finder extends Component {
  constructor(props){
    super(props);

    this.state = {
      floor: 1
    }
  }

  handleSubmit(){
    console.log('handleSubmit fired!');
    API.getPlugsOnFloor(this.state.floor)
      .then(response => {
        console.log('response from API.getPlugs: ',response);
        this.props.navigator.push({
          title: 'Finding Plug!',
          component: Locator,
          passProps: {
            floor: this.state.floor,
            plugs: response.devices,
            location: this.props.location
          }
        });
      })
      .catch(error => {
        console.log('error in API.getPlugs: ',error);
      })
    // API.getPlugs()
    //   .then(response => {
    //     console.log('response from API.getPlugs: ',response);
    //     this.props.navigator.push({
    //       title: 'Finding Plug!',
    //       component: Locator,
    //       passProps: {
    //         floor: this.state.floor,
    //         plugs: response.devices,
    //         location: this.props.location
    //       }
    //     });
    //   })
    //   .catch(error => {
    //     console.log('error in API.getPlugs: ',error);
    //   })
  }

	render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Please choose your floor: </Text>
        <PickerIOS
          selectedValue={this.state.floor}
          onValueChange={floor => this.setState({floor: floor})}>
          {FLOORS.map(floor => (
            <PickerItemIOS
              key={floor}
              value={floor}
              label={`Floor ${floor}`}
              />
          ))}
        </PickerIOS>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSubmit()}
          underlayColor="white">
            <Text style={styles.buttonText}> PLUG ME! </Text>
        </TouchableHighlight>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
});
