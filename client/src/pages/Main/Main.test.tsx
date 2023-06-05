import React from 'react';
import { shallow } from 'enzyme';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '@mui/material';

import { Loader, Error, Currency } from 'components';
import { Data } from 'types';
import Rate from './Rate';
import Main from './Main';

jest.mock('react-query');

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('components', () => ({
  Currency: jest.fn().mockReturnValue('Mocked Currency component'),
  Loader: jest.fn().mockReturnValue('Mocked Loader component'),
  Error: jest.fn().mockReturnValue('Mocked Error component'),
}));

jest.mock('@mui/material', () => ({
  Box: jest.fn().mockReturnValue('Mocked Box component'),
  IconButton: jest.fn().mockReturnValue('Mocked IconButton component'),
}));

jest.mock('@mui/icons-material/SyncAlt', () => ({
  SyncAltIcon: jest.fn().mockReturnValue({}),
}));

declare const global: any;

const localStorageMock = {
  getItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Main', () => {
  const mockData: Data = {
    date: '2023-06-04',
    rates: {
      USD: 1.22,
      EUR: 1,
    },
  };

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, isLoading: false, isError: false });
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
  });

  it('renders Loader when isLoading is true', () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const wrapper = shallow(<Main />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('renders Error when isError is true', () => {
    (useQuery as jest.Mock).mockReturnValue({ isError: true });

    const wrapper = shallow(<Main />);

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('renders Currency and Rate components when data is available', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper.find(Currency)).toHaveLength(1);
    expect(wrapper.find(Rate)).toHaveLength(1);
  });

  it('invokes changeCurrency function on button click', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<Main />);

    wrapper.find(IconButton).simulate('click');

    expect(setSearchParams).toHaveBeenCalledWith({
      currencyBase: 'EUR',
      currencyTarget: 'USD',
    });
  });
});
