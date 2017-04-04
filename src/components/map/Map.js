import React, {Component} from 'react';
import {connect} from 'react-redux';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { map: null };
  }
  componentDidMount() {
    let node = this.refs.map;
    let map = new google.maps.Map(node, {
      center: {lat: -32, lng: 30},
      zoom: 9
    });
    this.setState({ map });
  }
  componentDidUpdate() {
    let bounds = new google.maps.LatLngBounds();
    React.Children.forEach(this.props.children, (child, index) => {
      bounds.union(this.refs[index].getBounds());
    })
    if(bounds.getNorthEast().equals(bounds.getSouthWest())) {
      this.state.map.setCenter(bounds.getCenter());
      this.state.map.setZoom(14);
    }
    else {
      this.state.map.fitBounds(bounds);
    }
  }
  render() {
    let children = null;
    if(this.state.map) {
      children = React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {
          ref: index,
          map: this.state.map
        });
      });
    }
    return (
      <div>
        <div ref="map" className="map"/>
        {children}
      </div>
    )
  }
}

function MapWrapper(props) {
  if(props.google) {
    return <Map {...props} />
  }
  else {
    return <div />
  }
}

function mapStateToProps(state) {
  return { google: state.google };
}

export default connect(mapStateToProps)(MapWrapper);
