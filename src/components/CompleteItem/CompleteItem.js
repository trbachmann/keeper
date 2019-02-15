import React from 'react';
import PropTypes from 'prop-types';
import deleteicon from '../../images/deleteicon.svg';
import checkedicon from '../../images/checkedicon.svg';

const CompleteItem = (props) => {
  const { listItems, id, description } = props;
  return (
    <span key={id} className='NoteForm--span--complete'>
      <img
        src={checkedicon}
        className='NoteForm--icon--checked'
        onClick={() => props.handleComplete(listItems, id)}
        alt='checked icon'
      />
      <p className='NoteForm--p--complete'>{description}</p>
      <img
        src={deleteicon}
        className='NoteForm--icon--delete'
        onClick={() => props.handleItemDelete(listItems, id)}
        alt='delete icon'
      />
    </span>
  )
}

CompleteItem.propTypes = {
  listItems: PropTypes.array,
  id: PropTypes.string,
  description: PropTypes.string,
  handleComplete: PropTypes.func,
  handleItemDelete: PropTypes.func
}

export default CompleteItem;