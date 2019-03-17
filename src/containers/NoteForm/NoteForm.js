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
import paletteicon from '../../images/paletteicon.svg';

export class NoteForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [],
      focusedListItemID: 'title',
      color: 'white',
      showColorOptions: false
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    const { path } = this.props.match;
    const { title, listItems, color } = this.props;
    if (path !== '/new-note') {
      this.setState({ title, listItems, color });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    this.props.setStatus(0);
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
      autoFocus={this.state.focusedListItemID === 'title'}
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
    event.preventDefault();
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

  handleKeydown = (event) => {
    event.key === 'Escape' && this.props.setStatus(200);
  }

  handleNoteDelete = async (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { deleteNoteThunk, user } = this.props;
    await deleteNoteThunk(id, user);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user } = this.props;
    const { id } = this.props.match.params;
    const { title, listItems, color } = this.state;
    if (id) {
      await this.props.putNote({ id, title, listItems, color }, user);
    } else {
      await this.props.postNote({ title, listItems, color }, user);
    }
  }

  toggleShowColorOptions = () => {
    const { showColorOptions } = this.state;
    this.setState({ showColorOptions: !showColorOptions });
  }

  render() {
    const { title, color, showColorOptions } = this.state;
    const { status } = this.props;
    const { path } = this.props.match;
    const colors = ['white', 'pink', 'orange', 'yellow', 'green', 'blue', 'lavender', 'gray'];
    const buttons = colors.map(color => {
      return <button key={color} id={color} className='NoteForm--color' onClick={this.handleColorChoice}></button >
    });
    const completeCount = this.getCompleteListItems().length;
    const completeNotice = completeCount === 1 ? `${completeCount} Completed Item` :
      `${completeCount} Completed Items`;

    return (
      <div className='NoteForm--div--overlay'>
        <form className={'NoteForm--background-' + color} onSubmit={this.handleSubmit}>
          {this.getTitleInput()}
          <div className='NoteForm--title-and-listitems'>
            {this.getIncompleteListItems()}
            {this.getNewListItemInput()}
            <p className='NoteForm--completed-notice'>{completeNotice}</p>
            {this.getCompleteListItems()}
          </div>
          <button
            className={'NoteForm--button-' + color}
            disabled={title.trim() === ''}>
            Save
          </button>
          {path !== '/new-note' ?
            <button className={'NoteForm--button-' + color} onClick={this.handleNoteDelete}>
              Delete
            </button> :
            <Link to='/'>
              <button className={'NoteForm--button-' + color}>Discard</button>
            </Link>}
          {showColorOptions &&
            <div className='NoteForm--color-options'>
              {buttons}
            </div>
          }
          <div className='NoteForm--div--palette-icon'>
            <img className='NoteForm--palette-icon' src={paletteicon} alt='palette icon' onClick={this.toggleShowColorOptions} />
          </div>
          {(status >= 200 && status < 300) && <Redirect to='/' />}
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  putNote: (note, user) => dispatch(putNote(note, user)),
  postNote: (note, user) => dispatch(postNote(note, user)),
  deleteNoteThunk: (id, user) => dispatch(deleteNoteThunk(id, user)),
  setStatus: (code) => dispatch(setStatus(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  deleteNoteThunk: PropTypes.func,
  putNote: PropTypes.func,
  postNote: PropTypes.func,
  status: PropTypes.number,
  setStatus: PropTypes.func,
  user: PropTypes.object
}