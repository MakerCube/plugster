import React,{ Component } from 'react';
import {
  PickerIOS,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';


export default class Locator extends Component {
  constructor(props){
    super(props);
    console.log('props passed into Locator are : ',props);
    this.state = {
      floor: props.floor
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Currently searching on floor: {this.props.floor}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
