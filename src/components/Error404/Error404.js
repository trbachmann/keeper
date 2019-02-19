import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className ='Error404'>
      <h2 className='Error404--h2'>No Note Found</h2>
      <Link to='/' className='Error404--Link'>Back to Notes</Link>
    </div>
  )
}

export default Error404;