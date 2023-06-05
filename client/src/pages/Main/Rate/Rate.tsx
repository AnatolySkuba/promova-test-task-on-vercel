import React, { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import {
  CURRENCY_DEFAULT_BASE,
  CURRENCY_DEFAULT_TARGET,
  STORAGE_KEYS,
  VALUE_DEFAULT_BASE,
} from 'consts';
import { Data } from 'types';

type Props = {
  data: Data;
  valueTarget: number;
  setValueTarget: Dispatch<SetStateAction<number>>;
};

function Rate({ data, valueTarget, setValueTarget }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currencyBase = searchParams.get('currencyBase') || CURRENCY_DEFAULT_BASE;
  const currencyTarget = searchParams.get('currencyTarget') || CURRENCY_DEFAULT_TARGET;
  const currencies = Object.keys(data.rates);
  const currencyIndex = currencies.indexOf(currencyTarget).toString();
  const valueBaseFromStorage = localStorage.getItem(STORAGE_KEYS.VALUE_BASE);
  const valueTargetCorrect =
    valueBaseFromStorage === null || Number(valueBaseFromStorage) > 0 ? valueTarget : 0;

  const changeCurrency = (event: SelectChangeEvent<string>) => {
    const newCurrencyTarget = currencies[+event.target.value];
    const valueBase = Number(localStorage.getItem(STORAGE_KEYS.VALUE_BASE)) || VALUE_DEFAULT_BASE;
    setSearchParams({ currencyBase, currencyTarget: newCurrencyTarget });
    setValueTarget((valueBase / data.rates[currencyBase]) * data.rates[newCurrencyTarget]);
  };

  return (
    <Box
      sx={{
        p: 1.5,
        width: 360,
        height: 280,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          p: 7.6,
        }}
      >
        <TextField
          id="standard-basic"
          value={valueTargetCorrect}
          inputProps={{ style: { padding: 0, fontSize: 50, color: 'var(--secondary-color)' } }}
          sx={{
            '&& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--secondary-color)',
            },
            '&& .MuiInput-root:before': { borderBottom: '1px solid var(--secondary-color)' },
          }}
        />
        <FormControl>
          <Select
            sx={{ fontSize: 18, width: 100, color: 'secondary.main' }}
            MenuProps={{
              sx: {
                '&& .MuiMenuItem-root': {
                  color: '#fddddc',
                  backgroundColor: '#ff9190',
                },
                '&& .Mui-selected': {
                  color: 'white',
                  fontWeight: 'bold',
                },
              },
            }}
            value={currencyIndex}
            onChange={changeCurrency}
          >
            {currencies.map((currency, i) => (
              <MenuItem key={currency} value={i}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Rate;
