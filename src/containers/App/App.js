import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { fetchNotes } from '../../thunks/fetchNotes';

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchNotes();
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
  fetchNotes: () => dispatch(fetchNotes())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  fetchNotes: PropTypes.func
}