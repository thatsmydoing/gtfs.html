import React from 'react';
import Link from './Link';

export default function StopItem(props) {
  return (
    <div className="double-line" title={props.stop_name}>
      <span>{props.stop_name}</span>
      <span>
        {props.stop_id} <Link type='stop' id={props.stop_id}>Details</Link>
      </span>
    </div>
  )
}
