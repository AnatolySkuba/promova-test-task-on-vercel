import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Box, Typography } from '@mui/material';

import { Navigation } from 'components';

import About from './About';

jest.mock('components', () => ({
  Navigation: jest.fn().mockReturnValue('Mocked Navigation component'),
}));

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  Typography: jest.fn().mockReturnValue('Mocked Typography component'),
}));

describe('About component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('renders a Box component with a Navigation component inside', () => {
    expect(wrapper.find(Box)).toHaveLength(2);
    expect(wrapper.find(Navigation)).toHaveLength(1);
  });

  it('renders Typography components with the correct text', () => {
    const typographyComponent = wrapper.find(Typography);

    expect(typographyComponent).toHaveLength(7);
    expect(typographyComponent.at(0).prop('variant')).toBe('h1');
    expect(typographyComponent.at(0).props().children).toBe('About us');
  });
});
