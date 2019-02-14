import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotes } from '../../actions';
import { Link } from 'react-router-dom';

export class NoteCard extends Component {
  render() {
    const { id, title, listItems } = this.props;
    return(
      <Link to={'/notes/' + id}>
        <div className='NoteCard'></div>
      </Link>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default connect(null, mapDispatchToProps)(NoteCard);

NoteCard.propTypes = {
  setNotes: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  listItems: PropTypes.array
}