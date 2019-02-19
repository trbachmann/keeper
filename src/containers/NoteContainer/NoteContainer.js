import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteCard from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import newnoteicon from '../../images/newnoteicon.svg';

export class NoteContainer extends Component {
  addWelcomeNote = () => {
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
    return <NoteCard {...welcomeMessage} key={welcomeMessage.id} />
  }

  render() {
    const { notes, query, isDisabled } = this.props;

    const mappedNotes = query ? notes.filter(note => {
      return note.title.toLowerCase().includes(query) ||
        note.listItems.filter(item => {
          return item.description.toLowerCase().includes(query)
        }).length;
    }) : notes;

    const cards = mappedNotes.map((note, index) => {
      return <NoteCard {...note} key={note.id} index={index} />
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

    if (!notes.length) {
      const welcome = this.addWelcomeNote();
      cards.push(welcome);
    }

    return (
      <div className={'NoteContainer' + disabledClass}>
        <div className='NoteContainer--div'>
          <Link to='/new-note' className='NoteContainer--link'>
            <img
              src={newnoteicon}
              className='NoteContainer--icon--new-note'
              alt='new note icon' />
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
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  query: state.query
});

export default connect(mapStateToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  isDisabled: PropTypes.bool
}