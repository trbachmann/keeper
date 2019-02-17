import React from 'react';
import { shallow } from 'enzyme';
import NoteCard from './NoteCard';
import { mockNote } from '../../mockNotes';

describe('NoteCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NoteCard {...mockNote} />
    );
  });

  it('should pass snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });
});