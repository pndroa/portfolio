'use client';
import React from 'react';
import { Button } from '@nextui-org/react';

interface Props {
  isActiv?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ButtonComponent: React.FC<Props> = ({
  isActiv = false,
  onClick,
  children,
}) => {
  return (
    <>
      {isActiv ? (
        <Button
          onPress={onClick}
          className='bg-gradient-to-tr bg-[#FAFAFA] underline underline-offset-8'
        >
          {children}
        </Button>
      ) : (
        <Button onPress={onClick} className='bg-gradient-to-tr bg-[#FAFAFA]'>
          {children}
        </Button>
      )}
    </>
  );
};

export default ButtonComponent;
