import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotes, setError } from '../../actions';
import { NewItemInput } from '../../components/NewItemInput/NewItemInput';
import { fetchData, createOptions } from '../../utils/api';
import { Redirect } from 'react-router-dom';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [],
      status: {}
    }
  }

  addListItem = (listItem) => {
    const { listItems } = this.state;
    this.setState({ listItems: [...listItems, listItem] });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const updatedListItems = this.state.listItems.map(item => {
      if (item.id === name) {
        item.description = value;
      }
      return item;
    });
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

  populateListItems = (listItems) => {
    return listItems.map(item => {
      return (
        <p key={item.id}>{item.description}</p>
      );
    });
  }

  render() {
    const { title, listItems, status } = this.state; 
    return (
      <div className='NoteForm'>
        <input 
          name='title' 
          value={title} 
          onChange={(event) => this.setState({ title: event.target.value})}
          placeholder='Title'
        />
        {this.populateListItems(listItems)}
        <NewItemInput addListItem={this.addListItem}/>
        <button onClick={this.handleSubmit}>Save</button>
        {status === 201 && <Redirect to='/' />}
      </div>
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