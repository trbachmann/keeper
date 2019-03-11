import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoteCard from '../NoteCard/NoteCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import newnoteicon from '../../images/newnoteicon.svg';
import LoginButton from '../LoginButton/LoginButton';
import { setUser, setNotes } from '../../actions';
import firebase from 'firebase/app';
import 'firebase/auth';

export class NoteContainer extends Component {
  addWelcomeNote = () => {
    const message = this.props.user ? 
      'Click the plus sign above to get started' : 'Sign in with Google';
    const welcomeMessage = {
      id: 'welcome',
      title: 'Welcome to Keeper!',
      listItems: [
        { id: 'firstInstruction', description: 'Keep track of your projects', isComplete: false },
        { id: 'secondInstruction', description: 'List out your tasks to track', isComplete: false },
        { id: 'thirdInstruction', description: message, isComplete: false },
      ],
      color: 'white'
    };
    return <NoteCard {...welcomeMessage} key={welcomeMessage.id} disabled/>
  }

  getNotesToDisplay = () => {
    const { notes } = this.props;
    const query = this.props.query.toLowerCase();
    if (query) {
      return notes.filter(note => {
        return note.title.toLowerCase().includes(query) ||
        note.listItems.filter(item => {
          return item.description.toLowerCase().includes(query)
        }).length;
      });
    }
    return notes;
  }

  handleClick = async () => {
    await firebase.auth().signOut();
    this.props.setUser(null);
    this.props.setNotes([]);
  }

  render() {
    const { notes, isDisabled, user } = this.props;

    const notesToDisplay = this.getNotesToDisplay();
    
    const cards = notesToDisplay.map((note, index) => {
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
          {!user && <LoginButton />}
          {user && 
            <Link to='/new-note' className='NoteContainer--link'>
              <img
                src={newnoteicon}
                className='NoteContainer--icon--new-note'
                alt='new note icon' />
              <span className='NoteContainer--span'>
                New Note
              </span>
            </Link>}
          {user &&
            <button className='NoteContainer--sign-out' onClick={this.handleClick}>
              Sign Out
            </button>}
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
  query: state.query,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);

NoteContainer.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  isDisabled: PropTypes.bool,
  user: PropTypes.object,
  setUser: PropTypes.func,
  setNotes: PropTypes.func
}