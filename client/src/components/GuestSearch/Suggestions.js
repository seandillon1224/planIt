import React from 'react'
import AddBtn from '../AddBtn';

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r._id}>
      {r.name} --  {r.email}
      
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions