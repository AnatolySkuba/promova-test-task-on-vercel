import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, List } from '@mui/material';

import Navigation from './Navigation';

jest.mock('react-router-dom');

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  IconButton: jest.fn().mockReturnValue('Mocked IconButton component'),
  List: jest.fn().mockReturnValue('Mocked List component'),
  ListItem: jest.fn().mockReturnValue('Mocked ListItem component'),
}));

jest.mock('@mui/icons-material/Sort', () => ({
  SortIcon: jest.fn().mockReturnValue({}),
}));

describe('Navigation Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    wrapper = shallow(<Navigation />);
  });

  it('renders the SortIcon', () => {
    expect(wrapper.find(IconButton).exists()).toBe(true);
  });

  it('does not render the dropdown by default', () => {
    expect(wrapper.find('List').exists()).toBe(false);
  });

  it('renders the dropdown when IconButton is clicked', () => {
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(List).exists()).toBe(true);
  });

  it('renders the correct text in Link components', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/rates' });
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(Link).at(0).text()).toBe('Main');
  });
});
