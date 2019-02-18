import React from 'react';
import { shallow } from 'enzyme';
import NoteCard from './NoteCard';
import { mockNote, mockNoteLong } from '../../mockNotes';

describe('NoteCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NoteCard {...mockNote} />);
  });

  it('should pass snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should pass snapshot test when there are more than 10 items', () => {
    wrapper = shallow(<NoteCard {...mockNoteLong} />);
    expect(wrapper).toMatchSnapshot();
  });
});