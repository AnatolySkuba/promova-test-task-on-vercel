import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import { TableCell } from '@mui/material';

import { Data } from 'types';

import TableRates from './TableRates';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  Table: jest.fn().mockReturnValue('Mocked Table component'),
  TableBody: jest.fn().mockReturnValue('Mocked TableBody component'),
  TableRow: jest.fn().mockReturnValue('Mocked TableRow component'),
  TableCell: jest.fn().mockReturnValue('Mocked TableCell component'),
}));

declare const global: any;

const localStorageMock = {
  getItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('TableRates', () => {
  let wrapper: ShallowWrapper;
  const mockData: Data = {
    date: '2023-06-04',
    rates: {
      USD: 1.22,
      EUR: 1,
    },
  };

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);
    (localStorage.getItem as jest.Mock).mockReturnValue('100');
    wrapper = shallow(<TableRates data={mockData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders table rows with correct data', () => {
    expect(wrapper.find(TableCell).children().at(0).text()).toEqual('USD');
    expect(wrapper.find(TableCell).children().at(1).text()).toEqual('100.000');
  });

  it('renders table with default currencyBase and valueBase when searchParams is not provided', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

    expect(wrapper.find(TableCell).children().at(0).text()).toEqual('USD');
    expect(wrapper.find(TableCell).children().at(1).text()).toEqual('100.000');
  });

  it('renders table with default valueBase when localStorage value is not provided', () => {
    (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

    expect(wrapper.find(TableCell).children().at(0).text()).toEqual('USD');
    expect(wrapper.find(TableCell).children().at(1).text()).toEqual('10.000');
  });
});
