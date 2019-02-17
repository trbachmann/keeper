import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps} from './App';
import { fetchNotes } from '../../thunks/fetchNotes';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../reducers/';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { mockNotes } from '../../mockNotes';

const mockProps = {
  notes: mockNotes,
  isLoading: false,
  error: '',
  fetchNotes: jest.fn(() => true)
}

const mockMatch = { params: { id: 'ijf' }, path: 'notes/ijf' };

jest.mock('../../thunks/fetchNotes.js');

describe('App', () => {
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

    it('should call fetchNotes on componentDidMount', () => {
      wrapper.instance().componentDidMount();
      expect(mockProps.fetchNotes).toHaveBeenCalled();
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
    it('should call dispatch with a fetchNotes thunk', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchNotes();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchNotes();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});
