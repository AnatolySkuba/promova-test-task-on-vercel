import React from 'react';
import { shallow } from 'enzyme';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { Loader, Error, Currency } from 'components';

import { Data } from 'types';
import Rates from './Rates';
import TableRates from './TableRates';

jest.mock('react-query');

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
}));

jest.mock('components', () => ({
  Currency: jest.fn().mockReturnValue('Mocked Currency component'),
  Loader: jest.fn().mockReturnValue('Mocked Loader component'),
  Error: jest.fn().mockReturnValue('Mocked Error component'),
}));

jest.mock('api', () => jest.fn());

describe('Rates', () => {
  const mockData: Data = {
    date: '2023-06-04',
    rates: {
      USD: 1.22,
      EUR: 1,
    },
  };

  it('renders Loader when isLoading is true', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const wrapper = shallow(<Rates />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('renders Error when isError is true', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    const wrapper = shallow(<Rates />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('should render Currency and TableRates when data is available', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, isError: false });

    const wrapper = shallow(<Rates />);

    expect(wrapper.find(Box)).toHaveLength(2);
    expect(wrapper.find(Currency)).toHaveLength(1);
    expect(wrapper.find(Currency).prop('data')).toEqual(mockData);
    expect(wrapper.find(TableRates)).toHaveLength(1);
    expect(wrapper.find(TableRates).prop('data')).toEqual(mockData);
    expect(wrapper.find(Box).at(0).prop('sx')).toEqual({
      display: 'flex',
      justifyContent: 'center',
    });
  });
});
