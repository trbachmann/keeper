import React, { Component, Fragment } from 'react';
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

  render() {
    const { notes } = this.props;
    return (
      <div className="App">
        <h1>Trapper Keeper</h1>
        <Switch>
          <Route path='/new-note' render={({ match }) => {
            return (
              <Fragment>
                <NoteContainer/>
                <NoteForm match={match}/>
              </Fragment>
            );
          }}/>
          <Route path='/notes/:id' render={({ match }) => {
            const { id } = match.params;
            const currentNote = notes.find( note => note.id === id );
            return currentNote ? (
              <Fragment>
                <NoteContainer/>
                <NoteForm {...currentNote} match={match}/>
              </Fragment>
            ) : <Error404 />;
          }} />
          <Route exact path='/' component={NoteContainer}/>
          <Route component={Error404}/>
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