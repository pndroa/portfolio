'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  children?: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <Box className='flex justify-between items-end mt-10'>
      <Box className='flex items-center gap-5 uppercase ml-[10rem]'>
        logo
        <Typography variant='h5'>ergün bickici</Typography>
      </Box>
      <Box className='mr-[10rem]'>{children}</Box>
    </Box>
  );
};

export default Navbar;
