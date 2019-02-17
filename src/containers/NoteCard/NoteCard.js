import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uncheckedicon from '../../images/uncheckedicon.svg';
import checkedicon from '../../images/checkedicon.svg';

export class NoteCard extends Component {
  render() {
    const { id, title, listItems } = this.props;
    const incompleteItems = listItems.filter(item => !item.isComplete);
    const completeItems = listItems.filter(item => item.isComplete);
    const result = [];
    result.push(incompleteItems.map(item => {
      const { description, id } = item;
      return (
        <span key={id} className='NoteForm--span--incomplete'>
          <img
            src={uncheckedicon}
            className='NoteForm--icon--unchecked'
            alt='unchecked icon'
          />
          <p className='NoteForm--p--incomplete'>{description}</p>
        </span>
      );
    }));
    result.push(completeItems.map(item => {
      const { description, id } = item;
      return (
        <span key={id} className='NoteForm--span--complete'>
          <img
            src={checkedicon}
            className='NoteForm--icon--checked'
            alt='checked icon'
          />
          <p className='NoteForm--p--complete'>{description}</p>
        </span>
      );
    }));

    return (
      <Link to={'/notes/' + id} className='NoteCard'>
        <h3>{title}</h3>
        <div>{result}</div>
      </Link>
    )
  }
}

export default NoteCard;

NoteCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listItems: PropTypes.array
}