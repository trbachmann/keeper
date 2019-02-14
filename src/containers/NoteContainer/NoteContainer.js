import React from 'react';
import './NoteContainer.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NoteCard } from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';

export const NoteContainer = ({ notes }) => {
  const cards = notes.map(note => {
    return <NoteCard {...note} />
  });

  return (
    <div className='NoteContainer'>
      <Link to='/new-note' className='NoteContainer--new-note'>New Note</Link>
      <div className='NoteContainer--cards'>
        {cards}
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  notes: state.notes
});

export default connect(mapStateToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array
}