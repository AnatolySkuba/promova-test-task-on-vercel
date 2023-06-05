import React from 'react';
import { Box, Typography } from '@mui/material';

import { Navigation } from 'components';

function About() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          py: 2,
          px: 6,
          background: '#fc8380',
        }}
      >
        <Navigation />
      </Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            my: 1,
            fontSize: 'large',
            textAlign: 'center',
          }}
        >
          About us
        </Typography>
        <Typography>Welcome to our &quot;About Us&ldquo; page!</Typography>
        <Typography>
          We are a leading currency exchange service that provides fast and reliable currency
          exchange services to our clients. With us, you can easily exchange different currencies at
          the current exchange rate.
        </Typography>
        <Typography>
          Our team of currency exchange professionals is always ready to provide you with qualified
          assistance and advice on the best currency exchange options. We work with various
          currencies, including US Dollars (USD), Euros (EUR), British Pounds (GBP), and many
          others.
        </Typography>
        <Typography>
          Our currency exchange service offers competitive rates and minimal commission to make your
          currency exchange as beneficial as possible. We ensure fast and secure transaction
          processing so that you can receive your money in the shortest possible time.
        </Typography>
        <Typography>
          Don&apos;t hesitate, exchange your currency with us today and take advantage of all the
          benefits we offer. Our team is waiting for your order and ready to help you with any
          questions that may arise.
        </Typography>
        <Typography>
          Contact us today and see why currency exchange with us is the best choice!
        </Typography>
      </Box>
    </>
  );
}

export default About;
