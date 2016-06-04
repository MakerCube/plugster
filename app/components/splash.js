import React,{ Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import Login from './login';

export default class Splash extends Component {
  constructor(props){
    super(props);
    console.log('Splash component renders!')
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position is : ',position);
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  handlePress() {
    this.props.navigator.push({
      title: 'Login',
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handlePress()}
          underlayColor="white">
            <Image source={require('../assets/plugsterLoad.gif')} />
        </TouchableHighlight>
      </View>
    );
  }
};

// <Text style={styles.buttonText}> ENTER </Text>

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF'
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
