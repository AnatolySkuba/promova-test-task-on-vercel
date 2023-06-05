import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import { Loader, Error, Currency } from 'components';
import getRates from 'api';
import {
  CURRENCY_DEFAULT_BASE,
  CURRENCY_DEFAULT_TARGET,
  STORAGE_KEYS,
  VALUE_DEFAULT_BASE,
} from 'consts';

import Rate from './Rate';

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currencyBase = searchParams.get('currencyBase') || CURRENCY_DEFAULT_BASE;
  const currencyTarget = searchParams.get('currencyTarget') || CURRENCY_DEFAULT_TARGET;
  const { data, isLoading, isError } = useQuery('rates', () => getRates());

  const [valueTarget, setValueTarget] = useState(0);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  if (!isLoading && !isError && !valueTarget) {
    const valueDefaultBase =
      Number(localStorage.getItem(STORAGE_KEYS.VALUE_BASE)) || VALUE_DEFAULT_BASE;
    setValueTarget((valueDefaultBase / data.rates[currencyBase]) * data.rates[currencyTarget]);
  }

  const changeCurrency = () => {
    const valueBase = Number(localStorage.getItem(STORAGE_KEYS.VALUE_BASE)) || VALUE_DEFAULT_BASE;
    setSearchParams({ currencyBase: currencyTarget, currencyTarget: currencyBase });
    setValueTarget((valueBase / data.rates[currencyTarget]) * data.rates[currencyBase]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(to right bottom, #febfbf, #69a1ea)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Currency data={data} setValueTarget={setValueTarget} />
        <Rate data={data} valueTarget={valueTarget} setValueTarget={setValueTarget} />
        <IconButton
          onClick={changeCurrency}
          sx={{
            position: 'absolute',
            p: 0,
            top: '50%',
            right: 25,
            transform: 'translate(0, -50%) rotate(90deg)',
            transition: 'transform 0.3s ease',
            backgroundColor: 'white',
            borderRadius: 1.5,
            color: '#fc8380',
            boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.2)',
            '&& :hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'white',
              borderRadius: 1.5,
            },
          }}
        >
          <SyncAltIcon
            sx={{
              p: 1,
              '&& :hover': {
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
              },
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Main;
