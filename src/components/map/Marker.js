import React, {Component} from 'react';

export default class Marker extends Component {
  componentDidMount() {
    let point = this.props.point;
    let marker = new google.maps.Marker({
      position: point,
      map: this.props.map
    });

    let bounds = new google.maps.LatLngBounds();
    bounds.extend(point);

    this._marker = marker;
    this._bounds = bounds;
  }
  componentWillReceiveProps(nextProps) {
    this._marker.setPosition(nextProps.point);

    let bounds = new google.maps.LatLngBounds();
    bounds.extend(nextProps.point);

    this._bounds = bounds;
  }
  componentWillUnmount() {
    this._marker.setMap(null);
  }
  getBounds() {
    return this._bounds;
  }
  render() {
    return <noscript />
  }
}

