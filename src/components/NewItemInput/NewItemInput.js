import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export class NewItemInput extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleKeyDown = (event) => {
    const { value } = event.target;
    const { description } = this.state;
    const id = shortid.generate();
    if (value && event.key === 'Enter') {
      this.props.addListItem({ id, description, isComplete: false });
      this.setState({ description: '' })
    }
  }

  render() {
    return(
      <input 
        name='description' 
        value={this.state.description} 
        onChange={this.handleChange} 
        onKeyDown={this.handleKeyDown} 
        placeholder='Add New Item'
      />
    );
  }
}

NewItemInput.propTypes = {
  addListItem: PropTypes.func
}