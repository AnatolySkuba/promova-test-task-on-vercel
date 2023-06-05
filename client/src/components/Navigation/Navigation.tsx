import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, List, ListItem } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

import { ROUTER_KEYS } from 'consts';

function Navigation() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const routes = Object.values(ROUTER_KEYS).filter((route) => route !== location.pathname);

  function capitalizeFirstLetter(str: string) {
    if (str === ROUTER_KEYS.ROOT) {
      return 'Main';
    }
    return str.charAt(1).toUpperCase() + str.slice(2);
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => setShowDropdown(!showDropdown)}
        sx={{
          color: 'white',
          p: 0,
          '&& :hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <SortIcon
          sx={{
            fontSize: 30,
            '&& :hover': {
              transform: 'scale(1)',
            },
          }}
        />
      </IconButton>
      {showDropdown && (
        <Box
          sx={{
            position: 'absolute',
          }}
        >
          <List>
            {routes.map((route, i) => (
              <ListItem
                key={i}
                sx={{
                  backgroundColor: 'white',
                  p: 0,
                  '&& :hover': {
                    backgroundColor: '#ffefee',
                  },
                }}
              >
                <Link
                  to={`${route}${location.search}`}
                  style={{
                    color: 'red',
                    width: '100%',
                    padding: '8px 16px',
                    textDecoration: 'none',
                  }}
                >
                  {capitalizeFirstLetter(route)}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default Navigation;
