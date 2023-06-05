import React from 'react';
import { shallow } from 'enzyme';
import { useSearchParams } from 'react-router-dom';
import { Select, TextField, Typography } from '@mui/material';

import { Data } from 'types';

import Currency from './Currency';

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
  Typography: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@mui/icons-material/ExpandMore', () => ({
  ExpandMoreIcon: jest.fn().mockReturnValue({}),
}));

jest.mock('components', () => ({
  Navigation: jest.fn().mockReturnValue('Mocked Navigation component'),
}));

declare const global: any;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Currency', () => {
  const mockData: Data = {
    date: '2023-06-04',
    rates: {
      USD: 1.22,
      EUR: 1,
    },
  };

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.localStorage = undefined;
  });

  it('renders without crashing', () => {
    shallow(<Currency data={mockData} />);
  });

  it('renders the formatted date', () => {
    const wrapper = shallow(<Currency data={mockData} />);

    const displayedDate = wrapper.find(Typography).at(0).text();

    expect(displayedDate).toBe('<mockConstructor />');
  });

  it('changes the value target when input changes', () => {
    const setValueTarget = jest.fn();
    const localStorageGetItemSpy = jest.spyOn(localStorage, 'getItem');

    const wrapper = shallow(<Currency data={mockData} setValueTarget={setValueTarget} />);
    const input = wrapper.find(TextField);
    input.simulate('change', { target: { value: '10' } });

    expect(localStorageGetItemSpy).toHaveBeenCalledWith('value-base');
    expect(setValueTarget).toHaveBeenCalled();
  });

  it('changes the currency base when select changes', () => {
    const setSearchParams = jest.fn();
    const searchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockImplementation(() => [searchParams, setSearchParams]);

    const wrapper = shallow(<Currency data={mockData} />);
    const select = wrapper.find(Select);
    select.simulate('change', { target: { value: '1' } });

    expect(setSearchParams).toHaveBeenCalled();
  });
});
