import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteCard from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import newnoteicon from '../../images/newnoteicon.svg';

export const addWelcomeNote = () => {
  const welcomeMessage = {
    id: 'welcome',
    title: 'Welcome to Keeper',
    listItems: [
      { id: 'firstInstruction', description: 'Keep track of your projects', isComplete: false },
      { id: 'secondInstruction', description: 'List out your tasks to track', isComplete: false },
      { id: 'thirdInstruction', description: 'Click the plus sign above to get started', isComplete: false },
    ],
    color: 'white'
  };
  return <NoteCard {...welcomeMessage} key={welcomeMessage.id}/>
}

export const NoteContainer = ({ notes, isLoading, isDisabled }) => {
  const cards = notes.map((note, index) => {
    return <NoteCard {...note} key={note.id} index={index}/>
  }).reverse();

  if (!notes.length) {
    const welcome = addWelcomeNote();
    cards.push(welcome);
  }

  const breakpoints = {
    default: 6,
    1552: 5,
    1296: 4,
    1040: 3,
    784: 2,
    528: 1
  };

  const disabledClass = isDisabled ? '--disabled' : '';

  return (
    <div className={'NoteContainer' + disabledClass}>
      <div className='NoteContainer--div'>
        <Link to='/new-note' className='NoteContainer--link'>
          <img
            src={newnoteicon}
            className='NoteContainer--icon--new-note'
            alt='new note icon'/>
          <span className='NoteContainer--span'>
            New Note
          </span>
        </Link>
      </div>
        <Masonry
          breakpointCols={breakpoints}
          className='NoteContainer--cards'
          columnClassName='NoteContainer--cards-masonry-cols'>
          {cards}
        </Masonry>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  notes: state.notes
});

export default connect(mapStateToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array,
  isDisabled: PropTypes.bool
}