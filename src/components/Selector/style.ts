import { styled } from '@/styles/app';
import * as SelectPrimitive from '@radix-ui/react-select';
import  React, {forwardRef, ReactNode} from 'react';


export const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '2px 15px',
  fontSize: 13,
  lineHeight: 2,

  gap: 5,
  backgroundColor: '$gray-900',
  color: '$gray-100',
  border: '1px solid',
  borderColor: '$gray-500',

 


});

export const SelectIcon = styled(SelectPrimitive.SelectIcon, {
  color: '$gray-100'
})

export const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  background: '$gray-800',
  border: '1px solid gray',
  borderRadius: 6,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  padding: '1rem',
  marginTop: '2.5rem',


});



 export const StyledItem = styled(SelectPrimitive.Item, {
  fontSize: 13,
  lineHeight: 2,
  color: '',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',

  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  '&:hover': {
    border: 'none'
  }

});




