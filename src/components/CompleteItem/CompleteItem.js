import React from 'react';
import PropTypes from 'prop-types';
import deleteicon from '../../images/deleteicon.svg';
import checkedicon from '../../images/checkedicon.svg';

const CompleteItem = (props) => {
  const { id, description } = props;
  return (
    <span className='NoteForm--span--complete'>
      <img
        src={checkedicon}
        className='NoteForm--icon--checked'
        onClick={() => props.handleComplete(id)}
        alt='checked icon'
      />
      <p className='NoteForm--p--complete'>{description}</p>
      <img
        src={deleteicon}
        className='NoteForm--icon--delete'
        onClick={() => props.handleItemDelete(id)}
        alt='delete icon'
      />
    </span>
  )
}

CompleteItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  handleComplete: PropTypes.func,
  handleItemDelete: PropTypes.func
}

export default CompleteItem;