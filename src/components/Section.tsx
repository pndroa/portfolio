import { Box } from '@mui/material';
import React from 'react';

interface Props {
  ref?: React.Ref<HTMLTableSectionElement>;
  children?: React.ReactNode;
}

const Section: React.FC<Props> = ({ ref, children }) => {
  return (
    <Box
      ref={ref}
      component='section'
      className='grid place-items-center content-center min-h-[100vh]'
    >
      {children}
    </Box>
  );
};

export default Section;
