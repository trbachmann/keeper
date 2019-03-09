import React from 'react';
import { shallow } from 'enzyme';
import { LoginButton } from './LoginButton';

describe('LoginButton', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<LoginButton />);
    expect(wrapper).toMatchSnapshot();
  });
});