import React from 'react';
import blankNote from '../../images/blank-note-unsplash.jpg';
import { Link } from 'react-router-dom';

const Error404 = () => {

  return (
    <div className ='Error404'>
      <div className='Error404--div'>
        <h2>No Note Found</h2>
        <Link to='/'>Back to Notes</Link>
      </div>
      <img className='Error404--img' src={blankNote} alt='blank note'/>
    </div>
  )
}

export default Error404;