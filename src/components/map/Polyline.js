import React, {Component} from 'react';

export default class Polyline extends Component {
  componentDidMount() {
    let points = this.props.points;
    let polyline = new google.maps.Polyline({
      path: points,
      map: this.props.map,
      icons: [{
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        },
        offset: '30',
        repeat: '100px'
      }]
    });

    let bounds = new google.maps.LatLngBounds();
    points.forEach(point => bounds.extend(point));

    this._polyline = polyline;
    this._bounds = bounds;
  }
  componentWillReceiveProps(nextProps) {
    this._polyline.setPath(nextProps.points);

    let bounds = new google.maps.LatLngBounds();
    nextProps.points.forEach(point => bounds.extend(point));

    this._bounds = bounds;
  }
  componentWillUnmount() {
    this._polyline.setMap(null);
  }
  getBounds() {
    return this._bounds;
  }
  render() {
    return <noscript />
  }
}
