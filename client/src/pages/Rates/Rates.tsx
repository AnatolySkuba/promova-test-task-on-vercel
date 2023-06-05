import React from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { Loader, Error, Currency } from 'components';
import getRates from 'api';

import TableRates from './TableRates';

function Rates() {
  const { data, isLoading, isError } = useQuery('rates', () => getRates());

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Currency data={data} />
        <TableRates data={data} />
      </Box>
    </Box>
  );
}

export default Rates;
