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
  return plugArray.reduce((closest,plug,index,plugs) => {
    var latDeltaOLD = (Math.pow((userLocation.lat- closest.location.latitude)),2)
    var lonDeltaOLD = (Math.pow((userLocation.lon- closest.location.longitude)),2)
    var latDeltaNEW = (Math.pow((userLocation.lat- plug.location.latitude)),2)
    var lonDeltaNEW = (Math.pow((userLocation.lon- plug.location.longitude)),2)
    if(Math.sqrt((Math.pow((userLocation.lat- closest.location.latitude)),2)+(Math.pow((userLocation.lon- closest.location.longitude)),2)) >= Math.sqrt((Math.pow((userLocation.lat- plug.location.latitude)),2)+(Math.pow((userLocation.lon- plug.location.longitude)),2))){
      return closest;
    } else {
      return plug;
    }
  })
}

export default class Locator extends Component {
  constructor(props){
    super(props);
    console.log('props passed into Locator are : ',props);
    this.state = {
      floor: props.floor,
      plugs: props.plugs,
      location: props.location
    }
  }

  render(){
    const { plugs } = this.props;
    let plugMarkers = plugs
      .filter(item => {
        return item.location.latitude && item.location.longitude;
      })
      .map((item, index) => {
        console.log('item in plugs.map is : ',item);
        return { 
          latitude: item.location.latitude, 
          longitude: item.location.longitude,
          title: item.name
        };
      });
    let closest = closestPlug(this.state.location,plugs);
    console.log('result of closestPlug function : ',closestPlug(this.state.location,plugs));
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
          <Text style={styles.title}>Currently searching on floor: {this.props.floor}</Text>
          <Text>The closest open plug is {closest.name.substring(0,closest.name.length - 5)}</Text>
        </View>
      </View>
    )
  }
};

// return (
//   <View key={index}>
//     <View style={styles.rowContainer}>
//       <Text>Name: {item.name}, Status: {item.status}</Text>
//       <Text>Room: {item.location.name}</Text>
//       <Text>Latitude: {item.location.latitude}, Longitude: {item.location.longitude}</Text>
//     </View>
//   </View>
// )

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
