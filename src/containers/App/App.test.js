import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps} from './App';
import { fetchUser } from '../../thunks/fetchUser';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../reducers/';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { mockNotes } from '../../mockNotes';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../../firebaseConfig';

const mockProps = {
  notes: mockNotes,
  isLoading: false,
  error: '',
  fetchUser: jest.fn(() => true),
  toggleLoading: jest.fn(),
  user: { displayName: 'Jeo', email: 'jeo@email.com', uid: 'qwerty' }
}

firebase.initializeApp(firebaseConfig);

const mockMatch = { params: { id: 'ijf' }, path: 'notes/ijf' };

jest.mock('../../thunks/fetchUser.js');

describe('App', () => {
  beforeEach(() => {
    firebase.auth = jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn()
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(rootReducer);
    ReactDOM.render(<Provider store={store}><BrowserRouter><App {...mockProps}/></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('App component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App {...mockProps}/>);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should match the snapshot when isLoading is true', () => {
      wrapper = shallow(<App {...mockProps} isLoading={true} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should call checkUser on componentDidMount', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'checkUser');
      wrapper.instance().componentDidMount();
      expect(instance.checkUser).toHaveBeenCalled();
    });

    it('should return an array of JSX when there is a note', () => {
      const result = wrapper.instance().getNotesRoute({ match: mockMatch });
      expect(result).toHaveLength(2);
    });

    it('should return an Error404 component when there is no note', () => {
      const mockMatch = { params: { id: 'hghgfjhg' }, path: 'notes/hghgfjhg' };
      const result = wrapper.instance().getNotesRoute({ match: mockMatch });
      const wrapper404 = shallow(result);
      expect(wrapper404.find('.Error404')).toHaveLength(1);
    });

    it('should return an array of JSX', () => {
      const result = wrapper.instance().getNewNoteRoute({ match: mockMatch });
      expect(result).toHaveLength(2);
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with notes, isLoading and an error', () => {
      const mockState = {
        notes: mockNotes,
        isLoading: false,
        error: '',
        status: 0
      };
      const expected = {
        notes: mockNotes,
        isLoading: false,
        error: ''
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a fetchUser thunk', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});
