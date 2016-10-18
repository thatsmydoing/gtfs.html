import React from 'react';

export default function Optional(props) {
  let notSpecified = <span className='not-specified'>not specified</span>
  if(typeof props.children == 'object') {
    if(props.valid) {
      return props.children;
    }
    else {
      return notSpecified;
    }
  }
  else if(typeof props.children == 'string') {
    if(props.valid || props.children) {
      return <span>{props.children}</span>;
    }
    else {
      return notSpecified;
    }
  }
  return notSpecified;
}
