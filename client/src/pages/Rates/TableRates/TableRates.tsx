import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';

import { CURRENCY_DEFAULT_BASE, STORAGE_KEYS, VALUE_DEFAULT_BASE } from 'consts';
import { Data } from 'types';

function createData(currency: string, rate: number) {
  return { currency, rate };
}

type Props = {
  data: Data;
};

function TableRates({ data }: Props) {
  const [searchParams] = useSearchParams();
  const currencyBase = searchParams.get('currencyBase') || CURRENCY_DEFAULT_BASE;
  const valueBase = Number(localStorage.getItem(STORAGE_KEYS.VALUE_BASE)) || VALUE_DEFAULT_BASE;
  const rates = Object.entries(data.rates);

  const rows = rates.map((rate) => {
    const valueBaseFromStorage = localStorage.getItem(STORAGE_KEYS.VALUE_BASE);
    const valueTargetCorrect =
      valueBaseFromStorage === null || Number(valueBaseFromStorage) > 0
        ? (valueBase / data.rates[currencyBase]) * rate[1]
        : 0;

    return createData(rate[0], valueTargetCorrect);
  });

  return (
    <Table sx={{ mt: 2, width: 380 }}>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {row.currency}
            </TableCell>
            <TableCell align="right">{row.rate.toFixed(3)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableRates;
