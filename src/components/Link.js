import React from 'react';
import {link} from '../reducers/navigation';

export default function Link({type, id, children}) {
  let content = children || id;
  return <a href={link(type, id)}>{content}</a>
}
