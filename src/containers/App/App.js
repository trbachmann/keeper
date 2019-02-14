import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import NoteContainer from '../NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Trapper Keeper!!</h1>
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

export default withRouter(connect(mapStateToProps)(App));

App.propTypes = {
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string
}