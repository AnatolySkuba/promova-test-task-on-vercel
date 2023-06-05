import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Navigation } from 'components';
import { Data } from 'types';
import {
  CURRENCY_DEFAULT_BASE,
  CURRENCY_DEFAULT_TARGET,
  STORAGE_KEYS,
  VALUE_DEFAULT_BASE,
} from 'consts';
import formatDate from '../../helpers';

type Props = {
  data: Data;
  setValueTarget?: Dispatch<SetStateAction<number>>;
};

function Currency({ data, setValueTarget }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currencyBase = searchParams.get('currencyBase') || CURRENCY_DEFAULT_BASE;
  const currencyTarget = searchParams.get('currencyTarget') || CURRENCY_DEFAULT_TARGET;
  const formattedDate = formatDate(data.date);
  const currencies = Object.keys(data.rates);
  const currencyIndex = currencies.indexOf(currencyBase).toString();
  const valueDefaultBase = localStorage.getItem(STORAGE_KEYS.VALUE_BASE) || VALUE_DEFAULT_BASE;

  const changeValueTarget = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    localStorage.setItem(STORAGE_KEYS.VALUE_BASE, event.target.value);
    if (setValueTarget) {
      setValueTarget((+event.target.value / data.rates[currencyBase]) * data.rates[currencyTarget]);
    } else {
      setSearchParams({ currencyBase, currencyTarget });
    }
  };

  const changeCurrency = (event: SelectChangeEvent<string>) => {
    const valueBase = Number(localStorage.getItem(STORAGE_KEYS.VALUE_BASE)) ?? VALUE_DEFAULT_BASE;
    const newCurrencyBase = currencies[+event.target.value];
    setSearchParams({ currencyBase: newCurrencyBase, currencyTarget });
    if (setValueTarget) {
      setValueTarget((valueBase / data.rates[newCurrencyBase]) * data.rates[currencyTarget]);
    }
  };

  return (
    <Box
      sx={{
        p: 1.5,
        width: 360,
        height: 280,

        background: 'linear-gradient(to left bottom, #f64d51, #fca7a3)',
        color: 'primary.main',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 'small' }}>{formattedDate}</Typography>
        <Navigation />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: 26 }}>
          Currency
        </Typography>
        <ExpandMoreIcon />
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: 5,
          px: 7.6,
        }}
      >
        <TextField
          id="standard-basic"
          defaultValue={valueDefaultBase}
          onChange={changeValueTarget}
          inputProps={{ style: { padding: 0, fontSize: 50, color: 'var(--primary-color)' } }}
          sx={{
            '&& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--primary-color)',
            },
            '&& .MuiInput-root:before': { borderBottom: '1px solid var(--primary-color)' },
          }}
        />
        <FormControl>
          <Select
            sx={{ fontSize: 18, width: 100, color: 'white' }}
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

Currency.defaultProps = {
  setValueTarget: undefined,
};

export default Currency;
