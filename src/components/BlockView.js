import React from 'react';
import {getBlock} from '../selectors';
import InfoTable, {Entry} from './InfoTable';
import TripList from './TripList';

export default function BlockView(props) {
  let block = getBlock(props.feed, props.id);
  return (
    <div className="block">
      <h4>Block {block.block_id}</h4>
      <TripList trips={block.trips} />
    </div>
  )
}
