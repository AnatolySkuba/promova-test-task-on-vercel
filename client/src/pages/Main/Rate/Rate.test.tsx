import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';

import { Data } from 'types';

import Rate from './Rate';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  FormControl: jest.fn().mockReturnValue('Mocked FormControl component'),
  MenuItem: jest.fn().mockReturnValue('Mocked MenuItem component'),
  Select: jest.fn().mockReturnValue('Mocked Select component'),
  SelectChangeEvent: jest.fn().mockReturnValue('Mocked SelectChangeEvent component'),
  TextField: jest.fn().mockReturnValue('Mocked TextField component'),
}));

declare const global: any;

const localStorageMock = {
  getItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Rate', () => {
  const mockData: Data = {
    date: '2023-06-04',
    rates: {
      USD: 1.22,
      EUR: 1,
    },
  };
  const valueTarget = 10;
  const setValueTarget = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    const wrapper = shallow(
      <Rate data={mockData} valueTarget={valueTarget} setValueTarget={setValueTarget} />,
    );

    expect(wrapper.find(Box)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(FormControl)).toHaveLength(1);
    expect(wrapper.find(MenuItem)).toHaveLength(2);
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('should call setValueTarget on currency change', () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

    const wrapper = shallow(
      <Rate data={mockData} valueTarget={valueTarget} setValueTarget={setValueTarget} />,
    );

    // Simulate currency change
    const select = wrapper.find(Select);
    select.simulate('change', { target: { value: '1' } });

    expect(setValueTarget).toHaveBeenCalledTimes(1);
    expect(setValueTarget).toHaveBeenCalledWith(expect.any(Number));
  });
});
