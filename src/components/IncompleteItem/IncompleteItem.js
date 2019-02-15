import React from 'react';
import PropTypes from 'prop-types';
import deleteicon from '../../images/deleteicon.svg';
import uncheckedicon from '../../images/uncheckedicon.svg';

const IncompleteItem = (props) => {
  const { id, description, focusedListItemID } = props;
  return (
    <span className='NoteForm--span--incomplete'>
      <img
        src={uncheckedicon}
        className='NoteForm--icon--unchecked'
        onClick={() => props.handleComplete(id)}
        alt='unchecked icon'
      />
      <input
        name={id}
        value={description}
        autoFocus={id === focusedListItemID}
        onChange={props.handleChange}
        className='NoteForm--list-item'
      />
      <img
        src={deleteicon}
        className='NoteForm--icon--delete'
        onClick={() => props.handleItemDelete(id)}
        alt='delete icon'
      />
    </span>
  )
}

IncompleteItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  focusedListItemID: PropTypes.string,
  handleComplete: PropTypes.func,
  handleChange: PropTypes.func,
  handleItemDelete: PropTypes.func
}

export default IncompleteItem;