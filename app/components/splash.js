import React,{ Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicatorIOS
} from 'react-native';
import Finder from './finder';

export default class Splash extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: null,
      error: false
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          altitude: position.coords.altitude,
          time: position.timestamp
        }
        console.log('location object is : ',location);
        this.setState({location});
        setTimeout(()=>{
          this.props.navigator.push({
            title: 'Finder',
            component: Finder,
            passProps: {location: this.state.location}
          });
        },2000);
      },
      (error) => {
        console.log('error from nagivator.geolocation is : ',error)
        alert(error.message);
        let location = {
          lat: 34.019222,
          lon: -118.494222,
          altitude: 500,
          time: 1465077266513.315
        }
        this.setState({location});
        setTimeout(()=>{
          this.props.navigator.push({
            title: 'Finder',
            component: Finder,
            passProps: {location: this.state.location}
          });
        },3000);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={require('../assets/plugsterLoad.gif')} />
      </View>
    );
  }
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
