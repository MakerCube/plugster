import React, {
  Component,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

export default class Login extends Component {

	render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a Github User </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={event => this.handleChange(event)} />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleSubmit()}
          underlayColor="white">
            <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large"
        />
        {showErr}
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
