import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotes } from '../../actions';
import uncheckedicon from '../../images/uncheckedicon.svg';
import checkedicon from '../../images/checkedicon.svg';
import editicon from '../../images/edit.svg';
import deleteicon from '../../images/delete.svg';

export class NoteCard extends Component {
  handleDrag = (event) => {
    event.dataTransfer.setData('draggedIndex', this.props.index);
  }

  handleDrop = (event) => {
    const { notes, index: droppedOnIndex } = this.props;
    const [...updatedNotes] = notes;
    const draggedIndex = event.dataTransfer.getData('draggedIndex');
    const tempNote = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(droppedOnIndex, 0 , ...tempNote);
    this.props.setNotes(updatedNotes);
  }

  render() {
    const { id, title, listItems, color } = this.props;
    const incompleteItems = listItems.filter(item => !item.isComplete);
    const completeItems = listItems.filter(item => item.isComplete);
    const result = [
      ...incompleteItems.map(item => {
        const { description, id } = item;
        return (
          <span key={id} className='NoteCard--span--incomplete'>
            <img
              src={uncheckedicon}
              className='NoteForm--icon--unchecked'
              alt='unchecked icon'
            />
            <p className='NoteForm--p--incomplete'>{description}</p>
          </span>
        );
      }),
      ...completeItems.map(item => {
        const { description, id } = item;
        return (
          <span key={id} className='NoteCard--span--complete'>
            <img
              src={checkedicon}
              className='NoteForm--icon--checked'
              alt='checked icon'
            />
            <p className='NoteForm--p--complete'>{description}</p>
          </span>
        );
      })
    ];
    if (result.length > 10) {
      result.splice(10);
      result.push(<p className='NoteCard--ellipsis' key='...'>...</p>);
    }
    return (
      <Link to={'/notes/' + id}>
        <div 
          draggable
          onDragStart={this.handleDrag}
          onDragOver={(event) => event.preventDefault()}
          onDrop={this.handleDrop}
          className={'NoteCard--background-' + color}>
          <h3 className='NoteCard--h3'>{title}</h3>
          <div>{result}</div>
          <span className='NoteCard--icon-container'>
            <img className='NoteCard--delete-icon' src={editicon} alt='edit icon'/>
            <img className='NoteCard--edit-icon' src={deleteicon} alt='delete icon'/>
          </span>
        </div>
      </Link>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
});

export const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCard);

NoteCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listItems: PropTypes.array,
  color: PropTypes.string,
  notes: PropTypes.array
}