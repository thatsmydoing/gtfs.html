import React from 'react';

export default function ErrorList(props) {
  let rows = props.feed.errors.map((error, i) => {
    return (
      <tr key={i} className={error.type}>
        <td>{error.file}</td>
        <td>{error.line}</td>
        <td>{error.message}</td>
      </tr>
    )
  });
  return (
    <div>
      <h3>Errors</h3>
      <table className="errors">
        <thead>
          <tr>
            <th>File</th>
            <th>Line number</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
