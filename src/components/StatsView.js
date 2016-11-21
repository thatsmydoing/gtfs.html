import React from 'react';
import {schema} from '../gtfs/schema';

export default function StatsView({feed}) {
  let rows = Object.keys(schema).map(table => {
    let count = feed.stats[table];
    let details = null;
    if(count == undefined) {
      details = 'not present';
    }
    else {
      details = count + ' row(s)';
    }
    return (
      <tr key={table}>
        <td>{table}.txt</td>
        <td>{details}</td>
      </tr>
    )
  });
  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
