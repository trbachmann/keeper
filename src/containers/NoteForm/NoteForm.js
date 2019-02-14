import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotes, setError } from '../../actions';
import { fetchData, createOptions } from '../../utils/api';
import { Redirect } from 'react-router-dom';
import shortid from 'shortid';
import deleteicon from '../../images/deleteicon.svg';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [],
      status: {},
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

  handleDelete = (listItems, id) => {
    const updatedListItems = listItems.filter(item => item.id !== id);
    this.setState({ listItems: updatedListItems });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, listItems } = this.state;
    const url = 'http://localhost:3001/api/v1/notes/';
    const options = createOptions('POST', { title, listItems });
    try {
      const response = await fetchData(url, options);
      const notes = await response.json();
      this.props.setNotes(notes);
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

  populateListItems = (listItems) => {
    const { focusedListItemID } = this.state;
    return listItems.map(item => {
      const { id, description } = item;
      return (
        <span className='NoteForm--span'>
          <input
            key={id}
            name={id}
            value={description}
            autoFocus={id === focusedListItemID}
            onChange={this.handleChange}
            className='NoteForm--list-item'
          />
          <img
            src={deleteicon}
            className='NoteForm--icon--delete'
            onClick={() => this.handleDelete(listItems, id)}
          />
        </span>
      );
    });
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

  render() {
    const { title, listItems, status } = this.state; 
    return (
      <form className='NoteForm' onSubmit={this.handleSubmit}>
        {this.getTitleInput(title)}
        {this.populateListItems(listItems)}
        {this.getNewListItemInput()}
        <input type='submit' value='Save' className='NoteForm--submit'/>
        {status === 201 && <Redirect to='/' />}
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes)),
  setError: (message) => dispatch(setError(message))
});

export default connect(null, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  setNotes: PropTypes.func,
  setError: PropTypes.func,
}