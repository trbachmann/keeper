import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Trapper Keeper!!</h1>
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