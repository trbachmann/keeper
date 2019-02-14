import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotes } from '../../actions';
import { NewItemInput } from '../../components/NewItemInput/NewItemInput';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: []
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


  populateListItems = (listItems) => {
    return listItems.map(item => {
      return (
        <p key={item.id}>{item.description}</p>
      );
    });
  }

  render() {
    const { title, listItems } = this.state; 
    return (
      <form className='NoteForm'>
        <input 
          name='title' 
          value={title} 
          onChange={(event) => this.setState({ title: event.target.value})}
          placeholder='Title'
        />
        {this.populateListItems(listItems)}
        <NewItemInput addListItem={this.addListItem}/>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default connect(null, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  setNotes: PropTypes.func
}