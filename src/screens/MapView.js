import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {getSingleData} from '../redux/actions/AuthAction';
import {connect} from 'react-redux';

const Style = StyleSheet.create({
  container: {
    height: 400,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

class MapViews extends Component {
  state = {
    coords: {},
  };
  componentDidMount() {
    Geolocation.getCurrentPosition(
      data => {
        this.setState(data.coords);
      },
      err => {
        console.log(err);
      },
    );
  }
  render() {
    // {"accuracy": 26.87700080871582, "altitude": 0, "heading": 0, "latitude": -6.6211293, "longitude": 106.8180347, "speed": 0}
    return (
      <View>
        <View style={Style.container}>
          {this.state.coords && (
            <MapView
              provider={PROVIDER_GOOGLE}
              followsUserLocation={true}
              showsMyLocationButton={true}
              minZoomLevel={16}
              loadingEnabled={true}
              showsUserLocation
              style={Style.map}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {/* <MapView.Marker
                image={this.props.route.params.photo}
                coordinate={{
                  latitude: this.props.route.params.location.latitude,
                  longitude: this.props.route.params.location.longitude,
                }}
                title={'title'}
                description={'description'}
              /> */}
              <MapView.Marker
                title={this.props.route.params.name}
                description={`${
                  this.props.route.params.name
                }'s current position`}
                coordinate={{
                  latitude: this.props.route.params.location.latitude,
                  longitude: this.props.route.params.location.longitude,
                }}
              />
            </MapView>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.authData,
  };
};

export default connect(
  mapStateToProps,
  {getSingleData},
)(MapViews);
