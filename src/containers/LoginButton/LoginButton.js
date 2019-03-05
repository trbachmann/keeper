import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleicon from '../../images/googleicon.svg';
import PropTypes from 'prop-types';
import { fetchData, createOptions } from '../../utils/api';
import { setUser, setNotes } from '../../actions';
import { connect } from 'react-redux';

export class LoginButton extends Component {
  handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try{
      const googleData = await firebase.auth().signInWithPopup(provider);
      const { displayName, email, uid } = googleData.user;
      const user = { displayName, email, uid };
      const url = 'http://localhost:3001/api/v1/users';
      const options = createOptions('POST', user);
      const response = await fetchData(url, options);
      const { notes } = await response.json();
      this.props.setUser(user);
      this.props.setNotes(notes);
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <div>
        <button className='Login--button' onClick={this.handleClick}>
          <img src={googleicon} alt='Google Icon' className='Login--icon'/>
          <span className='Login--text'>Sign in with Google</span>
        </button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  setNotes: (notes) => dispatch(setNotes(notes))
});

export default connect(null, mapDispatchToProps)(LoginButton);

LoginButton.propTypes = {
  setUser: PropTypes.func,
  setNotes: PropTypes.func
}