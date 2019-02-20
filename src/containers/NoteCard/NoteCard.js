import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { putNote } from '../../thunks/putNote';
import { putAllNotes } from '../../thunks/putAllNotes';
import { deleteNoteThunk } from '../../thunks/deleteNoteThunk';
import uncheckedicon from '../../images/uncheckedicon.svg';
import checkedicon from '../../images/checkedicon.svg';
import editicon from '../../images/edit.svg';
import deleteicon from '../../images/delete.svg';
import { setStatus } from '../../actions';

export class NoteCard extends Component {
  handleComplete = async (itemID) => {
    const { id, title, color, listItems, putNote, setStatus } = this.props;
    const updatedListItems = listItems.map(item => {
      const { isComplete } = item;
      return item.id === itemID ? { ...item, isComplete: !isComplete } : item;
    });
    await putNote({ id, title, color, listItems: updatedListItems });
    setStatus(0);
  }

  handleDelete = async () => {
    const { id, deleteNoteThunk, setStatus } = this.props;
    await deleteNoteThunk(id);
    setStatus(0);
  }

  handleDrag = (event) => {
    event.dataTransfer.setData('draggedIndex', this.props.index);
  }

  handleDrop = (event) => {
    const { notes, index: droppedOnIndex, putAllNotes } = this.props;
    const [...updatedNotes] = notes;
    const draggedIndex = event.dataTransfer.getData('draggedIndex');
    const tempNote = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(droppedOnIndex, 0 , ...tempNote);
    putAllNotes(updatedNotes);
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
              onClick={() => this.handleComplete(id)}
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
              onClick={() => this.handleComplete(id)}
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
      <div 
        draggable
        onDragStart={this.handleDrag}
        onDragOver={(event) => event.preventDefault()}
        onDrop={this.handleDrop}
        className={'NoteCard--background-' + color}>
        <h3 className='NoteCard--h3'>{title}</h3>
        <div>{result}</div>
        <span className='NoteCard--icon-container'>
          <Link to={'/notes/' + id}>
            <img className='NoteCard--edit-icon' src={editicon} alt='edit icon'/>
          </Link>
          <img
            className='NoteCard--delete-icon'
            src={deleteicon}
            alt='delete icon'
            onClick={this.handleDelete}
          />
        </span>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
});

export const mapDispatchToProps = (dispatch) => ({
  putAllNotes: (notes) => dispatch(putAllNotes(notes)),
  putNote: (note) => dispatch(putNote(note)),
  deleteNoteThunk: (id) => dispatch(deleteNoteThunk(id)),
  setStatus: (code) => dispatch(setStatus(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteCard);

NoteCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listItems: PropTypes.array,
  color: PropTypes.string,
  notes: PropTypes.array,
  putAllNotes: PropTypes.func,
  putNote: PropTypes.func,
  deleteNote: PropTypes.func,
  setStatus: PropTypes.func
}