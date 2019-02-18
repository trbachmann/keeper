import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NoteCard } from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import Loader from '../../components/Loader/Loader';
import newnoteicon from '../../images/newnoteicon.svg';

export const NoteContainer = ({ notes, isLoading, isDisabled }) => {
  const cards = notes.map(note => {
    return <NoteCard {...note} key={note.id}/>
  }).reverse();

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
            alt='new note icon'
          />
          <span className='NoteContainer--span'>
            New Note
          </span>
        </Link>
      </div>
      {isLoading && <Loader />}
      {!isLoading &&
        <Masonry
          breakpointCols={breakpoints}
          className='NoteContainer--cards'
          columnClassName='NoteContainer--cards-masonry-cols'>
          {cards}
        </Masonry>}
    </div>
  );
};

export const mapStateToProps = (state) => ({
  notes: state.notes,
  isLoading: state.isLoading
});

export default connect(mapStateToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool
}