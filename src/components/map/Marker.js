import React, {Component} from 'react';

export default class Marker extends Component {
  componentDidMount() {
    let marker = new google.maps.Marker({
      position: this.props.point,
      label: this.props.label,
      map: this.props.map
    });
    marker.addListener('click', () => {
      this.props.infoWindow.setContent(this.props.content);
      this.props.infoWindow.open(this.props.map, this._marker);
    })
    this._marker = marker;
  }
  componentWillReceiveProps(nextProps) {
    this._marker.setPosition(nextProps.point);
    this._marker.setLabel(nextProps.label);
  }
  componentWillUnmount() {
    this._marker.setMap(null);
  }
  getBounds() {
    return new google.maps.LatLngBounds(this.props.point, this.props.point);
  }
  render() {
    return <noscript />
  }
}

