import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { fetchData } from '../../utils/api';
import { setNotes, setError } from '../../actions';

export class App extends Component {

  fetchNotes = async () => {
    const { setNotes, setError } = this.props;
    try {
      const response = await fetchData('http://localhost:3001/api/v1/notes');
      setNotes(await response.json());
    } catch (error) {
      setError(error);
    }
  }

  componentDidMount = () => {
    this.fetchNotes();
  }

  render() {
    const { notes } = this.props;
    return (
      <div className="App">
        <h1>Trapper Keeper</h1>
        <Route path='/notes/:id' render={({ match }) => {
          const { id } = match.params;
          const currentNote = notes.find( note => note.id === id );
          return currentNote ? <NoteForm {...currentNote} match={match}/> : null;
        }} />
        <Route path='/new-note' component={NoteForm}/>
        <Route path='/' component={NoteContainer}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  isLoading: state.isLoading,
  error: state.error
});

export const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes)),
  setError: (error) => dispatch(setError(error))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  setNotes: PropTypes.func,
  setError: PropTypes.func
}