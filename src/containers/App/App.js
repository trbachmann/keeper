import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { fetchNotes } from '../../thunks/fetchNotes';
import Error404 from '../../components/Error404/Error404';
import notebookicon from '../../images/notebook.svg';
import Loader from '../../components/Loader/Loader';
import { fetchData, createOptions } from '../../utils/api';
import { setUser, setNotes } from '../../actions';
import firebase from 'firebase/app';
import 'firebase/auth';

export class App extends Component {
  componentDidMount() {
    this.props.fetchNotes();
    this.checkUser();
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(async (userData) => {
      if (userData) {
        const { displayName, email, uid } = userData;
        const user = { displayName, email, uid };
        const url = 'http://localhost:3001/api/v1/users';
        const options = createOptions('POST', user);
        const response = await fetchData(url, options);
        const { notes } = await response.json();
        this.props.setUser(user);
        this.props.setNotes(notes)
      }
    });
  }

  getNotesRoute = ({ match }) => {
    const { notes } = this.props;
    const { id } = match.params;
    const currentNote = notes.find(note => note.id === id);
    return currentNote ? (
      [
        <NoteContainer isDisabled={true} key="NoteContainer" />,
        <NoteForm {...currentNote} match={match} key="NoteForm" />
      ]
    ) : <Error404 />;
  }

  getNewNoteRoute = ({ match }) => {
    const { user } = this.props;
    return user ? (
      [
        <NoteContainer isDisabled={true} key="NoteContainer" />,
        <NoteForm match={match} key="NoteForm" />
      ]
    ) : <Error404 />;
  }

  render() {
    return (
      <div className='App'>
        <header className='App--header'>
          <h1 className='App--h1'>
            <img className='App--notebook-icon' src={notebookicon} alt='note icon' />
            Keeper
          </h1>
          <SearchBar />
        </header>
        {this.props.isLoading && <Loader />}
        <Switch>
          <Route path='/new-note' render={this.getNewNoteRoute} />
          <Route path='/notes/:id' render={this.getNotesRoute} />
          <Route exact path='/' component={NoteContainer} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  isLoading: state.isLoading,
  error: state.error,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
  setUser: (user) => dispatch(setUser(user)),
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  fetchNotes: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  setNotes: PropTypes.func
}