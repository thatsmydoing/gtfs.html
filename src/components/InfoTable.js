import React from 'react';
import {parseDate} from '../format';
import Color from './Color';
import ServiceItem from './ServiceItem';
import Link from './Link';

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

function renderItem(item, schema, object) {
  let present = item != undefined;
  if(!present) {
    return schema.optional ? columnAbsent : columnMissing;
  }
  if(item == '') {
    return notSpecified;
  }

  if(schema.relation) {
    if(schema.relation == 'service' && object.service) {
      return <ServiceItem {...object.service} />
    }
    return <Link type={schema.relation} id={item} />
  }
  if(Array.isArray(schema.type)) {
    return schema.type[item];
  }
  if(schema.type instanceof Object) {
    return schema.type[item];
  }
  if(schema.type == 'boolean') {
    if(item == 0) {
      return 'false (0)';
    }
    else if(item == 1) {
      return 'true (1)';
    }
    else {
      return item;
    }
  }
  if(schema.type == 'date') {
    let date = parseDate(item);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  }
  if(schema.type == 'url') {
    return <a target="_blank" href={item}>{item}</a>
  }
  if(schema.type == 'color') {
    return <Color color={item} />
  }
  return item;
}

// TODO factor out of InfoTable
export function filterSchema(schema, filter) {
  let keys;
  if(Array.isArray(filter)) {
    keys = filter;
  }
  else {
    keys = Object.keys(schema).filter(filter);
  }
  let newSchema = {};
  keys.forEach(key => {
    newSchema[key] = schema[key];
  });
  return newSchema;
}

export function renderEntries(object, schema, View = Entry) {
  return Object.keys(schema).map(key =>
    <View name={schema[key].name} key={key}>
      {renderItem(object[key], schema[key], object)}
    </View>
  )
}
