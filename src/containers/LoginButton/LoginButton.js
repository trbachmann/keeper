import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleicon from '../../images/googleicon.svg';
import PropTypes from 'prop-types';

export class LoginButton extends Component {
  handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try{
      const { user } = await firebase.auth().signInWithPopup(provider);
      console.log('user', user);
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

LoginButton.propTypes = {
  
}