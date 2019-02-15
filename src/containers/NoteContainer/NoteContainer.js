import React from 'react';
import './NoteContainer.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NoteCard } from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import Loader from '../../components/Loader/Loader';

export const NoteContainer = ({ notes, isLoading }) => {
  const cards = notes.map(note => {
    return <NoteCard {...note} key={note.id}/>
  }).reverse();

  const breakpoints = {
    default: 5,
    1500: 4,
    1100: 3,
    790: 2,
    550: 1
  };

  return (
    <div className='NoteContainer'>
      <Link to='/new-note' className='NoteContainer--new-note'>New Note</Link>
      {isLoading && <Loader />}
      {
        !isLoading &&
        <Masonry
          breakpointCols={breakpoints}
          className='NoteContainer--cards'
          columnClassName='NoteContainer--cards-masonry-cols'>
          {cards}
        </Masonry>
      }
    </div>
  );
};

export const mapStateToProps = (state) => ({
  notes: state.notes,
  isLoading: state.isLoading
});

export default connect(mapStateToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array
}