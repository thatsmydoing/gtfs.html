import React from 'react';
import {link} from '../reducers/navigation';
import Color from './Color';

export default function InfoTable(props) {
  return (
    <table>
      <tbody>
        {renderEntries(props.object, props.schema)}
        {props.children}
      </tbody>
    </table>
  )
}

export function Entry(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.children}</td>
    </tr>
  )
}

const notSpecified = <span className='missing'>empty</span>;
const columnAbsent = <span className='missing'>optional column absent</span>;
const columnMissing = <span className='missing'>required column missing</span>;

function renderItem(object, key, schema) {
  let itemSchema = schema[key];
  let present = object.hasOwnProperty(key);
  if(!present) {
    return itemSchema.optional ? columnAbsent : columnMissing;
  }
  if(!object[key]) {
    return notSpecified;
  }

  let item = object[key];
  if(itemSchema.relation) {
    return <a href={link(itemSchema.relation, item)}>{item}</a>
  }
  if(Array.isArray(itemSchema.type)) {
    return itemSchema.type[item];
  }
  if(itemSchema.type == 'url') {
    return <a href={item}>{item}</a>
  }
  if(itemSchema.type == 'color') {
    return <Color color={item} />
  }
  return item;
}

function renderEntries(object, schema) {
  return Object.keys(schema).map(key =>
    <Entry name={schema[key].name} key={key}>
      {renderItem(object, key, schema)}
    </Entry>
  )
}
