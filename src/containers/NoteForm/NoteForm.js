import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote, setError, deleteNote } from '../../actions';
import { fetchData, createOptions } from '../../utils/api';
import { Redirect } from 'react-router-dom';
import shortid from 'shortid';
import CompleteItem from '../../components/CompleteItem/CompleteItem';
import IncompleteItem from '../../components/IncompleteItem/IncompleteItem';
import { putNote } from '../../thunks/putNote';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [],
      status: 0,
      focusedListItemID: null
    }
  }

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

  handleItemDelete = (listItems, id) => {
    const updatedListItems = listItems.filter(item => item.id !== id);
    this.setState({ listItems: updatedListItems });
  }

  handleNoteDelete = async () => {
    const { id } = this.props.match.params;
    const url = `http://localhost:3001/api/v1/notes/${id}`;
    const options = createOptions('DELETE');
    try {
      const response = await fetchData(url, options);
      this.setState({ status: response.status });
      this.props.deleteNote(id);
    } catch (error) {
      this.setError(error.message);
    }
  }

  handleSubmit = async () => {
    const { id } = this.props.match.params;
    const { title, listItems } = this.state;
    if (id) {
      const status = await this.props.putNote({ id, title, listItems }) || 0;
      this.setState({ status });
    } else {
      this.postNote();
    }
  }

  postNote = async () => {
    const { title, listItems } = this.state;
    const url = 'http://localhost:3001/api/v1/notes/';
    const options = createOptions('POST', { title, listItems });
    try {
      const response = await fetchData(url, options);
      const note = await response.json();
      this.props.addNote(note);
      this.setState({ status: response.status });
    } catch (error) {
      this.props.setError(error.message);
    }
  }

  createListItem = (id, description) => ({
    id,
    description,
    isComplete: false
  });

  editListItems = (listItems, id, description) => {
    return listItems.map(item => {
      return item.id === id ? { ...item, description } : item;
    });
  }

  getTitleInput = (title) => (
    <input 
      name='title' 
      value={title} 
      placeholder='Title'
      onChange={(event) => this.setState({ title: event.target.value})}
      className='NoteForm--title'
    />
  )

  handleComplete = (listItems, id) => {
    const updatedListItems = listItems.map(item => {
      const { isComplete } = item;
      return item.id === id ? { ...item, isComplete: !isComplete } : item;
    });
    this.setState({ listItems: updatedListItems });
  }

  populateListItems = (listItems) => {
    const { focusedListItemID } = this.state;
    const incompleteItems = listItems.filter(item => !item.isComplete);
    const completeItems = listItems.filter(item => item.isComplete);
    return [
      ...incompleteItems.map(item => {
        return (
          <IncompleteItem
            key={item.id}
            id={item.id}
            listItems={listItems}
            description={item.description}
            focusedListItemID={focusedListItemID}
            handleComplete={this.handleComplete}
            handleChange={this.handleChange}
            handleItemDelete={this.handleItemDelete}
          />
        );
      }),
      ...completeItems.map(item => {
        return (
          <CompleteItem
            key={item.id}
            id={item.id}
            listItems={listItems}
            description={item.description}
            handleComplete={this.handleComplete}
            handleItemDelete={this.handleItemDelete}
          />
        );
      })
    ];
  }

  getNewListItemInput = () => (
    <input
      name={shortid.generate()}
      value=''
      onChange={this.handleChange}
      placeholder='Add new item'
      className='NoteForm--new-input'
    />
  )

  componentDidMount() {
    const { path } = this.props.match;
    const { title, listItems } = this.props;
    if (path !== '/new-note') {
      this.setState({ title, listItems });
    }
  }

  render() {
    const { title, listItems, status } = this.state; 
    const { path } = this.props.match;
    return (
      <div className='NoteForm'>
        {this.getTitleInput(title)}
        {this.populateListItems(listItems)}
        {this.getNewListItemInput()}
        <button className='NoteForm--submit' onClick={this.handleSubmit}>
          Save
        </button>
        {path !== '/new-note' && 
          <button className='NoteForm--delete' onClick={this.handleNoteDelete}>
            Delete
          </button>}
        {(status >= 200 && status < 300) && <Redirect to='/' />}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note)),
  setError: (message) => dispatch(setError(message)),
  deleteNote: (id) => dispatch(deleteNote(id)),
  putNote: (note) => dispatch(putNote(note))
});

export default connect(null, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  addNote: PropTypes.func,
  setError: PropTypes.func,
  deleteNote: PropTypes.func,
  putNote: PropTypes.func
}