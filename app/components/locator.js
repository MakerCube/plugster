import React,{ Component } from 'react';
import {
  PickerIOS,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  MapView
} from 'react-native';

const closestPlug = (userLocation, plugArray) => {

  return new Promise(resolve => {
    var promisedDistances = plugArray.map((plug)=>{
      return new Promise(resolve => {
        let latPow = Math.pow((userLocation.lat - plug.location.latitude),2);
        let lonPow = Math.pow((userLocation.lat - plug.location.longitude),2);
        plug.distance = Math.sqrt(latPow+lonPow)
        resolve(plug);
      });
    });

    resolve(Promise.all(promisedDistances).then(response => {
      return response.reduce((accumulator,current)=> {
        return accumulator.distance > current.distance ? current : accumulator;
      })
    }))
  })
  
}

export default class Locator extends Component {
  constructor(props){
    super(props);
    this.state = {
      floor: props.floor,
      plugs: props.plugs,
      location: props.location,
      closest: {
        name: ''
      }
    }

  }

  componentWillMount(){
    closestPlug(this.state.location,this.props.plugs).then(response => {
      this.setState({
        closest: response
      })
    })
  }

  render(){
    const { plugs } = this.props;
    let plugMarkers = plugs
      .filter(item => {
        return item.location.latitude && item.location.longitude;
      })
      .map((item, index) => {
        return { 
          latitude: item.location.latitude, 
          longitude: item.location.longitude,
          title: item.name
        };
      });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={false}
          annotations={plugMarkers}
          region={{latitude: this.props.location.lat, longitude: this.props.location.lon, latitudeDelta: 0.0005,longitudeDelta: 0.0006}}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Currently searching on floor: <Text style={styles.highlight}>{this.props.floor}</Text></Text>
          <Text style={styles.subtitle}>The closest open plug is <Text style={styles.highlight}>{this.state.closest.name}!</Text></Text>
        </View>
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
  scrollContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 4,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#000'
  },
  subtitle: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#000'
  },
  highlight: {
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
