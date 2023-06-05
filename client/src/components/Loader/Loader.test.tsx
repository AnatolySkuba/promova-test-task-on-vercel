import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Box, CircularProgress } from '@mui/material';

import Loader from './Loader';

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  CircularProgress: jest.fn().mockReturnValue('Mocked CircularProgress component'),
}));

describe('Loader component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('renders CircularProgress component', () => {
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it('renders a Box component with correct props', () => {
    const boxComponent = wrapper.find(Box);

    expect(boxComponent.exists()).toBe(true);
    expect(boxComponent.prop('sx')).toEqual({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    });
  });
});
