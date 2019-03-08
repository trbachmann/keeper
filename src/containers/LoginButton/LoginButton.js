import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleicon from '../../images/googleicon.svg';
import PropTypes from 'prop-types';
import { fetchUser } from '../../thunks/fetchUser';
import { setError } from '../../actions';
import { connect } from 'react-redux';

export class LoginButton extends Component {
  handleClick = async () => {
    const google = new firebase.auth.GoogleAuthProvider();
    try{
      const { user: userData } = await firebase.auth().signInWithPopup(google);
      this.props.fetchUser(userData);
    } catch (error) {
      this.props.setError(error.message);
    }
  }

  render() {
    return (
      <div className='Login'>
        <button className='Login--button' onClick={this.handleClick}>
          <img src={googleicon} alt='Google Icon' className='Login--icon'/>
          <span className='Login--text'>Sign in with Google</span>
        </button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userData) => dispatch(fetchUser(userData)),
  setError: (message) => dispatch(setError(message))
});

export default connect(null, mapDispatchToProps)(LoginButton);

LoginButton.propTypes = {
  fetchUser: PropTypes.func,
  setError: PropTypes.func
}