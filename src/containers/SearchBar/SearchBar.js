import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuery } from '../../actions';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  filterNotes = (e) => {
    const userQuery = e.target.value;
    const { setQuery } = this.props;
    setQuery(userQuery);
  }

  render() {
    return (
      <input
        onChange={this.filterNotes}
        className='SearchBar--input'
        placeholder='Search notes' />
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setQuery: (query) => dispatch(setQuery(query))
});

export default connect(null, mapDispatchToProps)(SearchBar);

SearchBar.propTypes = {
  setQuery: PropTypes.func
}