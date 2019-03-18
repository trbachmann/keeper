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
  getCompleteItems = () => {
    const { listItems } = this.props;
    const completeItems = listItems.filter(item => item.isComplete);
    return (
      completeItems.map(item => {
        const { description, id } = item;
        return (
          <span key={id} className='NoteCard--span--complete'>
            <img
              src={checkedicon}
              className='NoteCard--icon--checked'
              alt='checked icon'
              onClick={() => this.handleComplete(id)}
            />
            <p className='NoteForm--p--complete'>{description}</p>
          </span>
        );
      })
    );
  }

  getIncompleteItems = () => {
    const { listItems } = this.props;
    const incompleteItems = listItems.filter(item => !item.isComplete);
    return (
      incompleteItems.map(item => {
        const { description, id } = item;
        return (
          <span key={id} className='NoteCard--span--incomplete'>
            <img
              src={uncheckedicon}
              className='NoteCard--icon--unchecked'
              alt='unchecked icon'
              onClick={() => this.handleComplete(id)}
            />
            <p className='NoteForm--p--incomplete'>{description}</p>
          </span>
        );
      })
    );
  }

  handleComplete = async (itemID) => {
    const { id, title, color, listItems, putNote, setStatus, user } = this.props;
    const updatedListItems = listItems.map(item => {
      const { isComplete } = item;
      return item.id === itemID ? { ...item, isComplete: !isComplete } : item;
    });
    await putNote({ id, title, color, listItems: updatedListItems }, user);
    setStatus(0);
  }

  handleDelete = async () => {
    const { id, deleteNoteThunk, setStatus, user } = this.props;
    await deleteNoteThunk(id, user);
    setStatus(0);
  }

  handleDrag = (event) => {
    event.dataTransfer.setData('draggedIndex', this.props.index);
  }

  handleDrop = (event) => {
    const { notes, index: droppedOnIndex, putAllNotes, user } = this.props;
    const [...updatedNotes] = notes;
    const draggedIndex = event.dataTransfer.getData('draggedIndex');
    const tempNote = updatedNotes.splice(draggedIndex, 1);
    updatedNotes.splice(droppedOnIndex, 0, ...tempNote);
    putAllNotes(updatedNotes, user);
  }

  render() {
    const { id, title, color, disabled } = this.props;
    const completeItems = this.getCompleteItems();
    const completeCount = completeItems.length;
    const completeNotice = completeCount > 1 ? `${completeCount} Completed Items` :
      `${completeCount} Completed Item`;
    const incompleteItems = this.getIncompleteItems();
    const result = completeCount ? [
      ...incompleteItems,
      <p key='complete-notice' className='NoteCard--completed-notice'>{completeNotice}</p>,
      ...completeItems
    ] : incompleteItems;
    if (result.length > 10) {
      result.splice(10);
      result.push(<p className='NoteCard--ellipsis' key='...'>...</p>);
    }
    let noteCardClass = 'NoteCard--background-';
    if (disabled) {
      noteCardClass += 'disabled';
    } else {
      noteCardClass += color;
    }

    return (
      <div
        draggable
        onDragStart={this.handleDrag}
        onDragOver={(event) => event.preventDefault()}
        onDrop={this.handleDrop}
        className={noteCardClass}
      >
        <h3 className='NoteCard--h3'>{title}</h3>
        <div>{result}</div>
        <span className='NoteCard--icon-container'>
          <Link to={'/notes/' + id}>
            <img
              className='NoteCard--edit-icon'
              src={editicon}
              alt='edit icon'
            />
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
  notes: state.notes,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  putAllNotes: (notes, user) => dispatch(putAllNotes(notes, user)),
  putNote: (note, user) => dispatch(putNote(note, user)),
  deleteNoteThunk: (id, user) => dispatch(deleteNoteThunk(id, user)),
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
  setStatus: PropTypes.func,
  user: PropTypes.object
}