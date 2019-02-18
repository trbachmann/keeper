import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import shortid from 'shortid';
import CompleteItem from '../../components/CompleteItem/CompleteItem';
import IncompleteItem from '../../components/IncompleteItem/IncompleteItem';
import { putNote } from '../../thunks/putNote';
import { postNote } from '../../thunks/postNote';
import { deleteNoteThunk } from '../../thunks/deleteNoteThunk';
import { setStatus } from '../../actions';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [],
      focusedListItemID: null,
      color: 'white'
    }
  }

  componentDidMount() {
    const { path } = this.props.match;
    const { title, listItems, color } = this.props;
    if (path !== '/new-note') {
      this.setState({ title, listItems, color });
    }
  }

  createListItem = (id, description) => ({
    id,
    description,
    isComplete: false
  })

  editListItems = (listItems, id, description) => {
    return listItems.map(item => {
      return item.id === id ? { ...item, description } : item;
    });
  }

  getIncompleteListItems = () => {
    const { focusedListItemID, listItems } = this.state;
    const incompleteItems = listItems.filter(item => !item.isComplete);
    return incompleteItems.map(item => {
      return (
        <IncompleteItem
          key={item.id}
          id={item.id}
          description={item.description}
          focusedListItemID={focusedListItemID}
          handleComplete={this.handleComplete}
          handleChange={this.handleChange}
          handleItemDelete={this.handleItemDelete}
        />
      );
    });
  }

  getCompleteListItems = () => {
    const { listItems } = this.state;
    const completeItems = listItems.filter(item => item.isComplete);
    return completeItems.map(item => {
      return (
        <CompleteItem
          key={item.id}
          id={item.id}
          description={item.description}
          handleComplete={this.handleComplete}
          handleItemDelete={this.handleItemDelete}
        />
      );
    });
  }

  getNewListItemInput = () => (
    <input
      name={shortid.generate()}
      value=''
      onChange={this.handleChange}
      placeholder='List item'
      className='NoteForm--new-input'
    />
  )

  getTitleInput = () => (
    <input
      name='title'
      value={this.state.title}
      placeholder='Title'
      onChange={(event) => this.setState({ title: event.target.value })}
      className='NoteForm--title'
    />
  )

  handleChange = (event) => {
    const { name: id, value: description } = event.target;
    const { listItems } = this.state;
    const existingListItem = listItems.find(item => item.id === id);
    let updatedListItems;
    if (existingListItem) {
      updatedListItems = this.editListItems(listItems, id, description);
    } else {
      updatedListItems = [...listItems, this.createListItem(id, description)];
    }
    this.setState({ listItems: updatedListItems, focusedListItemID: id });
  }

  handleColorChoice = (event) => {
    const color = event.target.id;
    this.setState({ color });
  }

  handleComplete = (id) => {
    const { listItems } = this.state;
    const updatedListItems = listItems.map(item => {
      const { isComplete } = item;
      return item.id === id ? { ...item, isComplete: !isComplete } : item;
    });
    this.setState({ listItems: updatedListItems });
  }

  handleItemDelete = (id) => {
    const { listItems } = this.state;
    const updatedListItems = listItems.filter(item => item.id !== id);
    this.setState({ listItems: updatedListItems });
  }

  handleNoteDelete = async () => {
    const { id } = this.props.match.params;
    await this.props.deleteNoteThunk(id);
    this.props.setStatus(0);
  }

  handleSubmit = async () => {
    const { id } = this.props.match.params;
    const { title, listItems, color } = this.state;
    if (id) {
      await this.props.putNote({ id, title, listItems, color });
    } else {
      await this.props.postNote({ title, listItems, color });
    }
    this.props.setStatus(0);
  }

  render() {
    const { title, color } = this.state;
    const { status } = this.props; 
    const { path } = this.props.match;
    return (
      <div className={'NoteForm--background-' + color}>
        {this.getTitleInput()}
        {this.getIncompleteListItems()}
        {this.getNewListItemInput()}
        {this.getCompleteListItems()}
        <button
          className='NoteForm--button'
          disabled={title.trim() === ''}
          onClick={this.handleSubmit}
        >
          Save
        </button>
        {path !== '/new-note' ? 
          <button className='NoteForm--button' onClick={this.handleNoteDelete}>
            Delete
          </button> :
          <Link to='/'>
            <button className='NoteForm--button'>Discard</button>
          </Link>}
        {(status >= 200 && status < 300) && <Redirect to='/' />}
        <div className='NoteForm--color-options'>
          <button id='white' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='pink' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='orange' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='yellow' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='green' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='blue' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='lavender' className='NoteForm--color' onClick={this.handleColorChoice}></button>
          <button id='gray' className='NoteForm--color' onClick={this.handleColorChoice}></button>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  status: state.status
});

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note) => dispatch(putNote(note)),
  postNote: (note) => dispatch(postNote(note)),
  deleteNoteThunk: (id) => dispatch(deleteNoteThunk(id)),
  setStatus: (code) => dispatch(setStatus(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  deleteNoteThunk: PropTypes.func,
  putNote: PropTypes.func,
  postNote: PropTypes.func,
  status: PropTypes.number,
  setStatus: PropTypes.func
}