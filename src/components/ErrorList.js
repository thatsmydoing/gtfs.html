import React from 'react';

export default function ErrorList(props) {
  let rows = props.feed.errors.map((error, i) => {
    return (
      <tr key={i} className={error.type}>
        <td>{error.file}:{error.line}</td>
        <td>{error.message}</td>
      </tr>
    )
  });
  return (
    <table className="errors">
      <thead>
        <tr>
          <th className="location">Location</th>
          <th className="message">Error</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
