import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { fetchNotes } from '../../thunks/fetchNotes';
import Error404 from '../../components/Error404/Error404';

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchNotes();
  }

  getNotesRoute = ({ match }) => {
    const { notes } = this.props;
    const { id } = match.params;
    const currentNote = notes.find( note => note.id === id );
    return currentNote ? (
      [
        <NoteContainer isDisabled={true} key="NoteContainer" />,
        <NoteForm {...currentNote} match={match} key="NoteForm" />
      ]
    ) : <Error404 />;
  }

  getNewNoteRoute = ({ match }) => {
    return [
      <NoteContainer isDisabled={true} key="NoteContainer"/>,
      <NoteForm match={match} key="NoteForm"/>
    ]
  }

  render() {
    return (
      <div className='App'>
        <h1 className='App--h1'>Trapper Keeper</h1>
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