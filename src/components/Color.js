import React from 'react';

export default function Color(props) {
  let style = {
    backgroundColor: '#'+props.color
  }
  return (
    <div className="color">
      <div className="box" style={style}></div>
      <span>{props.color}</span>
    </div>
  )
}

