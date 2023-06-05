import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Box, Typography } from '@mui/material';

import Error from './Error';

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  Typography: jest.fn().mockReturnValue('Mocked Typography component'),
}));

describe('Error component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Error />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have a Box component with specified styles', () => {
    const boxComponent = wrapper.find(Box);

    expect(boxComponent.exists()).toBe(true);
    expect(boxComponent.prop('sx')).toEqual({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#9c27b0',
    });
  });

  it('should have a Typography component with specified styles and text', () => {
    const typographyComponent = wrapper.find(Typography);

    expect(typographyComponent.exists()).toBe(true);
    expect(typographyComponent.prop('variant')).toBe('h1');
    expect(typographyComponent.prop('style')).toEqual({ color: 'white' });
    expect(typographyComponent.children().text()).toBe('404');
  });
});
